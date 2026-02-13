import BackButton from '@/components/BackButton';
import EditButton from '@/components/EditButton';
import SafeScreen from '@/components/SafeScreen';
import { profileService } from '@/services/profileService';
import { primaryTextColor, secondaryTextColor } from '@/utils/colors';
import * as WebBrowser from 'expo-web-browser';
import { Briefcase, GraduationCap, Mail, Phone } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const Profile = () => {
    const [user, setUser] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const loadUser = async () => {
        const user = await profileService.getUser();
        setUser(user);
    }

    const openResume = async () => {
        if (!user?.profile?.resume) {
            Alert.alert("No Resume", "Resume not available.");
            return;
        }
        try {
            await WebBrowser.openBrowserAsync(user.profile.resume);
        } catch (error) {
            Alert.alert("Error", "Unable to open resume.");
        }
    };

    useEffect(() => {
        loadUser();
    }, [])
    return (
        <SafeScreen>
            <View style={{ padding: moderateScale(16) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <BackButton />
                    <EditButton onPress={() => setModalVisible(true)} />
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
                        <Text style={{ color: secondaryTextColor }}>{user?.profile?.bio || "No bio available"}</Text>
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
                                <Text style={{ color: secondaryTextColor }}>{user?.email || "No email available"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(8) }}>
                                <Phone size={20} color={primaryTextColor} />
                                <Text style={{ color: secondaryTextColor }}>{user?.phoneNumber || "No phone number available"}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: moderateScale(16),
                            fontWeight: 'bold',
                            color: primaryTextColor,
                            marginTop: moderateScale(16)
                        }}>
                            Education & Work Experience
                        </Text>
                        <View className='border border-neutral-200 rounded-lg' style={{ marginTop: moderateScale(8), padding: moderateScale(8), gap: moderateScale(8) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(8) }}>
                                <Briefcase size={20} color={primaryTextColor} />
                                <Text style={{ color: secondaryTextColor }}>{user?.profile?.currentCompany || "Company not available"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(8) }}>
                                <GraduationCap size={20} color={primaryTextColor} />
                                <Text style={{ color: secondaryTextColor }}>{user?.profile?.college || "College not available"}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: moderateScale(16),
                            fontWeight: 'bold',
                            color: primaryTextColor,
                            marginTop: moderateScale(16)
                        }}>
                            Skills
                        </Text>
                        <View className='border border-neutral-200 rounded-lg' style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: moderateScale(8), padding: moderateScale(8), gap: moderateScale(8) }}>
                            {user?.profile?.skills?.map((skill: string, index: number) => (
                                <View key={index} className='bg-neutral-100' style={{ padding: moderateScale(8), borderRadius: moderateScale(8) }}>
                                    <Text className='capitalize' style={{ color: secondaryTextColor }}>{skill}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: moderateScale(16),
                                fontWeight: 'bold',
                                color: primaryTextColor,
                                marginTop: moderateScale(16)
                            }}
                        >
                            Resume
                        </Text>

                        {user?.profile?.resume ? (
                            <TouchableOpacity
                                onPress={openResume}
                                className='border border-neutral-200 rounded-lg'
                                style={{
                                    marginTop: moderateScale(8),
                                    padding: moderateScale(12),
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Text style={{ color: secondaryTextColor }}>
                                    {user?.profile?.resumeOriginalName || "View Resume"}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                className='border border-neutral-200 rounded-lg'
                                style={{
                                    marginTop: moderateScale(8),
                                    padding: moderateScale(12),
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ color: secondaryTextColor }}>
                                    No resume uploaded.
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: moderateScale(16),
                                fontWeight: 'bold',
                                color: primaryTextColor,
                                marginTop: moderateScale(16)
                            }}
                        >
                            Delete Account
                        </Text>
                        <TouchableOpacity
                            onPress={() => Alert.alert("Delete Account", "Are you sure you want to delete your account?", [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                {
                                    text: "Delete",
                                    onPress: () => Alert.alert("Request Accepted", "Your request to delete your account has been accepted. Your account will be deleted within 1 week.")
                                }
                            ])}
                            className='rounded-lg bg-red-500'
                            style={{
                                marginTop: moderateScale(8),
                                padding: moderateScale(12),
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text style={{ color: "white", fontSize: moderateScale(16) }}>
                                Delete Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className='bg-yellow-500 flex-1'
                    style={{
                        // padding: moderateScale(16),
                        borderRadius: moderateScale(16),
                        // margin: moderateScale(16),
                        height: moderateScale(200),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text>Edit Profile</Text>
                    <Button title="Close" onPress={() => setModalVisible(false)}></Button>
                </View>
            </Modal>
        </SafeScreen>
    )
}

export default Profile