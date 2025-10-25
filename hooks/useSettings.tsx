import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface SettingContextType {
  isNotificationEnabled: boolean;
  isAutoSyncEnabled: boolean;
  toggleNotificationEnabled: () => void;
  toggleAutoSyncEnabled: () => void;
}

const SettingContext = createContext<SettingContextType | undefined>(undefined);

export const SettingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const notificationValue = await AsyncStorage.getItem(
          "isNotificationEnabled"
        );
        const autoSyncValue = await AsyncStorage.getItem("isAutoSyncEnabled");

        if (notificationValue !== null)
          setIsNotificationEnabled(JSON.parse(notificationValue));
        if (autoSyncValue !== null)
          setIsAutoSyncEnabled(JSON.parse(autoSyncValue));
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      "isNotificationEnabled",
      JSON.stringify(isNotificationEnabled)
    );
  }, [isNotificationEnabled]);

  useEffect(() => {
    AsyncStorage.setItem(
      "isAutoSyncEnabled",
      JSON.stringify(isAutoSyncEnabled)
    );
  }, [isAutoSyncEnabled]);

  const toggleNotificationEnabled = () => {
    setIsNotificationEnabled((prev) => !prev);
  };

  const toggleAutoSyncEnabled = () => {
    setIsAutoSyncEnabled((prev) => !prev);
  };
  return (
    <SettingContext.Provider
      value={{
        isNotificationEnabled,
        isAutoSyncEnabled,
        toggleNotificationEnabled,
        toggleAutoSyncEnabled,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default function useSettings() {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingProvider");
  }
  return context;
}
