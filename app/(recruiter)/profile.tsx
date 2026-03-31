import BackButton from '@/components/BackButton';
import SafeScreen from '@/components/SafeScreen';
import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/services/profileService';
import { colors, primaryTextColor, secondaryTextColor } from '@/utils/theme';
import { typography } from '@/utils/typography';
import { useRouter } from 'expo-router';
import { ArrowRight, LogOut, Mail, Phone, Users } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const Profile = () => {
    const { logout } = useAuth();
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
            <View style={{ padding: moderateScale(16) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <BackButton />
                </View>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: moderateScale(64) }}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <View style={{ alignItems: 'center', gap: moderateScale(3), marginTop: moderateScale(16) }}>
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
                                color: primaryTextColor,
                            }}>
                            {user?.fullname || "No name available"}
                        </Text>
                        <Text
                            className='capitalize'
                            style={{
                                color: secondaryTextColor
                            }}
                        >{user?.role || "No role available"}
                        </Text>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: moderateScale(16),
                            fontWeight: 'bold',
                            color: primaryTextColor,
                            marginTop: moderateScale(16)
                        }}>
                            Contact Information
                        </Text>
                        <View className='border border-neutral-200 rounded-lg' style={{ marginTop: moderateScale(8), padding: moderateScale(8), gap: moderateScale(8) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(8) }}>
                                <Mail size={20} color={primaryTextColor} />
                                <Text style={typography.h5}>{user?.email || "No email available"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(8) }}>
                                <Phone size={20} color={primaryTextColor} />
                                <Text style={typography.h5}>{user?.phoneNumber || "No phone number available"}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => router.push('/applicants')}
                        style={{
                            padding: moderateScale(12),
                            borderRadius: moderateScale(8),
                            marginTop: moderateScale(16),
                            borderWidth: 1,
                            borderColor: colors.disabledColor,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(8) }}>
                            <Users size={20} color={colors.primaryTextColor} />
                            <Text style={typography.h5}>Applicants</Text>
                        </View>
                        <ArrowRight size={20} color={colors.primaryTextColor} />
                    </TouchableOpacity>
                    <Button
                        title="Logout"
                        onPress={logout}
                        variant="danger"
                        size="medium"
                        fullWidth
                        style={{ marginTop: moderateScale(16) }}
                        icon={<LogOut size={moderateScale(16)} color="white" />}
                    />
                </ScrollView>
            </View>
        </SafeScreen>
    )
}

export default Profile