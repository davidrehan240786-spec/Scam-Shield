import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTranslation } from "../i18n/TranslationContext";

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-8 sm:p-16 md:p-32 rounded-[2rem] sm:rounded-[4rem] overflow-hidden text-center group border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          {/* Background Image */}
          <img 
            src="/cyber-shield.jpg" 
            alt="Cyber Security Shield" 
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen group-hover:scale-105 transition-transform duration-1000"
          />

          {/* Overlays for Blending and Text Readability */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/80 to-transparent" />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A0A0B]/90 via-transparent to-[#0A0A0B]/90" />
          <div className="absolute inset-0 z-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] rounded-[2rem] sm:rounded-[4rem]" />

          {/* Gradient Corner Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-red-500/30 via-blue-500/10 to-transparent blur-[120px] z-0 group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="relative z-10 max-w-3xl mx-auto mt-10">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 md:mb-10 leading-tight drop-shadow-2xl">
              {t('home.cta.title')}
            </h2>
            <p className="text-lg sm:text-xl text-white/70 mb-10 md:mb-14 leading-relaxed drop-shadow-lg font-medium">
              {t('home.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/signup" className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] text-center relative overflow-hidden group/btn">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                {t('home.cta.button')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
