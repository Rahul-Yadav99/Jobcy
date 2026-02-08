import SafeScreen from '@/components/SafeScreen'
import React from 'react'
import { Text, View } from 'react-native'

const Dashboard = () => {
    return (
        <SafeScreen>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'green',
                }}
            >
                <Text>Dashboard</Text>
            </View>
        </SafeScreen>
    )
}

export default Dashboard