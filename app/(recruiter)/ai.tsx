import recruiterApi from '@/api/recruiter'
import Header from '@/components/Header'
import SafeScreen from '@/components/SafeScreen'
import { Button, Input } from '@/components/ui'
import { colors, primaryTextColor, secondaryTextColor, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useMutation } from '@tanstack/react-query'
import * as Clipboard from 'expo-clipboard'
import { ClipboardIcon } from 'lucide-react-native'
import React, { useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const AI = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    const { mutate: generateJobDescription, isPending } = useMutation({
        mutationFn: () => recruiterApi.generateJobDescription(jobTitle),
        onSuccess: (data) => {
            const description =
                typeof data === 'string'
                    ? data
                    : data?.jobDescription ?? data?.description ?? data?.data ?? '';
            setJobDescription(description);
            setJobTitle('');
        },
        onError: (error: any) => {
            Alert.alert('Error', error || 'Something went wrong');
        }
    })

    const handleGenerate = () => {
        if (!jobTitle.trim()) {
            Alert.alert('Validation', 'Please enter a job title');
            return;
        }

        if (jobTitle.trim().length < 10) {
            Alert.alert('Validation', 'Job title must be at least 10 characters');
            return;
        }

        generateJobDescription();
    }

    const handleCopy = async () => {
        if (!jobDescription) return;
        await Clipboard.setStringAsync(jobDescription);
        Alert.alert('Copied', 'Job description copied to clipboard');
    }

    return (
        <SafeScreen>
            <Header />
            <ScrollView
                style={{ flex: 1, padding: spacing.md }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
            >
                <Text style={{ ...typography.h4, marginBottom: spacing.md }}>
                    Generate Job Description using  <Text style={{ color: colors.primaryColor }}>Jobcy.ai</Text>
                </Text>

                <Input
                    placeholder="Enter Job Title"
                    label='Job Title'
                    value={jobTitle}
                    onChangeText={setJobTitle}
                    required
                />

                <Button
                    title='Generate'
                    loading={isPending}
                    disabled={isPending || !jobTitle.trim()}
                    style={{ marginTop: spacing.md }}
                    onPress={handleGenerate}
                />

                {jobDescription ? (
                    <View
                        style={{
                            marginTop: moderateScale(24),
                            marginBottom: moderateScale(24),
                            borderWidth: 1,
                            borderColor: '#e5e5e5',
                            borderRadius: moderateScale(8),
                            padding: moderateScale(12),
                            gap: moderateScale(8),
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{
                                fontSize: moderateScale(16),
                                fontWeight: 'bold',
                                color: primaryTextColor,
                            }}>
                                Generated Job Description
                            </Text>
                            <TouchableOpacity
                                onPress={handleCopy}
                                style={{
                                    padding: moderateScale(10),
                                    borderRadius: moderateScale(8),
                                    backgroundColor: colors.backgroundGray,
                                }}
                            >
                                <ClipboardIcon size={moderateScale(16)} color={colors.primaryColor} />
                            </TouchableOpacity>
                        </View>

                        <Text style={{
                            ...typography.h5,
                            color: secondaryTextColor,
                            lineHeight: moderateScale(22),
                        }}>
                            {jobDescription}
                        </Text>
                    </View>
                ) : null}

            </ScrollView>
        </SafeScreen>
    )
}

export default AI