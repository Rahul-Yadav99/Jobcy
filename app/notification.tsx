import studentApi from '@/api/student'
import BackButton from '@/components/BackButton'
import NotificationCard from '@/components/NotificationCard'
import SafeScreen from '@/components/SafeScreen'
import { spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FlatList, Text, View } from 'react-native'

const Notification = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['notifications'],
        queryFn: studentApi.getAllNotifications,
    })

    console.log(data)

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
            />
        </SafeScreen>
    )
}

export default Notification