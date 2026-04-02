import jobApi from '@/api/job'
import Empty from '@/components/Empty'
import ErrorScreen from '@/components/ErrorScreen'
import Header from '@/components/Header'
import JobCard from '@/components/JobCard'
import { JobCardSkeletonList } from '@/components/Jobcardskeleton'
import SafeScreen from '@/components/SafeScreen'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'

const AppliedJobs = () => {

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['applied-jobs'],
        queryFn: jobApi.getAppliedJobs
    })

    if (error) {
        return <ErrorScreen message={error.message} onRetry={refetch} />
    }

    return (
        <SafeScreen>
            <Header />
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: spacing.md,
                }}
            >
                <FlatList
                    data={data?.application || []}
                    renderItem={({ item }) => (
                        <JobCard job={item} isAppliedJob={true} />
                    )}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            <Text style={typography.h3}>
                                Applied Jobs ({data?.application?.length ?? 0})
                            </Text>
                            {isLoading && <JobCardSkeletonList count={6} />}
                        </>
                    }
                    ListHeaderComponentStyle={{
                        marginVertical: spacing.md,
                    }}
                    ListEmptyComponent={
                        !isLoading ? (
                            <Empty message="No applied jobs yet" />
                        ) : null
                    }
                    refreshControl={
                        !isLoading ? (
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={() => refetch()}
                                tintColor={colors.primaryColor}
                            />
                        ) : undefined
                    }
                />
            </View>
        </SafeScreen>
    )
}

export default AppliedJobs