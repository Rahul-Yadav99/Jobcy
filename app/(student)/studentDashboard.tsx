import studentApi from '@/api/student'
import SafeScreen from '@/components/SafeScreen'
import { primaryColor } from '@/utils/colors'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { LineChart, PieChart } from 'react-native-chart-kit'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const CHART_WIDTH = SCREEN_WIDTH - 48

// ─── Tokens ───────────────────────────────────────────────────────────────────
const COLOR = {
    bg: '#F7F8FC',
    surface: '#FFFFFF',
    border: '#EAECF4',
    textPrimary: '#12141D',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    accepted: '#10B981',
    pending: '#F59E0B',
    viewed: '#3B82F6',
    rejected: '#EF4444',
    success: '#8B5CF6',
    accent: '#3B82F6',
    jobs: '#F97316',
}

const STATUS_MAP: Record<string, { color: string; bg: string; label: string }> = {
    accepted: { color: COLOR.accepted, bg: '#D1FAE5', label: 'Accepted' },
    pending:  { color: COLOR.pending,  bg: '#FEF3C7', label: 'Pending'  },
    viewed:   { color: COLOR.viewed,   bg: '#DBEAFE', label: 'Viewed'   },
    rejected: { color: COLOR.rejected, bg: '#FEE2E2', label: 'Rejected' },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDayLabel = (dateStr: string) => dateStr.split('-')[2]

/**
 * react-native-chart-kit crashes when:
 * 1. All values are 0 (division by zero internally)
 * 2. Dataset is empty
 * This helper ensures safe data by adding a tiny epsilon to all-zero arrays.
 */
const safeChartData = (values: number[]): number[] => {
    if (!values || values.length === 0) return [0, 0]
    const hasNonZero = values.some(v => v > 0)
    // If all zeros, return same array but replace one value with tiny number
    // so the chart renders a flat line without crashing
    if (!hasNonZero) return values.map(() => 0.001)
    return values
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard: React.FC<{
    label: string
    value: string | number
    color: string
    delay?: number
}> = ({ label, value, color, delay = 0 }) => {
    const anim = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(anim, { toValue: 1, duration: 500, delay, useNativeDriver: true }).start()
    }, [])
    return (
        <Animated.View style={[
            styles.statCard,
            {
                opacity: anim,
                transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
            },
        ]}>
            <View style={[styles.statDot, { backgroundColor: color }]} />
            <Text style={[styles.statValue, { color }]}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </Animated.View>
    )
}

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
)

// ─── Chart Card ───────────────────────────────────────────────────────────────
const ChartCard: React.FC<{
    title: string
    subtitle?: string
    accentColor: string
    children: React.ReactNode
}> = ({ title, subtitle, accentColor, children }) => (
    <View style={styles.chartCard}>
        <View style={[styles.chartAccentBar, { backgroundColor: accentColor }]} />
        <SectionHeader title={title} subtitle={subtitle} />
        {children}
    </View>
)

// ─── Job Card ─────────────────────────────────────────────────────────────────
const JobCard: React.FC<{ item: any; index: number }> = ({ item, index }) => {
    const anim = useRef(new Animated.Value(0)).current
    const status = STATUS_MAP[item.status] ?? { color: '#6B7280', bg: '#F3F4F6', label: item.status }
    useEffect(() => {
        Animated.timing(anim, { toValue: 1, duration: 400, delay: index * 50, useNativeDriver: true }).start()
    }, [])
    return (
        <Animated.View style={[
            styles.jobCard,
            {
                borderLeftColor: status.color,
                opacity: anim,
                transform: [{ translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
            },
        ]}>
            <View style={styles.jobCardInner}>
                <View style={styles.jobCardLeft}>
                    <Text style={styles.jobTitle} numberOfLines={1}>
                        {item.jobTitle ?? 'Untitled Position'}
                    </Text>
                    <Text style={styles.jobCompany} numberOfLines={1}>
                        {item.companyName ?? 'Unknown Company'}
                    </Text>
                    <Text style={styles.jobDate}>Applied {item.appliedAt}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                    <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                </View>
            </View>
        </Animated.View>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const StudentHome: React.FC = () => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['studentDashboard'],
        queryFn: studentApi.getStudentDashboardData,
    })

    const headerAnim = useRef(new Animated.Value(0)).current
    useEffect(() => {
        if (!isLoading) {
            Animated.timing(headerAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start()
        }
    }, [isLoading])

    if (isLoading) {
        return (
            <SafeScreen>
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={primaryColor} />
                    <Text style={styles.loadingText}>Loading dashboard…</Text>
                </View>
            </SafeScreen>
        )
    }

    if (isError) {
        return (
            <SafeScreen>
                <View style={styles.centered}>
                    <Text style={styles.errorIcon}>⚠️</Text>
                    <Text style={styles.errorTitle}>Something went wrong</Text>
                    <Text style={styles.errorSub}>Could not load your dashboard.</Text>
                    <Text style={styles.retryBtn} onPress={() => refetch()}>Try again</Text>
                </View>
            </SafeScreen>
        )
    }

    // ── Data Prep ──────────────────────────────────────────────────────────────
    const summary = data?.summary ?? {
        totalApplications: 0, pending: 0, viewed: 0, accepted: 0, rejected: 0,
    }

    const successRate = summary.totalApplications > 0
        ? ((summary.accepted / summary.totalApplications) * 100).toFixed(1)
        : '0.0'

    const jobBreakdown: any[] = data?.jobBreakdown ?? []

    // API returns newest-first → slice 7 → reverse for chronological left-to-right
    const applicationsPerDay: any[] = [...(data?.graphs?.applicationsPerDay ?? [])].slice(0, 7).reverse()
    const jobsPostedPerDay: any[]   = [...(data?.graphs?.jobsPostedPerDay   ?? [])].slice(0, 7).reverse()

    const appLabels  = applicationsPerDay.length > 0 ? applicationsPerDay.map(d => formatDayLabel(d.date)) : ['--']
    const appValues  = safeChartData(applicationsPerDay.map(d => d.applications))

    const jobLabels  = jobsPostedPerDay.length > 0 ? jobsPostedPerDay.map(d => formatDayLabel(d.date)) : ['--']
    const jobValues  = safeChartData(jobsPostedPerDay.map(d => d.jobs))

    const applicationChartData = {
        labels: appLabels,
        datasets: [{
            data: appValues,
            color: (opacity = 1) => `rgba(59,130,246,${opacity})`,
            strokeWidth: 2,
        }],
    }

    const jobsChartData = {
        labels: jobLabels,
        datasets: [{
            data: jobValues,
            color: (opacity = 1) => `rgba(249,115,22,${opacity})`,
            strokeWidth: 2,
        }],
    }

    // Filter zero slices — pie chart also crashes with all-zero data
    const statusPieData = [
        { name: 'Accepted', population: summary.accepted,  color: COLOR.accepted, legendFontColor: COLOR.textSecondary, legendFontSize: 12 },
        { name: 'Pending',  population: summary.pending,   color: COLOR.pending,  legendFontColor: COLOR.textSecondary, legendFontSize: 12 },
        { name: 'Viewed',   population: summary.viewed,    color: COLOR.viewed,   legendFontColor: COLOR.textSecondary, legendFontSize: 12 },
        { name: 'Rejected', population: summary.rejected,  color: COLOR.rejected, legendFontColor: COLOR.textSecondary, legendFontSize: 12 },
    ].filter(d => d.population > 0)

    const BASE_LINE_CONFIG = {
        decimalPlaces: 0,
        backgroundColor: COLOR.surface,
        backgroundGradientFrom: COLOR.surface,
        backgroundGradientTo: COLOR.surface,
        labelColor: (opacity = 1) => `rgba(107,114,128,${opacity})`,
        propsForBackgroundLines: { stroke: '#F1F2F7', strokeDasharray: '' },
    }

    // ── List Header ────────────────────────────────────────────────────────────
    const ListHeader = (
        <View style={styles.headerWrapper}>
            {/* Page Title */}
            <Animated.View style={{
                opacity: headerAnim,
                transform: [{ translateY: headerAnim.interpolate({ inputRange: [0, 1], outputRange: [-8, 0] }) }],
            }}>
                <Text style={styles.pageTitle}>Dashboard</Text>
                <Text style={styles.pageSubtitle}>Your application overview</Text>
            </Animated.View>

            {/* Summary Stats */}
            <View style={styles.statsSection}>
                <SectionHeader title="Summary" />
                <View style={styles.statsGrid}>
                    <StatCard label="Total"    value={summary.totalApplications} color={COLOR.accent}   delay={0}   />
                    <StatCard label="Pending"  value={summary.pending}           color={COLOR.pending}  delay={60}  />
                    <StatCard label="Accepted" value={summary.accepted}          color={COLOR.accepted} delay={120} />
                    <StatCard label="Viewed"   value={summary.viewed}            color={COLOR.viewed}   delay={180} />
                    <StatCard label="Rejected" value={summary.rejected}          color={COLOR.rejected} delay={240} />
                    <StatCard label="Success"  value={`${successRate}%`}         color={COLOR.success}  delay={300} />
                </View>
            </View>

            {/* Status Distribution Pie */}
            {statusPieData.length > 0 && (
                <ChartCard title="Status Distribution" accentColor={COLOR.accent}>
                    <PieChart
                        data={statusPieData}
                        width={CHART_WIDTH}
                        height={200}
                        chartConfig={{ color: (opacity = 1) => `rgba(0,0,0,${opacity})` }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="12"
                        absolute
                        style={styles.chart}
                    />
                </ChartCard>
            )}

            {/* Applications Per Day */}
            <ChartCard title="Applications Per Day" subtitle="Last 7 days" accentColor={COLOR.accent}>
                <LineChart
                    data={applicationChartData}
                    width={CHART_WIDTH}
                    height={200}
                    chartConfig={{
                        ...BASE_LINE_CONFIG,
                        color: (opacity = 1) => `rgba(59,130,246,${opacity})`,
                        propsForDots: { r: '4', strokeWidth: '2', stroke: COLOR.accent },
                    }}
                    bezier
                    withInnerLines
                    withOuterLines={false}
                    withShadow={false}
                    // Hide y-axis labels when all values are effectively 0
                    formatYLabel={(val) => {
                        const n = parseFloat(val)
                        return n < 0.01 ? '0' : String(Math.round(n))
                    }}
                    style={styles.chart}
                />
            </ChartCard>

            {/* Jobs Posted Per Day */}
            <ChartCard title="Jobs Posted Per Day" subtitle="Last 7 days" accentColor={COLOR.jobs}>
                <LineChart
                    data={jobsChartData}
                    width={CHART_WIDTH}
                    height={200}
                    chartConfig={{
                        ...BASE_LINE_CONFIG,
                        color: (opacity = 1) => `rgba(249,115,22,${opacity})`,
                        propsForDots: { r: '4', strokeWidth: '2', stroke: COLOR.jobs },
                    }}
                    bezier
                    withInnerLines
                    withOuterLines={false}
                    withShadow={false}
                    formatYLabel={(val) => {
                        const n = parseFloat(val)
                        return n < 0.01 ? '0' : String(Math.round(n))
                    }}
                    style={styles.chart}
                />
            </ChartCard>

            {/* Job List Header */}
            <SectionHeader
                title="Job Applications"
                subtitle={`${jobBreakdown.length} total`}
            />
        </View>
    )

    return (
        <SafeScreen>
            <FlatList
                data={jobBreakdown}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => <JobCard item={item} index={index} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={ListHeader}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>📋</Text>
                        <Text style={styles.emptyTitle}>No applications yet</Text>
                        <Text style={styles.emptyText}>Start applying to jobs and track your progress here.</Text>
                    </View>
                }
            />
        </SafeScreen>
    )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
    loadingText: { fontSize: 14, color: COLOR.textMuted, marginTop: 8 },
    errorIcon: { fontSize: 36, marginBottom: 4 },
    errorTitle: { fontSize: 18, fontWeight: '700', color: COLOR.textPrimary },
    errorSub: { fontSize: 14, color: COLOR.textSecondary },
    retryBtn: { marginTop: 12, fontSize: 14, fontWeight: '600', color: COLOR.accent, textDecorationLine: 'underline' },

    listContent: { backgroundColor: COLOR.bg, paddingBottom: 32 },
    headerWrapper: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 },

    pageTitle: { fontSize: 28, fontWeight: '800', color: COLOR.textPrimary, letterSpacing: -0.5 },
    pageSubtitle: { fontSize: 14, color: COLOR.textMuted, marginTop: 2, marginBottom: 24 },

    statsSection: { marginBottom: 20 },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    statCard: {
        backgroundColor: COLOR.surface,
        borderRadius: 14,
        padding: 14,
        width: (SCREEN_WIDTH - 40 - 20) / 3,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: COLOR.border,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    statDot: { width: 8, height: 8, borderRadius: 4, marginBottom: 8 },
    statValue: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
    statLabel: { fontSize: 11, color: COLOR.textMuted, marginTop: 2, fontWeight: '500' },

    chartCard: {
        backgroundColor: COLOR.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLOR.border,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        overflow: 'hidden',
    },
    chartAccentBar: {
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        borderTopLeftRadius: 16, borderTopRightRadius: 16,
    },
    chart: { borderRadius: 10, marginTop: 8 },

    sectionHeader: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'baseline', marginBottom: 12,
    },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: COLOR.textPrimary, letterSpacing: -0.2 },
    sectionSubtitle: { fontSize: 12, color: COLOR.textMuted, fontWeight: '500' },

    jobCard: {
        backgroundColor: COLOR.surface,
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 14,
        borderLeftWidth: 4,
        borderWidth: 1,
        borderColor: COLOR.border,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
        overflow: 'hidden',
    },
    jobCardInner: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', padding: 14,
    },
    jobCardLeft: { flex: 1, marginRight: 12 },
    jobTitle: { fontSize: 14, fontWeight: '700', color: COLOR.textPrimary },
    jobCompany: { fontSize: 13, color: COLOR.textSecondary, marginTop: 2 },
    jobDate: { fontSize: 11, color: COLOR.textMuted, marginTop: 4 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
    statusText: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize' },

    emptyState: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: 32 },
    emptyIcon: { fontSize: 40, marginBottom: 12 },
    emptyTitle: { fontSize: 17, fontWeight: '700', color: COLOR.textPrimary, marginBottom: 6 },
    emptyText: { fontSize: 14, color: COLOR.textMuted, textAlign: 'center', lineHeight: 20 },
})

export default StudentHome























