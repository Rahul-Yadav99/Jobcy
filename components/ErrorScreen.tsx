import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { TriangleAlert } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import BackButton from './BackButton'
import SafeScreen from './SafeScreen'

const ErrorScreen = ({
    message = 'Something went wrong. Please try again.',
    onRetry,
    isDetailsScreen,
}: {
    message?: string
    onRetry?: () => void
    isDetailsScreen?: boolean
}) => {
    return (
        <SafeScreen>
            {isDetailsScreen && (
                <View style={{ padding: moderateScale(16) }}>
                    <BackButton />
                </View>
            )}
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: spacing.md,
                }}
            >
                <View
                    style={{
                        width: moderateScale(80),
                        height: moderateScale(80),
                        borderRadius: moderateScale(40),
                        backgroundColor: '#FEE2E2',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: spacing.md,
                    }}
                >
                    <TriangleAlert size={moderateScale(40)} color="#EF4444" />
                </View>
                <Text
                    style={{
                        ...typography.h4,
                        marginBottom: spacing.xs,
                    }}
                >
                    Oops!
                </Text>
                <Text
                    style={{
                        ...typography.body,
                        textAlign: 'center',
                        color: colors.secondaryTextColor,
                    }}
                >
                    {message}
                </Text>
                {onRetry && (
                    <TouchableOpacity
                        onPress={onRetry}
                        activeOpacity={0.7}
                        style={{
                            marginTop: spacing.lg,
                            backgroundColor: colors.primaryColor,
                            paddingHorizontal: spacing.lg,
                            paddingVertical: spacing.sm,
                            borderRadius: spacing.sm,
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: moderateScale(14),
                                fontWeight: '600',
                            }}
                        >
                            Try Again
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeScreen>
    )
}

export default ErrorScreen
