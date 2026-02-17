import { disabledColor, primaryColor } from '@/utils/colors'
import { Tabs } from 'expo-router'
import { Home, LayoutDashboard, Newspaper } from 'lucide-react-native'
import React from 'react'
import { Image } from 'react-native'
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
            <Tabs.Screen
                name='appliedJobs'
                options={{
                    title: 'Applied Jobs',
                    tabBarIcon: ({ color }) => (
                        <Newspaper size={moderateScale(20)} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('@/assets/images/profile.png')}
                            style={{
                                height: moderateScale(26),
                                width: moderateScale(26),
                                borderRadius: moderateScale(13), 
                                opacity: focused ? 1 : 0.6,
                                borderWidth: focused ? 2 : 0,   
                                borderColor: primaryColor,
                            }}
                            resizeMode="cover"
                        />
                    ),
                }}
            />
        </Tabs>
    )
}

export default StudentLayout