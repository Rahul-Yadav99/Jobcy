import recruiterApi from '@/api/recruiter'
import { useProfile } from '@/hooks/useProfile'
import { formatDate } from '@/utils/formateDate'
import { colors, secondaryTextColor, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Calendar, IndianRupee, MapPin, Trash } from 'lucide-react-native'
import React from 'react'
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const JobCard = ({ job }: { job: any }) => {
    const router = useRouter();
    const { user } = useProfile();
    const queryClient = useQueryClient();
    const { mutate: deleteJob, isPending: isDeleting } = useMutation({
        mutationFn: () => recruiterApi.deleteJob(job._id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['all-jobs']
            })
        },
        onError: (error: string) => {
            Alert.alert('Error', error || 'Failed to delete job. Please try again.');
        }
    })
    const handleDelete = () => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this job? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deleteJob() }
            ]
        );
    }
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push(`/jobDetails/${job._id}`)}
            // className='border border-neutral-300 rounded-xl'
            style={{
                padding: spacing.md,
                borderWidth: 1,
                borderColor: colors.disabledColor,
                borderRadius: spacing.sm,
                marginBottom: spacing.md,
            }}
        >
            <View className='flex-row items-center justify-between'
                style={{ marginBottom: verticalScale(4) }}
            >
                <View>
                    <Text
                        className='capitalize' style={typography.h4}
                    >
                        {job.title}
                    </Text>
                    <Text
                        className='capitalize text-sm'
                        style={{
                            color: secondaryTextColor,
                        }}
                    >
                        {job.company.name}
                    </Text>
                </View>
                <Image
                    source={{ uri: job.company.logo }}
                    style={{
                        width: moderateScale(40),
                        height: moderateScale(40),
                    }}
                    resizeMode='contain'
                />
            </View>
            <View
                style={{ marginBottom: verticalScale(4) }}
            >
                <View className='flex-row items-center gap-2'
                    style={{ marginBottom: verticalScale(4) }}
                >
                    <MapPin size={moderateScale(13)} color={secondaryTextColor} />
                    <Text className='capitalize text-sm' style={{ color: secondaryTextColor }}>{job.location}</Text>
                </View>
                <View className='flex-row items-center gap-4'>
                    <View className='flex-row items-center gap-1'>
                        <Calendar size={moderateScale(13)} color={secondaryTextColor} />
                        <Text className='capitalize text-sm' style={{ color: secondaryTextColor }}>{formatDate(job.createdAt)}</Text>
                    </View>
                    <View className='flex-row items-center gap-1'>
                        <IndianRupee size={moderateScale(13)} color={secondaryTextColor} />
                        <Text className='capitalize text-sm' style={{ color: secondaryTextColor }}>{job.salary}</Text>
                    </View>
                </View>

            </View>
            <View>
                <Text className='capitalize text-sm' style={{ color: secondaryTextColor }}>{job?.jobType}</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: spacing.md,
                    marginTop: spacing.sm,
                }}
            >
                {
                    user?.role === 'recruiter' && (
                        <TouchableOpacity
                            onPress={handleDelete}
                            disabled={isDeleting}
                            activeOpacity={0.5}
                            style={{
                                backgroundColor: colors.backgroundGray,
                                padding: spacing.sm,
                                borderRadius: spacing.sm,
                            }}
                        >
                            {
                                isDeleting ?
                                    <ActivityIndicator size={moderateScale(15)} color={colors.primaryTextColor} /> :
                                    <Trash size={moderateScale(15)} color={colors.primaryTextColor} />
                            }

                        </TouchableOpacity>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}

export default JobCard