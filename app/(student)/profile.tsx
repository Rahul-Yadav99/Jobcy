import studentApi from '@/api/student';
import BackButton from '@/components/BackButton';
import EditButton from '@/components/EditButton';
import ModalCloseButton from '@/components/ModalCloseButton';
import SafeScreen from '@/components/SafeScreen';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/services/profileService';
import { placeholderColor, primaryColor, primaryTextColor, secondaryTextColor } from '@/utils/colors';
import * as DocumentPicker from 'expo-document-picker';
import * as WebBrowser from 'expo-web-browser';
import { Briefcase, GraduationCap, LogOut, Mail, Phone } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const Profile = () => {
    const { logout } = useAuth();
    const [user, setUser] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [currentCompanyName, setCurrentCompanyName] = useState('');
    const [collegeName, setCollegeName] = useState('');
    const [resume, setResume] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const loadUser = async () => {
        const user = await profileService.getUser();
        setUser(user);
    }

    const pickResume = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled) {
                setResume(result.assets[0]);
            }
        } catch (error) {
            Alert.alert("Error", "Unable to pick resume");
        }
    };

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

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("fullname", fullName);
            formData.append("email", email);
            formData.append("phoneNumber", phoneNumber);
            formData.append("bio", bio);
            formData.append("currentCompany", currentCompanyName);
            formData.append("college", collegeName);

            if (resume) {
                formData.append("file", {
                    uri: resume.uri,
                    name: resume.name,
                    type: resume.mimeType || "application/pdf",
                } as any);
            }

            const response = await studentApi.updateProfile(formData);

            if (response?.success) {
                await profileService.saveUser(response.user);
                Alert.alert("Success", response.message || "Profile updated successfully");
                setModalVisible(false);
                loadUser();
            }

        } catch (error: any) {
            Alert.alert(
                "Error",
                error?.response?.data?.message || "Update failed"
            );
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadUser();
    }, [])

    useEffect(() => {
        if (user) {
            setFullName(user.fullname || '');
            setEmail(user.email || '');
            setPhoneNumber(user.phoneNumber.toString() || '');
            setBio(user.profile?.bio || '');
            setCurrentCompanyName(user.profile?.currentCompany || '');
            setCollegeName(user.profile?.college || '');
        }
    }, [user]);
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
                                    {user?.fullname + "_resume.pdf" || "View Resume"}
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
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={logout}
                        className='border border-neutral-200 rounded-lg'
                        style={{
                            marginTop: moderateScale(16),
                            padding: moderateScale(10),
                            borderRadius: moderateScale(10),
                            alignItems: 'center',
                            backgroundColor: primaryColor
                        }}
                    >
                        <View className='flex-row items-center gap-2'>
                            <LogOut size={moderateScale(16)} color="white" />
                            <Text style={{ color: 'white', fontSize: moderateScale(14) }}>
                                Logout
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ padding: moderateScale(16), flex: 1, backgroundColor: 'white' }}>
                    <View className='flex-row items-center justify-between'>
                        <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: primaryTextColor }}>Edit Profile</Text>
                        <ModalCloseButton onPress={() => setModalVisible(false)} />
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        <Image source={require('@/assets/images/profile.png')} style={{
                            height: moderateScale(100),
                            width: moderateScale(100),
                            borderRadius: moderateScale(50),
                            alignSelf: 'center',
                        }} />
                        <View style={{ marginTop: moderateScale(16), paddingHorizontal: moderateScale(1) }}>
                            <Text style={{ fontSize: moderateScale(14), color: primaryTextColor }}
                                className='font-semibold'>Name</Text>
                            <TextInput
                                placeholder='Enter your name'
                                placeholderTextColor={`${placeholderColor}`}
                                value={fullName}
                                onChangeText={setFullName}
                                autoCorrect={false}
                                className='border border-neutral-300 rounded-lg px-4 py-3 mt-2 text-neutral-700'
                            />
                        </View>
                        <View style={{ marginTop: moderateScale(16), paddingHorizontal: moderateScale(1) }}>
                            <Text style={{ fontSize: moderateScale(14), color: primaryTextColor }}
                                className='font-semibold'>Email</Text>
                            <TextInput
                                placeholder='Enter your email'
                                placeholderTextColor={`${placeholderColor}`}
                                value={email}
                                onChangeText={setEmail}
                                autoCorrect={false}
                                className='border border-neutral-300 rounded-lg px-4 py-3 mt-2 text-neutral-700'
                            />
                        </View>
                        <View style={{ marginTop: moderateScale(16), paddingHorizontal: moderateScale(1) }}>
                            <Text style={{ fontSize: moderateScale(14), color: primaryTextColor }}
                                className='font-semibold'>College</Text>
                            <TextInput
                                placeholder='Enter your college name'
                                placeholderTextColor={`${placeholderColor}`}
                                value={collegeName}
                                onChangeText={setCollegeName}
                                className='border border-neutral-300 rounded-lg px-4 py-3 mt-2 text-neutral-700'
                            />
                        </View>
                        <View style={{ marginTop: moderateScale(16), paddingHorizontal: moderateScale(1) }}>
                            <Text style={{ fontSize: moderateScale(14), color: primaryTextColor }}
                                className='font-semibold'>Current Company</Text>
                            <TextInput
                                placeholder='Enter your current company name'
                                placeholderTextColor={`${placeholderColor}`}
                                value={currentCompanyName}
                                onChangeText={setCurrentCompanyName}
                                className='border border-neutral-300 rounded-lg px-4 py-3 mt-2 text-neutral-700'
                            />
                        </View>
                        <View style={{ marginTop: moderateScale(16), paddingHorizontal: moderateScale(1) }}>
                            <Text
                                style={{ fontSize: moderateScale(14), color: primaryTextColor }}
                                className='font-semibold'
                            >
                                Phone Number
                            </Text>
                            <TextInput
                                placeholder='Enter your phone number'
                                placeholderTextColor={placeholderColor}
                                value={phoneNumber}
                                keyboardType="phone-pad"
                                maxLength={10}
                                onChangeText={(text) => {
                                    const cleaned = text.replace(/[^0-9]/g, "");
                                    setPhoneNumber(cleaned);
                                }}
                                className='border border-neutral-300 rounded-lg px-4 py-3 mt-2 text-neutral-700'
                            />
                        </View>
                        <View style={{ marginTop: moderateScale(16), paddingHorizontal: moderateScale(1) }}>
                            <Text style={{ fontSize: moderateScale(14), color: primaryTextColor }}
                                className='font-semibold'>Bio</Text>
                            <TextInput
                                placeholder='Enter your bio'
                                placeholderTextColor={`${placeholderColor}`}
                                value={bio}
                                onChangeText={setBio}
                                className='border border-neutral-300 rounded-lg px-4 py-3 mt-2 text-neutral-700'
                            />
                        </View>
                        <View style={{ marginTop: moderateScale(16), paddingHorizontal: moderateScale(1) }}>
                            <Text style={{ fontSize: moderateScale(14), color: primaryTextColor }}
                                className='font-semibold'>
                                Resume
                            </Text>

                            <TouchableOpacity
                                onPress={pickResume}
                                className='border border-neutral-300 rounded-lg px-4 py-3 mt-2'
                            >
                                <Text style={{ color: secondaryTextColor }}>
                                    {resume?.name ? resume.name : "Select Resume (PDF/DOC)"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            disabled={loading}
                            onPress={handleUpdateProfile}
                            activeOpacity={0.5}
                            style={{ backgroundColor: `${primaryColor}`, padding: moderateScale(10), borderRadius: moderateScale(10), marginTop: moderateScale(16) }}
                        >
                            {
                                loading ? (
                                    <ActivityIndicator
                                        color={"white"}
                                        size={'small'}
                                    />
                                ) : (
                                    <Text
                                        className='text-white text-center'
                                        style={{ fontSize: moderateScale(14) }}
                                    >Update Profile
                                    </Text>
                                )
                            }
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
        </SafeScreen>
    )
}

export default Profile