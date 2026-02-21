import { primaryTextColor } from '@/utils/colors'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import BackButton from './BackButton'
import SafeScreen from './SafeScreen'

const Empty = ({ message, isDetailsScreen }: { message: string, isDetailsScreen?: boolean }) => {
    return (
        <SafeScreen>
            {
                isDetailsScreen && (
                    <View
                        style={{
                            padding: moderateScale(16),
                        }}
                    >
                        <BackButton />
                    </View>
                )
            }
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white'
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
                <Text style={{ color: primaryTextColor, fontSize: moderateScale(14), textAlign: 'center' }}>{message}</Text>
            </View>
        </SafeScreen>

    )
}

export default Empty