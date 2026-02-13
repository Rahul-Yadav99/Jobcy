import { disabledColor, primaryColor } from '@/utils/colors'
import { Tabs } from 'expo-router'
import { Home, LayoutDashboard } from 'lucide-react-native'
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
                    borderTopColor: disabledColor
                },
                tabBarLabelStyle: {
                    fontSize: moderateScale(9),
                    fontWeight: '700',
                },
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Home size={moderateScale(20)} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='studentDashboard'
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => (
                        <LayoutDashboard size={moderateScale(20)} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}

export default StudentLayout