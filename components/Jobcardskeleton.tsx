import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const SkeletonBox = ({
    width,
    height,
    borderRadius = 6,
    style,
    shimmerAnim,
}: {
    width: number | string;
    height: number;
    borderRadius?: number;
    style?: object;
    shimmerAnim: Animated.Value;
}) => {
    const backgroundColor = shimmerAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['#E8E8E8', '#F2F2F2', '#E8E8E8'],
    });

    return (
        <Animated.View
            style={[{ width, height, borderRadius, backgroundColor }, style]}
        />
    );
};

const JobCardSkeleton = () => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnim, { toValue: 1, duration: 900, useNativeDriver: false }),
                Animated.timing(shimmerAnim, { toValue: 0, duration: 900, useNativeDriver: false }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [shimmerAnim]);

    const S = (props: Omit<Parameters<typeof SkeletonBox>[0], 'shimmerAnim'>) => (
        <SkeletonBox {...props} shimmerAnim={shimmerAnim} />
    );

    return (
        <View
            style={{
                marginBottom: moderateScale(10),
                padding: moderateScale(10),
                marginHorizontal: moderateScale(20),
                borderWidth: 1,
                borderColor: '#E5E5E5',
                borderRadius: moderateScale(12),
            }}
        >
            {/* Row 1: title + company name (left) | logo (right) */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: verticalScale(4),
                }}
            >
                <View style={{ gap: verticalScale(5) }}>
                    <S width={moderateScale(140)} height={moderateScale(14)} />
                    <S width={moderateScale(90)} height={moderateScale(12)} />
                </View>
                <S
                    width={moderateScale(40)}
                    height={moderateScale(40)}
                    borderRadius={moderateScale(6)}
                />
            </View>

            {/* Row 2: location + date + salary */}
            <View style={{ marginBottom: verticalScale(4), gap: verticalScale(5) }}>
                {/* Location */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(6) }}>
                    <S width={moderateScale(13)} height={moderateScale(13)} borderRadius={3} />
                    <S width={moderateScale(100)} height={moderateScale(12)} />
                </View>

                {/* Date + Salary */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(16) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(4) }}>
                        <S width={moderateScale(13)} height={moderateScale(13)} borderRadius={3} />
                        <S width={moderateScale(70)} height={moderateScale(12)} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(4) }}>
                        <S width={moderateScale(13)} height={moderateScale(13)} borderRadius={3} />
                        <S width={moderateScale(55)} height={moderateScale(12)} />
                    </View>
                </View>
            </View>

            {/* Row 3: job type */}
            <S width={moderateScale(70)} height={moderateScale(12)} />
        </View>
    );
};

// Renders N skeleton cards — drop this wherever you show the list while loading
export const JobCardSkeletonList = ({ count = 6 }: { count?: number }) => (
    <>
        {Array.from({ length: count }).map((_, i) => (
            <JobCardSkeleton key={i} />
        ))}
    </>
);

export default JobCardSkeleton;