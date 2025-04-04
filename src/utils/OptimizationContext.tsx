// Optimization context for low-resource environments
// This context provider manages optimization settings based on device capabilities

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import OptimizationUtils from './OptimizationUtils';

// Define optimization settings interface
export interface OptimizationSettings {
  // Image settings
  imageQuality: number; // 0.0 to 1.0
  maxImageSizeKB: number;
  
  // Performance settings
  renderStrategy: 'simple' | 'normal' | 'advanced';
  itemsPerPage: number;
  enableAnimations: boolean;
  
  // Network settings
  isSlowConnection: boolean;
  prefetchEnabled: boolean;
  
  // Battery settings
  lowPowerMode: boolean;
  refreshInterval: number;
  
  // Storage settings
  availableStorageMB: number;
  autoClearOldCache: boolean;
  
  // Device info
  isLowEndDevice: boolean;
  isLowMemoryDevice: boolean;
  isLowBattery: boolean;
}

// Default optimization settings
const defaultSettings: OptimizationSettings = {
  imageQuality: 0.7,
  maxImageSizeKB: 200,
  
  renderStrategy: 'normal',
  itemsPerPage: 10,
  enableAnimations: true,
  
  isSlowConnection: false,
  prefetchEnabled: true,
  
  lowPowerMode: false,
  refreshInterval: 120000, // 2 minutes
  
  availableStorageMB: 500,
  autoClearOldCache: true,
  
  isLowEndDevice: false,
  isLowMemoryDevice: false,
  isLowBattery: false
};

// Create context
interface OptimizationContextType {
  settings: OptimizationSettings;
  updateSettings: (newSettings: Partial<OptimizationSettings>) => void;
  detectDeviceCapabilities: () => Promise<void>;
  enableLowPowerMode: (enable: boolean) => void;
}

const OptimizationContext = createContext<OptimizationContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
  detectDeviceCapabilities: async () => {},
  enableLowPowerMode: () => {}
});

// Provider component
interface OptimizationProviderProps {
  children: ReactNode;
}

export const OptimizationProvider: React.FC<OptimizationProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<OptimizationSettings>(defaultSettings);
  
  // Update settings
  const updateSettings = (newSettings: Partial<OptimizationSettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };
  
  // Detect device capabilities
  const detectDeviceCapabilities = async () => {
    try {
      // Check network
      const slowConnection = OptimizationUtils.isSlowConnection();
      
      // Check memory
      const lowMemory = OptimizationUtils.isLowMemoryDevice();
      
      // Check CPU
      const slowCPU = OptimizationUtils.isSlowCPU();
      
      // Check battery
      const lowBattery = await OptimizationUtils.isLowBattery();
      
      // Check storage
      const availableStorage = await OptimizationUtils.checkAvailableStorage();
      const availableStorageMB = Math.floor(availableStorage / (1024 * 1024));
      
      // Determine optimal settings
      const renderStrategy = OptimizationUtils.getOptimalRenderStrategy();
      const itemsPerPage = OptimizationUtils.getOptimalItemsPerPage();
      const refreshInterval = await OptimizationUtils.getOptimalRefreshInterval();
      const imageQuality = OptimizationUtils.getImageQualityForNetwork();
      
      // Update settings
      updateSettings({
        isSlowConnection: slowConnection,
        isLowMemoryDevice: lowMemory,
        isLowEndDevice: slowCPU,
        isLowBattery: lowBattery,
        availableStorageMB,
        renderStrategy,
        itemsPerPage,
        refreshInterval,
        imageQuality,
        enableAnimations: !slowCPU && !lowBattery,
        prefetchEnabled: !slowConnection && !lowBattery,
        lowPowerMode: lowBattery
      });
      
      // Clear old cached data if auto-clear is enabled
      if (settings.autoClearOldCache) {
        await OptimizationUtils.clearOldCachedData();
      }
    } catch (error) {
      console.error('Error detecting device capabilities:', error);
    }
  };
  
  // Enable/disable low power mode
  const enableLowPowerMode = (enable: boolean) => {
    updateSettings({
      lowPowerMode: enable,
      enableAnimations: !enable,
      prefetchEnabled: !enable,
      refreshInterval: enable ? 300000 : 120000, // 5 minutes in low power mode, 2 minutes otherwise
      imageQuality: enable ? 0.4 : settings.imageQuality
    });
  };
  
  // Detect capabilities on mount
  useEffect(() => {
    detectDeviceCapabilities();
    
    // Set up listeners for network and battery changes
    const handleNetworkChange = () => {
      updateSettings({
        isSlowConnection: OptimizationUtils.isSlowConnection(),
        imageQuality: OptimizationUtils.getImageQualityForNetwork()
      });
    };
    
    const handleBatteryChange = async () => {
      const lowBattery = await OptimizationUtils.isLowBattery();
      updateSettings({
        isLowBattery: lowBattery
      });
      
      // Auto-enable low power mode if battery is low
      if (lowBattery && !settings.lowPowerMode) {
        enableLowPowerMode(true);
      }
    };
    
    // Add event listeners if available
    if (navigator.connection) {
      (navigator.connection as any).addEventListener('change', handleNetworkChange);
    }
    
    if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingchange', handleBatteryChange);
      });
    }
    
    // Clean up listeners
    return () => {
      if (navigator.connection) {
        (navigator.connection as any).removeEventListener('change', handleNetworkChange);
      }
      
      if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
          battery.removeEventListener('levelchange', handleBatteryChange);
          battery.removeEventListener('chargingchange', handleBatteryChange);
        });
      }
    };
  }, []);
  
  return (
    <OptimizationContext.Provider value={{
      settings,
      updateSettings,
      detectDeviceCapabilities,
      enableLowPowerMode
    }}>
      {children}
    </OptimizationContext.Provider>
  );
};

// Custom hook to use the optimization context
export const useOptimization = () => useContext(OptimizationContext);

export default OptimizationContext;
