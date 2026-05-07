import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { 
  ShieldCheck, 
  Brain, 
  GraduationCap, 
  Users,
  CheckCircle2,
  Lock
} from "lucide-react";
import { useTranslation } from "../i18n/TranslationContext";

export default function Stats() {
  const { t } = useTranslation();

  const stats = [
    { label: t('home.stats.items.financial.label'), value: t('home.stats.items.financial.value'), description: t('home.stats.items.financial.desc') },
    { label: t('home.stats.items.detected.label'), value: t('home.stats.items.detected.value'), description: t('home.stats.items.detected.desc') },
    { label: t('home.stats.items.rating.label'), value: t('home.stats.items.rating.value'), description: t('home.stats.items.rating.desc') },
    { label: t('home.stats.items.time.label'), value: t('home.stats.items.time.value'), description: t('home.stats.items.time.desc') },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full glass border-white/10 text-[12px] font-medium text-white/50 mb-6 uppercase tracking-wider">
            ● {t('home.stats.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">{t('home.stats.title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden animate-on-scroll"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-[12px] text-white/40 mb-2 uppercase tracking-widest">{stat.label}</div>
              <div className="text-5xl font-bold mb-4 tracking-tighter">{stat.value}</div>
              <p className="text-[13px] text-white/40 leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-on-scroll">
          <Card className="glass border-white/10 rounded-[2rem] overflow-hidden relative">
            <CardHeader className="pb-2">
              <div className="size-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <ShieldCheck className="size-6 text-emerald-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-white tracking-tight">{t('home.stats.defense.title')}</CardTitle>
              <CardDescription className="text-white/40 mt-1">{t('home.stats.defense.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="flex gap-4 group">
                <div className="mt-1 flex-shrink-0 size-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Lock className="size-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">{t('home.stats.defense.prevent.title')}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{t('home.stats.defense.prevent.desc')}</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="mt-1 flex-shrink-0 size-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="size-4 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">{t('home.stats.defense.insights.title')}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{t('home.stats.defense.insights.desc')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10 rounded-[2rem] overflow-hidden relative">
            <CardHeader className="pb-2">
              <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                <Users className="size-6 text-blue-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-white tracking-tight">{t('home.stats.global.title')}</CardTitle>
              <CardDescription className="text-white/40 mt-1">{t('home.stats.global.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="flex gap-4 group">
                <div className="mt-1 flex-shrink-0 size-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="size-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">{t('home.stats.global.literacy.title')}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{t('home.stats.global.literacy.desc')}</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="mt-1 flex-shrink-0 size-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="size-4 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">{t('home.stats.global.reporting.title')}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{t('home.stats.global.reporting.desc')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
