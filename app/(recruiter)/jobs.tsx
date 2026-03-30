import recruiterApi from '@/api/recruiter'
import Empty from '@/components/Empty'
import Header from '@/components/Header'
import JobCard from '@/components/JobCard'
import SafeScreen from '@/components/SafeScreen'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react-native'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const Jobs = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["all-jobs"],
        queryFn: recruiterApi.getAllJobs,

    })

    return (
        <SafeScreen>
            <Header />
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: spacing.md,
                }}
            >
                <FlatList
                    data={data || []}
                    keyExtractor={(item) => item?._id}
                    renderItem={({ item }) => <JobCard job={item} />}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <Text style={typography.h3}>
                            Jobs ({data?.length ?? 0})
                        </Text>
                    }
                    ListHeaderComponentStyle={{
                        marginVertical: spacing.md,
                    }}
                    ListEmptyComponent={
                        <Empty message='Add your first job to get started' />
                    }
                />
                <TouchableOpacity
                    // onPress={() => setModalVisible(true)}
                    className='rounded-full p-2'
                    activeOpacity={0.9}
                    style={{
                        backgroundColor: colors.primaryColor,
                        position: 'absolute',
                        bottom: spacing.xxl,
                        right: spacing.md
                    }}
                >
                    <Plus size={moderateScale(24)} color={'white'} />
                </TouchableOpacity>
            </View>
        </SafeScreen>
    )
}

export default Jobs