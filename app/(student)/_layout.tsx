import { disabledColor, primaryColor } from '@/utils/colors'
import { Tabs } from 'expo-router'
import { Home } from 'lucide-react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'

const StudentLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: primaryColor,
                tabBarInactiveTintColor: disabledColor,
                tabBarStyle: {
                    backgroundColor: '#fff',
                },
                tabBarLabelStyle: {
                    fontSize: moderateScale(9),
                },
            }}
        >
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Home size={moderateScale(20)} color={color} />
                    )
                }}
            />
            <Tabs.Screen name='profile' />
        </Tabs>
    )
}

export default StudentLayout