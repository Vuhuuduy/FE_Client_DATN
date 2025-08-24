import { useEffect, useState } from "react";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";
import api from "../../config/axios.customize";
import { IComment, IReply } from "../../types/comment";
import { useAuth } from "../../context/AuthContext";

type ProductReviewsProps = {
  productId: string;
  rating: number;
  reviewCount: number;
};

export function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const { user: currentUser } = useAuth();
  const [reviews, setReviews] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});
  const [openReplyBox, setOpenReplyBox] = useState<string | null>(null);

  // Lấy comments từ server
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/comments/${productId}`);
      setReviews(res.data.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy bình luận:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // Like comment
  const handleLike = async (commentId: string) => {
    try {
      const res = await api.patch(`comments/${commentId}/like`);
      setReviews((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, helpful: res.data.helpful } : c
        )
      );
    } catch (err) {
      console.error("Lỗi like:", err);
    }
  };

  // Reply comment
  const handleReply = async (commentId: string) => {
    const content = replyContent[commentId]?.trim();
    if (!content) return;

    try {
      const res = await api.post(`comments/${commentId}/reply`, { content });
      const updatedComment: IComment = res.data.comment;

      setReviews((prev) =>
        prev.map((c) => (c._id === commentId ? updatedComment : c))
      );

      setReplyContent((prev) => ({ ...prev, [commentId]: "" }));
      setOpenReplyBox(null);
    } catch (err) {
      console.error("Lỗi reply:", err);
    }
  };

  if (loading) return <p>Đang tải đánh giá...</p>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Đánh giá khách hàng</h3>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tổng quan rating */}
        

        {/* Danh sách bình luận */}
        <div className="md:col-span-2 space-y-6">
          {reviews.length === 0 ? (
            <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
          ) : (
            reviews.map((review) => {
              const userName = review.userId?.fullname ?? "Người dùng";
              const isCurrentUser = currentUser?._id === review.userId?._id;

              return (
                <div key={review._id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{userName}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span>•</span>
                        <span>
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleDateString("vi-VN")
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{review.content}</p>

                  {/* Nút like & reply */}
                  <div className="flex items-center gap-4 text-sm">
                    <button
                      className="flex items-center gap-1 text-gray-500 hover:text-black transition-colors"
                      onClick={() => handleLike(review._id)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Hữu ích ({review.helpful || 0})
                    </button>

                    {!isCurrentUser && (
                      <button
                        className="flex items-center gap-1 text-gray-500 hover:text-black transition-colors"
                        onClick={() =>
                          setOpenReplyBox(openReplyBox === review._id ? null : review._id)
                        }
                      >
                        <MessageCircle className="h-4 w-4" />
                        Trả lời
                      </button>
                    )}
                  </div>

                  {/* Reply box chỉ cho người khác reply */}
                  {openReplyBox === review._id && !isCurrentUser && (
                    <div className="mt-2 flex flex-col gap-2">
                      <textarea
                        value={replyContent[review._id] || ""}
                        onChange={(e) =>
                          setReplyContent((prev) => ({
                            ...prev,
                            [review._id]: e.target.value,
                          }))
                        }
                        placeholder="Nhập nội dung trả lời..."
                        className="border rounded p-2 w-full"
                      />
                      <button
                        onClick={() => handleReply(review._id)}
                        className="self-end px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Gửi
                      </button>
                    </div>
                  )}

                  {/* Hiển thị replies */}
                  {review.replies?.length > 0 && (
                    <div className="mt-2 ml-4 space-y-1">
                      {review.replies.map((r: IReply, idx: number) => {
                        const replyUserName = r.userId?.fullname ?? "Người dùng";
                        return (
                          <div key={idx} className="text-sm text-gray-600">
                            <span className="font-semibold">{replyUserName}:</span>{" "}
                            {r.content}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
