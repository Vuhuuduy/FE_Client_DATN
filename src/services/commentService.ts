import api from "../config/axios.customize";
import { IComment } from "../types/comment";

// ========================
// COMMENT SERVICE
// ========================

// Thêm comment (backend lấy userId từ token, không cần gửi)
export const addComment = (
  productId: string,
  data: { rating: number; content: string }
) => {
  return api.post<IComment>(`/comments/${productId}`, data);
};

// Lấy comment theo productId
export const getCommentsByProduct = (productId: string) => {
  return api.get<{ comments: IComment[] }>(`/comments/${productId}`);
};

// Cập nhật comment
export const updateComment = (
  commentId: string,
  data: { rating?: number; content?: string }
) => {
  return api.put<IComment>(`/comments/${commentId}`, data);
};

// Xóa comment
export const deleteComment = (commentId: string) => {
  return api.delete<{ success: boolean; message: string }>(`/comments/${commentId}`);
};

// Lấy tổng số comment & điểm trung bình cho sản phẩm
export const getCommentStats = (productId: string) => {
  return api.get<{ total: number; averageRating: number }>(`/comments/${productId}/stats`);
};

// Like comment
export const likeComment = (commentId: string) => {
  return api.patch<{ message: string; helpful: number }>(`/comments/${commentId}/like`);
};

// Trả lời comment (backend lấy userId từ token)
export const replyToComment = (
  commentId: string,
  data: { content: string }
) => {
  return api.post<IComment>(`/comments/${commentId}/reply`, data);
};
