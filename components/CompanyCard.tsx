import { formatDate } from '@/utils/formateDate'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { Link } from 'expo-router'
import { Globe, MapPin, SquarePen, Trash } from 'lucide-react-native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const CompanyCard = ({ item }: { item: any }) => {
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
                    style={{
                        backgroundColor: colors.backgroundGray,
                        padding: spacing.sm,
                        borderRadius: spacing.sm,
                    }}
                >
                    <SquarePen size={moderateScale(15)} color={colors.primaryTextColor} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                        backgroundColor: colors.backgroundGray,
                        padding: spacing.sm,
                        borderRadius: spacing.sm,
                    }}
                >
                    <Trash size={moderateScale(15)} color={colors.primaryTextColor} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CompanyCard