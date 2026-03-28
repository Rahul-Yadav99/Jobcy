import { disabledColor, primaryColor } from '@/utils/theme';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    icon?: React.ReactNode;
    style?: any;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    variant = 'primary',
    size = 'medium',
    fullWidth = true,
    icon,
    style,
    activeOpacity = 0.7,
    ...props
}) => {
    // Color schemes for variants
    const colorScheme = {
        primary: { bg: primaryColor, text: 'white' },
        secondary: { bg: '#f3f4f6', text: '#374151' },
        danger: { bg: '#ef4444', text: 'white' },
    };

    // Size configurations
    const sizeConfig = {
        small: { padding: moderateScale(8), fontSize: moderateScale(12) },
        medium: { padding: moderateScale(12), fontSize: moderateScale(14) },
        large: { padding: moderateScale(16), fontSize: moderateScale(16) },
    };

    const colors = colorScheme[variant];
    const sizeStyle = sizeConfig[size];
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={activeOpacity}
            style={[
                {
                    backgroundColor: isDisabled ? disabledColor : colors.bg,
                    paddingHorizontal: sizeStyle.padding,
                    paddingVertical: sizeStyle.padding,
                    borderRadius: moderateScale(8),
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    gap: moderateScale(8),
                    width: fullWidth ? '100%' : 'auto',
                    opacity: isDisabled ? 0.6 : 1,
                },
                style,
            ]}
            {...props}
        >
            {loading && <ActivityIndicator color={colors.text} size="small" />}
            {!loading && icon}
            <Text
                style={{
                    color: colors.text,
                    fontWeight: '600',
                    fontSize: sizeStyle.fontSize,
                }}
            >
                {loading ? `${title}...` : title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
