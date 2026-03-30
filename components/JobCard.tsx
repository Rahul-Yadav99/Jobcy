import recruiterApi from '@/api/recruiter'
import { useProfile } from '@/hooks/useProfile'
import { formatDate } from '@/utils/formateDate'
import { formatExperience } from '@/utils/formatExp'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Briefcase, Calendar, IndianRupee, MapPinIcon, Trash, Users } from 'lucide-react-native'
import React from 'react'
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

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
            style={{
                padding: spacing.md,
                borderWidth: 1,
                borderColor: colors.disabledColor,
                borderRadius: spacing.sm,
                marginBottom: spacing.md,
            }}
        >
            <View className='flex-row items-center justify-between'
                style={{ marginBottom: spacing.sm }}
            >
                <View>
                    <Text className='capitalize' style={typography.h4}>{job.title}</Text>
                    <Text
                        className='capitalize'
                        style={typography.body}
                    >
                        {job?.company?.name ?? 'Company Name'}
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
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.sm,
                }}
            >
                <MapPinIcon size={moderateScale(13)} color={colors.secondaryTextColor} />
                <Text style={{ textTransform: 'capitalize', ...typography.body }}>{job?.location ?? 'New Delhi'}</Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.sm,
                }}
            >
                <IndianRupee size={moderateScale(13)} color={colors.secondaryTextColor} />
                <Text style={{ textTransform: 'capitalize', ...typography.h5 }}>{job?.salary ?? '3.5 LPA'} / Exp {formatExperience(job?.experienceLevel)}</Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.sm,
                }}
            >
                <Briefcase size={moderateScale(13)} color={colors.secondaryTextColor} />
                <Text style={{ textTransform: 'capitalize', ...typography.body }}>{job?.jobType ?? 'Full-Time'}</Text>
            </View>


            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.sm,
                }}
            >
                <Users size={moderateScale(13)} color={colors.secondaryTextColor} />
                <Text style={{ textTransform: 'capitalize', ...typography.body }}>Positions : {job?.position ?? 1}</Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.sm,
                }}
            >
                <Users size={moderateScale(13)} color={colors.secondaryTextColor} />
                <Text style={{ textTransform: 'capitalize', ...typography.body }}>Applications : {job?.applications?.length ?? 0}</Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.sm,
                }}
            >
                <Calendar size={moderateScale(13)} color={colors.secondaryTextColor} />
                <Text style={{ textTransform: 'capitalize', ...typography.body }}>{formatDate(job?.createdAt)}</Text>
            </View>

            {/* delete button */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: spacing.md,
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