import recruiterApi from '@/api/recruiter'
import ApplicantCard from '@/components/ApplicantCard'
import BackButton from '@/components/BackButton'
import SafeScreen from '@/components/SafeScreen'
import { colors, headingSize, spacing } from '@/utils/theme'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FlatList, Text, View } from 'react-native'

const Applicants = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['applicants'],
        queryFn: recruiterApi.getAllApplicants
    })
    console.log("data", data);
    return (
        <SafeScreen>
            <View
                style={{
                    padding: spacing.md,
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
                        Applicants
                    </Text>
                </View>
                <FlatList
                    data={data || []}
                    renderItem={(item) => <ApplicantCard item={item} isApplicant={true} />}
                />
            </View>
        </SafeScreen>
    )
}

export default Applicants