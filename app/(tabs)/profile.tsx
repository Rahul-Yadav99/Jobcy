// app/(tabs)/profile.js
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            <Button title="Logout" onPress={logout} color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});