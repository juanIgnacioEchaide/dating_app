import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DrawerHeader() {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                style={styles.avatar}
            />
            <Text style={styles.name}>Juan Pérez</Text>
            <Text style={styles.location}>📍 Buenos Aires, AR</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 14,
        color: '#666',
    },
});
