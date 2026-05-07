import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Youtube } from 'lucide-react';

/**
 * @interface Article
 * Defines the structure for a single article card.
 * @param {string | number} id - A unique identifier for the article.
 * @param {string} imageSrc - URL for the article's image (YouTube thumbnail or any image).
 * @param {string} title - The main heading of the article.
 * @param {string} linkText - The text for the call-to-action link.
 * @param {string} linkHref - The URL the article card will link to.
 */
export interface Article {
  id: string | number;
  imageSrc: string;
  title: string;
  linkText: string;
  linkHref: string;
}

interface ArticleCardGridProps {
  title: string;
  articles: Article[];
}

// ─── Individual card with its own error state ─────────────────────────────────

const ArticleCard: React.FC<{ article: Article; variants: any }> = ({ article, variants }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.a
      href={article.linkHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-all duration-300"
      variants={variants}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex flex-col h-full">

        {/* ── Thumbnail area — always h-48, never collapses ── */}
        <div className="relative h-48 w-full overflow-hidden flex-shrink-0 bg-zinc-900">
          {imgError ? (
            /* Fallback: dark branded placeholder */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-zinc-900">
              <Youtube className="h-10 w-10 text-red-500/70" />
              <span className="text-xs text-white/30 font-medium tracking-wider uppercase">Watch on YouTube</span>
            </div>
          ) : (
            <img
              src={article.imageSrc}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* YouTube play badge */}
          {!imgError && (
            <div className="absolute bottom-2 right-2 bg-red-600/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Youtube className="h-3.5 w-3.5 text-white" />
            </div>
          )}
        </div>

        {/* ── Card content ── */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-[15px] font-semibold text-white leading-snug mb-4 flex-grow">
            {article.title}
          </h3>
          <div className="flex items-center text-sm font-medium text-white/50 mt-auto group-hover:text-red-400 transition-colors duration-300">
            {article.linkText}
            <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

      </div>
    </motion.a>
  );
};

// ─── Grid container ───────────────────────────────────────────────────────────

export const ArticleCardGrid: React.FC<ArticleCardGridProps> = ({ title, articles }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6 bg-transparent text-foreground">
      <h2 className="text-2xl font-bold tracking-tight mb-8 text-white/90">
        {title}
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variants={itemVariants} />
        ))}
      </motion.div>
    </section>
  );
};
