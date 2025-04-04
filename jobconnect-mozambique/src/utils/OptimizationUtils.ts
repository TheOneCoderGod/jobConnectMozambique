// Optimization utilities for low-resource environments
// This file contains utilities to optimize the application for low-end devices and limited network conditions

/**
 * Image optimization utilities
 */

// Function to compress images before uploading
export const compressImage = async (file: File, maxSizeKB: number = 200): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate the width and height, maintaining the aspect ratio
        const maxSize = 800; // Maximum dimension
        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Adjust quality based on file size
        let quality = 0.7; // Default quality
        const maxSizeBytes = maxSizeKB * 1024;
        
        // Convert to blob and check size
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas to Blob conversion failed'));
              return;
            }
            
            // If the blob is still too large, reduce quality further
            if (blob.size > maxSizeBytes) {
              quality = Math.min(0.5, (maxSizeBytes / blob.size) * quality);
              canvas.toBlob(
                (finalBlob) => {
                  if (!finalBlob) {
                    reject(new Error('Canvas to Blob conversion failed'));
                    return;
                  }
                  
                  // Create a new file from the blob
                  const compressedFile = new File([finalBlob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  });
                  
                  resolve(compressedFile);
                },
                'image/jpeg',
                quality
              );
            } else {
              // Create a new file from the blob
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              
              resolve(compressedFile);
            }
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Error loading image'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
  });
};

/**
 * Audio optimization utilities
 */

// Function to compress audio before uploading
export const compressAudio = async (audioBlob: Blob, maxSizeKB: number = 500): Promise<Blob> => {
  // In a real implementation, we would use audio compression libraries
  // For this example, we'll simulate compression by returning the original blob
  // with a message indicating that compression would happen here
  console.log(`Audio would be compressed to max ${maxSizeKB}KB`);
  return audioBlob;
};

/**
 * Network optimization utilities
 */

// Function to check if the device is on a slow connection
export const isSlowConnection = (): boolean => {
  if (navigator.connection) {
    const connection = navigator.connection as any;
    
    // Check if the connection is slow (2G or slower)
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return true;
    }
    
    // Check if the connection is metered (user pays for data)
    if (connection.saveData) {
      return true;
    }
  }
  
  return false;
};

// Function to determine image quality based on network speed
export const getImageQualityForNetwork = (): number => {
  if (navigator.connection) {
    const connection = navigator.connection as any;
    
    switch (connection.effectiveType) {
      case 'slow-2g':
        return 0.3; // Very low quality
      case '2g':
        return 0.4; // Low quality
      case '3g':
        return 0.6; // Medium quality
      case '4g':
        return 0.8; // High quality
      default:
        return 0.6; // Default medium quality
    }
  }
  
  return 0.6; // Default medium quality
};

/**
 * Memory optimization utilities
 */

// Function to check if the device has low memory
export const isLowMemoryDevice = (): boolean => {
  // Check if device memory API is available
  if (navigator.deviceMemory) {
    // Device memory is in GB
    return navigator.deviceMemory < 2;
  }
  
  // If API is not available, make a conservative assumption
  return true;
};

// Function to optimize rendering for low memory devices
export const getOptimalItemsPerPage = (): number => {
  if (navigator.deviceMemory) {
    if (navigator.deviceMemory < 1) {
      return 5; // Very low memory devices
    } else if (navigator.deviceMemory < 2) {
      return 10; // Low memory devices
    } else if (navigator.deviceMemory < 4) {
      return 15; // Medium memory devices
    } else {
      return 20; // High memory devices
    }
  }
  
  return 10; // Default for unknown devices
};

/**
 * Battery optimization utilities
 */

// Function to check if the device is in low battery mode
export const isLowBattery = async (): Promise<boolean> => {
  if (navigator.getBattery) {
    const battery = await navigator.getBattery();
    
    // Consider low battery if less than 20% and not charging
    return battery.level < 0.2 && !battery.charging;
  }
  
  return false;
};

// Function to adjust app behavior based on battery status
export const getOptimalRefreshInterval = async (): Promise<number> => {
  if (navigator.getBattery) {
    const battery = await navigator.getBattery();
    
    if (battery.charging) {
      return 60000; // 1 minute if charging
    } else if (battery.level < 0.1) {
      return 300000; // 5 minutes if very low battery
    } else if (battery.level < 0.2) {
      return 180000; // 3 minutes if low battery
    } else {
      return 120000; // 2 minutes otherwise
    }
  }
  
  return 120000; // Default 2 minutes
};

/**
 * Performance optimization utilities
 */

// Function to detect if the device has a slow CPU
export const isSlowCPU = (): boolean => {
  // Use a simple benchmark to estimate CPU speed
  const startTime = performance.now();
  let result = 0;
  
  // Perform a CPU-intensive operation
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i);
  }
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  // If the operation took more than 200ms, consider it a slow CPU
  return duration > 200;
};

// Function to optimize rendering strategy based on device capabilities
export const getOptimalRenderStrategy = (): 'simple' | 'normal' | 'advanced' => {
  if (isSlowCPU()) {
    return 'simple';
  }
  
  if (isLowMemoryDevice()) {
    return 'normal';
  }
  
  return 'advanced';
};

/**
 * Storage optimization utilities
 */

// Function to check available storage space
export const checkAvailableStorage = async (): Promise<number> => {
  if (navigator.storage && navigator.storage.estimate) {
    const estimate = await navigator.storage.estimate();
    return estimate.quota ? estimate.quota - (estimate.usage || 0) : 0;
  }
  
  return 0; // Unknown storage
};

// Function to clear old cached data
export const clearOldCachedData = async (): Promise<void> => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => {
      // Extract date from cache name (assuming format cache-YYYY-MM-DD)
      const match = name.match(/cache-(\d{4}-\d{2}-\d{2})/);
      if (!match) return false;
      
      const cacheDate = new Date(match[1]);
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      
      return cacheDate < oneMonthAgo;
    });
    
    await Promise.all(oldCaches.map(name => caches.delete(name)));
  }
};

/**
 * Export all utilities
 */
export const OptimizationUtils = {
  compressImage,
  compressAudio,
  isSlowConnection,
  getImageQualityForNetwork,
  isLowMemoryDevice,
  getOptimalItemsPerPage,
  isLowBattery,
  getOptimalRefreshInterval,
  isSlowCPU,
  getOptimalRenderStrategy,
  checkAvailableStorage,
  clearOldCachedData
};

export default OptimizationUtils;
