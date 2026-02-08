import { useRole } from '@/hooks/useRole';
import { disabledColor, primaryColor } from '@/utils/colors';
import { Tabs } from 'expo-router';
import { Clipboard, LayoutDashboard } from "lucide-react-native";
import React from 'react';
import { moderateScale } from 'react-native-size-matters';

const MainLayout = () => {
    const { role } = useRole();
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: primaryColor,
            tabBarInactiveTintColor: disabledColor,
            tabBarStyle: {
                backgroundColor: '#fff',
            },
            tabBarLabelStyle: {
                fontSize: moderateScale(9),
            },
        }}>
            <Tabs.Screen
                name="index"
                // redirect={role !== 'student'}
                options={{
                    title: 'Jobs',
                    tabBarIcon: ({ color }) => (
                        <Clipboard size={moderateScale(20)} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="dashboard"
                // redirect={role !== 'recruiter'}
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

export default MainLayout