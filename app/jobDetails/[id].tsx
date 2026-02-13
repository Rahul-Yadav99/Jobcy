import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const JobDetails = () => {
    const { id: jobId } = useLocalSearchParams();
    return (
        <View className='flex-1 items-center justify-center'>
            <Text>{jobId}</Text>
        </View>
    )
}

export default JobDetails