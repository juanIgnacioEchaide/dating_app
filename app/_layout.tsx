import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import LeCafe from './screens/LecafeScreen';
import Matches from './screens/MatchesScreen';
import Messages from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import TutorialScreen from './screens/TutorialScreen';
import SettingsScreen from './screens/SettingsScreen';

import { Provider } from 'react-redux';
import { store } from './store';
import CustomDrawerContent from './features/shared/drawer/components/CustomDrawerContent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

export default function Layout() {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer.Navigator
                    initialRouteName="Lecafé"
                    screenOptions={{
                        headerTitle: '',
                        drawerType: 'front',
                        drawerActiveTintColor: '#e91e63',
                        drawerLabelStyle: { fontSize: 16 },
                        drawerStyle: { width: '100%' }
                    }}
                    drawerContent={props => <CustomDrawerContent {...props} />}
                >
                    <Drawer.Screen
                        name="Lecafé"
                        component={LeCafe}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="cafe" size={size} color={"white"} />
                            ),
                            drawerActiveTintColor: 'white',
                        }}
                    />
                    <Drawer.Screen
                        name="Mensajes"
                        component={Messages}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="chatbubbles" size={size} color={"white"} />
                            ), drawerActiveTintColor: 'white',
                        }}
                    />
                    <Drawer.Screen
                        name="Matches"
                        component={Matches}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="heart" size={size} color={"white"} />
                            ), drawerActiveTintColor: 'white',
                        }}
                    />
                    <Drawer.Screen
                        name="Mi Perfil"
                        component={ProfileScreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="person" size={size} color={"white"} />
                            ), drawerActiveTintColor: 'white',
                        }}
                    />
                    <Drawer.Screen
                        name="Tutorial"
                        component={TutorialScreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="book" size={size} color={"white"} />
                            ), drawerActiveTintColor: 'white',
                        }}
                    />
                    <Drawer.Screen
                        name="Ajustes"
                        component={SettingsScreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="settings" size={size} color={"white"} />
                            ), drawerActiveTintColor: 'white',
                        }}
                    />
                </Drawer.Navigator>
            </GestureHandlerRootView>
        </Provider>
    );
}
