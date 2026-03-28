import recruiterApi from '@/api/recruiter'
import { Button, Input } from '@/components/ui'
import { formatDate } from '@/utils/formateDate'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as DocumentPicker from 'expo-document-picker'
import { Link } from 'expo-router'
import { Globe, ImagePlus, MapPin, SquarePen, Trash } from 'lucide-react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import ModalCloseButton from './ModalCloseButton'

const CompanyCard = ({ item }: { item: any }) => {

    const queryClient = useQueryClient();

    const [visible, setVisible] = useState(false);
    const [companyDetails, setCompanyDetails] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null as any,
    })

    const { mutate: deleteCompany, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => recruiterApi.deleteCompany(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['companies']
            })
        },
        onError: (error: string) => {
            Alert.alert('Error', error || 'Failed to delete company. Please try again.');
        }
    })

    const { mutate: updateCompany, isPending: isUpdating } = useMutation({
        mutationFn: async () => {
            const formData = new FormData();
            formData.append('name', companyDetails.name || item.name);
            formData.append('description', companyDetails.description || item.description);
            formData.append('website', companyDetails.website || item.website);
            formData.append('location', companyDetails.location || item.location);

            if (companyDetails.file) {
                formData.append('file', {
                    uri: companyDetails.file.uri,
                    name: companyDetails.file.name,
                    type: companyDetails.file.mimeType,
                } as any)
            }

            return recruiterApi.updateCompany(item._id, formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['companies']
            })
            Alert.alert('Success', 'Company updated successfully!');
            setVisible(false);
            resetForm();
        },
        onError: (error: string) => {
            Alert.alert('Error', error || 'Failed to update company. Please try again.');
        }
    })

    const resetForm = () => {
        setCompanyDetails({
            name: '',
            description: '',
            website: '',
            location: '',
            file: null,
        })
    }

    const handleEditPress = () => {
        setCompanyDetails({
            name: item.name,
            description: item.description,
            website: item.website,
            location: item.location,
            file: null,
        })
        setVisible(true)
    }

    const handleDelete = () => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this company? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deleteCompany(item._id) }
            ]
        );
    }

    const pickFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
            })
            if (result.assets && result.assets.length > 0) {
                const file = result.assets[0];
                const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

                // Check file size
                if (file.size && file.size > MAX_FILE_SIZE) {
                    Alert.alert(
                        'File Too Large',
                        `File size must not exceed 3 MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`
                    );
                    return;
                }

                setCompanyDetails({ ...companyDetails, file })
            }
        } catch (error: any) {
            Alert.alert(error.message, 'Failed to pick file');
        }
    }

    return (
        <View
            style={{
                padding: spacing.md,
                borderWidth: 1,
                borderColor: colors.disabledColor,
                borderRadius: spacing.sm,
                marginBottom: spacing.md,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: spacing.sm,
                    marginBottom: spacing.sm,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: spacing.sm,
                    }}
                >
                    {
                        item?.logo ? (
                            <Image
                                source={{ uri: item?.logo }}
                                style={{ width: spacing.xxl, height: spacing.xxl }}
                                resizeMode='contain'
                            />
                        ) : (
                            <View
                                style={{
                                    width: spacing.xxl,
                                    height: spacing.xxl,
                                    borderRadius: spacing.sm,
                                    backgroundColor: colors.backgroundGray,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={typography.h4}>{item?.name.charAt(0).toUpperCase()}</Text>
                            </View>
                        )
                    }
                    <Text className='capitalize' style={typography.h4}>{item?.name}</Text>
                </View>
                {
                    item.website && (item?.website.trim() === '' ?
                        null : <Link href={item?.website} style={{ backgroundColor: colors.primaryColor, padding: spacing.xs, borderRadius: spacing.xs }}>
                            <Globe size={spacing.md} color={'white'} />
                        </Link>)
                }

            </View>
            <Text
                style={{
                    textAlign: 'justify',
                    ...typography.body,
                    marginBottom: spacing.sm,
                }}
            >
                {item?.description}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.sm,
                }}
            >
                <MapPin size={moderateScale(15)} color={colors.secondaryTextColor} />
                <Text style={typography.body}>{item?.location}</Text>
            </View>
            <Text style={{ color: colors.primaryTextColor }}>{formatDate(item?.createdAt)}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: spacing.md,
                    marginTop: spacing.sm,
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleEditPress}
                    style={{
                        backgroundColor: colors.backgroundGray,
                        padding: spacing.sm,
                        borderRadius: spacing.sm,
                    }}
                >
                    <SquarePen size={moderateScale(15)} color={colors.primaryTextColor} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleDelete}
                    disabled={isDeleting}
                    activeOpacity={0.5}
                    style={{
                        backgroundColor: colors.backgroundGray,
                        padding: spacing.sm,
                        borderRadius: spacing.sm,
                    }}
                >
                    {
                        isDeleting ?
                            <ActivityIndicator size={moderateScale(15)} color={colors.primaryTextColor} /> :
                            <Trash size={moderateScale(15)} color={colors.primaryTextColor} />
                    }

                </TouchableOpacity>
            </View>

            <Modal
                visible={visible}
                animationType="slide"
                onRequestClose={() => { setVisible(false); resetForm(); }}
            >
                <ScrollView
                    style={{
                        flex: 1,
                        padding: spacing.md,
                        // backgroundColor: colo,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: spacing.md,
                        }}
                    >
                        <Text style={typography.h3}>Update Company Details</Text>
                        <ModalCloseButton onPress={() => { setVisible(false); resetForm(); }} />
                    </View>

                    {/* Logo Section */}
                    <TouchableOpacity
                        onPress={pickFile}
                        disabled={isUpdating}
                        style={{
                            borderWidth: 2,
                            borderColor: colors.primaryColor,
                            borderStyle: 'dashed',
                            borderRadius: spacing.sm,
                            padding: spacing.lg,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: spacing.md,
                        }}
                    >
                        {companyDetails.file ? (
                            <Image
                                source={{ uri: companyDetails.file.uri }}
                                style={{ width: 100, height: 100, borderRadius: spacing.sm }}
                                resizeMode='cover'
                            />
                        ) : item?.logo ? (
                            <View>
                                <Image
                                    source={{ uri: item.logo }}
                                    style={{ width: 100, height: 100, borderRadius: spacing.sm }}
                                    resizeMode='contain'
                                />
                                <Text style={{ ...typography.body, marginTop: spacing.sm, textAlign: 'center' }}>
                                    Tap to change logo
                                </Text>
                            </View>
                        ) : (
                            <View style={{ alignItems: 'center' }}>
                                <ImagePlus size={moderateScale(40)} color={colors.primaryColor} />
                                <Text style={{ ...typography.body, marginTop: spacing.sm, color: colors.primaryColor }}>
                                    Tap to add logo
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Company Name */}
                    <Input
                        label="Company Name"
                        placeholder="Enter company name"
                        value={companyDetails.name}
                        onChangeText={(text) => setCompanyDetails({ ...companyDetails, name: text })}
                        editable={!isUpdating}
                        required
                        containerStyle={{ marginBottom: spacing.md }}
                    />

                    {/* Description */}
                    <Input
                        label="Description"
                        placeholder="Enter company description"
                        value={companyDetails.description}
                        onChangeText={(text) => setCompanyDetails({ ...companyDetails, description: text })}
                        editable={!isUpdating}
                        multiline
                        numberOfLines={4}
                        containerStyle={{ marginBottom: spacing.md }}
                    />

                    {/* Website */}
                    <Input
                        label="Website"
                        placeholder="https://example.com"
                        value={companyDetails.website}
                        onChangeText={(text) => setCompanyDetails({ ...companyDetails, website: text })}
                        editable={!isUpdating}
                        keyboardType="url"
                        containerStyle={{ marginBottom: spacing.md }}
                    />

                    {/* Location */}
                    <Input
                        label="Location"
                        placeholder="Enter company location"
                        value={companyDetails.location}
                        onChangeText={(text) => setCompanyDetails({ ...companyDetails, location: text })}
                        editable={!isUpdating}
                        containerStyle={{ marginBottom: spacing.lg }}
                    />

                    {/* Update Button */}
                    <Button
                        title="Update Details"
                        onPress={() => updateCompany()}
                        loading={isUpdating}
                        disabled={isUpdating || !companyDetails.name.trim()}
                        size="medium"
                        style={{ marginBottom: spacing.lg }}
                    />
                </ScrollView>
            </Modal>
        </View>
    )
}

export default CompanyCard