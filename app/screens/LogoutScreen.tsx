import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LogoutScreen() {
    const navigation = useNavigation();

    const handleLogout = () => {
        // Aquí podrías limpiar el estado, cerrar sesión, etc.
        console.log('Sesión cerrada');
    };

    return (
        <View>
            <Text>Cerrando sesión...</Text>
            <Button title="Volver" onPress={() => navigation.goBack()} />
        </View>
    );
}
