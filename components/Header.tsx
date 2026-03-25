import { useProfile } from '@/hooks/useProfile'
import { primaryTextColor } from '@/utils/theme'
import { typography } from '@/utils/typography'
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
            className='flex-row items-center justify-between border-b border-neutral-200'
            style={{ height: moderateScale(60), paddingHorizontal: moderateScale(20) }}
        >
            <View>
                <Text
                    style={typography.h2}
                >
                    Hi {user?.fullname || 'User'}!
                </Text>
                <Text
                    style={typography.body}
                >
                    Let&apos;s help you land your dream job
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