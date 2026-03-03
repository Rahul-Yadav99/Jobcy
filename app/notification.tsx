import BackButton from '@/components/BackButton'
import SafeScreen from '@/components/SafeScreen'
import { primaryTextColor } from '@/utils/theme'
import React from 'react'
import { Text, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const Notification = () => {
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
        </SafeScreen>
    )
}

export default Notification