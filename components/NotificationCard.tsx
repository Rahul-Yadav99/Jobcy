import { formatDate } from '@/utils/formateDate'
import { colors, headingSize, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const NotificationCard = ({ item }: { item: any }) => {

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
                        <Image
                            source={require('@/assets/images/profile.png')}
                            style={{
                                width: spacing.xxl,
                                height: spacing.xxl,
                                borderRadius: spacing.xxl,
                            }}
                        />
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
                                    {item?.sender?.fullname}
                                </Text>
                                <Text style={typography.body}>{normalizeType(item?.type)}
                                </Text>
                            </View>
                            <Text style={{ color: colors.secondaryTextColor }}>{formatDate(item?.createdAt)}</Text>
                        </View>
                    </View>



                </View>
                <Text>{item?.message}</Text>
                {
                    !item?.isRead && (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                                backgroundColor: colors.primaryColor,
                                padding: spacing.sm,
                                borderRadius: spacing.sm,
                                alignSelf: 'flex-center',
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                }}
                            >
                                Mark as read
                            </Text>
                        </TouchableOpacity>
                    )
                }

            </View>
        </View>
    )
}

export default NotificationCard