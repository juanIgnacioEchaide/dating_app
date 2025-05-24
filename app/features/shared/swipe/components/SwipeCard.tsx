import React, { useEffect } from 'react';
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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

type Props = {
    user: Matchable;
    index: number;
    stackOffset: number;
    isTopCard: boolean;
    onSwipe: (liked: boolean, userId: string) => void;
    selected: boolean;
    seriesSelected: number;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
    showFilters: boolean;
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FilterButton = { label: string, type: string, selected: boolean, param: string, }
export type ChoiceButton = Pick<FilterButton, 'type' | 'param'>

export default function SwipeCard({
    user,
    stackOffset,
    isTopCard,
    index,
    onSwipe,
    showFilters,
    setShowFilters,
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


    const CHOICE_BUTTONS: ChoiceButton[] = [
        {
            type: 'no',
            param: 'dislike'
        },
        {
            type: 'add_to_favorites',
            param: 'favorite',
        },
        {
            type: 'yes',
            param: 'like'
        },
    ]

    
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
                    {/* UserCardInfo */}
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>{user.name}, {user.age}</Text>
                        <Text style={styles.location}>{user.town}, {user.country}</Text>
                    </View>
                    {/* BottomChoiceButtons */}
                    <View style={styles.bottomButtons}>
                        {CHOICE_BUTTONS.map((choiceButton: ChoiceButton, idx: number) =>
                            <ChoiceButton
                                key={idx}
                                type={choiceButton.type}
                                onPress={() => console.log('NO', choiceButton.type)}
                            />)}
                    </View>
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
    userInfo: {
        marginLeft: 10,
        top: 400,
    },
    topButtons: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomButtons: {
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        top: 450,
        marginBottom: 0,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 6,
        color: 'white',
    },
    location: {
        fontSize: 20,
        color: 'white',
    }
});
