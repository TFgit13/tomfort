import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cases } from '../data/cases';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 40) / 2; // 2 columns with padding

export default function HomeScreen({ navigation }) {
    const handlePress = async (item) => {
        if (item.autoPlay) {
            // Simulate playing audio for the "bottom left" box
            console.log('Playing audio for item:', item.title);
            alert(`Playing "${item.title}" audio message... 🎵`);
        } else {
            navigation.navigate('CaseDetail', { caseData: item });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>כאן בשבילך ❤️</Text>
                <Text style={styles.headerSubtitle}>מה עובר עלייך?</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {cases.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.card, item.span === 2 && styles.cardFull]}
                        onPress={() => handlePress(item)}
                        activeOpacity={0.9}
                    >
                        <ImageBackground source={item.image} style={styles.image} imageStyle={{ borderRadius: 15 }}>
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.8)']}
                                style={styles.gradient}
                            >
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'right', // RTL
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
        textAlign: 'right', // RTL
    },
    scrollContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
        flexDirection: 'row-reverse', // RTL Grid
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH * 1.2,
        marginBottom: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardFull: {
        width: width - 40, // Full width minus padding
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    gradient: {
        padding: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: '50%',
        justifyContent: 'flex-end',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'right', // RTL
    },
    description: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 12,
        textAlign: 'right', // RTL
    },
});
