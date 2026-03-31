import recruiterApi from '@/api/recruiter'
import { formatDate } from '@/utils/formatDate'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as WebBrowser from 'expo-web-browser'
import { Calendar, ChevronDown, FileText, Mail, Phone, Send } from 'lucide-react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import ModalCloseButton from './ModalCloseButton'
import { Button, Input } from './ui'

const statusColors: Record<string, { bg: string; text: string }> = {
    pending: { bg: '#FEF3C7', text: '#D97706' },
    accepted: { bg: '#D1FAE5', text: '#059669' },
    rejected: { bg: '#FEE2E2', text: '#DC2626' },
    viewed: { bg: '#EFF6FF', text: '#1D4ED8' },
}

const statusOptions = ['pending', 'accepted', 'rejected'] as const
const messageOptions = ['message', 'interview_invite', 'application_update', 'general'] as const

const ApplicantCard = ({ item, isApplicant }: { item: any, isApplicant?: boolean }) => {
    const applicant = isApplicant ? item?.item : item?.applicant
    const status = item?.status?.toLowerCase() || 'pending'
    const color = statusColors[status] || statusColors.pending
    const resumeUrl = applicant?.profile?.resume
    const queryClient = useQueryClient()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [messageDropdownOpen, setMessageDropdownOpen] = useState(false)
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('message')
    const [studentId, setStudentId] = useState('')

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

    const { mutate: sendMessage, isPending: isSending } = useMutation({
        mutationFn: (data: { studentId: string, message: string, type: string }) => recruiterApi.sendMessage(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['applications']
            })
            setVisible(false)
            setMessage('')
            setType('message')
            setStudentId('')
        },
        onError: (error: string) => {
            Alert.alert('Error', error || 'Failed to send message. Please try again.');
        }
    })

    // Helper to reset modal state
    const resetMessageModal = () => {
        setVisible(false)
        setMessage('')
        setType('message')
        setMessageDropdownOpen(false)
        setStudentId('')
    }

    const handleSendMessage = () => {
        if (!message.trim()) {
            Alert.alert('Error', 'Please enter a message before sending.')
            return
        }

        if (!studentId) {
            Alert.alert('Error', 'Student ID is missing.')
            return
        }

        sendMessage({ studentId, message: message.trim(), type })
    }

    const updateResumeStatus = async () => {
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
                            {applicant?.fullname?.charAt(0)?.toUpperCase() ?? 'S'}
                        </Text>
                    </View>
                    <View>
                        <Text className="capitalize" style={typography.h4}>
                            {applicant?.fullname ?? 'Student'}
                        </Text>
                        <Text style={typography.body}>{applicant?.role ?? 'Student'}</Text>
                    </View>
                </View>
                {/* Status Badge */}
                {!isApplicant && (<View
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
                </View>)}

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
                <Text selectable style={typography.body}>
                    {applicant?.email ?? 'student@gmail.com'}
                </Text>
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
                <Text selectable style={typography.body}>{applicant?.phoneNumber ?? '1234567890'}</Text>
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
                    Applied on {formatDate(item?.createdAt) ?? '2022-01-01'}
                </Text>
            </View>

            {/* Resume */}
            {applicant?.profile?.resume && (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: spacing.md,
                    }}
                >
                    <TouchableOpacity
                        onPress={isApplicant ? openResume : updateResumeStatus}
                        activeOpacity={0.7}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: spacing.xs,
                            backgroundColor: colors.backgroundGray,
                            paddingHorizontal: spacing.sm,
                            borderRadius: spacing.xs,
                            marginBottom: spacing.sm,
                            flex: 1,
                            height: moderateScale(40), // ✅ FIX
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

                    <TouchableOpacity
                        onPress={() => { setVisible(true); setStudentId(applicant?._id) }}
                        style={{
                            backgroundColor: colors.backgroundGray,
                            borderRadius: spacing.xs,
                            marginBottom: spacing.sm,
                            height: moderateScale(40),
                            width: moderateScale(40),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Send size={moderateScale(14)} color={colors.primaryColor} />
                    </TouchableOpacity>
                </View>
            )}

            {/* Status Dropdown — only show when resume is available */}
            {!isApplicant && resumeUrl && (
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

            {/* Message modal */}

            <Modal
                visible={visible}
                animationType="slide"
                onRequestClose={resetMessageModal}
            >
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                    }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView
                        style={{ flex: 1, padding: spacing.md }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: spacing.md,
                            }}
                        >
                            <Text style={typography.h3}>Send Message</Text>
                            <ModalCloseButton onPress={resetMessageModal} />
                        </View>
                        <View>
                            <Text style={{ ...typography.h5, textTransform: 'capitalize', marginBottom: spacing.sm, color: colors.primaryTextColor, fontWeight: '600', }}>To : {applicant?.fullname ?? 'Applicant'}</Text>
                            <Input
                                label='Message'
                                placeholder="Message"
                                value={message}
                                onChangeText={setMessage}
                                multiline
                                numberOfLines={140}
                                required
                            />
                        </View>
                        <Text style={{ ...typography.h5, textTransform: 'capitalize', marginBottom: spacing.sm, marginTop: spacing.sm, color: colors.primaryTextColor, fontWeight: '600', }}>Select Message Type</Text>
                        <View>
                            <TouchableOpacity
                                onPress={() => setMessageDropdownOpen(!messageDropdownOpen)}
                                activeOpacity={0.7}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderWidth: 1,
                                    borderColor: colors.disabledColor,
                                    borderRadius: moderateScale(8),
                                    paddingVertical: moderateScale(12),
                                    paddingHorizontal: moderateScale(12),
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: moderateScale(14),
                                        fontWeight: '400',
                                        color: colors.placeholderColor,
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {type}
                                </Text>

                                <ChevronDown
                                    size={moderateScale(16)}
                                    color={colors.secondaryTextColor}
                                    style={{
                                        transform: [{ rotate: messageDropdownOpen ? '180deg' : '0deg' }],
                                    }}
                                />
                            </TouchableOpacity>

                            {messageDropdownOpen && (
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: colors.disabledColor,
                                        borderRadius: spacing.xs,
                                        marginTop: spacing.xs,
                                        overflow: 'hidden',
                                    }}
                                >
                                    {messageOptions.map((option) => {
                                        const isActive = type === option

                                        return (
                                            <TouchableOpacity
                                                key={option}
                                                onPress={() => {
                                                    setType(option) // ✅ select value
                                                    setMessageDropdownOpen(false) // ✅ close dropdown
                                                }}
                                                activeOpacity={0.7}
                                                style={{
                                                    paddingVertical: spacing.sm,
                                                    paddingHorizontal: spacing.sm,
                                                    backgroundColor: isActive ? '#eee' : '#fff',
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: moderateScale(12),
                                                        fontWeight: isActive ? '700' : '500',
                                                        color: colors.primaryTextColor,
                                                        textTransform: 'capitalize',
                                                    }}
                                                >
                                                    {option}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            )}
                        </View>
                        <Button title='Send Message' onPress={handleSendMessage} loading={isSending} disabled={isSending || !message.trim()} size='medium' style={{ marginTop: spacing.md }} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    )
}

export default ApplicantCard