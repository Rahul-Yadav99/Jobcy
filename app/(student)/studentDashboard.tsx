import studentApi from '@/api/student'
import Header from '@/components/Header'
import SafeScreen from '@/components/SafeScreen'
import { primaryColor } from '@/utils/theme'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { LineChart, PieChart } from 'react-native-chart-kit'
import { moderateScale } from 'react-native-size-matters'

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

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDayLabel = (dateStr: string) => dateStr.split('-')[2]

const safeChartData = (values: number[]): number[] => {
    if (!values || values.length === 0) return [0, 0]
    const hasNonZero = values.some(v => v > 0)
    if (!hasNonZero) return values.map(() => 0.001)
    return values
}

// ─── Skeleton Primitives ──────────────────────────────────────────────────────
const SkeletonBox = ({
    width,
    height,
    borderRadius = 8,
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
    return (
        <Animated.View style={[{ width, height, borderRadius, backgroundColor: bg }, style]} />
    )
}

// ─── Dashboard Skeleton ───────────────────────────────────────────────────────
const DashboardSkeleton: React.FC = () => {
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

    const S = (props: Omit<Parameters<typeof SkeletonBox>[0], 'anim'>) => (
        <SkeletonBox {...props} anim={anim} />
    )

    const CARD_W = (SCREEN_WIDTH - 40 - 20) / 3

    return (
        <ScrollView
            contentContainerStyle={[styles.listContent, { paddingHorizontal: 20, paddingTop: 20 }]}
            showsVerticalScrollIndicator={false}
        >
            {/* Page title + subtitle */}
            <S width={moderateScale(140)} height={moderateScale(28)} borderRadius={6} />
            <S width={moderateScale(190)} height={moderateScale(14)} borderRadius={4} style={{ marginTop: 8, marginBottom: 24 }} />

            {/* Summary section label */}
            <S width={moderateScale(80)} height={moderateScale(14)} borderRadius={4} style={{ marginBottom: 12 }} />

            {/* 6 stat cards in 3-column grid */}
            <View style={styles.statsGrid}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <View key={i} style={[styles.statCard, { width: CARD_W }]}>
                        {/* dot */}
                        <S width={8} height={8} borderRadius={4} style={{ marginBottom: 8 }} />
                        {/* value */}
                        <S width={moderateScale(36)} height={moderateScale(22)} borderRadius={4} style={{ marginBottom: 6 }} />
                        {/* label */}
                        <S width={moderateScale(48)} height={moderateScale(11)} borderRadius={3} />
                    </View>
                ))}
            </View>

            {/* Pie chart card skeleton */}
            <View style={[styles.chartCard, { marginTop: 8 }]}>
                {/* accent bar */}
                <View style={[styles.chartAccentBar, skeletonStyles.accentBarPlaceholder]} />
                <S width={moderateScale(140)} height={moderateScale(14)} borderRadius={4} style={{ marginBottom: 12 }} />
                {/* pie placeholder — circle */}
                <View style={skeletonStyles.pieRow}>
                    <S width={moderateScale(140)} height={moderateScale(140)} borderRadius={moderateScale(70)} />
                    {/* legend */}
                    <View style={skeletonStyles.legendCol}>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <View key={i} style={skeletonStyles.legendRow}>
                                <S width={10} height={10} borderRadius={5} />
                                <S width={moderateScale(60)} height={moderateScale(12)} borderRadius={3} style={{ marginLeft: 8 }} />
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            {/* Line chart card 1 — Applications Per Day */}
            <View style={styles.chartCard}>
                <View style={[styles.chartAccentBar, skeletonStyles.accentBarPlaceholder]} />
                <View style={skeletonStyles.chartTitleRow}>
                    <S width={moderateScale(160)} height={moderateScale(14)} borderRadius={4} />
                    <S width={moderateScale(60)} height={moderateScale(12)} borderRadius={3} />
                </View>
                <S
                    width={'100%'}
                    height={moderateScale(180)}
                    borderRadius={10}
                    style={{ marginTop: 8 }}
                />
            </View>

            {/* Line chart card 2 — Jobs Posted Per Day */}
            <View style={styles.chartCard}>
                <View style={[styles.chartAccentBar, skeletonStyles.accentBarPlaceholder]} />
                <View style={skeletonStyles.chartTitleRow}>
                    <S width={moderateScale(150)} height={moderateScale(14)} borderRadius={4} />
                    <S width={moderateScale(60)} height={moderateScale(12)} borderRadius={3} />
                </View>
                <S
                    width={'100%'}
                    height={moderateScale(180)}
                    borderRadius={10}
                    style={{ marginTop: 8 }}
                />
            </View>
        </ScrollView>
    )
}

const skeletonStyles = StyleSheet.create({
    accentBarPlaceholder: {
        backgroundColor: '#E8E8E8',
    },
    pieRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    legendCol: {
        flex: 1,
        marginLeft: 20,
        gap: 12,
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chartTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 12,
    },
})

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

    // ── Loading ────────────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <SafeScreen>
                <Header />
                <DashboardSkeleton />
            </SafeScreen>
        )
    }

    // ── Error ──────────────────────────────────────────────────────────────────
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

    const applicationsPerDay: any[] = [...(data?.graphs?.applicationsPerDay ?? [])].slice(0, 7).reverse()
    const jobsPostedPerDay: any[] = [...(data?.graphs?.jobsPostedPerDay ?? [])].slice(0, 7).reverse()

    const appLabels = applicationsPerDay.length > 0 ? applicationsPerDay.map(d => formatDayLabel(d.date)) : ['--']
    const appValues = safeChartData(applicationsPerDay.map(d => d.applications))

    const jobLabels = jobsPostedPerDay.length > 0 ? jobsPostedPerDay.map(d => formatDayLabel(d.date)) : ['--']
    const jobValues = safeChartData(jobsPostedPerDay.map(d => d.jobs))

    const applicationChartData = {
        labels: appLabels,
        datasets: [{ data: appValues, color: (opacity = 1) => `rgba(59,130,246,${opacity})`, strokeWidth: 2 }],
    }

    const jobsChartData = {
        labels: jobLabels,
        datasets: [{ data: jobValues, color: (opacity = 1) => `rgba(249,115,22,${opacity})`, strokeWidth: 2 }],
    }

    const statusPieData = [
        { name: 'Accepted', population: summary.accepted, color: COLOR.accepted, legendFontColor: COLOR.textSecondary, legendFontSize: 12 },
        { name: 'Pending', population: summary.pending, color: COLOR.pending, legendFontColor: COLOR.textSecondary, legendFontSize: 12 },
        { name: 'Viewed', population: summary.viewed, color: COLOR.viewed, legendFontColor: COLOR.textSecondary, legendFontSize: 12 },
        { name: 'Rejected', population: summary.rejected, color: COLOR.rejected, legendFontColor: COLOR.textSecondary, legendFontSize: 12 },
    ].filter(d => d.population > 0)

    const BASE_LINE_CONFIG = {
        decimalPlaces: 0,
        backgroundColor: COLOR.surface,
        backgroundGradientFrom: COLOR.surface,
        backgroundGradientTo: COLOR.surface,
        labelColor: (opacity = 1) => `rgba(107,114,128,${opacity})`,
        propsForBackgroundLines: { stroke: '#F1F2F7', strokeDasharray: '' },
    }

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <SafeScreen>
            <Header />
            <ScrollView
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerWrapper}>
                    <Animated.View style={{
                        opacity: headerAnim,
                        transform: [{ translateY: headerAnim.interpolate({ inputRange: [0, 1], outputRange: [-8, 0] }) }],
                    }}>
                        <Text style={styles.pageTitle}>Dashboard</Text>
                        <Text style={styles.pageSubtitle}>Your application overview</Text>
                    </Animated.View>

                    <View style={styles.statsSection}>
                        <SectionHeader title="Summary" />
                        <View style={styles.statsGrid}>
                            <StatCard label="Total" value={summary.totalApplications} color={COLOR.accent} delay={0} />
                            <StatCard label="Pending" value={summary.pending} color={COLOR.pending} delay={60} />
                            <StatCard label="Accepted" value={summary.accepted} color={COLOR.accepted} delay={120} />
                            <StatCard label="Viewed" value={summary.viewed} color={COLOR.viewed} delay={180} />
                            <StatCard label="Rejected" value={summary.rejected} color={COLOR.rejected} delay={240} />
                            <StatCard label="Success" value={`${successRate}%`} color={COLOR.success} delay={300} />
                        </View>
                    </View>

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
                            formatYLabel={(val) => {
                                const n = parseFloat(val)
                                return n < 0.01 ? '0' : String(Math.round(n))
                            }}
                            style={styles.chart}
                        />
                    </ChartCard>

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
                </View>
            </ScrollView>
        </SafeScreen>
    )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
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
})

export default StudentHome