import jobApi from '@/api/job'
import AppliedJobCard from '@/components/AppliedJobCard'
import Empty from '@/components/Empty'
import Header from '@/components/Header'
import SafeScreen from '@/components/SafeScreen'
import { primaryColor, primaryTextColor } from '@/utils/colors'
import { useQuery } from '@tanstack/react-query'
import React, { useCallback } from 'react'
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

// ─── Constants ───────────────────────────────────────────────────────────────

const QUERY_KEY = ['applied-jobs']

// ─── Sub-components ──────────────────────────────────────────────────────────

const ListHeader = React.memo(({ count }: { count: number }) => (
    <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>
            Applied Jobs{' '}
            <Text style={styles.listHeaderCount}>({count})</Text>
        </Text>
    </View>
))

const LoadingState = () => (
    <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={primaryColor} />
    </View>
)

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
    const {
        data,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: jobApi.getAppliedJobs,
        staleTime: 1000 * 60 * 2,   // 2 minutes
        retry: 2,
    })

    // ── Derived state ──────────────────────────────────────────────────────────

    const appliedJobs = data?.application ?? []
    const isRefreshing = !isLoading && isFetching

    // ── Handlers ───────────────────────────────────────────────────────────────

    const handleRetry = useCallback(() => {
        refetch()
    }, [refetch])

    // ── Renderers ──────────────────────────────────────────────────────────────

    const renderItem = useCallback(
        ({ item }: { item: any }) => <AppliedJobCard job={item} />,
        [],
    )

    const keyExtractor = useCallback((item: any) => item._id, [])

    const renderListHeader = useCallback(
        () => <ListHeader count={appliedJobs.length} />,
        [appliedJobs.length],
    )

    const renderEmptyComponent = useCallback(() => {
        if (isLoading) return null
        return <Empty message="No applied jobs yet." />
    }, [isLoading])

    // ── Early returns ──────────────────────────────────────────────────────────

    if (isLoading) {
        return (
            <SafeScreen>
                <Header />
                <LoadingState />
            </SafeScreen>
        )
    }

    if (error) {
        return (
            <SafeScreen>
                <Header />
                <ErrorState onRetry={handleRetry} />
            </SafeScreen>
        )
    }

    // ── Render ─────────────────────────────────────────────────────────────────

    return (
        <SafeScreen>
            <Header />
            <FlatList
                data={appliedJobs}
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