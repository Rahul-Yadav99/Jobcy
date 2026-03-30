import recruiterApi from '@/api/recruiter'
import { formatDate } from '@/utils/formateDate'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as WebBrowser from 'expo-web-browser'
import { Calendar, ChevronDown, FileText, Mail, Phone } from 'lucide-react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const statusColors: Record<string, { bg: string; text: string }> = {
    pending: { bg: '#FEF3C7', text: '#D97706' },
    accepted: { bg: '#D1FAE5', text: '#059669' },
    rejected: { bg: '#FEE2E2', text: '#DC2626' },
    viewed: { bg: '#EFF6FF', text: '#1D4ED8' },
}

const statusOptions = ['pending', 'accepted', 'rejected'] as const

const ApplicantCard = ({ item }: { item: any }) => {
    const applicant = item?.applicant
    const status = item?.status?.toLowerCase() || 'pending'
    const color = statusColors[status] || statusColors.pending
    const resumeUrl = applicant?.profile?.resume
    const queryClient = useQueryClient()
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const { mutate: updateStatus, isPending: isUpdating } = useMutation({
        mutationFn: (newStatus: string) => recruiterApi.updateApplicationStatus(item._id, newStatus),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['applications']
            })
            setDropdownOpen(false)
        },
        onError: (error: string) => {
            Alert.alert('Error', error || 'Failed to update application status. Please try again.');
        }
    })

    const openResume = async () => {
        if (!resumeUrl) {
            Alert.alert('No Resume', 'Resume not available for this applicant.')
            return
        }
        try {
            if (status !== 'viewed' && status !== 'accepted') {
                updateStatus('viewed');
            }
            await WebBrowser.openBrowserAsync(resumeUrl)
        } catch {
            Alert.alert('Error', 'Unable to open resume.')
        }
    }

    return (
        <View
            style={{
                padding: spacing.md,
                borderWidth: 1,
                borderColor: colors.disabledColor,
                borderRadius: spacing.sm,
                marginBottom: spacing.md,
            }}
        >
            {/* Name + Status Badge */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: spacing.sm,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: spacing.sm,
                    }}
                >
                    {/* Avatar */}
                    <View
                        style={{
                            width: spacing.xxl,
                            height: spacing.xxl,
                            borderRadius: spacing.xxl,
                            backgroundColor: colors.primaryColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: moderateScale(16),
                            }}
                        >
                            {applicant?.fullname?.charAt(0)?.toUpperCase()}
                        </Text>
                    </View>
                    <View>
                        <Text className="capitalize" style={typography.h4}>
                            {applicant?.fullname}
                        </Text>
                        <Text style={typography.body}>{applicant?.role}</Text>
                    </View>
                </View>
                {/* Status Badge */}
                <View
                    style={{
                        backgroundColor: color.bg,
                        paddingHorizontal: spacing.sm,
                        paddingVertical: spacing.xs,
                        borderRadius: spacing.xs,
                    }}
                >
                    <Text
                        className="capitalize"
                        style={{
                            color: color.text,
                            fontSize: moderateScale(10),
                            fontWeight: '600',
                        }}
                    >
                        {isUpdating ? 'Updating...' : status}
                    </Text>
                </View>
            </View>

            {/* Email */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.xs,
                }}
            >
                <Mail size={moderateScale(14)} color={colors.secondaryTextColor} />
                <Text style={typography.body}>{applicant?.email}</Text>
            </View>

            {/* Phone */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.xs,
                }}
            >
                <Phone size={moderateScale(14)} color={colors.secondaryTextColor} />
                <Text style={typography.body}>{applicant?.phoneNumber}</Text>
            </View>

            {/* Applied Date */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.sm,
                }}
            >
                <Calendar size={moderateScale(14)} color={colors.secondaryTextColor} />
                <Text style={typography.body}>
                    Applied on {formatDate(item?.createdAt)}
                </Text>
            </View>

            {/* Resume */}
            {applicant?.profile?.resume && (
                <TouchableOpacity
                    onPress={openResume}
                    activeOpacity={0.7}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: spacing.xs,
                        backgroundColor: colors.backgroundGray,
                        paddingVertical: spacing.sm,
                        paddingHorizontal: spacing.sm,
                        borderRadius: spacing.xs,
                        marginBottom: spacing.sm,
                    }}
                >
                    <FileText size={moderateScale(14)} color={colors.primaryColor} />
                    <Text
                        style={{
                            fontSize: moderateScale(12),
                            fontWeight: '600',
                            color: colors.primaryColor,
                        }}
                    >
                        View Resume
                    </Text>
                </TouchableOpacity>
            )}

            {/* Status Dropdown — only show when resume is available */}
            {resumeUrl && (
                <View>
                    <TouchableOpacity
                        onPress={() => setDropdownOpen(!dropdownOpen)}
                        activeOpacity={0.7}
                        disabled={isUpdating}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderWidth: 1,
                            borderColor: colors.disabledColor,
                            borderRadius: spacing.xs,
                            paddingVertical: spacing.sm,
                            paddingHorizontal: spacing.sm,
                        }}
                    >
                        <Text
                            className="capitalize"
                            style={{
                                fontSize: moderateScale(12),
                                fontWeight: '600',
                                color: colors.primaryTextColor,
                            }}
                        >
                            {isUpdating ? 'Updating...' : `Update Status`}
                        </Text>
                        {isUpdating ? (
                            <ActivityIndicator size={moderateScale(14)} color={colors.primaryColor} />
                        ) : (
                            <ChevronDown
                                size={moderateScale(16)}
                                color={colors.secondaryTextColor}
                                style={{ transform: [{ rotate: dropdownOpen ? '180deg' : '0deg' }] }}
                            />
                        )}
                    </TouchableOpacity>

                    {dropdownOpen && !isUpdating && (
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: colors.disabledColor,
                                borderRadius: spacing.xs,
                                marginTop: spacing.xs,
                                overflow: 'hidden',
                            }}
                        >
                            {statusOptions.map((option) => {
                                const optColor = statusColors[option]
                                const isActive = status === option
                                return (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => {
                                            if (!isActive) {
                                                updateStatus(option)
                                            } else {
                                                setDropdownOpen(false)
                                            }
                                        }}
                                        activeOpacity={0.7}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingVertical: spacing.sm,
                                            paddingHorizontal: spacing.sm,
                                            backgroundColor: isActive ? optColor.bg : '#fff',
                                        }}
                                    >
                                        <Text
                                            className="capitalize"
                                            style={{
                                                fontSize: moderateScale(12),
                                                fontWeight: isActive ? '700' : '500',
                                                color: isActive ? optColor.text : colors.primaryTextColor,
                                            }}
                                        >
                                            {option}
                                        </Text>
                                        {isActive && (
                                            <View
                                                style={{
                                                    width: moderateScale(8),
                                                    height: moderateScale(8),
                                                    borderRadius: moderateScale(4),
                                                    backgroundColor: optColor.text,
                                                }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    )}
                </View>
            )}
        </View>
    )
}

export default ApplicantCard