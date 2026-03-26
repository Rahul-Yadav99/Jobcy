import recruiterApi from '@/api/recruiter'
import Header from '@/components/Header'
import ModalCloseButton from '@/components/ModalCloseButton'
import SafeScreen from '@/components/SafeScreen'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react-native'
import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const RecruiterHome = () => {
    const [modalVisible, setModalVisible] = React.useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ['companies'],
        queryFn: async () => {
            return recruiterApi.getAllCompanies()
        }
    })

    return (
        <SafeScreen>
            <Header />
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.sm,
                    // flexDirection: 'row',
                    // alignItems: 'center',
                    // justifyContent: 'space-between',
                }}
            >
                <Text style={typography.h3}>Companies</Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className='rounded-full p-2'
                    activeOpacity={0.9}
                    style={{
                        backgroundColor: colors.primaryColor,
                        position: 'absolute',
                        bottom: spacing.xxl,
                        right: spacing.md
                    }}
                >
                    <Plus size={moderateScale(24)} color={'white'} />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                visible={modalVisible}
            >

                <ModalCloseButton onPress={() => setModalVisible(false)} />
            </Modal>
        </SafeScreen>
    )
}

export default RecruiterHome