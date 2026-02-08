import Header from '@/components/Header';
import HeaderCard from '@/components/HeaderCard';
import JobsSection from '@/components/JobsSection';
import SafeScreen from '@/components/SafeScreen';
import React from 'react';
import { ScrollView, View } from 'react-native';

const Jobs = () => {
    return (
        <SafeScreen>
            <View className='flex-1'>
                <Header />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <HeaderCard />
                    <JobsSection />
                </ScrollView>
            </View>
        </SafeScreen>
    )
}

export default Jobs