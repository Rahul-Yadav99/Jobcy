import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeScreen = ({ children }: { children: React.ReactNode }) => {
    const insert = useSafeAreaInsets();
    return (
        <View style={{
            ...styles.container,
            paddingTop: insert.top,
        }}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default SafeScreen;