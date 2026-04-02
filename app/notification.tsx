import studentApi from '@/api/student'
import BackButton from '@/components/BackButton'
import Empty from '@/components/Empty'
import NotificationCard from '@/components/NotificationCard'
import { NotificationCardSkeletonList } from '@/components/NotificationCardSkeleton'
import SafeScreen from '@/components/SafeScreen'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'

const Notification = () => {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['notifications'],
        queryFn: studentApi.getAllNotifications,
    })

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
                    Notification
                </Text>
            </View>
            <FlatList
                data={data || []}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <NotificationCard item={item} />}
                ListEmptyComponent={
                    isLoading ? <NotificationCardSkeletonList count={5} /> : <Empty message="You don't have any notifications yet" />
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
        </SafeScreen>
    )
}

export default Notification