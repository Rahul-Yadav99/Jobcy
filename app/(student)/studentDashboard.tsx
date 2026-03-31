import studentApi from '@/api/student'
import ErrorScreen from '@/components/ErrorScreen'
import Header from '@/components/Header'
import SafeScreen from '@/components/SafeScreen'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useQuery } from '@tanstack/react-query'
import { Building, CheckCircle, Clock, Eye, TrendingUp, XCircle } from 'lucide-react-native'
import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, RefreshControl, ScrollView, Text, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { moderateScale } from 'react-native-size-matters'

const SCREEN_WIDTH = Dimensions.get('window').width

// ─── Skeleton Shimmer ───
const SkeletonBox = ({ width, height, borderRadius = 8, style, shimmerAnim }: any) => {
    const bg = shimmerAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['#E8E8E8', '#F2F2F2', '#E8E8E8'],
    })
    return <Animated.View style={[{ width, height, borderRadius, backgroundColor: bg }, style]} />
}

// ─── Summary Stat Card ───

const DashboardSkeleton = () => {
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

    const S = (p: any) => <SkeletonBox {...p} shimmerAnim={anim} />

    const boxWidth = (SCREEN_WIDTH - spacing.md * 2 - spacing.sm * 2) / 3

    return (
        <ScrollView style={{ flex: 1, padding: spacing.md }} showsVerticalScrollIndicator={false}>

            {/* Row 1 */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: spacing.sm
            }}>
                {[1, 2, 3].map(i => (
                    <S key={i} width={boxWidth} height={moderateScale(90)} />
                ))}
            </View>

            {/* Row 2 */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: spacing.lg
            }}>
                {[4, 5, 6].map(i => (
                    <S key={i} width={boxWidth} height={moderateScale(90)} />
                ))}
            </View>

            {/* Chart skeleton */}
            <S width="100%" height={moderateScale(200)} style={{ marginBottom: spacing.lg }} />
            <S width="100%" height={moderateScale(200)} style={{ marginBottom: spacing.lg }} />

            {/* Job breakdown skeleton */}
            {/* {[1, 2, 3, 4].map(i => (
                <S key={i} width="100%" height={moderateScale(70)} style={{ marginBottom: spacing.sm }} />
            ))} */}
        </ScrollView>
    )
}

const StatCard = ({ icon, label, value, bg }: { icon: React.ReactNode; label: string; value: any; bg: string }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: bg,
                borderRadius: spacing.sm,
                padding: spacing.sm,
                alignItems: 'center',
                gap: spacing.xs,
            }}
        >
            {icon}
            <Text style={{ fontSize: moderateScale(18), fontWeight: '800', color: colors.primaryTextColor }}>
                {value}
            </Text>
            <Text style={{ fontSize: moderateScale(9), fontWeight: '600', color: colors.secondaryTextColor, textAlign: 'center' }}>
                {label}
            </Text>
        </View>
    )
}

// ─── Mini status bar for job breakdown ───
const StatusBar = ({ accepted, rejected, pending, total }: any) => {
    if (total === 0) return null
    return (
        <View style={{ flexDirection: 'row', height: moderateScale(6), borderRadius: 3, overflow: 'hidden', marginTop: spacing.xs }}>
            {accepted > 0 && <View style={{ flex: accepted / total, backgroundColor: '#059669' }} />}
            {pending > 0 && <View style={{ flex: pending / total, backgroundColor: '#D97706' }} />}
            {rejected > 0 && <View style={{ flex: rejected / total, backgroundColor: '#DC2626' }} />}
        </View>
    )
}

// ─── Main Dashboard ───
const StudentDashboard = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['dashboard'],
        queryFn: studentApi.getStudentDashboardData,
    })

    if (error) {
        return <ErrorScreen message={error.message} onRetry={refetch} />
    }

    const summary = data?.summary
    const jobBreakdown = data?.jobBreakdown || []
    const graphs = data?.graphs

    const successRate = (summary?.totalApplications ?? 0) > 0
        ? (((summary?.accepted ?? 0) / (summary?.totalApplications ?? 1)) * 100).toFixed(1)
        : '0.0'
    // Prepare chart data for "Jobs Posted" (last 7 days)
    const jobsPerDay = (graphs?.jobsPostedPerDay || []).slice(0, 7).reverse()
    const jobChartLabels = jobsPerDay.map((d: any) => {
        const date = new Date(d.date)
        return `${date.getDate()}/${date.getMonth() + 1}`
    })
    const jobChartValues = jobsPerDay.map((d: any) => d.jobs)

    const chartConfig = {
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
        labelColor: () => colors.secondaryTextColor,
        propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: colors.primaryColor,
        },
        propsForBackgroundLines: {
            strokeDasharray: '',
            stroke: '#f0f0f0',
        },
    }


    const applicationsPerDay = (graphs?.applicationsPerDay || []).slice(0, 7).reverse()
    const applicationsChartLabels = applicationsPerDay.map((d: any) => {
        const date = new Date(d.date)
        return `${date.getDate()}/${date.getMonth() + 1}`
    })
    const applicationsChartValues = applicationsPerDay.map((d: any) => d.applications)

    const studentsChartConfig = {
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
        labelColor: () => colors.secondaryTextColor,
        propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: colors.primaryColor,
        },
        propsForBackgroundLines: {
            strokeDasharray: '',
            stroke: '#f0f0f0',
        },
    }

    return (
        <SafeScreen>
            <Header />
            {isLoading ? (
                <DashboardSkeleton />
            ) : (
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        padding: spacing.md
                    }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={false} onRefresh={refetch} tintColor={colors.primaryColor} />
                    }
                >
                    <Text style={{ ...typography.h2, marginBottom: spacing.md }}>Dashboard</Text>

                    {/* ── Summary Cards ── */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg }}>
                        <StatCard
                            icon={<CheckCircle size={moderateScale(20)} color="#059669" />}
                            label="Accepted"
                            value={summary?.accepted ?? 0}
                            bg="#D1FAE5"
                        />
                        <StatCard
                            icon={<Clock size={moderateScale(20)} color="#D97706" />}
                            label="Pending"
                            value={summary?.pending ?? 0}
                            bg="#FEF3C7"
                        />
                        <StatCard
                            icon={<XCircle size={moderateScale(20)} color="#DC2626" />}
                            label="Rejected"
                            value={summary?.rejected ?? 0}
                            bg="#FEE2E2"
                        />
                    </View>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.sm }}>
                        <StatCard
                            icon={<Eye size={moderateScale(20)} color="#6C63FF" />}
                            label="Viewed"
                            value={summary?.viewed ?? 0}
                            bg="#EDE9FE"
                        />
                        <StatCard
                            icon={<Building size={moderateScale(20)} color="#0891B2" />}
                            label="Total Applications"
                            value={summary?.totalApplications ?? 0}
                            bg="#CFFAFE"
                        />
                        <StatCard
                            icon={<TrendingUp size={moderateScale(20)} color="#7C3AED" />}
                            label="Success Rate"
                            value={`${successRate}%`}
                            bg="#F3E8FF"
                        />
                    </View>


                    {/* ── Jobs Posted Chart ── */}
                    {jobChartLabels.length > 0 && (
                        <View style={{ marginBottom: spacing.lg }}>
                            <Text style={{ ...typography.h4, marginBottom: spacing.sm }}>Jobs Posted (Last 7 Days)</Text>
                            <View
                                style={{
                                    borderRadius: spacing.sm,
                                    overflow: 'hidden',
                                    borderWidth: 1,
                                    borderColor: colors.disabledColor,
                                }}
                            >
                                <LineChart
                                    data={{
                                        labels: jobChartLabels,
                                        datasets: [{ data: jobChartValues.length > 0 ? jobChartValues : [0] }],
                                    }}
                                    width={SCREEN_WIDTH - spacing.md * 2 - 2}
                                    height={moderateScale(200)}
                                    chartConfig={chartConfig}
                                    bezier
                                    style={{ borderRadius: spacing.sm }}
                                    fromZero
                                />
                            </View>
                        </View>
                    )}

                    {/* ── Students Registered Chart ── */}
                    {applicationsChartLabels.length > 0 && (
                        <View style={{ marginBottom: spacing.lg }}>
                            <Text style={{ ...typography.h4, marginBottom: spacing.sm }}>Applications (Last 7 Days)</Text>
                            <View
                                style={{
                                    borderRadius: spacing.sm,
                                    overflow: 'hidden',
                                    borderWidth: 1,
                                    borderColor: colors.disabledColor,
                                }}
                            >
                                <LineChart
                                    data={{
                                        labels: applicationsChartLabels,
                                        datasets: [{ data: applicationsChartValues.length > 0 ? applicationsChartValues : [0] }],
                                    }}
                                    width={SCREEN_WIDTH - spacing.md * 2 - 2}
                                    height={moderateScale(200)}
                                    chartConfig={studentsChartConfig}
                                    bezier
                                    style={{ borderRadius: spacing.sm }}
                                    fromZero
                                />
                            </View>
                        </View>
                    )}

                    {/* ── Job Breakdown ── */}
                    {/* <Text style={{ ...typography.h4, marginBottom: spacing.sm }}>Job Breakdown</Text> */}
                    {/* {jobBreakdown.map((job: any) => (
                        <View
                            key={job.jobId}
                            style={{
                                borderWidth: 1,
                                borderColor: colors.disabledColor,
                                borderRadius: spacing.sm,
                                padding: spacing.md,
                                marginBottom: spacing.sm,
                            }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text className="capitalize" style={{ ...typography.h4, flex: 1, marginRight: spacing.sm }}>
                                    {job.jobTitle}
                                </Text>
                                <View
                                    style={{
                                        backgroundColor: '#EDE9FE',
                                        paddingHorizontal: spacing.sm,
                                        paddingVertical: spacing.xs,
                                        borderRadius: spacing.xs,
                                    }}
                                >
                                    <Text style={{ fontSize: moderateScale(10), fontWeight: '700', color: '#6C63FF' }}>
                                        {job.totalApplicants} applicant{job.totalApplicants !== 1 ? 's' : ''}
                                    </Text>
                                </View>
                            </View>
                            <StatusBar
                                accepted={job.accepted}
                                rejected={job.rejected}
                                pending={job.pending}
                                total={job.totalApplicants}
                            />
                            <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                                    <CheckCircle size={moderateScale(10)} color="#059669" />
                                    <Text style={{ fontSize: moderateScale(10), color: '#059669', fontWeight: '600' }}>
                                        {job.accepted}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                                    <Clock size={moderateScale(10)} color="#D97706" />
                                    <Text style={{ fontSize: moderateScale(10), color: '#D97706', fontWeight: '600' }}>
                                        {job.pending}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                                    <XCircle size={moderateScale(10)} color="#DC2626" />
                                    <Text style={{ fontSize: moderateScale(10), color: '#DC2626', fontWeight: '600' }}>
                                        {job.rejected}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))} */}
                </ScrollView>
            )}
        </SafeScreen>
    )
}

export default StudentDashboard