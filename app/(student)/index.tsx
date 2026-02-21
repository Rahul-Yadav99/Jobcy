import jobApi from '@/api/job';
import Empty from '@/components/Empty';
import Header from '@/components/Header';
import HeaderCard from '@/components/HeaderCard';
import JobCard from '@/components/JobCard';
import Recommended from '@/components/Recommended';
import SafeScreen from '@/components/SafeScreen';
import { primaryColor } from '@/utils/colors';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const Home = () => {

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const res = await jobApi.getAllJobs();
            return res.jobs;
        }
    });

    if (isLoading) {
        return (
            <SafeScreen>
                <Header />
                <HeaderCard />
                <View className='flex-1 items-center justify-center'>
                    <ActivityIndicator size={moderateScale(30)} color={primaryColor} />
                </View>
            </SafeScreen>
        );
    }

    if (error) {
        return (
            <SafeScreen>
                <Header />
                <HeaderCard />
                <View className='flex-1 items-center justify-center'>
                    <Text className='text-black'
                        style={{
                            fontSize: moderateScale(12),
                            fontWeight: 'semibold',
                            marginBottom: moderateScale(10),
                        }}
                    >Failed to load jobs. Please try again.</Text>
                    <TouchableOpacity
                        onPress={() => refetch()}
                        style={{
                            backgroundColor: primaryColor,
                            padding: moderateScale(10),
                            borderRadius: moderateScale(10),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text className='text-white'>Retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeScreen>
        );
    }

    return (
        <SafeScreen>
            <Header />
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
                    <Empty
                        isDetailsScreen={false}
                        message='No jobs found'
                    />
                }
            />
        </SafeScreen>
    );
};

export default Home;