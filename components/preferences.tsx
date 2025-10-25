import { createSettingsStyles } from "@/assets/styles/settings.style";
import useSettings from "@/hooks/useSettings";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Switch, Text, View } from "react-native";

export default function Preferences() {
  const {
    isAutoSyncEnabled,
    isNotificationEnabled,
    toggleAutoSyncEnabled,
    toggleNotificationEnabled,
  } = useSettings();

  const { toggleDarkMode, colors, isDarkMode } = useTheme();
  const styles = createSettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.surface} style={styles.section}>
      <Text style={styles.sectionTitle}>Preferences</Text>

      <View>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={styles.settingIcon}
            >
              <Ionicons name="moon" size={18} color="#fff" />
            </LinearGradient>
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            thumbColor={"#fff"}
            trackColor={{ false: colors.border, true: colors.primary }}
            ios_backgroundColor={colors.border}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <LinearGradient
              colors={colors.gradients.warning}
              style={styles.settingIcon}
            >
              <Ionicons name="notifications" size={18} color="#fff" />
            </LinearGradient>
            <Text style={styles.settingText}>Notification</Text>
          </View>
          <Switch
            value={isNotificationEnabled}
            onValueChange={toggleNotificationEnabled}
            thumbColor={"#fff"}
            trackColor={{ false: colors.border, true: colors.warning }}
            ios_backgroundColor={colors.border}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <LinearGradient
              colors={colors.gradients.success}
              style={styles.settingIcon}
            >
              <Ionicons name="sync" size={18} color="#fff" />
            </LinearGradient>
            <Text style={styles.settingText}>Auto Sync</Text>
          </View>
          <Switch
            value={isAutoSyncEnabled}
            onValueChange={toggleAutoSyncEnabled}
            thumbColor={"#fff"}
            trackColor={{ false: colors.border, true: colors.success }}
            ios_backgroundColor={colors.border}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
