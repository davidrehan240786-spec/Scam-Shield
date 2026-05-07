import { ArticleCardGrid } from "./ui/card-grid";

/**
 * YouTube video IDs are used to generate official HQ thumbnails via:
 * https://img.youtube.com/vi/{VIDEO_ID}/hqdefault.jpg
 *
 * This gives us real, always-updated thumbnails without any API key.
 */
const posts = [
  {
    id: 1,
    // Video ID extracted from: https://youtu.be/mZ1rg_GJu2M?si=KYsEL5CIUzkJPCKv
    imageSrc: 'https://img.youtube.com/vi/mZ1rg_GJu2M/maxresdefault.jpg',
    title: 'Recognizing Digital Identity Theft in 2026',
    linkText: 'Watch on YouTube',
    linkHref: 'https://youtu.be/mZ1rg_GJu2M?si=KYsEL5CIUzkJPCKv',
  },
  {
    id: 2,
    // Video ID extracted from: https://youtu.be/k6iI9pFDWLI?si=BvhB5rhnI-L5XnEa
    imageSrc: 'https://img.youtube.com/vi/k6iI9pFDWLI/maxresdefault.jpg',
    title: 'How To Protect Your Online Bank Account',
    linkText: 'Watch on YouTube',
    linkHref: 'https://youtu.be/k6iI9pFDWLI?si=BvhB5rhnI-L5XnEa',
  },
  {
    id: 3,
    // Video ID extracted from: https://youtu.be/uvKTMgWRPw4?si=t1whnw4wiDWutn9q
    imageSrc: 'https://img.youtube.com/vi/uvKTMgWRPw4/maxresdefault.jpg',
    title: 'What is Social Engineering?',
    linkText: 'Watch on YouTube',
    linkHref: 'https://youtu.be/uvKTMgWRPw4?si=t1whnw4wiDWutn9q',
  },
];

export default function Blog() {
  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 md:mb-20 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full glass border-white/10 text-[12px] font-medium text-white/50 mb-6 uppercase tracking-wider">
            ● Safety Insights
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Stay Informed, Stay Safe</h2>
        </div>

        <ArticleCardGrid
          title="Learn from cybersecurity experts"
          articles={posts}
        />
      </div>
    </section>
  );
}
