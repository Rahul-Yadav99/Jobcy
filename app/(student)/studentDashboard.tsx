import SafeScreen from '@/components/SafeScreen'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

const StudentHome = () => {
    const { logout } = useAuth();
    const router = useRouter();
    return (
        <SafeScreen>
            <View className='flex-1 bg-yellow-200'
            style={{
                backgroundColor: 'red'
            }}
            >
                <Text>StudentHome</Text>
                <Button title='Logout' onPress={() => logout()} />
                <Button title='Data' onPress={() => router.push('/(student)/profile')} />
            </View>
        </SafeScreen>
    )
}

export default StudentHome