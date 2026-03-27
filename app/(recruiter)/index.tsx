import recruiterApi from '@/api/recruiter'
import CompanyCard from '@/components/CompanyCard'
import Header from '@/components/Header'
import ModalCloseButton from '@/components/ModalCloseButton'
import SafeScreen from '@/components/SafeScreen'
import { colors, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react-native'
import React from 'react'
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const RecruiterHome = () => {
    const [modalVisible, setModalVisible] = React.useState(true);

    const { data, isLoading, error } = useQuery({
        queryKey: ['companies'],
        queryFn: recruiterApi.getAllCompanies,
    })

    console.log('Companies data:', data);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <SafeScreen>
            <Header />
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: spacing.md,
                }}
            >

                <FlatList
                    data={data || []}
                    keyExtractor={(item) => item?._id}
                    renderItem={({ item }) => <CompanyCard item={item} />}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <Text style={typography.h3}>
                            Companies
                        </Text>
                    }
                    ListHeaderComponentStyle={{
                        marginVertical: spacing.md,
                    }}
                />
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
                onRequestClose={() => setModalVisible(false)}

            >
                <View
                    style={{
                        flex: 1,
                        padding: spacing.md,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={typography.h3}>Create company</Text>
                        <ModalCloseButton onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </SafeScreen>
    )
}

export default RecruiterHome