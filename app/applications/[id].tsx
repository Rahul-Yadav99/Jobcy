import recruiterApi from '@/api/recruiter';
import ApplicantCard from '@/components/ApplicantCard';
import { ApplicantCardSkeletonList } from '@/components/ApplicantCardSkeleton';
import BackButton from '@/components/BackButton';
import Empty from '@/components/Empty';
import ErrorScreen from '@/components/ErrorScreen';
import SafeScreen from '@/components/SafeScreen';
import { spacing } from '@/utils/theme';
import { typography } from '@/utils/typography';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

const Applications = () => {
    const { id: jobId } = useLocalSearchParams();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['applications', jobId],
        queryFn: () => recruiterApi.getApplications(jobId as string)
    })

    if (error) {
        return <ErrorScreen message={error.message} onRetry={refetch} />;
    }

    return (
        <SafeScreen>
            <View
                style={{
                    padding: spacing.md,
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: spacing.md,
                        gap: spacing.md,
                    }}
                >
                    <BackButton />
                    <Text
                        style={typography.h2}
                    >
                        Applications
                    </Text>
                </View>
                <FlatList
                    data={isLoading ? [] : (data || [])}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <ApplicantCard item={item} />}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>

                            {isLoading && <ApplicantCardSkeletonList />}
                        </>
                    }
                    ListEmptyComponent={
                        !isLoading ? (
                            <Empty message="No applications yet" />
                        ) : null
                    }
                />
            </View>
        </SafeScreen>
    )
}

export default Applications