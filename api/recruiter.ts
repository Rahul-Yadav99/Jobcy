import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const recruiterApi = {
    getAllCompanies: async () => {
        try {
            const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.data.company;
        } catch (error: any) {
            throw error.response.data.message;
        }
    }
}

export default recruiterApi;