import SafeScreen from '@/components/SafeScreen';
import { disabledColor, placeholderColor, primaryColor, primaryTextColor, secondaryTextColor } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const SignUp = () => {
    const router = useRouter();
    const [jobSeeker, setJobSeeker] = useState(true);
    const [recruiter, setRecruiter] = useState(false);
    const [loading, setLoading] = useState(false);

    const login = () => {
        const role = jobSeeker ? 'student' : 'recruiter';
        try {

        } catch (error) {

        } finally {

        }
        Alert.alert('Login', role);
    }
    return (
        <SafeScreen>
            <View
                style={{ flex: 1, padding: moderateScale(20), paddingTop: moderateScale(40) }}>
                {/* header */}
                <View>
                    <Image
                        style={{ marginBottom: moderateScale(15) }}
                        source={require('@/assets/images/logojob.png')}
                    />
                    <Text
                        style={{ marginBottom: moderateScale(8), fontSize: moderateScale(24), color: primaryTextColor }}
                        className='font-bold'>Create an Account</Text>
                    <Text style={{ fontSize: moderateScale(12), color: secondaryTextColor }}>Join us for an amazing job search experience.</Text>
                </View>
                {/* form */}
                <View
                    style={{ paddingTop: moderateScale(20), gap: moderateScale(15) }}
                >
                    <View>
                        <Text
                            style={{ fontSize: moderateScale(14), color: primaryTextColor }}
                            className='font-semibold'
                        >Name
                        </Text>
                        <TextInput
                            placeholder='Enter your name'
                            placeholderTextColor={`${placeholderColor}`}
                            className='border border-neutral-300 rounded-lg px-4 py-3 mt-2 text-neutral-700'
                        />
                    </View>
                    <View>
                        <Text
                            style={{ fontSize: moderateScale(14), color: primaryTextColor }}
                            className='font-semibold'
                        >Email
                        </Text>
                        <TextInput
                            placeholder='Enter your email'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholderTextColor={`${placeholderColor}`}
                            className='border border-neutral-300 rounded-lg px-4 py-3 mt-2 text-neutral-700'
                        />
                    </View>
                    <View>
                        <Text
                            style={{ fontSize: moderateScale(14), color: primaryTextColor }}
                            className='font-semibold'
                        >Phone Number
                        </Text>
                        <TextInput
                            placeholder='Enter your phone number'
                            keyboardType='phone-pad'
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholderTextColor={`${placeholderColor}`}
                            className='border border-neutral-300 rounded-lg px-4 py-3 mt-2 text-neutral-700'
                        />
                    </View>
                    <View>
                        <Text
                            style={{ fontSize: moderateScale(14), color: primaryTextColor }}
                            className='font-semibold'
                        >Password
                        </Text>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={`${placeholderColor}`}
                            secureTextEntry
                            autoCapitalize='none'
                            autoCorrect={false}
                            className='border border-neutral-300 rounded-lg px-4 py-3 mt-2 text-neutral-700'
                        />
                    </View>
                    {/* role */}
                    <View>
                        <Text
                            style={{ fontSize: moderateScale(14), marginBottom: moderateScale(6), color: primaryTextColor }}
                            className='font-semibold'
                        >Role
                        </Text>
                        <View
                            className='flex-row gap-4'
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setJobSeeker(true);
                                    setRecruiter(false);
                                }}
                                activeOpacity={0.5}
                                className='border border-neutral-300'
                                style={{ backgroundColor: `${jobSeeker ? primaryColor : 'transparent'}`, padding: moderateScale(8), borderRadius: moderateScale(10) }}
                            >
                                <Text
                                    className={`${jobSeeker ? 'text-white' : 'text-neutral-700'} text-center`} style={{ fontSize: moderateScale(10) }}
                                >Job Seeker
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setJobSeeker(false);
                                    setRecruiter(true)
                                }}
                                activeOpacity={0.5}
                                className='border border-neutral-300'
                                style={{ backgroundColor: `${recruiter ? primaryColor : 'transparent'}`, padding: moderateScale(8), borderRadius: moderateScale(10) }}
                            >
                                <Text
                                    className={`${recruiter ? 'text-white' : 'text-neutral-700'} text-center`} style={{ fontSize: moderateScale(10) }}
                                >Recruiter
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* button */}
                    <TouchableOpacity
                        onPress={login}
                        activeOpacity={0.5}
                        style={{ backgroundColor: `${primaryColor}`, padding: moderateScale(10), borderRadius: moderateScale(10) }}
                    >
                        <Text
                            className='text-white text-center'
                            style={{ fontSize: moderateScale(14) }}
                        >Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* line */}
                <View
                    style={{ height: moderateScale(1), backgroundColor: `${placeholderColor}`, marginVertical: moderateScale(30) }}
                />
                {/* sign in with social */}
                <View
                    className='flex-row justify-center gap-4'
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className='items-center justify-center rounded-full border border-neutral-300 bg-white'
                        style={{
                            width: moderateScale(40),
                            height: moderateScale(40),
                        }}
                        onPress={() => Alert.alert('Apple', 'This service is not available yet')}
                    >
                        <Ionicons
                            name="logo-apple"
                            size={moderateScale(30)}
                            color={disabledColor}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className='items-center justify-center rounded-full border border-neutral-300 bg-white'
                        style={{
                            width: moderateScale(40),
                            height: moderateScale(40),
                        }}
                        onPress={() => Alert.alert('Google', 'This service is not available yet')}
                    >
                        <Ionicons
                            name="logo-google"
                            size={moderateScale(30)}
                            color={disabledColor}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className='items-center justify-center rounded-full border border-neutral-300 bg-white'
                        style={{
                            width: moderateScale(40),
                            height: moderateScale(40),
                        }}
                        onPress={() => Alert.alert('Facebook', 'This service is not available yet')}
                    >
                        <Ionicons
                            name="logo-facebook"
                            size={moderateScale(30)}
                            color={disabledColor}
                        />
                    </TouchableOpacity>
                </View>
                {/* footer */}
                <TouchableOpacity
                    onPress={() => router.push('/')}
                    className='flex-row justify-center'
                    style={{ marginTop: moderateScale(20) }}
                >
                    <Text
                        style={{ fontSize: moderateScale(12), color: secondaryTextColor }}
                    >I have an account? <Text className='text-primary' style={{ fontSize: moderateScale(13), color: primaryTextColor }} >Sign In</Text></Text>
                </TouchableOpacity>
            </View>
        </SafeScreen>
    )
}

export default SignUp