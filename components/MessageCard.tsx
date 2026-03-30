import studentApi from '@/api/student'
import { formatChatTime } from '@/utils/formatChatTime'
import { colors, headingSize, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCheck } from 'lucide-react-native'
import React from 'react'
import { Alert, Text, View } from 'react-native'

const MessageCard = ({ item }: { item: any }) => {

    const queryClient = useQueryClient();

    const { mutate: markAsRead, isPending } = useMutation({
        mutationFn: (id: string) => studentApi.markAsReadNotification(id),
        onSuccess: () => {
            // Invalidate and refetch the notifications query
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
        onError: (error: string) => {
            Alert.alert('Error', error || 'Failed to mark notification as read. Please try again.');
        }
    });

    const normalizeType = (type: string) => {
        switch (type) {
            case 'message':
                return 'Message'
            case 'application_update':
                return 'Application Update'
            case 'general':
                return 'General'
            case 'interview_invite':
                return 'Interview Invite'
            default:
                return type
        }
    }

    return (
        <View
            style={{
                paddingHorizontal: spacing.md,
            }}
        >
            <View
                style={{
                    borderColor: colors.disabledColor,
                    borderWidth: 1,
                    borderRadius: spacing.sm,
                    padding: spacing.md,
                    gap: spacing.sm,
                    marginBottom: spacing.md,
                }}
            >
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: spacing.sm,
                        }}
                    >
                        {/* <Image
                            source={require('@/assets/images/profile.png')}
                            style={{
                                width: spacing.xxl,
                                height: spacing.xxl,
                                borderRadius: spacing.xxl,
                            }}
                        /> */}
                        <View
                            style={{
                                width: spacing.xxl,
                                height: spacing.xxl,
                                borderRadius: spacing.sm,
                                backgroundColor: colors.backgroundGray,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={typography.h4}>{item?.recipient?.fullname?.charAt(0).toUpperCase() ?? 'S'}</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between', alignItems: 'center'
                            }}
                        >
                            <View>
                                <Text
                                    style={{
                                        fontSize: headingSize.h4,
                                        fontWeight: '600',
                                        color: colors.primaryTextColor,
                                    }}
                                >
                                    {item?.recipient?.fullname ?? 'Student'}
                                </Text>
                                <Text style={typography.body}>{normalizeType(item?.type)}
                                </Text>
                            </View>
                            {
                                item?.isRead ? (
                                    <CheckCheck size={20} color={colors.primaryColor} />
                                ) : (
                                    <CheckCheck size={20} color={colors.disabledColor} />
                                )
                            }

                        </View>
                    </View>
                </View>
                <Text>{item?.message ?? 'No message'}</Text>
                <Text style={{ color: colors.secondaryTextColor }}>{formatChatTime(item?.createdAt)}</Text>
            </View>
        </View>
    )
}

export default MessageCard