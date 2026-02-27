import BackButton from '@/components/BackButton'
import SafeScreen from '@/components/SafeScreen'
import { primaryTextColor } from '@/utils/colors'
import React from 'react'
import { Text, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const Notification = () => {
    return (
        <SafeScreen>
            <View
                className='flex-row items-center justify-between'
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
        </SafeScreen>
    )
}

export default Notification