import { useAppDispatch } from "@/redux/hooks";
import { loginFailure, loginStart, loginSuccess } from "@/redux/slices/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Please fill all the fields');
            return;
        }

        dispatch(loginStart());

        try {
            const payload = {
                email: email.trim(),
                password,
                role: 'student'
            }
            const res = await axios.post(`${USER_API_END_POINT}/login`, payload, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Extract token from response (adjust based on your API response structure)
            const token = res.data.token || res.data.accessToken;
            const user = res.data.user;

            // Dispatch success action with token and user data
            dispatch(loginSuccess({ token, user }));

            Alert.alert('Success', `Welcome ${user.fullname}`);
            router.replace("/(student)");
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Login failed';
            dispatch(loginFailure(errorMessage));
            Alert.alert('Login Error', errorMessage);
        }
    }

    return (
        <View className="flex-1">
            <View className="p-4">
                <Text className="text-lg font-bold mb-2">E-mail</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    className="border border-neutral-300 rounded-md px-4 mb-2"
                    placeholder="Enter your E-mail"
                />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    className="border border-neutral-300 rounded-md px-4 mb-2"
                    placeholder="Enter your password"
                />
                <TouchableOpacity
                    onPress={handleLogin}
                    className="bg-blue-500 text-center p-3 rounded-lg"
                    activeOpacity={0.5}
                >
                    <Text className="text-white text-center">Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.navigate("/(auth)/signup")}>
                    <Text className="text-blue-500 text-center mt-4">
                        Don&apos;t have an account? Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;