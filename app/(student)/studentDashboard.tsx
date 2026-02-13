import SafeScreen from '@/components/SafeScreen'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

const StudentHome = () => {
    const { logout } = useAuth();
    const router = useRouter();
    return (

        <View className='flex-1 bg-yellow-600'
        >
            <SafeScreen>
                <Text>StudentHome</Text>
                <Button title='Logout' onPress={() => logout()} />
                <Button title='Data' onPress={() => router.push('/profile')} />
            </SafeScreen>
        </View>
    )
}

export default StudentHome