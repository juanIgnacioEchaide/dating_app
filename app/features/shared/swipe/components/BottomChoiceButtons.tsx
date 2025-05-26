import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import ChoiceButton from './ChoiceButton';
export type FilterButton = { label: string, type: string, selected: boolean, param: string, }
export type ChoiceButton = Pick<FilterButton, 'type' | 'param'> & { callback: void }

export default function BottomChoiceButtons({
    likeCallback,
    dislikeCallback,
    favoritesCallback
}: {
    likeCallback: any
    dislikeCallback: any
    favoritesCallback: any
}) {
    const CHOICE_BUTTONS: ChoiceButton[] = [
        {
            type: 'no',
            param: 'dislike',
            callback: dislikeCallback
        },
        {
            type: 'add_to_favorites',
            param: 'favorite',
            callback: favoritesCallback
        },
        {
            type: 'yes',
            param: 'like',
            callback: likeCallback
        },
    ]
    return <View style={styles.bottomButtons}>
        {CHOICE_BUTTONS.map((choiceButton: ChoiceButton, idx: number) =>
            <ChoiceButton
                key={idx}
                type={choiceButton.type}
                onPress={() => console.log('NO', choiceButton.type)}
            />)}
    </View>
}

const styles = StyleSheet.create({
    bottomButtons: {
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        top: 450,
        marginBottom: 0,
    },
});