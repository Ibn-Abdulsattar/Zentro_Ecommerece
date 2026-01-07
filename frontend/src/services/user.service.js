import axios from "axios";

const API_URL = import.meta.env.VITE_Backend_Url;

const authApi = axios.create({
  baseURL: `${API_URL}/profile`,
  withCredentials: true,
});

const userService = {
  profile: async () => {
    const response = await authApi.get("/me");
    return response.data;
  },
  updateProfile: async (formData) => {
  const response = await authApi.put("/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
};

export default userService;
