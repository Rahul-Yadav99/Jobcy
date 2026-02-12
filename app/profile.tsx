import SafeScreen from '@/components/SafeScreen';
import { profileService } from '@/services/profileService';
import { disabledColor } from '@/utils/colors';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const loadUser = async () => {
        const user = await profileService.getUser();
        setUser(user);
    }
    useEffect(() => {
        loadUser();
    }, [])
    return (
        <SafeScreen>
            <View style={{
                padding: moderateScale(16)
            }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        height: moderateScale(40),
                        width: moderateScale(40),
                        borderRadius: moderateScale(10),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: disabledColor
                    }}
                    onPress={() => router.back()}>
                    <ChevronLeft size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <Image source={require('@/assets/images/profile.png')} style={{
                    height: moderateScale(100),
                    width: moderateScale(100),
                    borderRadius: moderateScale(50),
                }} />
                <Text
                    className='capitalize'
                    style={{
                        fontSize: moderateScale(20),
                        fontWeight: 'bold',
                    }}>{user?.fullname}</Text>
            </View>
        </SafeScreen>
    )
}

export default Profile