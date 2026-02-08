import jobApi from '@/api/job'
import { primaryTextColor, secondaryTextColor } from '@/utils/colors'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import JobCard from './JobCard'

const JobsSection = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await jobApi.getAllJobs();
                setJobs(res.jobs);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);
    return (
        <View
            style={{
                paddingHorizontal: moderateScale(20),
                flex: 1,
            }}
        >
            <View
                style={{
                    marginBottom: moderateScale(10),
                }}
            >
                <Text
                    className='font-bold'
                    style={{ color: primaryTextColor, fontSize: moderateScale(16) }}
                >
                    Recommended for you
                </Text>
                <Text
                    className='text-sm'
                    style={{ color: secondaryTextColor }}
                >
                    as per your preferences
                </Text>
            </View>
            <FlatList
                data={jobs}
                renderItem={({ item }) => <JobCard job={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default JobsSection