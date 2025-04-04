// This is a custom service worker configuration for JobConnect Mozambique
// It provides offline functionality and caching strategies

/* eslint-disable no-restricted-globals */

// Use workbox-window for service worker registration
self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  event.waitUntil(self.clients.claim());
});

// Cache names
const CACHE_NAMES = {
  static: 'jobconnect-static-v1',
  images: 'jobconnect-images-v1',
  api: 'jobconnect-api-v1',
  fonts: 'jobconnect-fonts-v1',
  pages: 'jobconnect-pages-v1'
};

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/js/main.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAMES.static)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = Object.values(CACHE_NAMES);
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Helper function to determine if a request is for an image
const isImageRequest = (request) => {
  return request.destination === 'image' || 
    request.url.match(/\.(jpe?g|png|gif|svg|webp)$/i);
};

// Helper function to determine if a request is for a font
const isFontRequest = (request) => {
  return request.destination === 'font' || 
    request.url.match(/\.(woff2?|eot|ttf|otf)$/i);
};

// Helper function to determine if a request is for an API
const isApiRequest = (request) => {
  return request.url.includes('/api/') || 
    request.url.includes('data.json');
};

// Helper function to determine if a request is for a page
const isPageRequest = (request) => {
  return request.mode === 'navigate';
};

// Fetch event - handle different caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Don't cache cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Cache-first strategy for images
  if (isImageRequest(request)) {
    event.respondWith(
      caches.open(CACHE_NAMES.images)
        .then((cache) => {
          return cache.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              return fetch(request)
                .then((networkResponse) => {
                  cache.put(request, networkResponse.clone());
                  return networkResponse;
                })
                .catch(() => {
                  // Return a placeholder image if offline
                  return caches.match('/static/images/placeholder.png');
                });
            });
        })
    );
    return;
  }

  // Cache-first strategy for fonts
  if (isFontRequest(request)) {
    event.respondWith(
      caches.open(CACHE_NAMES.fonts)
        .then((cache) => {
          return cache.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              return fetch(request)
                .then((networkResponse) => {
                  cache.put(request, networkResponse.clone());
                  return networkResponse;
                });
            });
        })
    );
    return;
  }

  // Stale-while-revalidate for API requests
  if (isApiRequest(request)) {
    event.respondWith(
      caches.open(CACHE_NAMES.api)
        .then((cache) => {
          return cache.match(request)
            .then((cachedResponse) => {
              const fetchPromise = fetch(request)
                .then((networkResponse) => {
                  cache.put(request, networkResponse.clone());
                  return networkResponse;
                })
                .catch(() => {
                  console.log('Failed to fetch API request');
                });
              
              return cachedResponse || fetchPromise;
            });
        })
    );
    return;
  }

  // Network-first strategy for page requests
  if (isPageRequest(request)) {
    event.respondWith(
      caches.open(CACHE_NAMES.pages)
        .then((cache) => {
          return fetch(request)
            .then((networkResponse) => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            })
            .catch(() => {
              return cache.match(request)
                .then((cachedResponse) => {
                  if (cachedResponse) {
                    return cachedResponse;
                  }
                  // If no cached page, return the offline page
                  return caches.match('/offline.html');
                });
            });
        })
    );
    return;
  }

  // Default: network-first with cache fallback
  event.respondWith(
    caches.open(CACHE_NAMES.static)
      .then((cache) => {
        return fetch(request)
          .then((networkResponse) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          })
          .catch(() => {
            return cache.match(request);
          });
      })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'job-application') {
    event.waitUntil(
      // Process stored job applications when back online
      processStoredJobApplications()
    );
  }
});

// Function to process stored job applications
const processStoredJobApplications = async () => {
  try {
    const db = await openDatabase();
    const applications = await db.getAll('job-applications');
    
    for (const application of applications) {
      try {
        const response = await fetch('/api/job-applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(application)
        });
        
        if (response.ok) {
          await db.delete('job-applications', application.id);
        }
      } catch (error) {
        console.error('Failed to process application:', error);
      }
    }
  } catch (error) {
    console.error('Error processing stored applications:', error);
  }
};

// Helper function to open IndexedDB
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('JobConnectDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      resolve({
        getAll: (storeName) => {
          return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
          });
        },
        delete: (storeName, id) => {
          return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
          });
        }
      });
    };
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('job-applications')) {
        db.createObjectStore('job-applications', { keyPath: 'id' });
      }
    };
  });
};
