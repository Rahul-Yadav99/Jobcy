import { APPLICATION_API_END_POINT, COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
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
    },

    registerNewCompany: async (companyName: string) => {
        try {
            const response = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.data.company;
        } catch (error: any) {
            throw error.response.data.message;
        }
    },

    deleteCompany: async (companyId: string) => {
        try {
            const response = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
                withCredentials: true,
            })
            return response.data.message;
        } catch (error: any) {
            throw error.response.data.message;
        }
    },

    updateCompany: async (companyId: string, payload: any) => {
        try {
            const response = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, payload, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data.company;
        } catch (error: any) {
            throw error.response.data.message;
        }
    },

    getAllJobs: async () => {
        try {
            const response = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.data.jobs;
        } catch (error: any) {
            throw error.response.data.message;
        }
    },

    getApplications: async (jobId: string) => {
        try {
            const response = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.data.job.applications;
        } catch (error: any) {
            throw error.response.data.message;
        }
    },

    deleteJob: async (jobId: string) => {
        try {
            const response = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
                withCredentials: true,
            })
            return response.data.message;
        } catch (error: any) {
            throw error.response.data.message;
        }
    }
}

export default recruiterApi;