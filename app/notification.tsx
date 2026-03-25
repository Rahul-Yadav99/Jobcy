import studentApi from '@/api/student'
import BackButton from '@/components/BackButton'
import NotificationCard from '@/components/NotificationCard'
import SafeScreen from '@/components/SafeScreen'
import { primaryTextColor } from '@/utils/theme'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

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
                    marginTop: moderateScale(16),
                    paddingHorizontal: moderateScale(16),
                    gap: moderateScale(16)
                }}
            >
                <BackButton />
                <Text
                    style={{
                        fontSize: moderateScale(18),
                        fontWeight: 'bold',
                        color: primaryTextColor,
                    }}
                >
                    Notification
                </Text>
            </View>
            <FlatList
                data={data || []}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <NotificationCard />}
            />
        </SafeScreen>
    )
}

export default Notification