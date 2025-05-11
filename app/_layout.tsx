import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; // o react-native-vector-icons

// Importa solo pantallas del directorio screens
import LeCafe from './screens/LecafeScreen';
import Matches from './screens/MatchesScreen';
import Messages from './screens/MessagesScreen';
import { Provider } from 'react-redux';
import { store } from './store';

const Drawer = createDrawerNavigator();

export default function Layout() {
  return (
    <Provider store={store}>
     <Drawer.Navigator
      screenOptions={{
        headerTitle: 'App Cool',
        drawerType: 'front',
        drawerActiveTintColor: '#e91e63',
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="LeCafe"
        component={LeCafe}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cafe" size={size} color={color} />
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
        name="Messages"
        component={Messages}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
    </Provider>
  );
}
