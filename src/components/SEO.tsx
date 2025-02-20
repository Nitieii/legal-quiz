import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

const SEO = ({
  title = 'Bộ Quy tắc Đạo đức và Ứng xử nghề nghiệp luật sư Việt Nam',
  description = 'Kiểm tra kiến thức của bạn về quy tắc đạo đức và ứng xử nghề nghiệp luật sư. Tìm hiểu và luyện tập thông qua các câu hỏi trắc nghiệm.',
  keywords = 'quy tắc đạo đức luật sư, ứng xử nghề nghiệp, luật sư Việt Nam, trắc nghiệm luật, kiểm tra kiến thức luật',
  ogImage = '/logo.svg',
  ogUrl = 'https://legal-quiz.onrender.com',
}: SEOProps) => {
  const fullTitle = `${title} | Trắc Nghiệm Quy tắc Đạo đức Luật sư`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="language" content="vi-VN" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${ogUrl}${ogImage}`} />
      <meta property="og:locale" content="vi_VN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${ogUrl}${ogImage}`} />

      {/* Favicon */}
      <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/logo.svg" />
    </Head>
  );
};

export default SEO;
