import Quiz from '../components/Quiz';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO
        title="Trang Chủ"
        description="Kiểm tra kiến thức của bạn về Bộ Quy tắc Đạo đức và Ứng xử nghề nghiệp luật sư Việt Nam. Luyện tập với các câu hỏi trắc nghiệm chất lượng."
        keywords="quy tắc đạo đức luật sư, trắc nghiệm luật sư, đạo đức nghề luật, ứng xử nghề nghiệp luật sư, thi đạo đức luật sư"
      />
      <main className="min-h-screen bg-gray-50">
        <Quiz />
      </main>
    </>
  );
}
