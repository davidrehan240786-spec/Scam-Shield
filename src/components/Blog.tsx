import { ArticleCardGrid } from "./ui/card-grid";
import { useTranslation } from "../i18n/TranslationContext";

export default function Blog() {
  const { t } = useTranslation();

  const posts = [
    {
      id: 1,
      imageSrc: 'https://img.youtube.com/vi/mZ1rg_GJu2M/maxresdefault.jpg',
      title: t('home.blog.posts.digital_identity.title'),
      linkText: t('home.blog.cta'),
      linkHref: 'https://youtu.be/mZ1rg_GJu2M?si=KYsEL5CIUzkJPCKv',
    },
    {
      id: 2,
      imageSrc: 'https://img.youtube.com/vi/k6iI9pFDWLI/maxresdefault.jpg',
      title: t('home.blog.posts.bank_protection.title'),
      linkText: t('home.blog.cta'),
      linkHref: 'https://youtu.be/k6iI9pFDWLI?si=BvhB5rhnI-L5XnEa',
    },
    {
      id: 3,
      imageSrc: 'https://img.youtube.com/vi/uvKTMgWRPw4/maxresdefault.jpg',
      title: t('home.blog.posts.social_engineering.title'),
      linkText: t('home.blog.cta'),
      linkHref: 'https://youtu.be/uvKTMgWRPw4?si=t1whnw4wiDWutn9q',
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 md:mb-20 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full glass border-white/10 text-[12px] font-medium text-white/50 mb-6 uppercase tracking-wider">
            ● {t('home.blog.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{t('home.blog.title')}</h2>
        </div>

        <ArticleCardGrid
          title={t('home.blog.subtitle')}
          articles={posts}
        />
      </div>
    </section>
  );
}
