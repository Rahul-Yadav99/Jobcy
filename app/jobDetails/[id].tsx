import studentApi from '@/api/student';
import BackButton from '@/components/BackButton';
import Empty from '@/components/Empty';
import JobDetailsSkeleton from '@/components/Jobdetailsskeleton';
import SafeScreen from '@/components/SafeScreen';
import { profileService } from '@/services/profileService';
import { formatDate } from '@/utils/formatDate';
import { colors, fontSize, headingSize, primaryColor, primaryTextColor, spacing } from '@/utils/theme';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Briefcase, Calendar, IndianRupee, LaptopMinimal, MapPin } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const JobDetails = () => {
    const router = useRouter();
    const { id: jobId } = useLocalSearchParams();
    const [user, setUser] = useState<any>(null);
    const queryClient = useQueryClient();

    // Load user function
    const loadUser = async () => {
        const user = await profileService.getUser();
        setUser(user);
    }

    // Query for job details
    const { data, isLoading, error } = useQuery({
        queryKey: ['job', jobId],
        queryFn: () => studentApi.getJobDetails(jobId as string)
    })

    // Mutation for applying to job
    const { mutateAsync: applyJob, isPending } = useMutation({
        mutationFn: () => studentApi.applyJob(jobId as string),
        onSuccess: () => {
            // Invalidate and refetch the job details to get updated applications list
            queryClient.invalidateQueries({ queryKey: ['job', jobId] });
            console.log("Application successful");
        },
        onError: (error) => {
            console.error("Application failed:", error);
            alert("Failed to apply for job. Please try again.");
        }
    })

    // Load user on mount
    useEffect(() => {
        loadUser();
    }, [])

    // Calculate isApplied from live data
    const isApplied = React.useMemo(() => {
        if (!user || !data?.job?.applications) return false;
        return data.job.applications.some((app: any) => app.applicant === user?._id);
    }, [user, data?.job?.applications]);

    // Loading state
    if (isLoading) {
        return <JobDetailsSkeleton />
    }

    // Error state
    if (error) {
        return (
            <Empty
                message="Something went wrong"
                isDetailsScreen
            />
        )
    }

    // Null check
    if (!data?.job) {
        return (
            <Empty
                message="Job not found"
                isDetailsScreen
            />
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
                            flex: 1,
                            fontSize: headingSize.h2,
                            fontWeight: 'bold',
                            color: colors.primaryTextColor,
                            marginLeft: spacing.md,
                        }}
                    >
                        {job.title || "No title available"}
                    </Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{
                        paddingBottom: moderateScale(20)
                    }}
                >
                    <View
                        className='flex-row items-center'
                        style={{
                            marginTop: spacing.md,
                            gap: spacing.md,
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
                                fontSize: headingSize.h3,
                                fontWeight: 'bold',
                                color: colors.primaryTextColor,
                            }}
                        >
                            {job.company?.name || "No company name available"}
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: fontSize.md,
                            color: colors.secondaryTextColor,
                            marginTop: spacing.md,
                            textAlign: 'justify',
                        }}
                    >
                        {job.company?.description}
                    </Text>
                    <View>
                        <View className='flex-row items-center'
                            style={{
                                marginTop: spacing.md,
                                gap: spacing.sm
                            }}
                        >
                            <IndianRupee size={moderateScale(18)} color={primaryTextColor} />
                            <Text
                                style={{
                                    fontSize: fontSize.md,
                                    fontWeight: 'bold',
                                    color: primaryTextColor,
                                }}
                            >
                                {job.salary || "No salary available"}
                            </Text>
                        </View>
                        <View className='flex-row items-center'
                            style={{
                                marginTop: spacing.md,
                                gap: spacing.sm
                            }}
                        >
                            <MapPin size={moderateScale(18)} color={primaryTextColor} />
                            <Text
                                style={{
                                    fontSize: fontSize.md,
                                    fontWeight: 'bold',
                                    color: primaryTextColor,
                                }}
                            >
                                {job.company?.location || "No location available"}
                            </Text>
                        </View>
                        <View className='flex-row items-center'
                            style={{
                                marginTop: spacing.md,
                                gap: spacing.sm
                            }}
                        >
                            <Briefcase size={moderateScale(18)} color={primaryTextColor} />
                            <Text
                                style={{
                                    fontSize: fontSize.md,
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
                                        marginTop: spacing.md,
                                        gap: spacing.sm,
                                    }}
                                >
                                    <LaptopMinimal
                                        size={moderateScale(18)}
                                        color={primaryTextColor}
                                    />
                                    <Text
                                        style={{
                                            fontSize: fontSize.md,
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
                            fontSize: fontSize.md,
                            color: colors.secondaryTextColor,
                            marginTop: spacing.md,
                            lineHeight: moderateScale(20),
                            textAlign: 'justify',
                        }}
                    >
                        {job.description || "No description available"}
                    </Text>
                    <View className='flex-row items-center'
                        style={{
                            gap: spacing.sm,
                            marginTop: spacing.md,
                        }}
                    >
                        <Calendar size={moderateScale(18)} color={primaryTextColor} />
                        <Text
                            style={{
                                fontSize: fontSize.md,
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}
                        >
                            {formatDate(job.createdAt)}
                        </Text>
                    </View>
                    <View className='flex-row items-center'
                        style={{
                            gap: spacing.sm,
                            marginTop: spacing.md,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: fontSize.md,
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}>
                            Positions Available :
                        </Text>
                        <Text
                            style={{
                                fontSize: fontSize.md,
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}
                        >
                            {job.position || 0}
                        </Text>
                    </View>
                    <View className='flex-row items-center'
                        style={{
                            gap: spacing.sm,
                            marginTop: spacing.md,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: fontSize.md,
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}>
                            Experience Level :
                        </Text>
                        <Text
                            style={{
                                fontSize: fontSize.md,
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}
                        >
                            {job.experienceLevel || 0}
                        </Text>
                    </View>
                    <View className='flex-row items-center'
                        style={{
                            gap: spacing.sm,
                            marginTop: spacing.md,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: fontSize.md,
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}>
                            No of Applications :
                        </Text>
                        <Text
                            style={{
                                fontSize: fontSize.md,
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}
                        >
                            {job.applications?.length || 0}
                        </Text>
                    </View>
                    {
                        user?.role === 'recruiter' ? (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => router.push(`/applications/${job?._id}` as any)}
                                style={{
                                    marginTop: spacing.md,
                                    backgroundColor: primaryColor,
                                    padding: spacing.md,
                                    borderRadius: spacing.md,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: '#fff', fontSize: fontSize.md }}>View Applications</Text>
                            </TouchableOpacity>
                        ) :
                            (
                                <TouchableOpacity
                                    disabled={isApplied || isPending}
                                    onPress={async () => {
                                        try {
                                            await applyJob();
                                        } catch (error) {
                                            console.error("Error applying:", error);
                                        }
                                    }}
                                    style={{
                                        marginTop: spacing.md,
                                        backgroundColor: isApplied || isPending ? '#ccc' : primaryColor,
                                        padding: spacing.md,
                                        borderRadius: spacing.md,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: fontSize.md }}>
                                        {isPending ? "Applying..." : isApplied ? "Already Applied" : "Apply for this job"}
                                    </Text>
                                </TouchableOpacity>
                            )
                    }
                </ScrollView>
            </View>
        </SafeScreen>
    )
}

export default JobDetails