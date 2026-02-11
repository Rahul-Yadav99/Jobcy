import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Profile = () => {
    const router = useRouter();
    return (
        <View className='bg-red-500 flex-1 items-center justify-center'>
            <Text>data</Text>
            <Button title='Back' onPress={() => router.back()} />
        </View>
    )
}

export default Profile