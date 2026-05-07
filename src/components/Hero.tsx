import { Shield, Lock, Activity, Zap, Cpu, BellRing, Target } from "lucide-react";
import { motion } from "framer-motion";
import { SplineScene } from "./ui/splite";
import { Spotlight } from "./ui/spotlight";
import { useTranslation } from "../i18n/TranslationContext";

export default function Hero() {
  const { t } = useTranslation();
  
  const features = [
    { icon: <Zap className="size-3" />, label: t('home.hero.features.scam_detection') },
    { icon: <Target className="size-3" />, label: t('home.hero.features.real_time') },
    { icon: <Cpu className="size-3" />, label: t('home.hero.features.community') },
    { icon: <BellRing className="size-3" />, label: t('home.hero.features.awareness') },
  ];

  return (
    <section className="relative min-h-[95vh] w-full flex items-center justify-center overflow-hidden bg-black pt-20" id="hero">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Cyber Grid */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
        
        {/* Layered Gradients */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/[0.03] blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/[0.03] blur-[130px] rounded-full" />
        
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        size={400}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="flex-1 text-left space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/[0.07] border border-blue-500/20 backdrop-blur-sm"
            >
              <div className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] font-bold text-blue-400/90 uppercase tracking-[0.25em] leading-none">{t('home.hero.badge')}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white/95 tracking-tight leading-[1.1]" 
                  dangerouslySetInnerHTML={{ __html: t('home.hero.title').replace('Cyber Safety Assistant', '<br />Cyber Safety Assistant') }}>
              </h1>
              <p className="text-white/40 text-lg md:text-xl max-w-lg leading-relaxed font-normal">
                {t('home.hero.subtitle')}
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 pt-4">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-default group"
                  >
                    <span className="text-blue-400/60 group-hover:text-blue-400 transition-colors">
                      {feature.icon}
                    </span>
                    <span className="text-[11px] font-medium text-white/50 group-hover:text-white/80 transition-colors">
                      {feature.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Spline Robot */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="flex-[1.2] relative w-full h-[650px] lg:h-[800px] flex items-center justify-center"
          >
            {/* Minimal Depth Gradient behind Robot */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />

            {/* Blending Overlays to hide Spline edges */}
            <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_120px_60px_rgba(0,0,0,1)]" />
            
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
            
            {/* Floating UI Elements */}
            <div className="absolute top-[20%] left-[10%] z-30 animate-float">
              <div className="px-4 py-3 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl flex items-center gap-3 shadow-2xl">
                <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Shield className="size-4 text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">{t('home.hero.status')}</span>
                  <span className="text-xs font-semibold text-blue-400">{t('home.hero.secured')}</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[25%] right-[5%] z-30 animate-float [animation-delay:2s]">
              <div className="px-4 py-3 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02] backdrop-blur-xl flex items-center gap-3 shadow-2xl">
                <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Activity className="size-4 text-emerald-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">{t('home.hero.monitoring')}</span>
                  <span className="text-xs font-semibold text-emerald-400">{t('home.hero.active')}</span>
                </div>
              </div>
            </div>

            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full relative z-10 select-none grayscale-[0.2] brightness-110"
            />
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] vertical-rl h-12">{t('home.hero.explore')}</span>
        <div className="w-[1px] h-8 bg-gradient-to-t from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}


