import { placeholderColor, primaryTextColor } from '@/utils/theme';
import React from 'react';
import { Text, TextInput, TextInputProps, View, ViewProps } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Label from './Label';

interface InputProps extends TextInputProps {
    label?: string;
    required?: boolean;
    error?: string;
    containerStyle?: ViewProps['style'];
    onChangeText?: (text: string) => void;
}

const Input: React.FC<InputProps> = ({
    label,
    required = false,
    error,
    containerStyle,
    placeholder,
    placeholderTextColor,
    style,
    editable = true,
    ...props
}) => {
    return (
        <View style={containerStyle}>
            {label && (
                <Label
                    label={label}
                    required={required}
                    error={error}
                />
            )}
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor || placeholderColor}
                editable={editable}
                style={[
                    {
                        borderWidth: 1,
                        borderColor: error ? '#ef4444' : '#d4d4d8',
                        borderRadius: moderateScale(8),
                        paddingHorizontal: moderateScale(12),
                        paddingVertical: moderateScale(12),
                        fontSize: moderateScale(14),
                        color: primaryTextColor,
                        opacity: editable ? 1 : 0.6,
                    },
                    style,
                ]}
                {...props}
            />
            {error && (
                <Text
                    style={{
                        color: '#ef4444',
                        fontSize: moderateScale(12),
                        marginTop: moderateScale(4),
                        fontWeight: '500',
                    }}
                >
                    {error}
                </Text>
            )}
        </View>
    );
};

export default Input;
