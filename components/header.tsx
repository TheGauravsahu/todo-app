import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

export default function Header() {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getAllTodos);
  const completedCount = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const total = todos ? todos.length : 0;
  const progress = total > 0 ? (completedCount / total) * 100 : 0;

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.iconContainer}
        >
          <Ionicons name="flash-outline" size={20} color="#fff" />
        </LinearGradient>

        <View style={styles.titleTextContainer}>
          <Text style={styles.title}>Today&apos;s Tasks 👀</Text>
          <Text style={styles.subtitle}>
            {completedCount} of {total} completed
          </Text>
        </View>
      </View>

      {total > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={colors.gradients.success}
                style={[styles.progressFill, { width: `${progress}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
          </View>
        </View>
      )}
    </View>
  );
}
