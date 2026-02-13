import { useRouter } from "expo-router"
import { ChevronLeft } from "lucide-react-native"
import { TouchableOpacity, View } from "react-native"
import { moderateScale } from "react-native-size-matters"

const BackButton = () => {
    const router = useRouter();
    return (

        <View>
            <TouchableOpacity
                className="bg-neutral-100"
                activeOpacity={0.8}
                style={{
                    height: moderateScale(40),
                    width: moderateScale(40),
                    borderRadius: moderateScale(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => router.back()}>
                <ChevronLeft size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default BackButton