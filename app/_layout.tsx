import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import SwipeScreen from './screens/SwipeScreen'; // ⬅️ Paso 1
import LeCafe from './screens/LecafeScreen';
import Matches from './screens/MatchesScreen';
import Messages from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import TutorialScreen from './screens/TutorialScreen';
import SettingsScreen from './screens/SettingsScreen';

import { Provider } from 'react-redux';
import { store } from './store';

const Drawer = createDrawerNavigator();

export default function Layout() {
    return (
        <Provider store={store}>
            <Drawer.Navigator
                initialRouteName="Lecafé" // ⬅️ Paso 2
                screenOptions={{
                    headerTitle: 'App Cool',
                    drawerType: 'front',
                    drawerActiveTintColor: '#e91e63',
                    drawerLabelStyle: { fontSize: 16 },
                }}
            >
                <Drawer.Screen
                    name="Lecafé"
                    component={LeCafe}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="cafe" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Mensajes"
                    component={Messages}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="chatbubbles" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Matches"
                    component={Matches}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="heart" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Mi Perfil"
                    component={ProfileScreen}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Tutorial"
                    component={TutorialScreen}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="book" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Ajustes"
                    component={SettingsScreen}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="settings" size={size} color={color} />
                        ),
                    }}
                />
            </Drawer.Navigator>
        </Provider>
    );
}
