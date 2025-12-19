import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AudioPlayer from '../components/AudioPlayer';
import { Audio } from 'expo-av';

export default function CaseDetailScreen({ route, navigation }) {
    const { caseData } = route.params;
    const [sound, setSound] = React.useState();
    const [playingId, setPlayingId] = React.useState(null);

    async function handlePlay(subCase) {
        // If clicking the currently playing item, toggle pause/stop
        if (playingId === subCase.id) {
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
                setSound(null);
                setPlayingId(null);
            }
            return;
        }

        // Stop and unload any existing sound
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
        }

        // Play new sound
        if (subCase.audioSource) {
            try {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    subCase.audioSource,
                    { shouldPlay: true }
                );
                setSound(newSound);
                setPlayingId(subCase.id);

                // Reset state when playback finishes
                newSound.setOnPlaybackStatusUpdate(async (status) => {
                    if (status.didJustFinish) {
                        setPlayingId(null);
                        await newSound.unloadAsync();
                        setSound(null);
                    }
                });
            } catch (error) {
                console.log("Error playing sound:", error);
                alert("Error playing audio");
            }
        } else {
            // Simulation for items without audio
            setPlayingId(subCase.id);
            setTimeout(() => setPlayingId(null), 3000);
        }
    }

    React.useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    // Auto-play effect
    React.useEffect(() => {
        if (caseData.autoPlay && caseData.audioSource) {
            handlePlay({ id: 'main', audioSource: caseData.audioSource });
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={caseData.image} style={styles.headerImage} />
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerOverlay}>
                    <Text style={styles.headerTitle}>{caseData.title}</Text>
                    <Text style={styles.headerDescription}>{caseData.description}</Text>
                </View>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                {/* Main Audio Player for Auto-Play cases */}
                {caseData.audioSource && (
                    <View style={[styles.card, { marginBottom: 20 }]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="play-circle" size={24} color="#FF6B6B" />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.cardTitle}>הודעה קולית</Text>
                                <Text style={styles.cardDescription}>לחץ לניגון/עצירה</Text>
                            </View>
                        </View>
                        <AudioPlayer
                            isPlaying={playingId === 'main'}
                            onPlay={() => handlePlay({ id: 'main', audioSource: caseData.audioSource })}
                        />
                    </View>
                )}

                {caseData.subCases.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>סיטואציות ספציפיות</Text>
                        {caseData.subCases.map((subCase) => (
                            <View key={subCase.id} style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.iconContainer}>
                                        <Ionicons name={subCase.icon} size={24} color="#FF6B6B" />
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.cardTitle}>{subCase.title}</Text>
                                        <Text style={styles.cardDescription}>{subCase.description}</Text>
                                    </View>
                                </View>
                                <AudioPlayer
                                    isPlaying={playingId === subCase.id}
                                    onPlay={() => handlePlay(subCase)}
                                />
                            </View>
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        height: 250,
        width: '100%',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    headerOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'right', // RTL
    },
    headerDescription: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 5,
        textAlign: 'right', // RTL
    },
    content: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        backgroundColor: '#F8F9FA',
    },
    scrollContent: {
        padding: 20,
        paddingTop: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'right', // RTL
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row-reverse', // RTL
        alignItems: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15, // RTL swap
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'right', // RTL
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
        textAlign: 'right', // RTL
    },
});
