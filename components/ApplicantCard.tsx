import { formatDate } from '@/utils/formateDate'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import * as WebBrowser from 'expo-web-browser'
import { Calendar, FileText, Mail, Phone } from 'lucide-react-native'
import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const statusColors: Record<string, { bg: string; text: string }> = {
    pending: { bg: '#FEF3C7', text: '#D97706' },
    accepted: { bg: '#D1FAE5', text: '#059669' },
    rejected: { bg: '#FEE2E2', text: '#DC2626' },
    viewed: { bg: '#eff6ff', text: '#1d4ed8' },
}

const ApplicantCard = ({ item }: { item: any }) => {
    const applicant = item?.applicant
    const status = item?.status?.toLowerCase() || 'pending'
    const color = statusColors[status] || statusColors.pending
    const resumeUrl = applicant?.profile?.resume

    const openResume = async () => {
        if (!resumeUrl) {
            Alert.alert('No Resume', 'Resume not available for this applicant.')
            return
        }
        try {
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
                        {status}
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
            {
                applicant?.profile?.resume && (
                    <TouchableOpacity
                        onPress={openResume}
                        activeOpacity={0.7}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: spacing.xs,
                            backgroundColor: resumeUrl ? colors.backgroundGray : '#f9fafb',
                            paddingVertical: spacing.sm,
                            paddingHorizontal: spacing.sm,
                            borderRadius: spacing.xs,
                        }}
                    >
                        <FileText size={moderateScale(14)} color={resumeUrl ? colors.primaryColor : colors.disabledColor} />
                        <Text
                            style={{
                                fontSize: moderateScale(12),
                                fontWeight: '600',
                                color: resumeUrl ? colors.primaryColor : colors.disabledColor,
                            }}
                        >
                            {resumeUrl ? 'View Resume' : 'No resume uploaded'}
                        </Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default ApplicantCard
