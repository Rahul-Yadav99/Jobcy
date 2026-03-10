import SafeScreen from '@/components/SafeScreen';
import { spacing } from '@/utils/theme';
import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

// Single animated shimmer bar
const SkeletonBox = ({
    width,
    height,
    borderRadius = 8,
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
        outputRange: ['#E8E8E8', '#F5F5F5', '#E8E8E8'],
    });

    return (
        <Animated.View
            style={[
                {
                    width,
                    height,
                    borderRadius,
                    backgroundColor,
                },
                style,
            ]}
        />
    );
};

const JobDetailsSkeleton = () => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnim, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: false,
                }),
                Animated.timing(shimmerAnim, {
                    toValue: 0,
                    duration: 900,
                    useNativeDriver: false,
                }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [shimmerAnim]);

    const S = (props: Omit<Parameters<typeof SkeletonBox>[0], 'shimmerAnim'>) => (
        <SkeletonBox {...props} shimmerAnim={shimmerAnim} />
    );

    return (
        <SafeScreen>
            <View style={styles.container}>

                {/* Header: back button + title */}
                <View style={styles.header}>
                    {/* Back button circle */}
                    <S width={moderateScale(36)} height={moderateScale(36)} borderRadius={moderateScale(18)} />
                    {/* Title */}
                    <S width={'60%'} height={moderateScale(22)} borderRadius={6} style={{ marginLeft: spacing.md }} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{ paddingBottom: moderateScale(20) }}
                >
                    {/* Company row: logo + name */}
                    <View style={[styles.row, { marginTop: spacing.md }]}>
                        <S width={moderateScale(50)} height={moderateScale(50)} borderRadius={moderateScale(10)} />
                        <S width={'50%'} height={moderateScale(20)} borderRadius={6} style={{ marginLeft: spacing.md }} />
                    </View>

                    {/* Company description — 3 lines */}
                    <View style={{ marginTop: spacing.md, gap: moderateScale(8) }}>
                        <S width={'100%'} height={moderateScale(14)} borderRadius={4} />
                        <S width={'95%'} height={moderateScale(14)} borderRadius={4} />
                        <S width={'80%'} height={moderateScale(14)} borderRadius={4} />
                    </View>

                    {/* Icon + info rows (salary, location, jobType, requirements) */}
                    {[...Array(4)].map((_, i) => (
                        <View key={i} style={[styles.row, { marginTop: spacing.md }]}>
                            <S width={moderateScale(18)} height={moderateScale(18)} borderRadius={4} />
                            <S
                                width={`${45 + (i % 3) * 10}%`}
                                height={moderateScale(16)}
                                borderRadius={4}
                                style={{ marginLeft: spacing.sm }}
                            />
                        </View>
                    ))}

                    {/* Job description — 5 lines */}
                    <View style={{ marginTop: spacing.md, gap: moderateScale(8) }}>
                        {[100, 97, 100, 92, 70].map((w, i) => (
                            <S key={i} width={`${w}%`} height={moderateScale(14)} borderRadius={4} />
                        ))}
                    </View>

                    {/* Posted date */}
                    <View style={[styles.row, { marginTop: spacing.md }]}>
                        <S width={moderateScale(18)} height={moderateScale(18)} borderRadius={4} />
                        <S width={'40%'} height={moderateScale(16)} borderRadius={4} style={{ marginLeft: spacing.sm }} />
                    </View>

                    {/* Positions Available / Experience Level / No of Applications */}
                    {[...Array(3)].map((_, i) => (
                        <View key={i} style={[styles.row, { marginTop: spacing.md }]}>
                            <S width={'45%'} height={moderateScale(16)} borderRadius={4} />
                            <S width={'15%'} height={moderateScale(16)} borderRadius={4} style={{ marginLeft: spacing.sm }} />
                        </View>
                    ))}

                    {/* Apply button */}
                    <S
                        width={'100%'}
                        height={moderateScale(48)}
                        borderRadius={moderateScale(12)}
                        style={{ marginTop: spacing.md }}
                    />
                </ScrollView>
            </View>
        </SafeScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: moderateScale(16),
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default JobDetailsSkeleton;