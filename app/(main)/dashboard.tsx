import { roleService } from '@/services/roleService'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

const Dashboard = () => {
    const [role,setRole]=useState<string>('')
    useEffect(()=>{
        const fetchRole = async()=>{
            const role = await roleService.getRole()
            if(role){
                setRole(role)
            }
        }
        fetchRole()
    },[])
    return (
        <View>
            <Text>Dashboard</Text>
            <Text>{role}</Text>
        </View>
    )
}

export default Dashboard