import axios from 'axios';

const API_URL = import.meta.env.VITE_Backend_Url;

const authApi = axios.create({
    baseURL: `${API_URL}/user`,
    withCredentials:true,
})

export const authService = {
    authenticate: async (mode, data)=>{
        const response = await authApi.post(`/${mode}`, data);
        return response.data;
    },
    verifyOtp: async (data)=>{
        const response = await authApi.post('/verify-otp', data);
        return response.data;
    },
    resetPassword: async(resetToken,data)=>{
        const response = await authApi.put(`/reset-password/${resetToken}`, data);
        return response.data;
    },
    OAuthGoogle : async(credentialResponse)=>{
        const response = await authApi.post("/google", credentialResponse);
        return response.data;
    }
}