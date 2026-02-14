import { USER_API_END_POINT } from "@/utils/constant"
import axios from "axios"

const studentApi = {
    updateProfile: async (data: any) => {
        try {
            const response = await axios.post(`${USER_API_END_POINT}/profile/update`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            return response.data
        } catch (error: any) {
            throw error.response.data.message;
        }
    }
}

export default studentApi