import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ChoiceType = 'yes' | 'no' | 'add_to_favorites';

interface ChoiceButtonProps {
    type: string;
    onPress?: () => void;
}

const iconMap: Record<string, { name: string; backgroundColor: string; iconColor: string }> = {
    yes: {
        name: 'checkmark',
        backgroundColor: '#FFB6D9',
        iconColor: '#fff',
    },
    no: {
        name: 'close',
        backgroundColor: '#C9B7B7',
        iconColor: '#fff',
    },
    add_to_favorites: {
        name: 'heart',
        backgroundColor: '#fff',
        iconColor: '#FF6B81',
    },
};

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ type, onPress }) => {
    const { name, backgroundColor, iconColor } = iconMap[type];

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <View style={[styles.circle, { backgroundColor }]}>
                <Ionicons name={name as any} size={36} color={iconColor} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create<{
    circle: ViewStyle;
}>({
    circle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChoiceButton;
