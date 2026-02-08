import { primaryTextColor, secondaryTextColor } from '@/utils/colors'
import React from 'react'
import { Text, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const Recommended = () => {
    // const [jobs, setJobs] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<any>(null);

    // useEffect(() => {
    //     const fetchJobs = async () => {
    //         try {
    //             setLoading(true);
    //             const res = await jobApi.getAllJobs();
    //             setJobs(res.jobs);
    //         } catch (error: any) {
    //             setError(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchJobs();
    // }, []);

    // if (loading) {
    //     return <View className='flex-1 items-center justify-center'>
    //         <ActivityIndicator size={moderateScale(30)} color={primaryColor} />
    //     </View>
    // }
    // if (error) {
    //     return <View className='flex-1 items-center justify-center px-5'>
    //         <Text style={{ color: secondaryTextColor }}>Failed to load jobs. Please try again.</Text>
    //     </View>
    // }
    return (
        <View
            style={{
                paddingHorizontal: moderateScale(20),
                marginBottom: moderateScale(10)
            }}
        >
            <View>
                <Text
                    className='font-bold'
                    style={{ color: primaryTextColor, fontSize: moderateScale(16) }}
                >
                    Recommended for you
                </Text>
                <Text
                    className='text-sm'
                    style={{ color: secondaryTextColor }}
                >
                    as per your preferences
                </Text>
            </View>
        </View>
    )
}

export default Recommended