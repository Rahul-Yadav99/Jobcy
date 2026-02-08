import jobApi from '@/api/job';
import { primaryColor, secondaryTextColor } from '@/utils/colors';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import JobCard from './JobCard';

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
            <View className='flex-1 items-center justify-center px-5'>
                <Text style={{ color: secondaryTextColor }}>
                    Failed to load jobs. Please try again.
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            data={data || []}
            renderItem={({ item }) => <JobCard job={item} />}
            keyExtractor={(item) => item._id} // Use unique ID instead of index
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{
                paddingHorizontal: moderateScale(20),
                paddingBottom: moderateScale(20),
                // flex: 1
            }}
            scrollEnabled={true}
            nestedScrollEnabled
        />
    );
};

export default JobCardFlatList;