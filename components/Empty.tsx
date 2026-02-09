import { secondaryTextColor } from '@/utils/colors'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const Empty = ({ message }: { message: string }) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                source={require('@/assets/images/empty.png')}
                style={{
                    width: moderateScale(200),
                    height: moderateScale(200),
                }}
                resizeMode='contain'
            />
            <Text style={{ color: secondaryTextColor, fontSize: moderateScale(16) }}>{message}</Text>
        </View>
    )
}

export default Empty