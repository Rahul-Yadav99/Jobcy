import { colors, spacing } from '@/utils/theme'
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

const ApplicantCardSkeleton = () => {
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
                padding: spacing.md,
                borderWidth: 1,
                borderColor: colors.disabledColor,
                borderRadius: spacing.sm,
                marginBottom: spacing.md,
            }}
        >
            {/* Avatar + Name + Badge row */}
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
                    <S width={spacing.xxl} height={spacing.xxl} borderRadius={spacing.xxl} />
                    <View style={{ gap: spacing.xs }}>
                        {/* Name */}
                        <S width={120} height={14} />
                        {/* Role */}
                        <S width={60} height={11} />
                    </View>
                </View>
                {/* Status badge */}
                <S width={55} height={22} borderRadius={spacing.xs} />
            </View>

            {/* Email row */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.xs,
                }}
            >
                <S width={14} height={14} borderRadius={14} />
                <S width={160} height={12} />
            </View>

            {/* Phone row */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.xs,
                }}
            >
                <S width={14} height={14} borderRadius={14} />
                <S width={110} height={12} />
            </View>

            {/* Date row */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                }}
            >
                <S width={14} height={14} borderRadius={14} />
                <S width={130} height={12} />
            </View>
        </View>
    )
}

export const ApplicantCardSkeletonList = ({ count = 4 }: { count?: number }) => (
    <>
        {Array.from({ length: count }).map((_, i) => (
            <ApplicantCardSkeleton key={i} />
        ))}
    </>
)

export default ApplicantCardSkeleton
