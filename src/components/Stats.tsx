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

export default function Stats() {
  const stats = [
    { label: "Financial Impact", value: "₹500Cr+", description: "Estimated annual loss to cyber scams globally." },
    { label: "Scams Detected", value: "40,000+", description: "Suspicious activities identified by our AI this month." },
    { label: "Safety Rating", value: "98%", description: "Percentage of analyzed messages accurately classified." },
    { label: "Response Time", value: "< 2s", description: "Real-time AI analysis for instant protection." },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full glass border-white/10 text-[12px] font-medium text-white/50 mb-6 uppercase tracking-wider">
            ● Impact & Protection
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">The Scale of Digital Threats</h2>
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
              <CardTitle className="text-3xl font-bold text-white tracking-tight">Real-Time Defense</CardTitle>
              <CardDescription className="text-white/40 mt-1">Our proactive approach to preventing financial loss.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="flex gap-4 group">
                <div className="mt-1 flex-shrink-0 size-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Lock className="size-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Prevent Financial Loss</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Stop scams before they reach your wallet. Our real-time filters block fraudulent payment links and suspicious transaction requests before any financial loss can occur.</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="mt-1 flex-shrink-0 size-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="size-4 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Explainable AI Insights</h4>
                  <p className="text-sm text-white/40 leading-relaxed">We don't just flag threats; we explain them. Our AI identifies malicious patterns and provides detailed context, helping you understand the 'why' behind suspicious activities.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10 rounded-[2rem] overflow-hidden relative">
            <CardHeader className="pb-2">
              <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                <Users className="size-6 text-blue-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-white tracking-tight">Global Awareness</CardTitle>
              <CardDescription className="text-white/40 mt-1">Strengthening the digital front through collective power.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="flex gap-4 group">
                <div className="mt-1 flex-shrink-0 size-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="size-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Improve User Literacy</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Security is a skill. We help users develop a 'security-first' mindset through interactive tools and live safety training that adapts to evolving scam patterns.</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="mt-1 flex-shrink-0 size-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="size-4 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Community Reporting</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Enable community-driven reporting that scale. Your reports feed directly into our global detection engine, protecting millions of other users across the network instantly.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
