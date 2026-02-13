import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

const Index = () => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();
    const { role } = useRole();

    useEffect(() => {
        if (isLoading) return;
        if (!isAuthenticated) {
            router.replace('/(auth)')
        } else if (isAuthenticated) {
            if (role === 'student') {
                router.replace('/(student)')
            } else if (role === 'recruiter') {
                router.replace('/(recruiter)')
            }
        }
    }, [isLoading, isAuthenticated, role])

    if (isLoading) {
        return (
            <View className='flex-1 items-center justify-center'>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return null
}

export default Index