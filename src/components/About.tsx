import TextBlockAnimation from './ui/text-block-animation';
import { useTranslation } from "../i18n/TranslationContext";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="py-32 px-6" id="about">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <TextBlockAnimation blockColor="#ffffff" duration={0.6} delay={0.1}>
          <div className="inline-block px-4 py-1.5 rounded-full glass border-white/10 text-[12px] font-medium text-white/50 uppercase tracking-wider">
            ● {t('home.about.badge')}
          </div>
        </TextBlockAnimation>
        
        <div className="w-full">
          <TextBlockAnimation blockColor="#ffffff" duration={0.8} stagger={0.05}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-tight text-white">
              {t('home.about.content')}
            </p>
          </TextBlockAnimation>
        </div>
      </div>
    </section>
  );
}
