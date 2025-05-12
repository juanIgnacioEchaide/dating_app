import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Matchable } from '../store/swipeSlice';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

type Props = {
  user: Matchable;
  index: number;
  stackOffset: number;
  isTopCard: boolean;
  onSwipe: (liked: boolean, userId: string) => void;
};

export default function SwipeCard({ user, stackOffset, isTopCard, onSwipe }: Props) {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      rotate.value = (event.translationX / SCREEN_WIDTH) * 20;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withSpring(SCREEN_WIDTH, {}, () => {
          runOnJS(onSwipe)(true, user.id);
        });
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-SCREEN_WIDTH, {}, () => {
          runOnJS(onSwipe)(false, user.id);
        });
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotateZ: `${rotate.value}deg` },
    ],
  }));

  return (
    <GestureDetector gesture={isTopCard ? panGesture : Gesture.Pan()}>
      <Animated.View style={[styles.card, animatedStyle, { top: stackOffset, zIndex: isTopCard ? 1 : 0 }]}>
        <Text style={styles.name}>{user.name} ({user.age})</Text>
        <Text>{user.town}, {user.country}</Text>
        <Text>Relación: {user.relationship ? 'Sí' : 'No'} | Amistad: {user.friendship ? 'Sí' : 'No'}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 6,
  },
});
