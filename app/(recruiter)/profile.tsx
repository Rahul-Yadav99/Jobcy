import Header from '@/components/Header'
import SafeScreen from '@/components/SafeScreen'
import { useAuth } from '@/contexts/AuthContext'
import React from 'react'
import { Button, Text, View } from 'react-native'

const Profile = () => {
    const { logout } = useAuth()
    return (
        <SafeScreen>
            <View>
                <Header />
                <Text>Profile</Text>
                <Button title='Logout' onPress={logout} />
            </View>
        </SafeScreen>
    )
}

export default Profile