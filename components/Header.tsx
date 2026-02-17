import { useProfile } from '@/hooks/useProfile'
import { primaryTextColor, secondaryTextColor } from '@/utils/colors'
import { useRouter } from 'expo-router'
import { Bell } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const Header = () => {
    const router = useRouter();
    const { user } = useProfile();
    return (
        <View
            className='flex-row items-center justify-between border-b border-neutral-300'
            style={{ height: moderateScale(60), paddingHorizontal: moderateScale(20) }}
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
                className='bg-neutral-100 rounded-full p-2'
                activeOpacity={0.9}
                onPress={() => router.push('/notification')}
            >
                <Bell size={moderateScale(24)} color={primaryTextColor} />
            </TouchableOpacity>
        </View>
    )
}

export default Header