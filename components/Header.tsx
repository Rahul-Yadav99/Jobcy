import { useProfile } from '@/hooks/useProfile'
import { primaryTextColor, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useRouter } from 'expo-router'
import { Bell, MessageCircle } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const Header = () => {
    const router = useRouter();
    const { user } = useProfile();
    return (
        <View
            className='flex-row items-center justify-between'
            style={{ height: moderateScale(60), paddingHorizontal: spacing.md }}
        >
            <View>
                <Text
                    style={typography.h2}
                >
                    Hi {user?.fullname || 'User'} !
                </Text>
                <Text
                    style={typography.body}
                >
                    {
                        user?.role === 'student'
                            ? `Let’s help you land your dream job.`
                            : `Let’s help you build your dream team.`
                    }
                </Text>
            </View>
            {
                user?.role === 'recruiter' ? (
                    <TouchableOpacity
                        className='bg-neutral-100 rounded-full p-2'
                        activeOpacity={0.9}
                        onPress={() => router.push('/messages')}
                    >
                        <MessageCircle size={moderateScale(24)} color={primaryTextColor} />
                    </TouchableOpacity>
                ) :
                    <TouchableOpacity
                        className='bg-neutral-100 rounded-full p-2'
                        activeOpacity={0.9}
                        onPress={() => router.push('/notification')}
                    >
                        <Bell size={moderateScale(24)} color={primaryTextColor} />
                    </TouchableOpacity>
            }

        </View>
    )
}

export default Header