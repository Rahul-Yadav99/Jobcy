import Header from '@/components/Header';
import HeaderCard from '@/components/HeaderCard';
import JobCardFlatList from '@/components/JobCardFlatList';
import Recommended from '@/components/Recommended';
import SafeScreen from '@/components/SafeScreen';
import React from 'react';
import { ScrollView } from 'react-native';

const Jobs = () => {
    return (
        <SafeScreen>
            <Header />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <HeaderCard />
                <Recommended />
                <JobCardFlatList />
            </ScrollView>
        </SafeScreen>
    )
}

export default Jobs