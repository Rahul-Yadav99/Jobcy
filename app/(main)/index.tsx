import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
const Main = () => {
    const router = useRouter()
    const { logout } = useAuth()
    const handleLogout = async () => {
        try {
            await logout()
            router.replace('/(auth)')
        } catch (error) {
            Alert.alert('Error', 'Failed to logout')
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Main</Text>
            <TouchableOpacity
                onPress={handleLogout}
                style={{
                    backgroundColor: '#ff4444',
                    padding: 15,
                    borderRadius: 8,
                }}
            >
                <Text style={{ color: 'white', fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Main