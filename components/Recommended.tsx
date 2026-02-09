import { primaryTextColor, secondaryTextColor } from '@/utils/colors'
import React from 'react'
import { Text, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const Recommended = () => {
    return (
        <View
            style={{
                paddingHorizontal: moderateScale(20),
                marginBottom: moderateScale(10),
            }}
        >
            <View>
                <Text
                    className='font-bold'
                    style={{ color: primaryTextColor, fontSize: moderateScale(16) }}
                >
                    Recommended for you
                </Text>
                <Text
                    className='text-sm'
                    style={{ color: secondaryTextColor }}
                >
                    as per your preferences
                </Text>
            </View>
        </View>
    )
}

export default Recommended