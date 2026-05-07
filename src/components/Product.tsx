import { Link } from "react-router-dom";
import { MessageSquare, Shield, Zap, ShoppingBag, Send, Search, Heart, MapPin, Package, RefreshCcw, CheckCircle, UserCheck, Globe, ShieldCheck, AlertTriangle, Users, ArrowUpRight, Lock } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { useTranslation } from "../i18n/TranslationContext";

export default function Product() {
  const { t } = useTranslation();

  const marketplaceCategories = [
    { icon: <Globe className="w-4 h-4 text-blue-400" />, label: t('home.product.multilingual.items.english') },
    { icon: <Zap className="w-4 h-4 text-emerald-400" />, label: t('home.product.multilingual.items.tips') },
    { icon: <ShieldCheck className="w-4 h-4 text-red-400" />, label: t('home.product.multilingual.items.emergency') },
    { icon: <RefreshCcw className="w-4 h-4 text-indigo-400" />, label: t('home.product.multilingual.items.reporting') },
    { icon: <Heart className="w-4 h-4 text-pink-400" />, label: t('home.product.multilingual.items.community') },
    { icon: <MapPin className="w-4 h-4 text-orange-400" />, label: t('home.product.multilingual.items.regional') },
  ];

  const matchCards = [
    { 
      date: `${t('home.product.patterns.detected')}: 2h ago`, 
      label: t('home.product.patterns.upi'), 
      color: "bg-red-400/20", 
      icon: <AlertTriangle className="text-red-400" />,
      data: [
        { v: 80 }, { v: 85 }, { v: 90 }, { v: 92 }, { v: 95 }
      ],
      chartColor: "#ef4444",
      match: `95% ${t('home.product.patterns.confidence')}`
    },
    { 
      date: `${t('home.product.patterns.detected')}: 12h ago`, 
      label: t('home.product.patterns.job'), 
      color: "bg-orange-400/20", 
      icon: <Search className="text-orange-400" />, 
      active: true,
      data: [
        { v: 40 }, { v: 60 }, { v: 75 }, { v: 82 }, { v: 88 }
      ],
      chartColor: "#f97316",
      match: `88% ${t('home.product.patterns.confidence')}`
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6 space-y-20 md:space-y-40">
      <div className="max-w-[1200px] mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full glass border-white/10 text-[12px] font-medium text-white/50 mb-6 uppercase tracking-wider">
          ● {t('home.product.badge')}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12 md:mb-20">{t('home.product.title')}</h2>

        {/* AI Scam Analyzer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center animate-on-scroll">
          <div className="glass p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="space-y-6">
              <div className="flex justify-end">
                <div className="glass px-4 md:px-6 py-3 md:py-4 rounded-[1.5rem] md:rounded-[2rem] rounded-tr-none text-[13px] md:text-[14px] max-w-[90%] md:max-w-[80%]">
                  {t('home.product.analyzer.example_msg')}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 md:px-6 py-3 md:py-4 rounded-[1.5rem] md:rounded-[2rem] rounded-tl-none text-[13px] md:text-[14px] max-w-[90%] md:max-w-[80%] text-white/60">
                  <span className="text-red-400 font-bold block mb-1">{t('home.product.analyzer.verdict')}</span>
                  {t('home.product.analyzer.example_desc')}
                </div>
              </div>
              <div className="pt-6 md:pt-8 flex gap-3">
                <div className="flex-1 glass px-4 md:px-6 py-3 md:py-4 rounded-full text-[13px] md:text-[14px] text-white/30 flex items-center justify-between">
                  {t('home.product.analyzer.placeholder')}
                  <Send className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6 md:mb-8">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">{t('home.product.analyzer.title')}</h3>
            <p className="text-base md:text-lg text-brand-text-secondary leading-relaxed mb-8">
              {t('home.product.analyzer.desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Multilingual Guides */}
      <div className="max-w-[1200px] mx-auto animate-on-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6 md:mb-8">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">{t('home.product.multilingual.title')}</h3>
            <p className="text-base md:text-lg text-brand-text-secondary leading-relaxed">
              {t('home.product.multilingual.desc')}
            </p>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {marketplaceCategories.map((cat, i) => (
              <div key={i} className="glass p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex items-center gap-4 hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <span className="text-[13px] font-medium text-white/60">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pattern Detection */}
      <div className="max-w-[1200px] mx-auto animate-on-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 hide-scrollbar px-4 -mx-4 md:px-0 md:mx-0">
            {matchCards.map((card, i) => (
              <div 
                key={i} 
                className={`flex-shrink-0 w-56 md:w-64 glass p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] transition-all duration-500 relative overflow-hidden ${card.active ? 'scale-105 md:scale-110 border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)]' : 'opacity-40 scale-95'}`}
              >
                <div className="text-[11px] md:text-[12px] text-white/40 mb-6 md:mb-8 uppercase tracking-widest">{card.date}</div>
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${card.color} flex items-center justify-center mb-6 md:mb-8 mx-auto`}>
                  {card.icon}
                </div>
                <div className="h-16 md:h-20 w-full mb-6 md:mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={card.data}>
                      <Line 
                        type="monotone" 
                        dataKey="v" 
                        stroke={card.chartColor} 
                        strokeWidth={2} 
                        dot={false}
                        className={card.active ? "animate-dash-line" : ""}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center">
                  <div className="text-base md:text-lg font-bold mb-2">{card.label}</div>
                  <p className={`text-[12px] md:text-[13px] font-medium ${card.active ? 'text-orange-400' : 'text-red-400'}`}>{card.match}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6 md:mb-8">
              <RefreshCcw className="w-6 h-6" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">{t('home.product.patterns.title')}</h3>
            <p className="text-base md:text-lg text-brand-text-secondary leading-relaxed">
              {t('home.product.patterns.desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Security Layers */}
      <div className="max-w-[1200px] mx-auto animate-on-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="md:pr-10">
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6 md:mb-8">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">{t('home.product.trust.title')}</h3>
            <p className="text-base md:text-lg text-brand-text-secondary leading-relaxed">
              {t('home.product.trust.desc')}
            </p>
          </div>
          <div className="space-y-4">
            {[
              { label: t('home.product.trust.items.engine'), icon: <Zap className="w-5 h-5 text-emerald-400" /> },
              { label: t('home.product.trust.items.zero_trust'), icon: <Lock className="w-5 h-5 text-blue-400" /> },
              { label: t('home.product.trust.items.shield'), icon: <Users className="w-5 h-5 text-purple-400" /> }
            ].map((tool, i) => (
              <div key={i} className="glass p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-between hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <span className="text-lg md:text-xl font-bold opacity-80">{tool.label}</span>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
