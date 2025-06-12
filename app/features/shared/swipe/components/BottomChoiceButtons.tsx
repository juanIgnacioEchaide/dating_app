import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChoiceButton from './ChoiceButton';
export type FilterButton = { label: string, type: string, selected: boolean, param: string, }
export type ChoiceButton = Pick<FilterButton, 'type' | 'param'> & { callback: (id: string) => void }

export default function BottomChoiceButtons({
    likeCallback,
    dislikeCallback,
    favoritesCallback,
    otherUserId
}: {
    likeCallback: any
    dislikeCallback: any
    favoritesCallback: any
    otherUserId: string
}) {
    const CHOICE_BUTTONS: ChoiceButton[] = [
        {
            type: 'no',
            param: 'dislike',
            callback: (id: string) => dislikeCallback(id)
        },
        {
            type: 'add_to_favorites',
            param: 'favorite',
            callback: (id: string) => favoritesCallback(id)
        },
        {
            type: 'yes',
            param: 'like',
            callback: (id: string) => likeCallback(id)
        },
    ]
    return (<View style={styles.bottomButtons}>
        {CHOICE_BUTTONS.map((choiceButton: ChoiceButton, idx: number) =>
            <ChoiceButton
                key={idx}
                type={choiceButton.type}
                onPress={() => choiceButton.callback(otherUserId)}
            />)}
    </View>)
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