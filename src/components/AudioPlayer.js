import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export default function AudioPlayer({ isPlaying, onPlay }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPlay} style={styles.button}>
                <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.text}>{isPlaying ? "מנגן הודעה..." : "נגן הודעה ממני"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#rgba(0,0,0,0.05)',
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF6B6B',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    text: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
});
