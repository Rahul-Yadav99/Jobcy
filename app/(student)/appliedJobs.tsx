import jobApi from '@/api/job'
import AppliedJobCard from '@/components/AppliedJobCard'
import Empty from '@/components/Empty'
import Header from '@/components/Header'
import SafeScreen from '@/components/SafeScreen'
import { primaryColor, primaryTextColor } from '@/utils/theme'
import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useEffect, useRef } from 'react'
import {
    Animated,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

// ─── Constants ────────────────────────────────────────────────────────────────

const QUERY_KEY = ['applied-jobs']

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const SkeletonBox = ({
    width,
    height,
    borderRadius = 6,
    style,
    anim,
}: {
    width: number | string
    height: number
    borderRadius?: number
    style?: object
    anim: Animated.Value
}) => {
    const bg = anim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['#E8E8E8', '#F2F2F2', '#E8E8E8'],
    })
    return <Animated.View style={[{ width, height, borderRadius, backgroundColor: bg }, style]} />
}

const AppliedJobCardSkeleton = ({ anim }: { anim: Animated.Value }) => {
    const S = (props: Omit<Parameters<typeof SkeletonBox>[0], 'anim'>) => (
        <SkeletonBox {...props} anim={anim} />
    )

    return (
        <View style={skeletonStyles.card}>
            {/* Row 1: company logo + title / company name + status badge */}
            <View style={skeletonStyles.row}>
                <S width={moderateScale(44)} height={moderateScale(44)} borderRadius={moderateScale(8)} />
                <View style={{ flex: 1, marginLeft: moderateScale(10), gap: verticalScale(5) }}>
                    <S width={'65%'} height={moderateScale(14)} />
                    <S width={'40%'} height={moderateScale(12)} />
                </View>
                {/* status badge */}
                <S width={moderateScale(70)} height={moderateScale(24)} borderRadius={moderateScale(12)} />
            </View>

            {/* Row 2: location + salary */}
            <View style={[skeletonStyles.row, { marginTop: verticalScale(10) }]}>
                <S width={moderateScale(13)} height={moderateScale(13)} borderRadius={3} />
                <S width={moderateScale(90)} height={moderateScale(12)} style={{ marginLeft: moderateScale(6) }} />
                <View style={{ width: moderateScale(16) }} />
                <S width={moderateScale(13)} height={moderateScale(13)} borderRadius={3} />
                <S width={moderateScale(60)} height={moderateScale(12)} style={{ marginLeft: moderateScale(6) }} />
            </View>

            {/* Row 3: date */}
            <View style={[skeletonStyles.row, { marginTop: verticalScale(8) }]}>
                <S width={moderateScale(13)} height={moderateScale(13)} borderRadius={3} />
                <S width={moderateScale(80)} height={moderateScale(12)} style={{ marginLeft: moderateScale(6) }} />
            </View>
        </View>
    )
}

const AppliedJobsSkeletonList = ({ count = 6 }: { count?: number }) => {
    const anim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: false }),
                Animated.timing(anim, { toValue: 0, duration: 900, useNativeDriver: false }),
            ])
        )
        loop.start()
        return () => loop.stop()
    }, [anim])

    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <AppliedJobCardSkeleton key={i} anim={anim} />
            ))}
        </>
    )
}

const skeletonStyles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: moderateScale(12),
        padding: moderateScale(12),
        marginBottom: verticalScale(10),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

// ─── Sub-components ───────────────────────────────────────────────────────────

const ListHeader = React.memo(({ count, isLoading }: { count: number; isLoading: boolean }) => (
    <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>
            Applied Jobs{' '}
            {!isLoading && <Text style={styles.listHeaderCount}>({count})</Text>}
        </Text>
    </View>
))

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
    <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Something went wrong.</Text>
        <Text style={styles.retryText} onPress={onRetry}>
            Tap to retry
        </Text>
    </View>
)

// ─── Main Component ───────────────────────────────────────────────────────────

const AppliedJobs = () => {
    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: jobApi.getAppliedJobs,
        staleTime: 1000 * 60 * 2,
        retry: 2,
    })

    const appliedJobs = data?.application ?? []
    const isRefreshing = !isLoading && isFetching

    const handleRetry = useCallback(() => refetch(), [refetch])

    const renderItem = useCallback(
        ({ item }: { item: any }) => <AppliedJobCard job={item} />,
        []
    )

    const keyExtractor = useCallback((item: any) => item._id, [])

    const renderListHeader = useCallback(
        () => (
            <>
                <ListHeader count={appliedJobs.length} isLoading={isLoading} />
                {isLoading && <AppliedJobsSkeletonList count={6} />}
            </>
        ),
        [appliedJobs.length, isLoading]
    )

    const renderEmptyComponent = useCallback(() => {
        if (isLoading) return null
        return <Empty message="No applied jobs yet." />
    }, [isLoading])

    if (error) {
        return (
            <SafeScreen>
                <Header />
                <ErrorState onRetry={handleRetry} />
            </SafeScreen>
        )
    }

    return (
        <SafeScreen>
            <Header />
            <FlatList
                data={isLoading ? [] : appliedJobs}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListHeaderComponent={renderListHeader}
                ListEmptyComponent={renderEmptyComponent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={refetch}
                        colors={[primaryColor]}
                        tintColor={primaryColor}
                    />
                }
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeScreen>
    )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(20),
    },
    listContent: {
        flexGrow: 1,
        paddingBottom: moderateScale(15),
        paddingHorizontal: scale(16),
    },
    listHeader: {
        paddingVertical: verticalScale(12),
    },
    listHeaderText: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: primaryTextColor,
    },
    listHeaderCount: {
        fontWeight: '400',
        color: primaryColor,
    },
    separator: {
        height: verticalScale(10),
    },
    errorText: {
        fontSize: moderateScale(16),
        color: primaryTextColor,
        marginBottom: verticalScale(8),
        textAlign: 'center',
    },
    retryText: {
        fontSize: moderateScale(14),
        color: primaryColor,
        textDecorationLine: 'underline',
    },
})

export default AppliedJobs