import { ArticleCardGrid } from "./ui/card-grid";

const posts = [
  {
    id: 1,
    imageSrc: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    title: 'Recognizing Digital Identity Theft in 2024',
    linkText: 'Read more',
    linkHref: '#',
  },
  {
    id: 2,
    imageSrc: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop',
    title: 'Top 5 tips for securing your digital banking',
    linkText: 'Learn more',
    linkHref: '#',
  },
  {
    id: 3,
    imageSrc: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
    title: 'The psychology of social engineering scams',
    linkText: 'Keep reading',
    linkHref: '#',
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
          title="Want to stay updated?" 
          articles={posts} 
        />
      </div>
    </section>
  );
}
