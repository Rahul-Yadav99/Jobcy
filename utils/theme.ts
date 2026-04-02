import { moderateScale } from "react-native-size-matters";

export const primaryColor = '#6C63FF';
export const placeholderColor = '#9CA3AF';
export const disabledColor = '#D1D5DB';
export const primaryTextColor = '#404040';
export const secondaryTextColor = '#737373';

export const colors = {
    primaryColor: "#6C63FF",
    placeholderColor: "#9CA3AF",
    disabledColor: "#D1D5DB",
    primaryTextColor: "#404040",
    secondaryTextColor: "#737373",
    backgroundGray: '#f3f4f6'
}

export const spacing = {
    xs: moderateScale(4),
    sm: moderateScale(8),
    md: moderateScale(16),
    lg: moderateScale(24),
    xl: moderateScale(32),
    xxl: moderateScale(40),
};

export const fontSize = {
    xs: moderateScale(10),
    sm: moderateScale(12),
    md: moderateScale(14),
    lg: moderateScale(16),
    xl: moderateScale(18),
    xxl: moderateScale(20),
};

export const headingSize = {
    h1: moderateScale(24),
    h2: moderateScale(20),
    h3: moderateScale(18),
    h4: moderateScale(16),
    h5: moderateScale(14),
};








type Status = 'pending' | 'accepted' | 'rejected' | 'viewed';

interface StatusStyle {
    bg: string;
    text: string;
}

const statusStyles: Record<Status, StatusStyle> = {
    pending: { bg: '#FEF3C7', text: '#D97706' },
    accepted: { bg: '#D1FAE5', text: '#059669' },
    rejected: { bg: '#FEE2E2', text: '#DC2626' },
    viewed: { bg: '#EFF6FF', text: '#1D4ED8' },
};

export const getStatusStyle = (status: Status): StatusStyle => {
    return statusStyles[status] || statusStyles.pending;
};