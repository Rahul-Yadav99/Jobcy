import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const authApi = {
    login: async (payload: any) => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, payload);
            return res.data;
        } catch (error: any) {
            throw error.response.data.message;
        }
    },
    register: async (payload: any) => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, payload);
            return res.data;
        } catch (error: any) {
            throw error.response.data.message;
        }
    }
}

export default authApi;