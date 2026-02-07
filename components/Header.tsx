import { primaryTextColor, secondaryTextColor } from '@/utils/colors'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const Header = () => {
    return (
        <View
            className='flex-row items-center justify-between'
            style={{ height: moderateScale(50), paddingHorizontal: moderateScale(20) }}
        >
            <View>
                <Text
                    className='text-2xl font-bold'
                    style={{ color: primaryTextColor }}
                >
                    Hi Rahul!
                </Text>
                <Text
                    className='text-sm'
                    style={{ color: secondaryTextColor }}
                >
                    Let's help you land your dream job
                </Text>
            </View>

            <TouchableOpacity
                activeOpacity={0.9}
            >
                <Image
                    source={require('@/assets/images/profile.png')}
                    style={{ width: moderateScale(40), height: moderateScale(40), borderRadius: moderateScale(20) }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Header