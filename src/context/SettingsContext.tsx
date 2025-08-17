import React, { useEffect, useState, createContext, useContext } from 'react';
interface Settings {
  dailyProblemLimit: number;
}
interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}
const defaultSettings: Settings = {
  dailyProblemLimit: 3
};
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
export const SettingsProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedSettings = localStorage.getItem('leetcodeSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);
  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('leetcodeSettings', JSON.stringify(settings));
  }, [settings]);
  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };
  return <SettingsContext.Provider value={{
    settings,
    updateSettings
  }}>
      {children}
    </SettingsContext.Provider>;
};
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};