import api from "../config/axios.customize";

export const forgotPasswordApi = (email: string) =>
  api.post("/forgot-password", { email });

export const resetPasswordApi = (token: string, newPassword: string) => {
  return api.post(`/reset-password/${token}`, { newPassword });
  
};

