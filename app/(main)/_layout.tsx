import { useRole } from '@/hooks/useRole';
import { Tabs } from 'expo-router';
import React from 'react';

const MainLayout = () => {
    const { role } = useRole();
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                redirect={role !== 'student'}
                options={{
                    title: 'Jobs'
                }}
            />
            <Tabs.Screen
                name="dashboard"
                redirect={role !== 'student'}
                options={{
                    title: 'Dashboard'
                }}
            />

        </Tabs>
    )
}

export default MainLayout