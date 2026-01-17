import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const StudentRootLayout = () => {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ size, color }) => <Ionicons name='analytics-outline' size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name='settings'
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ size, color }) => <Ionicons name='settings' size={size} color={color} />
                }}
            />
        </Tabs>
    )
}

export default StudentRootLayout