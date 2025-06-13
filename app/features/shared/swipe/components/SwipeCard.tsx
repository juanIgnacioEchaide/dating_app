import React, { use } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Image } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Matchable } from '../store/swipeSlice';
import BottomChoiceButtons from './BottomChoiceButtons';
import UserCardInfo from './UserCardInfo';
import { SharedValue } from 'react-native-reanimated';

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
    handleLike: (id: string) => void;
    handleDislike: (id: string) => void;
    handleFavorite: (id: string) => void;
    isSwiping: SharedValue<boolean>;
};

export default function SwipeCard({
    user,
    stackOffset,
    isTopCard,
    index,
    handleDislike,
    handleLike,
    handleFavorite,
    isSwiping,
}: Props) {
    const translateX = useSharedValue(0);
    const rotate = useSharedValue(0);

    const gesture = Gesture.Pan()
        .onBegin(() => {
            isSwiping.value = true;
        })
        .onUpdate((event) => {
            translateX.value = event.translationX;
            rotate.value = (event.translationX / SCREEN_WIDTH) * 20;
        })
        .onEnd(() => {
            if (translateX.value > SWIPE_THRESHOLD) {
                translateX.value = withSpring(SCREEN_WIDTH, {
                    damping: 12,
                    stiffness: 400,
                    mass: 0.2,
                    overshootClamping: true,
                }, () => {
                    runOnJS(handleLike)(user.id);
                    isSwiping.value = false;
                });
            } else if (translateX.value < -SWIPE_THRESHOLD) {
                translateX.value = withSpring(-SCREEN_WIDTH, {
                    damping: 12,
                    stiffness: 400,
                    mass: 0.2,
                    overshootClamping: true,
                }, () => {
                    runOnJS(handleDislike)(user.id);
                    isSwiping.value = false;
                });
            } else {
                translateX.value = withSpring(0);
                rotate.value = withSpring(0);
                isSwiping.value = false;
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
                style={[
                    styles.card,
                    animatedStyle,
                    {
                        top: stackOffset,
                        zIndex: isTopCard ? 10 : 10 - index,
                    },
                ]}
            >
                {user.photoUrl && (
                    <Image
                        source={typeof user.photoUrl === 'string'
                            ? { uri: user.photoUrl }
                            : user.photoUrl}
                        style={styles.image}
                        resizeMode="cover"
                    />

                )}
                <UserCardInfo
                    name={user.name}
                    town={user.town}
                    age={user.age}
                    country={user.country}
                />
                <BottomChoiceButtons
                    likeCallback={() => {
                        isSwiping.value = false;
                        handleLike(user.id)
                    }
                    }
                    dislikeCallback={() => { isSwiping.value = false; handleDislike(user.id) }}
                    favoritesCallback={() => { isSwiping.value = false; handleFavorite(user.id) }}
                    otherUserId={user.id}
                />
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        overflow: 'hidden',
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
    image: {
        position: 'absolute',
        width: '120%',
        height: '120%',
        justifyContent: 'center',
        borderRadius: 12
    }
});
