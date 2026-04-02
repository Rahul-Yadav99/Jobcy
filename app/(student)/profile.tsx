import studentApi from '@/api/student';
import BackButton from '@/components/BackButton';
import EditButton from '@/components/EditButton';
import ModalCloseButton from '@/components/ModalCloseButton';
import SafeScreen from '@/components/SafeScreen';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/services/profileService';
import { primaryTextColor, secondaryTextColor } from '@/utils/theme';
import { typography } from '@/utils/typography';
import * as DocumentPicker from 'expo-document-picker';
import * as WebBrowser from 'expo-web-browser';
import { Briefcase, GraduationCap, LogOut, Mail, Phone } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
        } catch (error: any) {
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
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: moderateScale(64) }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
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
                                <Text style={typography.h5}>{user?.email || "No email available"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(8) }}>
                                <Phone size={20} color={primaryTextColor} />
                                <Text style={typography.h5}>{user?.phoneNumber || "No phone number available"}</Text>
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
                                <Text style={typography.h5}>{user?.profile?.currentCompany || "Company not available"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(8) }}>
                                <GraduationCap size={20} color={primaryTextColor} />
                                <Text style={typography.h5}>{user?.profile?.college || "College not available"}</Text>
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
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeScreen>
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
                            <View style={{ marginTop: moderateScale(16), paddingHorizontal: moderateScale(1), gap: moderateScale(12) }}>
                                <Input
                                    label="Name"
                                    placeholder="Enter your name"
                                    value={fullName}
                                    onChangeText={setFullName}
                                    autoCorrect={false}
                                    required
                                />
                                <Input
                                    label="Email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    required
                                />
                                <Input
                                    label="College"
                                    placeholder="Enter your college name"
                                    value={collegeName}
                                    onChangeText={setCollegeName}
                                />
                                <Input
                                    label="Current Company"
                                    placeholder="Enter your current company name"
                                    value={currentCompanyName}
                                    onChangeText={setCurrentCompanyName}
                                />
                                <Input
                                    label="Phone Number"
                                    placeholder="Enter your phone number"
                                    value={phoneNumber}
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    onChangeText={(text) => {
                                        const cleaned = text.replace(/[^0-9]/g, "");
                                        setPhoneNumber(cleaned);
                                    }}
                                    required
                                />
                                <Input
                                    label="Bio"
                                    placeholder="Enter your bio"
                                    value={bio}
                                    onChangeText={setBio}
                                    multiline
                                    numberOfLines={3}
                                />
                                <View>
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
                                <Button
                                    title="Update Profile"
                                    onPress={handleUpdateProfile}
                                    loading={loading}
                                    disabled={loading}
                                    size="medium"
                                />
                            </View>
                        </ScrollView>
                    </View>
                </SafeScreen>
            </Modal>
        </SafeScreen>
    )
}

export default Profile