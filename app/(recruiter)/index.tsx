import recruiterApi from '@/api/recruiter'
import CompanyCard from '@/components/CompanyCard'
import Header from '@/components/Header'
import ModalCloseButton from '@/components/ModalCloseButton'
import SafeScreen from '@/components/SafeScreen'
import { colors, fontSize, spacing } from '@/utils/theme'
import { typography } from '@/utils/typography'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react-native'
import React from 'react'
import { Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const RecruiterHome = () => {

    const queryClient = useQueryClient();

    const [modalVisible, setModalVisible] = React.useState(false); // ✅ false by default
    const [companyName, setCompanyName] = React.useState('');

    const { data, isLoading, error } = useQuery({
        queryKey: ['companies'],
        queryFn: recruiterApi.getAllCompanies,
    })

    // ✅ Store mutation result to access mutate & isPending
    const { mutate: createCompany, isPending } = useMutation({
        mutationFn: (companyName: string) => recruiterApi.registerNewCompany(companyName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
            setModalVisible(false);
            setCompanyName('');
            Alert.alert(
                '🎉 Company Created!',
                'Your company is live! Complete your profile and post your first job to start finding great talent.'
            );
        },
        onError: (error: any) => {
            Alert.alert('Error', error || 'Failed to create company. Please try again.');
        }
    })

    // ✅ Handler with validation
    const handleCreateCompany = () => {
        if (!companyName.trim()) {
            Alert.alert('Validation', 'Please enter a company name.');
            return;
        }
        createCompany(companyName.trim());
    }

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
                        <Text style={typography.h3}>Create Company</Text>
                        <ModalCloseButton onPress={() => setModalVisible(false)} />
                    </View>

                    <View
                        style={{
                            marginTop: spacing.md,
                        }}
                    >
                        <Text style={{
                            color: colors.primaryTextColor,
                            fontSize: fontSize.md,
                            fontWeight: '600',
                        }}>
                            Company Name
                        </Text>
                        <TextInput
                            placeholder='Enter company name'
                            value={companyName}
                            onChangeText={setCompanyName}
                            editable={!isPending} // ✅ Disable input while loading
                            style={{
                                borderWidth: 1,
                                borderColor: colors.disabledColor,
                                padding: spacing.sm,
                                borderRadius: spacing.sm,
                                marginTop: spacing.xs,
                            }}
                        />
                    </View>

                    {/* ✅ onPress connected + disabled while loading */}
                    <TouchableOpacity
                        onPress={handleCreateCompany}
                        disabled={isPending}
                        activeOpacity={0.5}
                        style={{
                            marginTop: spacing.md,
                            backgroundColor: isPending ? colors.disabledColor : colors.primaryColor,
                            padding: spacing.sm,
                            borderRadius: spacing.sm,
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '600',
                            }}
                        >
                            {isPending ? 'Creating...' : 'Create Company'} {/* ✅ Loading text */}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeScreen>
    )
}

export default RecruiterHome