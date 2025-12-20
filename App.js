import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CaseDetailScreen from './src/screens/CaseDetailScreen';
import SplashScreen from './src/screens/SplashScreen';

import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        ...Ionicons.font,
    });

    if (!fontsLoaded) {
        return null;
    }
    const linking = {
        prefixes: ['https://TFgit13.github.io/tomfort', 'tomfort://'],
        config: {
            screens: {
                Splash: 'splash',
                Home: 'home',
                CaseDetail: 'case/:id',
            },
        },
    };

    return (
        <NavigationContainer linking={linking} fallback={<React.Fragment />}>
            <StatusBar style="dark" />
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#F8F9FA' }
                }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="CaseDetail" component={CaseDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
