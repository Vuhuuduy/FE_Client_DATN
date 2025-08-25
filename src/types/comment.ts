// ========================
// Types
// ========================
export interface IReply {
  _id: string;
  userId: {
    _id: string;
    fullname: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

export interface IComment {
  _id: string;
  userId: {
    _id: string;
    fullname: string;
    avatar?: string;
  };
  productId: string;
  rating: number;
  content: string;
  helpful: number; // số lượt like
  replies: IReply[]; // danh sách trả lời
  createdAt: string;
}