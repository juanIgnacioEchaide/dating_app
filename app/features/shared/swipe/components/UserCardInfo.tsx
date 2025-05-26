import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
export default function UserCardInfo({
    name,
    town,
    age,
    country
}: {
    name: string,
    town: string,
    age: number,
    country: string,
}) {
    return <View style={styles.userInfo}>
        <Text style={styles.name}>{name}, {age}</Text>
        <Text style={styles.location}>{town}, {country}</Text>
    </View>
}

const styles = StyleSheet.create({
    userInfo: {
        marginLeft: 10,
        top: 400,
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
