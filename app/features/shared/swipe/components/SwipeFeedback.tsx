import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

type Props = {
  visible: boolean;
  type: "like" | "dislike" | "favorite";
  onDone: () => void;
};

export default function SwipeFeedback({ visible, type, onDone }: Props) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 150 }, () => {
        opacity.value = withTiming(0, { duration: 600 }, () => {
          runOnJS(onDone)();
        });
      });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.overlay, animatedStyle]}>
      <Text style={[styles.text, type === "like" ? styles.green : styles.red]}>
      {type === "like" ? "💚" : type === "dislike" ? "💔" : "⭐"}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    alignItems:"center",
    opacity: 0.2,
    top: 300,
    alignSelf: "center",
    padding: 16,
    borderRadius: 12,
    zIndex: 100,
  },
  text: {
    fontSize: 80,
    fontWeight: "bold",
    color: "white",
  },
  green: {
    color: "lightgreen",
  },
  red: {
    color: "#ff4d4d",
  },
});
