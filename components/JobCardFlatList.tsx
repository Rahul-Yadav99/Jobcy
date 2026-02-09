import jobApi from '@/api/job';
import { primaryColor } from '@/utils/colors';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Empty from './Empty';
import HeaderCard from './HeaderCard';
import JobCard from './JobCard';
import Recommended from './Recommended';

const JobCardFlatList = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const res = await jobApi.getAllJobs();
            return res.jobs;
        },
    });

    if (isLoading) {
        return (
            <View className='flex-1 items-center justify-center'>
                <ActivityIndicator size={moderateScale(30)} color={primaryColor} />
            </View>
        );
    }

    if (error) {
        return (
            <Empty message='Failed to load jobs. Please try again.' />
        );
    }

    return (
        <FlatList
            data={data || []}
            renderItem={({ item }) => <JobCard job={item} />}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <>
                    <HeaderCard />
                    <Recommended />
                </>
            }
            ListEmptyComponent={
                <Empty message='No jobs found' />
            }
            contentContainerStyle={{
                flexGrow: 1,
            }}
        />
    );
};

export default JobCardFlatList;