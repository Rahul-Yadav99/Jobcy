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

const CompanyCardSkeleton = () => {
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
            {/* Logo + Name row */}
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
                    {/* Logo placeholder */}
                    <S width={spacing.xxl} height={spacing.xxl} borderRadius={spacing.sm} />
                    {/* Company name */}
                    <S width={130} height={16} />
                </View>
                {/* Website icon placeholder */}
                <S width={30} height={30} borderRadius={spacing.xs} />
            </View>

            {/* Description lines */}
            <View style={{ gap: spacing.xs, marginBottom: spacing.sm }}>
                <S width="100%" height={12} />
                <S width="90%" height={12} />
                <S width="60%" height={12} />
            </View>

            {/* Location row */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.sm,
                }}
            >
                <S width={15} height={15} borderRadius={15} />
                <S width={100} height={12} />
            </View>

            {/* Date */}
            <S width={80} height={12} style={{ marginBottom: spacing.sm }} />

            {/* Action buttons row */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: spacing.md,
                    marginTop: spacing.sm,
                }}
            >
                <S width={35} height={35} borderRadius={spacing.sm} />
                <S width={35} height={35} borderRadius={spacing.sm} />
            </View>
        </View>
    )
}

export const CompanyCardSkeletonList = ({ count = 3 }: { count?: number }) => (
    <>
        {Array.from({ length: count }).map((_, i) => (
            <CompanyCardSkeleton key={i} />
        ))}
    </>
)

export default CompanyCardSkeleton
