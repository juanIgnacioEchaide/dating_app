import React from 'react';
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
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

type Props = {
    user: Matchable;
    index: number;
    stackOffset: number;
    isTopCard: boolean;
    onSwipe: (liked: boolean, userId: string) => void;
};

export default function SwipeCard({ user, stackOffset, isTopCard, index, onSwipe }: Props) {
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
                <View style={styles.topButtons}>
                    <FilterButton label="Amistad" selected={false} onPress={() => console.log('Pressed')} />
                    <FilterButton label="Citas" selected={false} onPress={() => console.log('Pressed')} />
                    <FilterButton label="Relación" selected={true} onPress={() => console.log('Pressed')} />
                </View>
                <View style={styles.userInfo}>
                <Text style={styles.name}>{user.name}, {user.age}</Text>
                <Text style={styles.location}>{user.town}, {user.country}</Text>
                </View>
                <View style={styles.bottomButtons}>
                    <ChoiceButton type="no" onPress={() => console.log('NO')} />
                    <ChoiceButton type="add_to_favorites" onPress={() => console.log('FAV')} />
                    <ChoiceButton type="yes" onPress={() => console.log('YES')} />
                </View>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_HEIGHT * 0.75,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
    },
    userInfo:{
        marginLeft: 10,
        bottom: -200,
    },
    topButtons: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: -250,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 6,
    },
    location: {
        fontSize: 20,
    }
});
