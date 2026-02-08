import { primaryTextColor, secondaryTextColor } from '@/utils/colors'
import { formatDate } from '@/utils/formateDate'
import { Calendar, IndianRupee, MapPin } from 'lucide-react-native'
import React from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const JobCard = ({ job }: { job: any }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => Alert.alert(job._id)}
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
        </TouchableOpacity>
    )
}

export default JobCard