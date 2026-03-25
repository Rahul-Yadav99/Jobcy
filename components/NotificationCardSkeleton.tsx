import { spacing } from '@/utils/theme'
import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'

const SkeletonBox = ({
    width,
    height,
    borderRadius = 6,
    style,
    shimmerAnim,
}: {
    width: number | string
    height: number
    borderRadius?: number
    style?: object
    shimmerAnim: Animated.Value
}) => {
    const backgroundColor = shimmerAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['#E8E8E8', '#F2F2F2', '#E8E8E8'],
    })

    return (
        <Animated.View
            style={[{ width, height, borderRadius, backgroundColor }, style]}
        />
    )
}

const NotificationCardSkeleton = () => {
    const shimmerAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnim, { toValue: 1, duration: 900, useNativeDriver: false }),
                Animated.timing(shimmerAnim, { toValue: 0, duration: 900, useNativeDriver: false }),
            ])
        )
        loop.start()
        return () => loop.stop()
    }, [shimmerAnim])

    const S = (props: Omit<Parameters<typeof SkeletonBox>[0], 'shimmerAnim'>) => (
        <SkeletonBox {...props} shimmerAnim={shimmerAnim} />
    )

    return (
        <View
            style={{
                paddingHorizontal: spacing.md,
            }}
        >
            <View
                style={{
                    borderColor: '#E8E8E8',
                    borderWidth: 1,
                    borderRadius: spacing.sm,
                    padding: spacing.md,
                    gap: spacing.sm,
                    marginBottom: spacing.md,
                }}
            >
                {/* Profile Image + Sender Name + Type + Date */}
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: spacing.sm,
                        }}
                    >
                        {/* Profile Image */}
                        <S
                            width={spacing.xxl}
                            height={spacing.xxl}
                            borderRadius={spacing.xxl}
                        />

                        {/* Sender Name, Type, Date */}
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: spacing.sm,
                            }}
                        >
                            <View style={{ gap: spacing.xs }}>
                                {/* Sender Name */}
                                <S width={120} height={14} />
                                {/* Type */}
                                <S width={90} height={12} />
                            </View>
                            {/* Date */}
                            <S width={60} height={12} />
                        </View>
                    </View>
                </View>

                {/* Message Text */}
                <View style={{ gap: spacing.xs }}>
                    <S width="100%" height={12} />
                    <S width="80%" height={12} />
                </View>

                {/* Mark as Read Button */}
                <S width="100%" height={36} borderRadius={spacing.sm} />
            </View>
        </View>
    )
}

export const NotificationCardSkeletonList = ({ count = 5 }: { count?: number }) => (
    <>
        {Array.from({ length: count }).map((_, i) => (
            <NotificationCardSkeleton key={i} />
        ))}
    </>
)

export default NotificationCardSkeleton
