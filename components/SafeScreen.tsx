import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SafeScreen = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaView
            style={styles.container}
            edges={['top']}
        >
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default SafeScreen;