import SafeScreen from '@/components/SafeScreen';
import { Button, Input } from '@/components/ui';
import { disabledColor, placeholderColor, primaryColor, primaryTextColor, secondaryTextColor } from '@/utils/theme';
import { typography } from '@/utils/typography';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useMutation } from '@tanstack/react-query';
import authApi from '@/api/auth';

const SignUp = () => {
    const router = useRouter();
    const [jobSeeker, setJobSeeker] = useState(true);
    const [recruiter, setRecruiter] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const registerMutation = useMutation({
        mutationFn: authApi.register,
        onSuccess: () => {
            Alert.alert('Success', 'Account created successfully');
            router.push('/');
        },
        onError: (error: any) => {
            Alert.alert('Error', error || 'Sign up failed');
        }
    });

    const handleSignUp = () => {
        const role = jobSeeker ? 'student' : 'recruiter';
        if (!name || !email || !phone || !password) {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }
        
        const indianPhoneRegex = /^[6-9]\d{9}$/;
        if (!indianPhoneRegex.test(phone)) {
            Alert.alert('Error', 'Please enter a valid 10-digit Indian phone number');
            return;
        }
        
        registerMutation.mutate({
            fullname:name,
            email,
            phoneNumber:phone,
            password,
            role
        });
    }

    return (
        <SafeScreen>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
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
                            <Text style={typography.h1}>Create an Account</Text>
                            <Text style={typography.body}>Join us for an amazing job search experience.</Text>
                        </View>
                        {/* form */}
                        <View
                            style={{ paddingTop: moderateScale(20), gap: moderateScale(15) }}
                        >
                            <Input
                                label="Name"
                                placeholder="Enter your name"
                                value={name}
                                onChangeText={setName}
                                required
                            />
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={email}
                                onChangeText={setEmail}
                                required
                            />
                            <Input
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                                required
                            />
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={password}
                                onChangeText={setPassword}
                                required
                            />
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
                            <Button
                                title="Sign Up"
                                onPress={handleSignUp}
                                loading={registerMutation.isPending}
                                disabled={registerMutation.isPending}
                                size="medium"
                            />
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
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeScreen>
    )
}

export default SignUp