import recruiterApi from '@/api/recruiter'
import Empty from '@/components/Empty'
import ErrorScreen from '@/components/ErrorScreen'
import Header from '@/components/Header'
import JobCard from '@/components/JobCard'
import { JobCardSkeletonList } from '@/components/Jobcardskeleton'
import ModalCloseButton from '@/components/ModalCloseButton'
import SafeScreen from '@/components/SafeScreen'
import { Button, Input } from '@/components/ui'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronDown, Plus } from 'lucide-react-native'
import React, { useState } from 'react'
import { Alert, FlatList, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const jobTypes = ['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance']

const Jobs = () => {
    const queryClient = useQueryClient()
    const [modalVisible, setModalVisible] = useState(false)
    const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false)
    const [jobTypeDropdownOpen, setJobTypeDropdownOpen] = useState(false)

    const [jobDetails, setJobDetails] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        experience: '',
        location: '',
        jobType: '',
        position: '',
        companyId: '',
        companyName: '',
    })

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['all-jobs'],
        queryFn: recruiterApi.getAllJobs,
    })

    const { data: companies } = useQuery({
        queryKey: ['companies'],
        queryFn: recruiterApi.getAllCompanies,
    })

    const { mutate: postJob, isPending } = useMutation({
        mutationFn: (payload: any) => recruiterApi.postJob(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-jobs'] })
            setModalVisible(false)
            resetForm()
            Alert.alert('🎉 Job Posted!', 'Your job listing is now live.')
        },
        onError: (error: any) => {
            Alert.alert('Error', error || 'Failed to post job. Please try again.')
        },
    })

    const resetForm = () => {
        setJobDetails({
            title: '',
            description: '',
            requirements: '',
            salary: '',
            experience: '',
            location: '',
            jobType: '',
            position: '',
            companyId: '',
            companyName: '',
        })
        setCompanyDropdownOpen(false)
        setJobTypeDropdownOpen(false)
    }

    const handlePostJob = () => {
        const { title, description, salary, experience, location, jobType, position, companyId } = jobDetails
        if (!title.trim() || !description.trim() || !salary.trim() || !experience || !location.trim() || !jobType.trim() || !position.trim() || !companyId) {
            Alert.alert('Validation', 'Please fill in all required fields.')
            return
        }
        postJob({
            title: title.trim(),
            description: description.trim(),
            requirements: jobDetails.requirements.split(',').map(r => r.trim()).filter(Boolean),
            salary: salary.trim(),
            experience: Number(experience),
            location: location.trim(),
            jobType: jobType.trim(),
            position: Number(position),
            companyId,
        })
    }

    if (error) {
        return <ErrorScreen message={error.message} onRetry={refetch} />
    }

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
                    data={isLoading ? [] : (data || [])}
                    keyExtractor={(item) => item?._id}
                    renderItem={({ item }) => <JobCard job={item} isAppliedJob={false} />}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            <Text style={typography.h3}>
                                Jobs ({data?.length ?? 0})
                            </Text>
                            {isLoading && <JobCardSkeletonList count={6} />}
                        </>
                    }
                    ListHeaderComponentStyle={{
                        marginVertical: spacing.md,
                    }}
                    ListEmptyComponent={
                        !isLoading ? (
                            <Empty message="Add your first job to get started" />
                        ) : null
                    }
                />
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="rounded-full p-2"
                    activeOpacity={0.9}
                    style={{
                        backgroundColor: colors.primaryColor,
                        position: 'absolute',
                        bottom: spacing.xxl,
                        right: spacing.md,
                    }}
                >
                    <Plus size={moderateScale(24)} color={'white'} />
                </TouchableOpacity>
            </View>

            {/* Post Job Modal */}
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(false); resetForm(); }}
            >
                <SafeScreen>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <ScrollView
                            style={{ flex: 1, padding: spacing.md, }}
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            {/* Header */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: spacing.md,
                                }}
                            >
                                <Text style={typography.h3}>Post a Job</Text>
                                <ModalCloseButton onPress={() => { setModalVisible(false); resetForm(); }} />
                            </View>

                            {/* Title */}
                            <Input
                                label="Job Title"
                                placeholder="e.g. Frontend Developer"
                                value={jobDetails.title}
                                onChangeText={(text) => setJobDetails({ ...jobDetails, title: text })}
                                editable={!isPending}
                                required
                                containerStyle={{ marginBottom: spacing.md }}
                            />

                            {/* Description */}
                            <Input
                                label="Description"
                                placeholder="Describe the role and responsibilities"
                                value={jobDetails.description}
                                onChangeText={(text) => setJobDetails({ ...jobDetails, description: text })}
                                editable={!isPending}
                                multiline
                                numberOfLines={4}
                                required
                                containerStyle={{ marginBottom: spacing.md }}
                            />

                            {/* Requirements */}
                            <Input
                                label="Requirements"
                                placeholder="e.g. React, Node.js, TypeScript (comma separated)"
                                value={jobDetails.requirements}
                                onChangeText={(text) => setJobDetails({ ...jobDetails, requirements: text })}
                                editable={!isPending}
                                containerStyle={{ marginBottom: spacing.md }}
                            />

                            {/* Salary + Experience row */}
                            <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md }}>
                                <Input
                                    label="Salary"
                                    placeholder="e.g. 5-8 LPA"
                                    value={jobDetails.salary}
                                    onChangeText={(text) => setJobDetails({ ...jobDetails, salary: text })}
                                    editable={!isPending}
                                    required
                                    containerStyle={{ flex: 1 }}
                                />
                                <Input
                                    label="Experience (years)"
                                    placeholder="e.g. 2"
                                    value={jobDetails.experience}
                                    onChangeText={(text) => setJobDetails({ ...jobDetails, experience: text })}
                                    editable={!isPending}
                                    keyboardType="numeric"
                                    required
                                    containerStyle={{ flex: 1 }}
                                />
                            </View>

                            {/* Location + Positions row */}
                            <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md }}>
                                <Input
                                    label="Location"
                                    placeholder="e.g. Bangalore"
                                    value={jobDetails.location}
                                    onChangeText={(text) => setJobDetails({ ...jobDetails, location: text })}
                                    editable={!isPending}
                                    required
                                    containerStyle={{ flex: 1 }}
                                />
                                <Input
                                    label="No. of Positions"
                                    placeholder="e.g. 3"
                                    value={jobDetails.position}
                                    onChangeText={(text) => setJobDetails({ ...jobDetails, position: text })}
                                    editable={!isPending}
                                    keyboardType="numeric"
                                    required
                                    containerStyle={{ flex: 1 }}
                                />
                            </View>

                            {/* Job Type Dropdown */}
                            <View style={{ marginBottom: spacing.md, zIndex: 20 }}>
                                <Text
                                    style={{
                                        fontSize: moderateScale(14),
                                        marginBottom: moderateScale(6),
                                        color: colors.primaryTextColor,
                                        fontWeight: '600',
                                    }}
                                >
                                    Job Type <Text style={{ color: colors.primaryColor }}>*</Text>
                                </Text>
                                <TouchableOpacity
                                    onPress={() => { setJobTypeDropdownOpen(!jobTypeDropdownOpen); setCompanyDropdownOpen(false); }}
                                    disabled={isPending}
                                    activeOpacity={0.7}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderWidth: 1,
                                        borderColor: '#d4d4d8',
                                        borderRadius: moderateScale(8),
                                        paddingHorizontal: moderateScale(12),
                                        paddingVertical: moderateScale(12),
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: moderateScale(14),
                                            color: jobDetails.jobType ? colors.primaryTextColor : colors.placeholderColor,
                                        }}
                                    >
                                        {jobDetails.jobType || 'Select job type'}
                                    </Text>
                                    <ChevronDown
                                        size={moderateScale(16)}
                                        color={colors.secondaryTextColor}
                                        style={{ transform: [{ rotate: jobTypeDropdownOpen ? '180deg' : '0deg' }] }}
                                    />
                                </TouchableOpacity>
                                {jobTypeDropdownOpen && (
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#d4d4d8',
                                            borderRadius: moderateScale(8),
                                            marginTop: spacing.xs,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {jobTypes.map((type) => (
                                            <TouchableOpacity
                                                key={type}
                                                onPress={() => {
                                                    setJobDetails({ ...jobDetails, jobType: type })
                                                    setJobTypeDropdownOpen(false)
                                                }}
                                                activeOpacity={0.7}
                                                style={{
                                                    paddingVertical: spacing.sm,
                                                    paddingHorizontal: moderateScale(12),
                                                    backgroundColor: jobDetails.jobType === type ? colors.backgroundGray : '#fff',
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: moderateScale(14),
                                                        color: colors.primaryTextColor,
                                                        fontWeight: jobDetails.jobType === type ? '700' : '400',
                                                    }}
                                                >
                                                    {type}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </View>

                            {/* Company Dropdown */}
                            <View style={{ marginBottom: spacing.lg, zIndex: 10 }}>
                                <Text
                                    style={{
                                        fontSize: moderateScale(14),
                                        marginBottom: moderateScale(6),
                                        color: colors.primaryTextColor,
                                        fontWeight: '600',
                                    }}
                                >
                                    Company <Text style={{ color: colors.primaryColor }}>*</Text>
                                </Text>
                                <TouchableOpacity
                                    onPress={() => { setCompanyDropdownOpen(!companyDropdownOpen); setJobTypeDropdownOpen(false); }}
                                    disabled={isPending}
                                    activeOpacity={0.7}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderWidth: 1,
                                        borderColor: '#d4d4d8',
                                        borderRadius: moderateScale(8),
                                        paddingHorizontal: moderateScale(12),
                                        paddingVertical: moderateScale(12),
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: moderateScale(14),
                                            color: jobDetails.companyName ? colors.primaryTextColor : colors.placeholderColor,
                                        }}
                                    >
                                        {jobDetails.companyName || 'Select a company'}
                                    </Text>
                                    <ChevronDown
                                        size={moderateScale(16)}
                                        color={colors.secondaryTextColor}
                                        style={{ transform: [{ rotate: companyDropdownOpen ? '180deg' : '0deg' }] }}
                                    />
                                </TouchableOpacity>
                                {companyDropdownOpen && (
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#d4d4d8',
                                            borderRadius: moderateScale(8),
                                            marginTop: spacing.xs,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {(!companies || companies.length === 0) ? (
                                            <View style={{ padding: spacing.md, alignItems: 'center' }}>
                                                <Text style={typography.body}>No companies found. Create one first.</Text>
                                            </View>
                                        ) : (
                                            companies.map((company: any) => (
                                                <TouchableOpacity
                                                    key={company._id}
                                                    onPress={() => {
                                                        setJobDetails({ ...jobDetails, companyId: company._id, companyName: company.name })
                                                        setCompanyDropdownOpen(false)
                                                    }}
                                                    activeOpacity={0.7}
                                                    style={{
                                                        paddingVertical: spacing.sm,
                                                        paddingHorizontal: moderateScale(12),
                                                        backgroundColor: jobDetails.companyId === company._id ? colors.backgroundGray : '#fff',
                                                    }}
                                                >
                                                    <Text
                                                        className="capitalize"
                                                        style={{
                                                            fontSize: moderateScale(14),
                                                            color: colors.primaryTextColor,
                                                            fontWeight: jobDetails.companyId === company._id ? '700' : '400',
                                                        }}
                                                    >
                                                        {company.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))
                                        )}
                                    </View>
                                )}
                            </View>

                            {/* Submit */}
                            <Button
                                title="Post Job"
                                onPress={handlePostJob}
                                loading={isPending}
                                disabled={isPending}
                                size="medium"
                                style={{ marginBottom: spacing.lg }}
                            />
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeScreen>
            </Modal>
        </SafeScreen>
    )
}

export default Jobs