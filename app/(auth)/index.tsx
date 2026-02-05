import SafeScreen from '@/components/SafeScreen';
import { disabledColor, placeholderColor, primaryColor } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const Login = () => {
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
                        style={{ marginBottom: moderateScale(8), fontSize: moderateScale(24) }}
                        className='font-bold text-neutral-700'>Welcome Back!</Text>
                    <Text className='text-neutral-500' style={{ fontSize: moderateScale(12) }}>Sign in to continue your job search.</Text>
                </View>
                {/* form */}
                <View
                    style={{ paddingTop: moderateScale(20), gap: moderateScale(15) }}
                >
                    <View>
                        <Text
                            style={{ fontSize: moderateScale(14) }}
                            className='font-semibold text-neutral-700'
                        >Email
                        </Text>
                        <TextInput
                            placeholder='Enter your email'
                            placeholderTextColor={`${placeholderColor}`}
                            className='border border-neutral-300 rounded-lg px-4 py-3 mt-2 text-neutral-700'
                        />
                    </View>
                    <View>
                        <Text
                            style={{ fontSize: moderateScale(14) }}
                            className='font-semibold text-neutral-700'
                        >Password
                        </Text>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={`${placeholderColor}`}
                            secureTextEntry
                            className='border border-neutral-300 rounded-lg px-4 py-3 mt-2 text-neutral-700'
                        />
                    </View>
                    {/* role */}
                    <View>
                        <Text
                            style={{ fontSize: moderateScale(14), marginBottom: moderateScale(6) }}
                            className='font-semibold text-neutral-700'
                        >Role
                        </Text>
                        <View
                            className='flex-row gap-4'
                        >
                            <TouchableOpacity
                                style={{ backgroundColor: `${primaryColor}`, padding: moderateScale(8), borderRadius: moderateScale(10) }}
                            >
                                <Text
                                    className='text-white' style={{ fontSize: moderateScale(10) }}
                                >Job Seeker
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: `${primaryColor}`, padding: moderateScale(8), borderRadius: moderateScale(10) }}
                            >
                                <Text
                                    className='text-white' style={{ fontSize: moderateScale(10) }}
                                >Recruiter
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* button */}
                    <TouchableOpacity
                        onPress={() => Alert.alert('sdfds', "fsdfsdf")}
                        activeOpacity={0.5}
                        style={{ backgroundColor: `${primaryColor}`, padding: moderateScale(10), borderRadius: moderateScale(10) }}
                    >
                        <Text
                            className='text-white text-center'
                            style={{ fontSize: moderateScale(14) }}
                        >Sign In
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
                <View
                    className='flex-row justify-center'
                    style={{ marginTop: moderateScale(20) }}
                >
                    <Text
                        style={{ fontSize: moderateScale(12) }}
                        className='text-neutral-500'
                    >Don't have an account? <Text className='text-primary text-neutral-700' style={{ fontSize: moderateScale(13) }} >Sign Up</Text></Text>
                </View>
            </View>
        </SafeScreen>
    )
}

export default Login