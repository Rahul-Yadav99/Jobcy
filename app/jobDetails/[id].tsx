import studentApi from '@/api/student';
import BackButton from '@/components/BackButton';
import SafeScreen from '@/components/SafeScreen';
import { profileService } from '@/services/profileService';
import { primaryColor, primaryTextColor, secondaryTextColor } from '@/utils/colors';
import { formatDate } from '@/utils/formateDate';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Briefcase, Calendar, IndianRupee, LaptopMinimal, MapPin } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const JobDetails = () => {
    const { id: jobId } = useLocalSearchParams();
    const [isApplied, setIsApplied] = useState(false);
    const [user, setUser] = useState<any>(null);

    // MOVE loadUser function before useQuery
    const loadUser = async () => {
        const user = await profileService.getUser();
        setUser(user);
    }

    // ALL HOOKS MUST BE AT THE TOP
    const { data, isLoading, error } = useQuery({
        queryKey: ['job', jobId],
        queryFn: () => studentApi.getJobDetails(jobId as string)
    })

    useEffect(() => {
        loadUser();
    }, [])

    useEffect(() => {
        if (user && data?.job?.applications) {
            const applied = data.job.applications.some(
                (app: any) => app?.student?._id === user?._id
            );
            setIsApplied(applied);
        }
    }, [user, data]);

    // NOW CONDITIONAL RETURNS AFTER ALL HOOKS
    if (isLoading) {
        return (
            <View className='flex-1 items-center justify-center'>
                <ActivityIndicator size="large" color={primaryColor} />
            </View>
        )
    }

    if (error) {
        return (
            <View className='flex-1 items-center justify-center'>
                <Text>{error.message}</Text>
            </View>
        )
    }

    // ADD NULL CHECK
    if (!data?.job) {
        return (
            <View className='flex-1 items-center justify-center'>
                <Text>Job not found</Text>
            </View>
        )
    }

    const job = data.job;

    return (
        <SafeScreen>
            <View
                style={{
                    padding: moderateScale(16),
                    flex: 1
                }}
            >
                <View className='flex-row items-center'>
                    <BackButton />
                    <Text
                        className='capitalize'
                        style={{
                            flex: 1, // Changed from width: '100%'
                            fontSize: moderateScale(20),
                            fontWeight: 'bold',
                            color: primaryTextColor,
                            marginLeft: moderateScale(16),
                        }}
                    >
                        {job.title || "No title available"}
                    </Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{
                        paddingBottom: moderateScale(20) // REMOVED flex: 1
                    }}
                >
                    <View
                        className='flex-row items-center'
                        style={{
                            marginTop: moderateScale(10),
                            gap: moderateScale(10)
                        }}
                    >
                        <Image
                            source={{ uri: job.company?.logo }}
                            resizeMode='contain'
                            style={{
                                width: moderateScale(50),
                                height: moderateScale(50),
                                borderRadius: moderateScale(10)
                            }}
                        />
                        <Text
                            className='capitalize'
                            style={{
                                fontSize: moderateScale(16),
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}
                        >
                            {job.company?.name || "No company name available"}
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: moderateScale(13),
                            color: secondaryTextColor,
                            marginTop: moderateScale(10),
                            textAlign: 'justify',
                        }}
                    >
                        {job.company?.description}
                    </Text>
                    <View>
                        <View className='flex-row items-center'
                            style={{
                                marginTop: moderateScale(10),
                                gap: moderateScale(4)
                            }}
                        >
                            <IndianRupee size={moderateScale(18)} color={primaryTextColor} />
                            <Text
                                style={{
                                    fontSize: moderateScale(14),
                                    fontWeight: 'bold',
                                    color: primaryTextColor,
                                }}
                            >
                                {job.salary || "No salary available"}
                            </Text>
                        </View>
                        <View className='flex-row items-center'
                            style={{
                                marginTop: moderateScale(10),
                                gap: moderateScale(4)
                            }}
                        >
                            <MapPin size={moderateScale(18)} color={primaryTextColor} />
                            <Text
                                style={{
                                    fontSize: moderateScale(14),
                                    fontWeight: 'bold',
                                    color: primaryTextColor,
                                }}
                            >
                                {job.company?.location || "No location available"}
                            </Text>
                        </View>
                        <View className='flex-row items-center'
                            style={{
                                marginTop: moderateScale(10),
                                gap: moderateScale(4)
                            }}
                        >
                            <Briefcase size={moderateScale(18)} color={primaryTextColor} />
                            <Text
                                style={{
                                    fontSize: moderateScale(14),
                                    fontWeight: 'bold',
                                    color: primaryTextColor,
                                }}
                            >
                                {job.jobType || "No job type available"}
                            </Text>
                        </View>
                        {
                            job.requirements?.length > 0 && (
                                <View
                                    className='flex-row items-center'
                                    style={{
                                        marginTop: moderateScale(10),
                                        gap: moderateScale(4),
                                    }}
                                >
                                    <LaptopMinimal
                                        size={moderateScale(18)}
                                        color={primaryTextColor}
                                    />
                                    <Text
                                        style={{
                                            fontSize: moderateScale(14),
                                            fontWeight: 'bold',
                                            color: primaryTextColor,
                                        }}
                                    >
                                        {job.requirements.join(", ")}
                                    </Text>
                                </View>
                            )
                        }
                    </View>
                    <Text
                        style={{
                            fontSize: moderateScale(13),
                            color: secondaryTextColor,
                            marginTop: moderateScale(16),
                            lineHeight: moderateScale(20),
                            textAlign: 'justify',
                        }}
                    >
                        {job.description || "No description available"}
                    </Text>
                    <View className='flex-row items-center'
                        style={{
                            gap: moderateScale(4),
                            marginTop: moderateScale(10),
                        }}
                    >
                        <Calendar size={moderateScale(18)} color={primaryTextColor} />
                        <Text
                            style={{
                                fontSize: moderateScale(14),
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}
                        >
                            {formatDate(job.createdAt)}
                        </Text>
                    </View>
                    <View className='flex-row items-center'
                        style={{
                            gap: moderateScale(4),
                            marginTop: moderateScale(10),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: moderateScale(14),
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}>
                            Positions Available :
                        </Text>
                        <Text
                            style={{
                                fontSize: moderateScale(14),
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}
                        >
                            {job.position || 0}
                        </Text>
                    </View>
                    <View className='flex-row items-center'
                        style={{
                            gap: moderateScale(4),
                            marginTop: moderateScale(10),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: moderateScale(14),
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}>
                            Experience Level :
                        </Text>
                        <Text
                            style={{
                                fontSize: moderateScale(14),
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}
                        >
                            {job.experienceLevel || 0}
                        </Text>
                    </View>
                    <View className='flex-row items-center'
                        style={{
                            gap: moderateScale(4),
                            marginTop: moderateScale(10),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: moderateScale(14),
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}>
                            No of Applications :
                        </Text>
                        <Text
                            style={{
                                fontSize: moderateScale(14),
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}
                        >
                            {job.applications?.length || 0}
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        disabled={isApplied} // Disable if already applied
                        style={{
                            marginTop: moderateScale(10),
                            backgroundColor: isApplied ? '#ccc' : primaryColor,
                            padding: moderateScale(10),
                            borderRadius: moderateScale(10),
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: moderateScale(14),
                                color: "white",
                                fontWeight: 'bold',
                            }}
                        >
                            {isApplied ? "Already Applied" : "Apply for this job"}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeScreen>
    )
}

export default JobDetails