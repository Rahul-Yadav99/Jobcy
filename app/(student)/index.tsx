import Header from '@/components/Header';
import JobCardFlatList from '@/components/JobCardFlatList';
import SafeScreen from '@/components/SafeScreen';
import React from 'react';

const Home = () => {
    return (
        <SafeScreen>
            <Header />
            <JobCardFlatList />
        </SafeScreen>
    )
}

export default Home