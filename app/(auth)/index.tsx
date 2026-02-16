import authApi from '@/api/auth';
import SafeScreen from '@/components/SafeScreen';
import { useAuth } from '@/contexts/AuthContext';
import { disabledColor, placeholderColor, primaryColor, primaryTextColor, secondaryTextColor } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const Login = () => {
    const router = useRouter();
    const { login: authLogin } = useAuth();
    const [jobSeeker, setJobSeeker] = useState(true);
    const [recruiter, setRecruiter] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const role = jobSeeker ? 'student' : 'recruiter';
        try {
            if (!email || !password) {
                Alert.alert('Error', 'Please fill all the fields');
                return;
            }
            setLoading(true);
            const payload = {
                email,
                password,
                role
            }
            const res = await authApi.login(payload);
            if (res.success) {
                await authLogin(res.token, res.user.role, res.user);
                if (res.user.role === 'student') {
                    router.replace('/(student)')
                } else if (res.user.role === 'recruiter') {
                    router.replace('/(recruiter)')
                }
            }
        } catch (err: any) {
            Alert.alert('Login Failed', err);
        } finally {
            setLoading(false)
        }
    }
    return (
        <SafeScreen>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
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
                            className='font-bold'>Welcome Back!</Text>
                        <Text style={{ fontSize: moderateScale(12), color: secondaryTextColor }}>Sign in to continue your job search.</Text>
                    </View>
                    {/* form */}
                    <View
                        style={{ paddingTop: moderateScale(20), gap: moderateScale(15) }}
                    >
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
                                value={email}
                                onChangeText={setEmail}
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
                                value={password}
                                onChangeText={setPassword}
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
                                        className={`${jobSeeker ? 'text-white' : 'text-neutral-500'} text-center`} style={{ fontSize: moderateScale(10) }}
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
                                        className={`${recruiter ? 'text-white' : 'text-neutral-500'} text-center`} style={{ fontSize: moderateScale(10) }}
                                    >Recruiter
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* button */}
                        <TouchableOpacity
                            disabled={loading}
                            onPress={login}
                            activeOpacity={0.5}
                            style={{ backgroundColor: `${primaryColor}`, padding: moderateScale(10), borderRadius: moderateScale(10) }}
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
                                    >Sign In
                                    </Text>
                                )
                            }
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
                        onPress={() => router.push('/(auth)/sign-up')}
                        className='flex-row justify-center'
                        style={{ marginTop: moderateScale(20) }}
                    >
                        <Text
                            style={{ fontSize: moderateScale(12), color: secondaryTextColor }}
                        >Don't have an account? <Text className='text-primary' style={{ fontSize: moderateScale(13), color: primaryTextColor }} >Sign Up</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeScreen>
    )
}

export default Login