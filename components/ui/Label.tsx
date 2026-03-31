import { colors } from '@/utils/theme';
import React from 'react';
import { Text, TextProps } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

interface LabelProps extends TextProps {
    label: string;
    required?: boolean;
    error?: string;
}

const Label: React.FC<LabelProps> = ({ label, required = false, error, style, ...props }) => {
    return (
        <Text
            style={[
                {
                    fontSize: moderateScale(14),
                    color: error ? '#ef4444' : colors.primaryTextColor,
                    fontWeight: '600',
                    marginBottom: moderateScale(6),
                },
                style,
            ]}
            {...props}
        >
            {label}
            {required && <Text style={{ color: colors.primaryColor }}> *</Text>}
        </Text>
    );
};

export default Label;
