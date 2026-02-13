import { Pencil } from 'lucide-react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

interface EditButtonProps {
    onPress: () => void
}

const EditButton = ({ onPress }: EditButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className='bg-neutral-100'
            style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(10),
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Pencil size={18} color="black" />
        </TouchableOpacity>
    )
}

export default EditButton