import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const jobApi = {
    getAllJobs: async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return res.data;
        } catch (error: any) {
            throw error.response?.data?.message || "Something went wrong";
        }
    },

    getAppliedJobs: async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return res.data;
        } catch (error: any) {
            throw error.response?.data?.message || "Something went wrong";
        }
    }
}

export default jobApi