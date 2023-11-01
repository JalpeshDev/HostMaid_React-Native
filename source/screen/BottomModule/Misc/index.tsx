import { Text, View, SafeAreaView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GlobalStyle } from '../../../utils/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Misc = () => {
    const [time, setTime] = useState(0);

    // Load the timer value from AsyncStorage when the component mounts.
    useEffect(() => {
        loadTimer();
    }, []);

    // Update the timer every second.
    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Save the timer value to AsyncStorage when it changes.
    useEffect(() => {
        saveTimer();
    }, [time]);

    const loadTimer = async () => {
        try {
            const storedTime = await AsyncStorage.getItem('timer');
            if (storedTime) {
                setTime(parseInt(storedTime, 10));
            }
        } catch (error) {
            console.error('Error loading timer:', error);
        }
    };

    const saveTimer = async () => {
        try {
            await AsyncStorage.setItem('timer', time.toString());
        } catch (error) {
            console.error('Error saving timer:', error);
        }
    };

    const formatTime = (totalSeconds: any) => {
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const resetTimer = () => {
        setTime(0);
    };
    return (
        <SafeAreaView style={GlobalStyle.mainContainer}>
            <Text>{formatTime(time)}</Text>
            <Button title="Reset Timer" onPress={resetTimer} />
        </SafeAreaView>
    );
};

export default Misc;

