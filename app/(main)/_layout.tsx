import { Tabs } from 'expo-router'
import React from 'react'

const MainLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" />
            <Tabs.Screen name="dashboard" />
        </Tabs>
    )
}

export default MainLayout