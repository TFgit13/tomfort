import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CaseDetailScreen from './src/screens/CaseDetailScreen';
import SplashScreen from './src/screens/SplashScreen';



const Stack = createStackNavigator();

export default function App() {
    // Force title to Tomfort
    React.useEffect(() => {
        if (typeof document !== 'undefined') {
            document.title = 'Tomfort';
        }
    }, []);
    // Font loading removed to prevent blocking
    // Icons will fallback or load asynchronously if handled by Expo

    const linking = {
        prefixes: ['https://TFgit13.github.io/tomfort', 'tomfort://'],
        config: {
            screens: {
                Splash: '',
                Home: 'home',
                CaseDetail: 'case/:id',
            },
        },
        enabled: true,
        documentTitle: {
            enabled: false
        }
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
