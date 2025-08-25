import api from "../config/axios.customize";


export const sendOrderEmail = (orderId: string) => {
  return api.post(`/orders/${orderId}/send-email`);
};
