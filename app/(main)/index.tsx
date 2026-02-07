import Header from '@/components/Header';
import HeaderCard from '@/components/HeaderCard';
import SafeScreen from '@/components/SafeScreen';
import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import { View } from 'react-native';

const Jobs = () => {
    const { logout } = useAuth();
    return (
        <SafeScreen>
            <View className='flex-1'>
                <Header />
                <HeaderCard />
            </View>
        </SafeScreen>
    )
}

export default Jobs