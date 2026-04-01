import recruiterApi from '@/api/recruiter'
import ApplicantCard from '@/components/ApplicantCard'
import { ApplicantCardSkeletonList } from '@/components/ApplicantCardSkeleton'
import BackButton from '@/components/BackButton'
import Empty from '@/components/Empty'
import ErrorScreen from '@/components/ErrorScreen'
import SafeScreen from '@/components/SafeScreen'
import { colors, headingSize, spacing } from '@/utils/theme'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FlatList, Text, View } from 'react-native'

const Applicants = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['applicants'],
        queryFn: recruiterApi.getAllApplicants
    })

    if (error) {
        return <ErrorScreen message={error.message} isDetailsScreen onRetry={() => refetch()} />
    }

    return (
        <SafeScreen>
            <View
                style={{
                    padding: spacing.md,
                    flex: 1,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: spacing.md,
                    gap: spacing.md,
                }}>
                    <BackButton />
                    <Text
                        className='capitalize'
                        style={{
                            flex: 1,
                            fontSize: headingSize.h2,
                            fontWeight: 'bold',
                            color: colors.primaryTextColor,
                        }}
                    >
                        Applicants
                    </Text>
                </View>
                <FlatList
                    data={data || []}
                    renderItem={(item) => <ApplicantCard item={item} isApplicant={true} />}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            {isLoading && <ApplicantCardSkeletonList count={5} />}
                        </>
                    }
                    ListEmptyComponent={
                        !isLoading ? (
                            <Empty message="No applicants yet" />
                        ) : null
                    }
                />
            </View>
        </SafeScreen>
    )
}

export default Applicants