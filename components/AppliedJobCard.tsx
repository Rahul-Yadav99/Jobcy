import { primaryTextColor, secondaryTextColor } from '@/utils/colors'
import { formatDate } from '@/utils/formateDate'
import { useRouter } from 'expo-router'
import { Calendar, IndianRupee, MapPin } from 'lucide-react-native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const AppliedJobCard = ({ job }: { job: any }) => {
    const router = useRouter();
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push(`/jobDetails/${job?.job?._id}`)}
            className='border border-neutral-300 rounded-xl'
            style={{
                marginBottom: moderateScale(10),
                padding: moderateScale(10),
            }}
        >
            <View className='flex-row items-center justify-between'
                style={{ marginBottom: verticalScale(4) }}
            >
                <View>
                    <Text
                        className='font-semibold capitalize'
                        style={{
                            fontSize: moderateScale(13),
                            color: primaryTextColor,
                        }}
                    >
                        {job?.job?.title || "Job Title"}
                    </Text>
                    <Text
                        className='capitalize text-sm'
                        style={{
                            color: secondaryTextColor,
                        }}
                    >
                        {job?.job?.company?.name || "Company Name"}
                    </Text>
                </View>
                <Image
                    source={{ uri: job?.job?.company?.logo }}
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
                    <Text className='capitalize text-sm' style={{ color: secondaryTextColor }}>
                        {job?.job?.location || "Location"}
                    </Text>
                </View>
                <View className='flex-row items-center gap-4'>
                    <View className='flex-row items-center gap-1'>
                        <Calendar size={moderateScale(13)} color={secondaryTextColor} />
                        <Text className='capitalize text-sm' style={{ color: secondaryTextColor }}>
                            {formatDate(job?.createdAt)}
                        </Text>
                    </View>
                    <View className='flex-row items-center gap-1'>
                        <IndianRupee size={moderateScale(13)} color={secondaryTextColor} />
                        <Text className='capitalize text-sm' style={{ color: secondaryTextColor }}>
                            {job?.job?.salary || "Salary"}
                        </Text>
                    </View>
                </View>

            </View>
            <View className='flex-row items-center justify-between'>
                <Text className='capitalize text-sm' style={{ color: secondaryTextColor }}>
                    {job?.job?.jobType || "Job Type"}
                </Text>
                <View
                    className='capitalize rounded-full'
                    style={{
                        backgroundColor:
                            job?.status === 'accepted' ? '#10b981' :
                                job?.status === 'rejected' ? '#ef4444' :
                                    job?.status === 'pending' ? '#f59e0b' :
                                        '#6b7280',
                        paddingVertical: verticalScale(4),
                        paddingHorizontal: moderateScale(12),
                    }}
                >
                    <Text
                        className='capitalize text-xs font-medium'
                        style={{ color: '#ffffff' }}
                    >
                        {job?.status || "Pending"}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AppliedJobCard