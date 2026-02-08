import Header from '@/components/Header';
import HeaderCard from '@/components/HeaderCard';
import JobCardFlatList from '@/components/JobCardFlatList';
import Recommended from '@/components/Recommended';
import SafeScreen from '@/components/SafeScreen';
import React from 'react';

const Jobs = () => {
    return (
        <SafeScreen>
            <Header />
            <HeaderCard />
            <Recommended />
            <JobCardFlatList />
        </SafeScreen>
    )
}

export default Jobs