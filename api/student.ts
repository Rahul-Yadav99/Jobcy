import { APPLICATION_API_END_POINT, BASE_API_END_POINT, JOB_API_END_POINT, USER_API_END_POINT } from "@/utils/constant"
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
    },

    getJobDetails: async (id: string) => {
        try {
            const response = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.data
        } catch (error: any) {
            throw error.response.data.message;
        }
    },

    applyJob: async (id: string) => {
        console.log("id", id)
        try {
            const response = await axios.get(`${APPLICATION_API_END_POINT}/apply/${id}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.data
        } catch (error: any) {
            throw error.response.data.message;
        }
    },

    getStudentDashboardData: async () => {
        try {
            const response = await axios.get(`${BASE_API_END_POINT}/student/dashboard`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.data
        } catch (error: any) {
            throw error.response.data.message;
        }
    }
}

export default studentApi