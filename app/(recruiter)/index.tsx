import SafeScreen from '@/components/SafeScreen'
import { useAuth } from '@/contexts/AuthContext'
import React from 'react'
import { Button, Text, View } from 'react-native'

const RecruiterHome = () => {
    const { logout } = useAuth()
    return (
        <SafeScreen>
            <View>
                <Text>RecruiterHome</Text>
                <Button title='Logout' onPress={logout} />
            </View>
        </SafeScreen>
    )
}

export default RecruiterHome