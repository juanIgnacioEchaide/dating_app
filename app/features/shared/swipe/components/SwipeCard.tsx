import React, { useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Matchable } from '../store/swipeSlice';
import FilterButton from './FilterButton';
import ChoiceButton from './ChoiceButton';
import BottomChoiceButtons from './BottomChoiceButtons';
import UserCardInfo from './UserCardInfo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

type Props = {
    user: Matchable;
    index: number;
    stackOffset: number;
    isTopCard: boolean;
    selected: boolean;
    seriesSelected: number;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
    showFilters: boolean;
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
    handleLike: (id: string) => void,
    handleDislike: (id: string) => void,
    handleFavorite: (id: string) => void,
};

export type FilterButton = { label: string, type: string, selected: boolean, param: string, }
export type ChoiceButton = Pick<FilterButton, 'type' | 'param'>

export default function SwipeCard({
    user,
    stackOffset,
    isTopCard,
    index,
    handleDislike,
    handleLike,
    handleFavorite,

}: Props) {
    const translateX = useSharedValue(0);
    const rotate = useSharedValue(0);

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
            rotate.value = (event.translationX / SCREEN_WIDTH) * 20;
        })
        .onEnd(() => {
            if (translateX.value > SWIPE_THRESHOLD) {
                translateX.value = withSpring(SCREEN_WIDTH, {}, () => {
                    runOnJS(handleLike)(user.id);
                });
            } else if (translateX.value < -SWIPE_THRESHOLD) {
                translateX.value = withSpring(-SCREEN_WIDTH, {}, () => {
                    runOnJS(handleDislike)(user.id);
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
        <GestureDetector gesture={isTopCard ? gesture : Gesture.Pan()}>
            <Animated.View
                key={user.id}
                style={[
                    styles.card,
                    animatedStyle,
                    {
                        top: stackOffset,
                        zIndex: isTopCard ? 10 : 10 - index,
                    },
                ]}
            >
                <View>
                    <UserCardInfo
                        name={user.name}
                        town={user.town}
                        age={user.age}
                        country={user.country}
                    />
                    <BottomChoiceButtons
                        likeCallback={handleLike}
                        dislikeCallback={handleDislike}
                        favoritesCallback={handleFavorite}
                        otherUserId={user.id}
                    />
                </View>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        width: SCREEN_WIDTH * 0.9,
        height: 700,
        backgroundColor: 'gray',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
    },
});
