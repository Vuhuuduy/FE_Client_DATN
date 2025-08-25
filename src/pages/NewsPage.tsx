// NewsPage.tsx
import { useNavigate } from "react-router-dom";

export default function NewsPage() {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "Áo Sơ Mi – Sự lựa chọn tinh tế cho quý ông",
      slug: "ao-so-mi",
      image:
        "https://product.hstatic.net/1000205116/product/img_8436_802421d26b4841b9ba76b10a335f8591_1024x1024.jpeg",
      date: "20/08/2025",
      content: `Áo sơ mi luôn được xem là biểu tượng của sự lịch lãm và tinh tế. 
      
Được may từ chất liệu cotton cao cấp, thoáng mát nhưng vẫn giữ được sự đứng dáng, áo sơ mi mang lại sự thoải mái tuyệt đối trong cả ngày dài. 
Form slim-fit ôm nhẹ tôn dáng giúp quý ông tự tin trong mọi hoàn cảnh – từ môi trường công sở chuyên nghiệp đến những buổi dạo phố thanh lịch. 
Khi kết hợp cùng quần tây hoặc vest, áo sơ mi trở thành “vũ khí” định hình phong cách chuẩn quý ông hiện đại.`,
    },
    {
      id: 2,
      title: "Áo Polo – Năng động và sang trọng",
      slug: "ao-polo",
      image: "https://cdn0199.cdn4s.com/media/493%20%20370k.jpg",
      date: "21/08/2025",
      content: `Áo Polo là sự hòa quyện hoàn hảo giữa năng động và tinh tế. 
      
Với phần cổ bẻ thanh lịch cùng chất liệu vải thấm hút mồ hôi, áo Polo mang đến cảm giác thoải mái mà vẫn giữ sự sang trọng. 
Sản phẩm này dễ dàng phối hợp với quần short cho ngày hè năng động, hoặc kết hợp cùng quần jeans, chinos để tạo nên outfit chỉn chu nhưng trẻ trung. 
Đây chính là item “must-have” cho những quý ông yêu thích sự linh hoạt nhưng không kém phần đẳng cấp.`,
    },
    {
      id: 3,
      title: "Áo Vest – Khẳng định đẳng cấp phái mạnh",
      slug: "ao-vest",
      image:
        "https://file.hstatic.net/200000053174/collection/9_0fcf7fa8625a41d1bc583940c655a88c.jpg",
      date: "19/08/2025",
      content: `Áo Vest chính là “ngôn ngữ quyền lực” của phái mạnh. 
      
Mỗi đường may đều được chăm chút tỉ mỉ, form dáng được thiết kế chuẩn xác để tôn lên thân hình và phong thái lịch lãm. 
Áo vest không chỉ dành cho sự kiện quan trọng mà còn là lựa chọn tối ưu để quý ông khẳng định vị thế, sự thành đạt và cá tính riêng. 
Khi khoác lên mình bộ vest, người đàn ông ngay lập tức toát lên khí chất sang trọng khó hòa lẫn.`,
    },
    {
      id: 4,
      title: "Quần Tây Nam – Phong cách chuẩn quý ông",
      slug: "quan-tay",
      image:
        "https://4menshop.com/images/thumbs/2020/09/quan-tay-can-ban-form-slimfit-qt019-15549.png",
      date: "18/08/2025",
      content: `Quần tây luôn là lựa chọn an toàn nhưng đầy quyền lực cho mọi quý ông. 
      
Thiết kế slim-fit hiện đại ôm nhẹ, mang đến vẻ ngoài chỉn chu và phong thái tự tin. 
Chất liệu vải thoáng mát, ít nhăn giúp quý ông dễ dàng vận động và giữ form trong cả ngày dài. 
Quần tây kết hợp cùng sơ mi, polo hay vest đều tạo nên outfit chuẩn mực, là nền tảng cho sự lịch lãm vượt thời gian.`,
    },
    {
      id: 5,
      title: "Quần Jean Nam – Sự phóng khoáng bất tử",
      slug: "quan-jean",
      image:
        "https://product.hstatic.net/1000205116/product/img_0640_3cdfe14325cb4414ad5ef38eb44ab459_1024x1024.jpeg",
      date: "22/08/2025",
      content: `Quần jean chính là biểu tượng của sự phóng khoáng và cá tính – một item không bao giờ lỗi mốt. 
      
Từ những năm 1870, jean đã trở thành “ông vua” của phong cách casual và vẫn giữ vị thế ấy cho đến hôm nay. 
Sự bụi bặm pha lẫn tinh tế giúp jean nam không chỉ phù hợp với dạo phố, làm việc sáng tạo mà còn cho cả những buổi hẹn hò hay du lịch đầy năng lượng. 
Với form slim-fit hiện đại cùng chất denim bền bỉ, quần jean mang lại cảm giác thoải mái, linh hoạt và khẳng định tinh thần tự do mạnh mẽ của phái mạnh.`,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6 md:px-20">
      {/* Header */}
      <div className="text-center mb-28">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-300 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
          ✨ Tin tức & Giới thiệu sản phẩm ✨
        </h1>
        <p className="mt-6 text-xl text-gray-300">
          Khám phá bộ sưu tập sang trọng và tinh tế – định hình đẳng cấp quý ông
        </p>
      </div>

      {/* Articles */}
      <div className="space-y-40">
        {articles.map((article, index) => (
          <div
            key={article.id}
            className={`grid md:grid-cols-2 gap-12 items-stretch ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-yellow-300/50 shadow-lg">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full max-h-[550px] object-cover transform hover:scale-105 transition duration-700"
              />
              <span className="absolute bottom-4 left-4 px-5 py-2 bg-yellow-300/90 text-black font-semibold rounded-lg shadow">
                {article.date}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between rounded-3xl bg-black/60 border-2 border-yellow-300/50 p-10 shadow-lg backdrop-blur">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-yellow-200 mb-6 leading-snug">
                  {article.title}
                </h2>
                <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
                  {article.content}
                </p>
              </div>
              <button
                onClick={() => navigate(`/category/${article.slug}`)}
                className="mt-10 self-start px-8 py-3 bg-yellow-300 text-black rounded-full font-semibold tracking-wide shadow hover:bg-yellow-200 transition"
              >
                🛒 Mua ngay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
