import recruiterApi from '@/api/recruiter'
import BackButton from '@/components/BackButton'
import Empty from '@/components/Empty'
import ErrorScreen from '@/components/ErrorScreen'
import MessageCard from '@/components/MessageCard'
import { NotificationCardSkeletonList } from '@/components/NotificationCardSkeleton'
import SafeScreen from '@/components/SafeScreen'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'

const Messages = () => {

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['messages'],
        queryFn: recruiterApi.getMessage,
    })

    if (error) {
        return <ErrorScreen message={error.message} isDetailsScreen onRetry={refetch} />
    }

    return (
        <SafeScreen>
            <View
                className='flex-row items-center'
                style={{
                    marginTop: spacing.md,
                    marginBottom: spacing.md,
                    paddingHorizontal: spacing.md,
                    gap: spacing.md,
                }}
            >
                <BackButton />
                <Text
                    style={typography.h2}
                >
                    Messages
                </Text>
            </View>
            <FlatList
                data={data || []}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <MessageCard item={item} />}
                ListEmptyComponent={
                    isLoading ? <NotificationCardSkeletonList count={5} /> : <Empty message="You don't have any messages yet" />
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={() => refetch()}
                        tintColor={colors.primaryColor}
                    />
                }
            />
        </SafeScreen>
    )
}

export default Messages