import { useAuth } from '@/contexts/AuthContext'
import { useProfile } from '@/hooks/useProfile'
import { primaryTextColor, secondaryTextColor } from '@/utils/colors'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const Header = () => {
    const { user } = useProfile();
    const { logout } = useAuth();
    return (
        <View
            className='flex-row items-center justify-between border-b border-neutral-300'
            style={{ height: moderateScale(70), paddingHorizontal: moderateScale(20) }}
        >
            <View>
                <Text
                    className='font-bold capitalize'
                    style={{ color: primaryTextColor, fontSize: moderateScale(20) }}
                >
                    Hi {user?.fullname || 'User'}!
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
                onPress={() => logout()}
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