import { secondaryTextColor } from '@/utils/theme'
import { typography } from '@/utils/typography'
import React from 'react'
import { Text, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const Recommended = () => {
    return (
        <View
            style={{
                paddingHorizontal: moderateScale(20),
                marginBottom: moderateScale(10),
            }}
        >
            <View>
                <Text
                    style={typography.h3}
                >
                    Recommended for you
                </Text>
                <Text
                   style={typography.body}
                >
                    as per your preferences
                </Text>
            </View>
        </View>
    )
}

export default Recommended