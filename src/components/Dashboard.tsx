import * as React from "react";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  LayoutGrid,
  ShieldCheck,
  Radar,
  Flag,
  BookOpen,
  Brain,
  Users,
  QrCode, 
  Bot, 
  Activity, 
  MessageSquare, 
  Settings,
  Bell,
  Search,
  Plus,
  Share2,
  ChevronRight,
  Shield,
  Clock,
  Heart,
  User,
  Menu,
  X,
  LogOut,
  ArrowLeft,
  ShoppingBag,
  CheckCircle,
  MapPin,
  Filter,
  ArrowUpDown,
  Flame,
  Tag,
  PlusCircle,
  TrendingUp,
  AlertTriangle,
  Star,
  Calendar,
  Download,
  RefreshCcw,
  ShieldAlert,
  Mail,
  PlayCircle,
  Video,
  FileText,
  Zap,
  Book,
  Youtube,
  Lightbulb,
  ListChecks,
  History,
  FileQuestion,
  ExternalLink,
  ChevronLeft,
  Send
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUploadCard, UploadingFile } from "@/components/ui/file-upload-card";
import { useToast } from "@/lib/toast-context";

import { TextRoll } from "@/components/ui/animated-menu";
import { articles } from "@/data/articles";
import { RippleCircles } from "@/components/ui/ripple-circles";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useTranslation, Language } from "@/i18n/TranslationContext";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- Types ---

type Section = 
  | "Dashboard" 
  | "Scam Scanner"
  | "Threat Feed"
  | "Scam Report Center"
  | "Learning Hub"
  | "Scam Quiz Arena"
  | "Settings";

interface NavItem {
  label: Section;
  icon: React.ElementType;
  key: string;
}

// --- Mock Data ---

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutGrid, key: 'nav.dashboard' },
  { label: "Scam Scanner", icon: ShieldCheck, key: 'nav.scanner' },
  { label: "Threat Feed", icon: Activity, key: 'nav.threat_feed' },
  { label: "Scam Report Center", icon: Flag, key: 'nav.reports' },
  { label: "Learning Hub", icon: BookOpen, key: 'nav.learning' },
  { label: "Scam Quiz Arena", icon: Brain, key: 'nav.quiz' },
  { label: "Settings", icon: Settings, key: 'nav.settings' },
];

const INSIGHTS_DATA = [
  { time: "Mon", views: 120, interest: 45, success: 80 },
  { time: "Tue", views: 250, interest: 80, success: 85 },
  { time: "Wed", views: 480, interest: 120, success: 90 },
  { time: "Thu", views: 850, interest: 210, success: 95 },
  { time: "Fri", views: 720, interest: 180, success: 92 },
  { time: "Sat", views: 600, interest: 150, success: 88 },
];

const RECENT_ACTIVITY = [
  { id: 1, actionKey: "dash_listed_item", userKey: "dash_you", timeKey: "dash_hours_ago", timeVal: 2, icon: ShoppingBag, color: "text-blue-500" },
  { id: 2, actionKey: "dash_reported_lost", userKey: "dash_you", timeKey: "dash_hours_ago", timeVal: 5, icon: Search, color: "text-orange-500" },
  { id: 3, actionKey: "dash_completed_meetup", userKey: "dash_you", timeKey: "dash_day_ago", timeVal: 1, icon: CheckCircle, color: "text-emerald-500" },
];

// --- Components ---

const Card = ({ children, className, glow = false, ...props }: { children: React.ReactNode, className?: string, glow?: boolean } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(
    "glass relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/10",
    glow && "shadow-[0_0_30px_rgba(99,102,241,0.1)]",
    className
  )} {...props}>
    {children}
  </div>
);

const SectionHeader = ({ title, subtitle, action, className }: { title: string, subtitle?: string, action?: React.ReactNode, className?: string }) => (
  <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", className)}>
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">{title}</h2>
      {subtitle && <p className="text-secondary mt-1">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

// --- Section Views ---

const DashboardView = ({ setActiveSection }: { setActiveSection: (s: Section) => void }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Protector';
  
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader 
        title={`${t("nav.welcome")}, ${userName}`}
        subtitle={t("dashboard.subtitle")}
      />
      
      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t("dashboard.stats.protected"), value: "12,842", sub: t("dashboard.stats.verified"), icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: t("dashboard.stats.reports"), value: "482", sub: t("dashboard.stats.verified"), icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: t("dashboard.stats.prevention"), value: "94.2%", sub: t("dashboard.stats.efficiency"), icon: Zap, color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: t("dashboard.stats.risk"), value: t("dashboard.stats.low"), sub: t("dashboard.stats.stable"), icon: Radar, color: "text-blue-400", bg: "bg-blue-400/10" },
        ].map((stat, i) => (
          <Card key={i} className="p-6 rounded-[2rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
             <div className={cn("size-10 rounded-xl flex items-center justify-center mb-4", stat.bg, stat.color)}>
                <stat.icon className="size-5" />
             </div>
             <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
             <div className="flex items-center justify-between mt-1">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
                <span className="text-[9px] font-black text-emerald-500">{stat.sub}</span>
             </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Threat Activity Feed */}
        <Card className="lg:col-span-2 rounded-[2.5rem] border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <Flame className="size-6 text-orange-500" /> {t("dashboard.threat_activity")}
             </h3>
             <Button variant="ghost" onClick={() => setActiveSection("Threat Feed")} className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">
                {t("dashboard.view_all")} <ChevronRight className="size-3 ml-1" />
             </Button>
          </div>
          <div className="space-y-4">
             {/* Feed items would go here */}
          </div>
        </Card>

        {/* Quick Tips */}
        <div className="space-y-6">
          <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">{t("dashboard.quick_tips")}</h3>
          <div className="grid grid-cols-1 gap-4">
             {[
               { title: t("dashboard.tips.zero_trust.title"), desc: t("dashboard.tips.zero_trust.desc"), icon: ShieldCheck, color: "text-red-400", bg: "bg-red-500/10" },
               { title: t("dashboard.tips.vigilance.title"), desc: t("dashboard.tips.vigilance.desc"), icon: Zap, color: "text-emerald-400", bg: "bg-emerald-500/10" },
             ].map((tip, i) => (
                <Card key={i} className="p-6 rounded-[2rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all space-y-4">
                  <div className={cn("size-10 rounded-xl flex items-center justify-center", tip.bg, tip.color)}>
                    <tip.icon className="size-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs mb-1 uppercase tracking-tighter">{tip.title}</h5>
                    <p className="text-[10px] text-white/40 leading-relaxed font-medium">{tip.desc}</p>
                  </div>
                </Card>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ScamScannerView = () => {
  const [scanInput, setScanInput] = useState("");
  const [scanning, setScanning] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleScan = () => {
    if (!scanInput.trim()) return;
    setScanning(true);
    setTimeout(() => {
      setAnalysis("This content exhibits multiple phishing patterns including urgency triggers and suspicious source origin. RECOMMENDATION: DO NOT INTERACT.");
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader 
        title={t("scanner.title")}
        subtitle={t("scanner.subtitle")}
      />

      <div className="grid grid-cols-1 gap-8">
        {/* Scan Input Card */}
        <Card className="p-8 md:p-12 rounded-[3rem] border-blue-500/10 bg-blue-500/[0.02] relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Bot className="size-32" />
           </div>
           
           <div className="max-w-4xl mx-auto space-y-8 relative z-10">
              <div className="space-y-4">
                 <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400 ml-1">
                   {t("scanner.input_label")}
                 </Label>
                 <div className="relative group/input">
                    <textarea 
                      value={scanInput}
                      onChange={(e) => setScanInput(e.target.value)}
                      placeholder={t("scanner.placeholder")}
                      className="w-full h-48 bg-white/[0.03] border-white/5 rounded-[2rem] p-8 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/30 transition-all resize-none font-medium leading-relaxed"
                    />
                 </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                 <div className="flex gap-4">
                  <Button className="flex-1 h-14 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-[11px] hover:bg-white/90" onClick={handleScan}>
                    {scanning ? t("scanner.scanning") : t("scanner.run_scan")}
                  </Button>
                  <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 text-white">
                    <Download className="size-5" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-xl border-white/5 bg-white/5 hover:bg-white/10 h-11 px-4 gap-2 font-bold text-xs uppercase tracking-widest transition-all">
                    <LogOut className="size-4 rotate-90" /> {t("scanner.upload_file")}
                  </Button>
                  <Button variant="outline" className="rounded-xl border-white/5 bg-white/5 hover:bg-white/10 h-11 px-4 gap-2 font-bold text-xs uppercase tracking-widest transition-all">
                    <Share2 className="size-4" /> {t("scanner.link")}
                  </Button>
                </div>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
};

const ThreatFeedView = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const [{ data: alertsData }, { data: reportsData }] = await Promise.all([
        supabase.from('threat_alerts').select('*').order('created_at', { ascending: false }),
        supabase.from('scam_reports').select('*').order('created_at', { ascending: false })
      ]);

      const combined = [
        ...(alertsData || []).map(a => ({ ...a, type: 'alert' })),
        ...(reportsData || []).map(r => ({ ...r, type: 'report' }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setAlerts(combined);
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader 
        title={t("threat_feed.title")}
        subtitle={t("threat_feed.subtitle")}
      />

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="py-20 text-center text-white/20 font-black uppercase tracking-[0.3em]">{t("dashboard.syncing")}</div>
          ) : alerts.map((item) => (
            <motion.div
              key={`${item.type}-${item.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-8 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group",
                item.severity?.toLowerCase() === 'critical' ? "border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]" : "border-white/10"
              )}
            >
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                          item.type === 'alert' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        )}>
                          {item.type === 'alert' ? t("threat_feed.global_alert") : t("threat_feed.community_report")}
                        </span>
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10",
                          item.severity?.toLowerCase() === 'critical' ? "text-red-500" : 
                          item.severity?.toLowerCase() === 'high' ? "text-orange-500" :
                          "text-blue-500"
                        )}>
                          {item.severity} {t("threat_feed.risk")}
                        </span>
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                           {new Date(item.created_at).toLocaleDateString()}
                        </span>
                     </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight leading-tight">{item.title || item.incident_title}</h3>
                    <p className="text-secondary leading-relaxed text-sm max-w-4xl">{item.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                     <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                           {t("reports.form.platform")}: <span className="text-white/60">{item.platform}</span>
                        </span>
                     </div>
                  </div>
               </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const CommunityReportsView = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    scam_type: "",
    platform: "",
    incident_title: "",
    description: "",
    severity: "high",
    evidence_url: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from('scam_reports').insert({
        user_id: user.id,
        incident_title: formData.incident_title,
        description: formData.description,
        scam_type: formData.scam_type,
        platform: formData.platform,
        severity: formData.severity,
        evidence_url: formData.evidence_url,
        created_at: new Date().toISOString()
      });
      if (error) {
        console.error("Supabase Error Details:", error);
        throw error;
      }
      alert(t("reports.success"));
      setFormData({ scam_type: "", platform: "", incident_title: "", description: "", severity: "high", evidence_url: "" });
    } catch (e: any) { 
      console.error("Full Submission Error Detail:", e);
      alert(t("reports.error") + (e.message ? ": " + e.message : ""));
    } finally { 
      setSubmitting(false); 
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader 
        title={t("reports.title")}
        subtitle={t("reports.subtitle")}
      />

      <div className="grid grid-cols-1 gap-8">
        <Card className="p-8 md:p-12 rounded-[3rem] border-white/5 bg-white/[0.01] relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Flag className="size-32" />
           </div>
           
           <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">{t("reports.form.type")}</Label>
                    <Input 
                      required
                      value={formData.scam_type}
                      onChange={(e) => setFormData({...formData, scam_type: e.target.value})}
                      placeholder={t("reports.form.type_placeholder")}
                      className="h-14 bg-white/[0.03] border-white/5 rounded-2xl px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/30 transition-all"
                    />
                 </div>
                 <div className="space-y-4">
                    <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">{t("reports.form.platform")}</Label>
                    <Input 
                      required
                      value={formData.platform}
                      onChange={(e) => setFormData({...formData, platform: e.target.value})}
                      placeholder={t("reports.form.platform_placeholder")}
                      className="h-14 bg-white/[0.03] border-white/5 rounded-2xl px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/30 transition-all"
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">{t("reports.form.title")}</Label>
                 <Input 
                   required
                   value={formData.incident_title}
                   onChange={(e) => setFormData({...formData, incident_title: e.target.value})}
                   placeholder={t("reports.form.title_placeholder")}
                   className="h-14 bg-white/[0.03] border-white/5 rounded-2xl px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/30 transition-all"
                 />
              </div>

              <div className="space-y-4">
                 <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">{t("reports.form.description")}</Label>
                 <textarea 
                   required
                   value={formData.description}
                   onChange={(e) => setFormData({...formData, description: e.target.value})}
                   placeholder={t("reports.form.description_placeholder")}
                   className="w-full h-40 bg-white/[0.03] border-white/5 rounded-[2rem] p-6 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/30 transition-all resize-none font-medium leading-relaxed"
                 />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">{t("reports.form.severity")}</Label>
                  <select 
                    value={formData.severity}
                    onChange={(e) => setFormData({...formData, severity: e.target.value})}
                    className="w-full h-14 bg-white/[0.03] border-white/5 rounded-2xl px-6 text-white focus:outline-none focus:border-blue-500/30 transition-all appearance-none"
                  >
                    <option value="low" className="bg-[#0A0A0B] text-white">{t("reports.form.severity_low")}</option>
                    <option value="medium" className="bg-[#0A0A0B] text-white">{t("reports.form.severity_medium")}</option>
                    <option value="high" className="bg-[#0A0A0B] text-white">{t("reports.form.severity_high")}</option>
                    <option value="critical" className="bg-[#0A0A0B] text-white">{t("reports.form.severity_critical")}</option>
                  </select>
                </div>
                <div className="space-y-4">
                   <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">{t("reports.form.evidence")}</Label>
                   <Input 
                     value={formData.evidence_url}
                     onChange={(e) => setFormData({...formData, evidence_url: e.target.value})}
                     placeholder={t("reports.form.evidence_placeholder")}
                     className="h-14 bg-white/[0.03] border-white/5 rounded-2xl px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/30 transition-all"
                   />
                </div>
              </div>

              <Button 
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto h-16 px-12 rounded-2xl bg-white text-black hover:bg-white/90 font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-50"
              >
                {submitting ? (
                  <div className="flex items-center gap-3">
                     <RefreshCcw className="size-5 animate-spin" /> {t("reports.form.submitting")}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                     {t("reports.form.submit")} <Send className="size-5" />
                  </div>
                )}
              </Button>
           </form>
        </Card>
      </div>
    </div>
  );
};


const TrustSystemView = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader title={t("trust.title")} subtitle={t("trust.subtitle")} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center justify-center p-8 glass rounded-[3rem] border border-white/10">
          <div className="p-4 bg-white rounded-3xl mb-6">
            <QrCode className="size-64 text-black" />
          </div>
          <p className="text-white font-bold text-xl mb-2">{t("trust.safety_id")}</p>
          <p className="text-secondary text-sm font-medium">{t("trust.protector")} • {t("trust.score")}: 98%</p>
        </div>

        <div className="space-y-6">
          <Card className="glass border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">{t("trust.settings")}</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">{t("trust.public_badge")}</p>
                  <p className="text-sm text-secondary">{t("trust.public_badge_desc")}</p>
                </div>
                <Checkbox id="public-score" defaultChecked className="size-6 rounded-lg border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-white/20">{t("trust.rank")}</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["Guardian", "Sentinel", "Apex"].map((level) => (
                    <Button key={level} variant="outline" className={cn(
                      "rounded-xl border-white/5 bg-white/5 hover:bg-white/10 text-xs font-bold",
                      level === "Apex" && "border-white/40 bg-white/10 text-white"
                    )}>
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <Button className="flex-1 h-12 rounded-xl bg-white text-black hover:bg-white/90 font-bold gap-2">
                  <Share2 className="size-4" /> {t("trust.export_id")}
                </Button>
                <Button variant="outline" className="flex-1 h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold">
                  {t("trust.view_achievements")}
                </Button>
              </div>
            </div>
          </Card>
          
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
            <Shield className="size-5 text-emerald-400" />
            <p className="text-xs text-white/40 font-medium">{t("trust.security_note")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightsView = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader title={t("insights.title")} subtitle={t("insights.subtitle")} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="size-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Shield className="size-6" />
            </div>
            <span className="text-xs font-bold text-emerald-400">+12%</span>
          </div>
          <p className="text-3xl font-bold text-white">850 <span className="text-sm font-medium text-white/40">{t("insights.alerts")}</span></p>
          <p className="text-xs text-white/40 mt-1">{t("insights.alerts_blocked")}</p>
        </Card>
        <Card className="border-white/10 bg-white/5 glass">
          <div className="flex items-center justify-between mb-4">
            <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Activity className="size-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">+5%</span>
          </div>
          <p className="text-3xl font-bold text-white">210 <span className="text-sm font-medium text-secondary">{t("insights.verified")}</span></p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mt-1">{t("insights.patterns")}</p>
        </Card>
        <Card className="border-blue-500/20 bg-blue-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="size-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <CheckCircle className="size-6" />
            </div>
            <span className="text-xs font-bold text-blue-400">95%</span>
          </div>
          <p className="text-3xl font-bold text-white">95 <span className="text-sm font-medium text-white/40">%</span></p>
          <p className="text-xs text-white/40 mt-1">{t("insights.recovery_rate")}</p>
        </Card>
      </div>

      <Card className="h-[400px] p-6 glass border-white/10">
      <h3 className="text-lg font-bold text-white mb-6">{t("insights.history_title")}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={INSIGHTS_DATA}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
          <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '12px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area type="monotone" dataKey="views" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  </div>
  );
};

const MeetupView = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader title={t("threat_feed.title")} subtitle={t("threat_feed.subtitle")} />
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col items-center justify-center space-y-8 py-12">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="size-64 rounded-full bg-red-600 shadow-[0_0_80px_rgba(220,38,38,0.4)] flex items-center justify-center text-white relative group"
        >
          <div className="absolute inset-0 rounded-full border-8 border-white/20 animate-ping duration-[2000ms]" />
          <div className="flex flex-col items-center">
            <Bell className="size-20 mb-2" />
            <span className="text-2xl font-black uppercase tracking-tighter">{t("threat_feed.emergency")}</span>
          </div>
        </motion.button>
        <p className="text-white/60 font-medium text-center max-w-xs">{t("threat_feed.emergency_desc")}</p>
      </div>

      <div className="space-y-6">
        <Card className="glass border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="size-8 text-white" />
            <h4 className="font-bold text-lg text-white">{t("threat_feed.active_guard_zones")}</h4>
          </div>
          <p className="text-sm font-medium text-secondary mb-6">{t("threat_feed.guard_zones_desc")}</p>
          <Button className="w-full bg-white text-black hover:bg-white/90 font-bold rounded-xl h-12">{t("threat_feed.browse_risk_map")}</Button>
        </Card>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest">{t("threat_feed.recent_alerts")}</h4>
          {[
            { item: "Fake Crypto Platform", time: "Today, 2:00 PM", location: "Global" },
            { item: "Identity Theft Wave", time: "Yesterday, 11:00 AM", location: "Region Specific" },
          ].map((meetup, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">{meetup.item}</p>
                <p className="text-xs text-white/40">{meetup.time} • {meetup.location}</p>
              </div>
              <Button size="sm" variant="ghost" className="text-white/40 hover:text-white">
                <ChevronRight className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

const LearningHubView = () => {
  const { t } = useTranslation();
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean>>({});

  const categories = [
    "All",
    "Digital Safety",
    "Financial Scam",
    "Banking Fraud",
    "Social Engineering",
    "Social Media Scam",
    "Phishing"
  ];

  const filteredArticles = articles.filter(art => 
    activeCategory === "All" || art.category === activeCategory
  );

  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const VIDEOS = [
    { id: "v1", title: "What is Cyber Fraud", url: "https://www.youtube.com/watch?v=qdpReVgpQhc", category: "Digital Safety", desc: "A basic introduction to how cyber fraud happens and why it's a major threat." },
    { id: "v2", title: "Phishing Scams Explained", url: "https://www.youtube.com/watch?v=TmDgim1StpM", category: "Phishing", desc: "Understanding the most common way hackers gain access to your accounts." },
    { id: "v3", title: "Spotting Phishing Emails", url: "https://www.youtube.com/watch?v=GOaTH25CvmM", category: "Phishing", desc: "Learn the visual cues and patterns that reveal an email is fake." },
    { id: "v4", title: "UPI Fraud Awareness", url: "https://www.youtube.com/watch?v=UasqK0JA6co", category: "Financial Scam", desc: "Crucial guide to staying safe while using digital payment apps like GPay or PhonePe." },
    { id: "v5", title: "UPI Fraud Awareness (Hindi)", url: "https://www.youtube.com/watch?v=9mBMspGhm3E", category: "Financial Scam", desc: "Cyber safety guide for UPI payments explained specifically for Hindi-speaking users." },
    { id: "v6", title: "Digital Payment Scam Awareness", url: "https://www.youtube.com/watch?v=Nq1eq2S9iRQ", category: "Banking Fraud", desc: "Comprehensive overview of various digital payment scams and how to avoid them." },
    { id: "v7", title: "Biggest UPI Scams Explained", url: "https://www.youtube.com/watch?v=E33SZphM3yU", category: "Financial Scam", desc: "Analyzing real-world cases of large-scale UPI frauds." },
    { id: "v8", title: "OTP Fraud Awareness", url: "https://www.youtube.com/watch?v=iYXoMzTrtes", category: "Financial Scam", desc: "Why sharing your OTP is like giving away your house keys." },
    { id: "v9", title: "OTP Scam Prevention", url: "https://www.youtube.com/watch?v=kSnVhlxFkB8", category: "Financial Scam", desc: "Tactics to avoid falling for social engineering attempts to get your OTP." },
    { id: "v10", title: "QR Code Scam Awareness", url: "https://www.youtube.com/watch?v=aB8j3CMBQYM", category: "Financial Scam", desc: "Quick warning about why you should never scan QR codes to 'receive' money." },
    { id: "v11", title: "Fake Banking & KYC Scams", url: "https://www.youtube.com/watch?v=LIjN2Kq2JjM", category: "Banking Fraud", desc: "How scammers impersonate bank officials to steal your banking credentials." },
    { id: "v12", title: "WhatsApp Scam Awareness", url: "https://www.youtube.com/watch?v=OYahUjYrNlY", category: "Social Media Scam", desc: "Stay safe from phishing links and fraud on your favorite messaging app." },
    { id: "v13", title: "Social Engineering Explained", url: "https://www.youtube.com/watch?v=VgFOqpcf9rQ", category: "Social Engineering", desc: "How psychological manipulation is used to trick people into divulging secrets." },
    { id: "v14", title: "Real-Life Phishing Scam Example", url: "https://www.youtube.com/watch?v=NSAyCLgclMo", category: "Phishing", desc: "Actual demonstration of a phishing attack from start to finish." },
    { id: "v15", title: "Cyber Safety Basics", url: "https://www.youtube.com/watch?v=sg0kQYvTlnc", category: "Digital Safety", desc: "Elementary rules for staying safe on the internet in your daily life." },
    { id: "v16", title: "Cyber Awareness Training", url: "https://www.youtube.com/watch?v=1jfm2E_wvBo", category: "Digital Safety", desc: "Step-by-step training for organizations and individuals on threat mitigation." },
    { id: "v17", title: "Password Safety & Cyber Hygiene", url: "https://www.youtube.com/watch?v=3NjQ9b3pgIg", category: "Digital Safety", desc: "Best practices for password management and general digital cleanliness." },
    { id: "v18", title: "Public WiFi Risks", url: "https://www.youtube.com/watch?v=JXKp3GAvqI0", category: "Digital Safety", desc: "Why connecting to that free airport WiFi might put your data at risk." },
    { id: "v19", title: "Online Shopping Scam Awareness", url: "https://www.youtube.com/watch?v=Y7zNlEMDmI4", category: "Financial Scam", desc: "How to identify fake e-commerce sites and fraudulent payment gateways." },
    { id: "v20", title: "Instagram & Social Media Scams", url: "https://www.youtube.com/watch?v=K6kU6QzF8nU", category: "Social Media Scam", desc: "Protect your accounts and personal life from social media predators." },
    { id: "v21", title: "Fake Job Scam Detection", url: "https://www.youtube.com/watch?v=Q7P7P0d9QxQ", category: "Financial Scam", desc: "Identify red flags in job offers that seem too good to be true." },
    { id: "v22", title: "Romance Scam Awareness", url: "https://www.youtube.com/watch?v=C7M9w6m4X8E", category: "Social Engineering", desc: "Understanding the emotional manipulation involved in catfishing and romance fraud." },
    { id: "v23", title: "Deepfake & AI Scam Awareness", url: "https://www.youtube.com/watch?v=G7RgN9ijwE4", category: "Digital Safety", desc: "The next generation of scams: how AI can impersonate voices and faces." },
    { id: "v24", title: "Cyber Safety for Students", url: "https://www.youtube.com/watch?v=1J5Y6Kx9zkA", category: "Digital Safety", desc: "Helping students navigate online learning and social spaces safely." },
    { id: "v25", title: "Cyber Safety for Senior Citizens", url: "https://www.youtube.com/watch?v=5JdK0S3lK9A", category: "Digital Safety", desc: "Protecting our elders from being targeted by tech support and banking scammers." }
  ];

  const featuredArticle = articles.find(art => art.threatLevel === "Critical") || articles[0];
  const gridArticles = filteredArticles.filter(art => art.id !== featuredArticle.id);

  const handleRevealAnswer = (questionId: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: true }));
  };

  if (selectedArticle) {
    return (
      <div className="animate-in fade-in slide-in-from-left-4 duration-500">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedArticle(null)}
          className="mb-6 text-white/40 hover:text-white flex items-center gap-2 group p-0"
        >
          <ChevronLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          {t("learning.back_to_hub")}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-0 overflow-hidden rounded-[2.5rem] border-white/5 bg-white/[0.01]">
              <div className="aspect-video relative overflow-hidden">
                <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                   <div className="flex items-center gap-3 mb-4">
                     <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/30">
                       {selectedArticle.category}
                     </span>
                     <span className={cn(
                       "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                       selectedArticle.threatLevel === "Critical" ? "bg-red-500/20 text-red-500 border-red-500/30" : 
                       selectedArticle.threatLevel === "High" ? "bg-orange-500/20 text-orange-500 border-orange-500/30" :
                       "bg-blue-500/20 text-blue-400 border-blue-500/30"
                     )}>
                       {selectedArticle.threatLevel} {t("learning.threat")}
                     </span>
                   </div>
                   <h1 className="text-4xl font-black text-white tracking-tighter uppercase">{selectedArticle.title}</h1>
                </div>
              </div>

              <div className="p-8 md:p-12 space-y-10">
                {/* Introduction */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-white/80 leading-relaxed font-medium italic border-l-4 border-blue-500 pl-6">
                    {selectedArticle.introduction}
                  </p>
                </div>

                {/* How it Works */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <History className="size-6 text-blue-500" /> {t("learning.how_it_works")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedArticle.howItWorks.map((step: string, i: number) => (
                      <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-3 relative overflow-hidden group">
                        <span className="text-4xl font-black text-white/5 absolute -top-2 -right-2 tracking-tighter group-hover:text-blue-500/10 transition-colors">0{i + 1}</span>
                        <p className="text-sm text-secondary leading-relaxed relative z-10">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Red Flags & Prevention */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-[2rem] bg-red-500/5 border border-red-500/10 space-y-4">
                    <h4 className="text-red-500 font-bold flex items-center gap-2">
                       <ShieldAlert className="size-5" /> {t("learning.red_flags")}
                    </h4>
                    <ul className="space-y-3">
                      {selectedArticle.redFlags.map((flag: string, i: number) => (
                        <li key={i} className="text-sm text-white/60 flex items-start gap-3">
                          <span className="size-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                    <h4 className="text-emerald-400 font-bold flex items-center gap-2">
                       <ShieldCheck className="size-5" /> {t("learning.prevention_tips")}
                    </h4>
                    <ul className="space-y-3">
                      {selectedArticle.preventionTips.map((tip: string, i: number) => (
                        <li key={i} className="text-sm text-white/60 flex items-start gap-3">
                          <span className="size-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Real Example */}
                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-4 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                      <MessageSquare className="size-32" />
                   </div>
                   <h4 className="text-white font-bold flex items-center gap-2">
                      <Lightbulb className="size-5 text-yellow-500" /> {t("learning.real_scenario")}
                   </h4>
                   <p className="text-sm text-white/60 leading-relaxed italic relative z-10">
                     "{selectedArticle.realExample}"
                   </p>
                </div>

                {/* Video Support */}
                {selectedArticle.videoUrl && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <Youtube className="size-6 text-red-600" /> {t("learning.video_awareness")}
                    </h3>
                    <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-black">
                      <iframe 
                        className="w-full h-full"
                        src={selectedArticle.videoUrl.replace("watch?v=", "embed/")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Takeaways Card */}
            <Card className="p-8 rounded-[2.5rem] border-white/5 bg-blue-500/[0.02]">
              <h4 className="text-lg font-bold text-white mb-6">{t("learning.key_takeaways")}</h4>
              <div className="space-y-4">
                {selectedArticle.keyTakeaways.map((item: string, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className="size-5 rounded-md bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                       <CheckCircle className="size-3 text-blue-400" />
                    </div>
                    <p className="text-xs text-secondary leading-normal font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Checklist Card */}
            <Card className="p-8 rounded-[2.5rem] border-white/5 bg-emerald-500/[0.02]">
              <h4 className="text-lg font-bold text-white mb-6">{t("learning.safety_checklist")}</h4>
              <div className="space-y-4">
                {selectedArticle.checklist.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-4">
                    <Checkbox className="size-5 rounded-lg border-white/10 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-black" />
                    <p className="text-xs text-white/60 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quiz Section */}
            <Card className="p-8 rounded-[2.5rem] border-red-500/10 bg-red-500/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <FileQuestion className="size-20" />
              </div>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Brain className="size-5 text-red-500" /> {t("learning.knowledge_check")}
              </h4>
              <div className="space-y-8 relative z-10">
                {selectedArticle.quiz.map((q: any, i: number) => (
                  <div key={i} className="space-y-4">
                    <p className="text-[11px] font-black text-white/40 uppercase tracking-widest">{t("learning.question")} {i + 1}</p>
                    <p className="text-sm font-bold text-white leading-tight">{q.question}</p>
                    {quizAnswers[`${selectedArticle.id}-${i}`] ? (
                       <div className="p-4 rounded-xl bg-white/10 border border-white/10 animate-in fade-in zoom-in-95 duration-500">
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">{t("learning.answer")}</p>
                          <p className="text-xs text-white/80 font-medium leading-relaxed">{q.answer}</p>
                       </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        onClick={() => handleRevealAnswer(`${selectedArticle.id}-${i}`)}
                        className="w-full rounded-xl border-white/10 bg-white/5 hover:bg-white hover:text-black font-black text-[10px] uppercase tracking-widest"
                      >
                        {t("learning.reveal_answer")}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm pointer-events-auto"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video glass border-white/10 rounded-[2.5rem] overflow-hidden pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <Button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-50 size-10 rounded-full bg-black/60 hover:bg-black p-0 border border-white/10"
              >
                <X className="size-5" />
              </Button>
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(selectedVideo.url)}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">{t("learning.header_title")}</h1>
          <p className="text-secondary font-medium text-sm">{t("learning.header_subtitle")}</p>
        </div>
        <div className="flex items-center gap-6 bg-white/5 border border-white/5 p-4 rounded-2xl">
          <div className="text-right">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{t("settings.protection_status")}</p>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-black text-white">{t("settings.max_secure")}</p>
              <div className="size-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                <ShieldCheck className="size-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
              activeCategory === cat 
                ? "bg-blue-600 text-white border-blue-500 shadow-[0_10px_20px_rgba(37,99,235,0.2)]" 
                : "bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:border-white/20 hover:text-white"
            )}
          >
            {t(`learning.categories.${cat.toLowerCase().replace(/ /g, '_')}`)}
          </button>
        ))}
      </div>

      {/* 2. Featured Article Section */}
      {featuredArticle && activeCategory === "All" && (
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="group cursor-pointer"
          onClick={() => setSelectedArticle(featuredArticle)}
        >
          <Card className="p-0 overflow-hidden rounded-[3rem] border-white/5 bg-white/[0.01] relative min-h-[450px] flex transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]">
            <div className="absolute inset-0">
               <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>
            
            <div className="relative z-10 w-full md:w-2/3 p-10 md:p-16 flex flex-col justify-center gap-6">
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-500/30">
                   {featuredArticle.threatLevel} {t("learning.threat")}
                 </span>
                 <span className="text-[10px] font-bold text-white/40 border-l border-white/10 pl-3 uppercase tracking-widest">
                   {featuredArticle.readTime} {t("learning.read")}
                 </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none group-hover:text-blue-400 transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="text-lg text-secondary max-w-xl leading-relaxed">
                {featuredArticle.summary}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {featuredArticle.videoUrl && (
                  <Button 
                    variant="outline" 
                    onClick={(e) => {
                      e.stopPropagation();
                      const videoId = featuredArticle.videoUrl.split('v=')[1];
                      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
                    }}
                    className="rounded-2xl border-white/10 bg-white/5 hover:bg-white hover:text-black h-14 px-8 text-white font-black uppercase tracking-widest text-xs gap-3 transition-all relative z-20"
                  >
                    <Youtube className="size-5 text-red-500" /> {t("learning.play_video")}
                  </Button>
                )}
                <div className="h-14 flex items-center px-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-blue-500 transition-colors">
                   {t("learning.open_article")}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* 3. Article Grid Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">
            {activeCategory === "All" ? t("learning.articles") : `${activeCategory} ${t("learning.articles")}`}
          </h3>
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{gridArticles.length} {t("learning.resources_available")}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeCategory === "All" ? gridArticles : filteredArticles).map((article, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group cursor-pointer h-full"
              onClick={() => setSelectedArticle(article)}
            >
              <Card 
                className="p-0 overflow-hidden rounded-[2.5rem] border-white/5 bg-white/[0.01] h-full flex flex-col transition-all duration-500 group-hover:border-blue-500/30 group-hover:shadow-[0_20px_40px_rgba(59,130,246,0.05)]"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest border border-white/10">
                      {article.category}
                    </span>
                    <span className={cn(
                      "backdrop-blur-md text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest border",
                      article.threatLevel === "Critical" ? "bg-red-500/60 text-white border-red-500/20" : "bg-blue-500/60 text-white border-blue-500/20"
                    )}>
                      {article.threatLevel} {t("learning.threat")}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {article.readTime} {t("learning.read")}</span>
                      <span className="flex items-center gap-1"><Brain className="size-3" /> {article.difficulty}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors h-14 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-blue-500 transition-colors">{t("learning.open_article")}</span>
                    <ChevronRight className="size-4 text-white/10 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Cyber Awareness Videos Section */}
      <div className="space-y-10 pt-10 border-t border-white/5">
        <div className="space-y-2">
          <SectionHeader 
            title={t("learning.awareness_videos_title")} 
            subtitle={t("learning.awareness_videos_subtitle")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {VIDEOS.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group cursor-pointer h-full"
              onClick={() => setSelectedVideo(video)}
            >
              <Card className="p-0 overflow-hidden rounded-[2rem] border-white/5 bg-white/[0.01] h-full flex flex-col transition-all duration-500 group-hover:border-blue-500/30 group-hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)]">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={`https://img.youtube.com/vi/${getYoutubeId(video.url)}/maxresdefault.jpg`} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${getYoutubeId(video.url)}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="size-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                        <PlayCircle className="size-8 text-white fill-white/20" />
                     </div>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest border border-white/10">
                      {t(`learning.categories.${video.category.toLowerCase().replace(/ /g, '_')}`)}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col gap-3">
                  <h4 className="text-md font-bold text-white leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-[10px] text-secondary leading-relaxed line-clamp-3">
                    {video.desc}
                  </p>
                  <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/20 group-hover:text-blue-500 transition-colors">{t("learning.play_video")}</span>
                    <Youtube className="size-4 text-red-500/40 group-hover:text-red-500 transition-colors" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


const ScamQuizArenaView = () => {
  const { t } = useTranslation();
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [quizState, setQuizState] = useState<'idle' | 'question' | 'result'>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<null | 'scam' | 'safe'>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Mock Quiz Questions
  const questions = [
    {
      scenario: "You receive an SMS: 'URGENT: Your electricity bill is unpaid. Connection will be cut tonight at 9 PM. Pay immediately at bit.ly/power-pay-99'",
      type: "scam",
      explanation: "Official utility providers never send urgent threats via SMS with shortened bit.ly links. This is a classic phishing attempt to steal payment details.",
      redFlags: ["Shortened URL (bit.ly)", "Urgency/Threat of disconnection", "Unverified sender number"]
    },
    {
      scenario: "An email from 'Netflix Support' says: 'Your subscription payment failed. Please update your details to continue watching.' The sender email is support@netflix-billing.com",
      type: "scam",
      explanation: "Netflix uses netflix.com domains. Any variation like 'netflix-billing.com' is a fake domain used to capture login credentials.",
      redFlags: ["Mismatched domain info", "Generic request for details"]
    },
    {
      scenario: "A WhatsApp message from a friend's number: 'Hey, I'm stuck in an emergency. Can you send 5,000 via UPI? I'll pay you back tomorrow. [UPI Link]'",
      type: "scam",
      explanation: "This is a common account takeover scam. Scammers use compromised numbers to target friends. Always call the friend to verify before sending money.",
      redFlags: ["Sudden emergency request for money", "Unusual communication style"]
    }
  ];

  const handleStartQuiz = (index: number) => {
    setCurrentQuiz(index);
    setQuizState('question');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswer = (choice: 'scam' | 'safe') => {
    setSelectedAnswer(choice);
    if (choice === questions[currentQuestionIndex].type) {
      setScore(s => s + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizState('result');
    }
  };

  const categories = [
    { title: "Phishing Quiz", icon: Mail, desc: "Can you spot the difference between real and fake emails?", color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "UPI Scam Quiz", icon: QrCode, desc: "Test your ability to identify fraudulent payment requests.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "OTP Theft Quiz", icon: ShieldCheck, desc: "How good are you at protecting your one-time passwords?", color: "text-red-400", bg: "bg-red-500/10" },
    { title: "Fake Job Scam Quiz", icon: User, desc: "Learn to identify fraudulent job offers before you apply.", color: "text-orange-400", bg: "bg-orange-500/10" },
    { title: "Social Media Scam Quiz", icon: Share2, desc: "Identify viral scams and impersonation attempts.", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  ];

  return (
    <div className="p-6 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">{t("quiz.title")}</h1>
          <p className="text-secondary font-medium text-sm max-w-lg">{t("quiz.subtitle")}</p>
        </div>
        <div className="flex items-center gap-6 bg-white/5 border border-white/5 p-4 rounded-2xl">
          <div className="text-right">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{t("quiz.global_rank")}</p>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-black text-white">Top 5%</p>
              <div className="size-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                <Star className="size-4" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Select Arena Cards (Always Visible) */}
      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">{t("quiz.select_arena")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <Card key={i} className="group p-6 rounded-[2rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col items-center text-center gap-4">
              <div className={cn("size-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", cat.bg, cat.color)}>
                <cat.icon className="size-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs mb-1 leading-tight">{cat.title}</h4>
                <p className="text-[9px] text-white/40 leading-relaxed line-clamp-2">{cat.desc}</p>
              </div>
              <Button 
                onClick={() => handleStartQuiz(i)}
                variant="ghost" 
                className="mt-auto w-full text-[9px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 hover:bg-transparent"
              >
                {t("quiz.start_quiz")}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. Live Quiz Challenge Section */}
      <div className="space-y-8 pt-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">{t("quiz.live_challenge")}</h3>
            <p className="text-[10px] text-secondary">{t("quiz.interactive_sim")}</p>
          </div>
          
          {quizState === 'question' && (
            <div className="flex items-center gap-6 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">{t("quiz.progress")}</p>
                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }} />
                </div>
                <p className="text-[10px] font-black text-white">{currentQuestionIndex + 1}/{questions.length}</p>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                 <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">{t("quiz.score")}</p>
                 <p className="text-[10px] font-black text-emerald-400">{score}</p>
              </div>
            </div>
          )}
        </div>

        {quizState === 'idle' ? (
          <Card className="p-12 rounded-[3.5rem] border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center gap-8 py-24 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="size-20 rounded-[2rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 relative z-10 transition-transform group-hover:scale-110">
              <Brain className="size-10" />
            </div>
            <div className="space-y-3 relative z-10">
              <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{t("quiz.daily_challenge")}</h4>
              <p className="text-sm text-secondary font-medium max-w-sm mx-auto">{t("quiz.daily_desc")}</p>
            </div>
            <Button 
              onClick={() => handleStartQuiz(0)}
              className="rounded-2xl bg-white text-black px-12 h-14 font-black uppercase tracking-widest text-[11px] relative z-10 hover:bg-white/90 transform transition-all active:scale-95"
            >
              {t("quiz.start_daily")}
            </Button>
          </Card>
        ) : quizState === 'question' ? (
          <div className="max-w-3xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="p-10 rounded-[3rem] border-white/5 bg-white/[0.01] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Brain className="size-32" />
                </div>
                
                <div className="relative z-10 space-y-10">
                  <div className="p-10 rounded-[2.5rem] bg-white text-black font-semibold text-lg leading-relaxed italic border-4 border-dashed border-black/10 relative shadow-2xl">
                    <div className="absolute -top-4 -left-4 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">{t("scam_scanner.suspect_match")}</div>
                    "{questions[currentQuestionIndex].scenario}"
                  </div>

                  {!showExplanation ? (
                    <div className="grid grid-cols-2 gap-6">
                      <Button 
                        onClick={() => handleAnswer('scam')}
                        className="h-24 rounded-[2rem] bg-red-500/10 border-2 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white text-xl font-black uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-red-500/20"
                      >
                        {t("quiz.scam")}
                      </Button>
                      <Button 
                        onClick={() => handleAnswer('safe')}
                        className="h-24 rounded-[2rem] bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black text-xl font-black uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-emerald-500/20"
                      >
                        {t("quiz.safe")}
                      </Button>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                      <div className={cn(
                        "p-8 rounded-[2.5rem] flex items-center gap-6",
                        selectedAnswer === questions[currentQuestionIndex].type 
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          : "bg-red-500/10 border border-red-500/20 text-red-500"
                      )}>
                        <div className="size-16 rounded-2xl bg-black/20 flex items-center justify-center">
                          {selectedAnswer === questions[currentQuestionIndex].type ? <CheckCircle className="size-10" /> : <ShieldAlert className="size-10" />}
                        </div>
                        <div>
                          <p className="text-2xl font-black uppercase tracking-tighter">
                            {selectedAnswer === questions[currentQuestionIndex].type ? t("quiz.correct") : t("quiz.incorrect")}
                          </p>
                          <p className="text-sm font-medium opacity-70">{t("quiz.identified_as")} {questions[currentQuestionIndex].type}.</p>
                        </div>
                      </div>

                      <div className="space-y-6 bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5">
                        <p className="text-secondary text-sm leading-relaxed">{questions[currentQuestionIndex].explanation}</p>
                        
                        <div className="space-y-3">
                          <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">{t("quiz.red_flags_spotted")}</p>
                          <div className="flex flex-wrap gap-2">
                            {questions[currentQuestionIndex].redFlags.map((flag, i) => (
                              <span key={i} className="text-[10px] font-bold text-white/50 bg-white/5 border border-white/5 px-4 py-2 rounded-full">{flag}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={handleNext}
                        className="w-full h-16 rounded-[2rem] bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-xs shadow-xl"
                      >
                        {currentQuestionIndex < questions.length - 1 ? t("quiz.next_scenario") : t("quiz.review_performance")}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto w-full text-center space-y-10 py-12">
            <div className="space-y-4">
              <div className="size-24 rounded-[2.5rem] bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-8 animate-bounce">
                <Star className="size-12 text-yellow-500" fill="currentColor" />
              </div>
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none italic">{t("quiz.assessment_over")}</h2>
              <p className="text-secondary font-medium uppercase tracking-widest text-[10px]">{t("quiz.analysis_complete")}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-10 rounded-[2.5rem] border-white/5 bg-white/[0.01]">
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">{t("quiz.precision_rate")}</p>
                 <p className="text-6xl font-black text-white leading-none">{Math.round((score / questions.length) * 100)}%</p>
              </Card>
              <Card className="p-10 rounded-[2.5rem] border-white/5 bg-white/[0.01]">
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">{t("quiz.threat_index")}</p>
                 <p className="text-2xl font-black text-emerald-400 uppercase tracking-widest">{score === questions.length ? t("quiz.elite") : t("quiz.protector")}</p>
              </Card>
            </div>

            <Button 
              onClick={() => setQuizState('idle')}
              className="w-full h-16 rounded-[2rem] bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-xs"
            >
              {t("quiz.reset_session")}
            </Button>
          </motion.div>
        )}
      </div>

      {/* 4. Quick Scam Tips & Recent Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">{t("quiz.quick_tips")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {[
               { title: "Zero Trust Method", desc: "Never share OTPs. No bank official will ever ask for them.", icon: ShieldCheck, color: "text-red-400", bg: "bg-red-500/10" },
               { title: "Domain Audit", desc: "Verify URLs. Check for subtle misspellings in domain names.", icon: Mail, color: "text-blue-400", bg: "bg-blue-500/10" },
               { title: "App Vigilance", desc: "Always install apps from verified official stores only.", icon: Zap, color: "text-emerald-400", bg: "bg-emerald-500/10" },
             ].map((tip, i) => (
                <Card key={i} className="p-6 rounded-[2rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all space-y-4">
                  <div className={cn("size-10 rounded-xl flex items-center justify-center", tip.bg, tip.color)}>
                    <tip.icon className="size-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs mb-1 uppercase tracking-tighter">{tip.title}</h5>
                    <p className="text-[10px] text-white/40 leading-relaxed font-medium">{tip.desc}</p>
                  </div>
                </Card>
             ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">{t("quiz.recent_stats")}</h3>
          <Card className="p-8 rounded-[2.5rem] border-white/5 bg-white/[0.01] space-y-8">
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{t("quiz.last_score")}</p>
                   <p className="text-3xl font-black text-emerald-400">4/5</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{t("quiz.peak_performance")}</p>
                   <p className="text-3xl font-black text-yellow-500">100%</p>
                </div>
             </div>
             <div className="pt-6 border-t border-white/5">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-4">{t("quiz.top_skill")}</p>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                   <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Mail className="size-5" />
                   </div>
                   <div>
                      <p className="text-xs font-black text-white uppercase tracking-tighter leading-none">{t("quiz.phishing_expert")}</p>
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">{t("quiz.level")} 4</p>
                   </div>
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};


const SettingsView = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, language, setLanguage } = useTranslation();
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [langPref, setLangPref] = useState('en');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      setProfileLoading(true);
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setFullName(data.full_name || user.user_metadata?.full_name || '');
        setBio(data.bio || '');
        setAvatarUrl(data.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture || '');
        setLangPref(data.language_pref || 'en');
      } else {
        setFullName(user.user_metadata?.full_name || '');
        setAvatarUrl(user.user_metadata?.avatar_url || user.user_metadata?.picture || '');
      }
      setProfileLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `avatars/${user.id}.${ext}`;
    const { error: uploadErr } = await supabase.storage.from('audio-evidence').upload(path, file, { upsert: true });
    if (uploadErr) {
      toast({ title: 'Upload failed', message: uploadErr.message, variant: 'destructive' });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from('audio-evidence').getPublicUrl(path);
    await supabase.from('profiles').update({ avatar_url: urlData.publicUrl, updated_at: new Date().toISOString() }).eq('id', user.id);
    setAvatarUrl(urlData.publicUrl);
    setUploading(false);
    toast({ title: 'Avatar Updated', message: 'Your profile picture has been saved.' });
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').update({
      full_name: fullName, bio, language_pref: langPref, updated_at: new Date().toISOString()
    }).eq('id', user.id);
    setSaving(false);
    if (error) {
      toast({ title: 'Error', message: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Saved', message: 'Your profile has been updated successfully.' });
  };

  const initials = fullName ? fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : (user?.email?.[0]?.toUpperCase() || '?');
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">{t("settings.header_title")}</h1>
          <p className="text-secondary font-medium text-sm">{t("settings.header_subtitle")}</p>
        </div>
        <div className="flex items-center gap-4 bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.05)]">
          <div className="flex flex-col items-end">
            <p className="text-[10px] font-black text-emerald-500/40 uppercase tracking-widest leading-none mb-1">{t("settings.protection_status")}</p>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <p className="text-sm font-black text-emerald-400 capitalize tracking-tight">{t("settings.max_secure")}</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col items-end">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">{t("settings.last_ai_scan")}</p>
            <p className="text-sm font-black text-white">4m ago</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* 2. Profile & Account Card */}
          <Card className="rounded-[2.5rem] border-white/5 bg-white/[0.01]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white">{t("settings.profile_info")}</h3>
              <div className="flex gap-2">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">{t("settings.cancel")}</Button>
                <Button onClick={handleSave} disabled={saving} className="bg-white text-black hover:bg-white/90 rounded-xl px-6 h-10 font-bold text-xs uppercase tracking-widest">{saving ? t("common.loading") : t("settings.save_changes")}</Button>
              </div>
            </div>
            
            {profileLoading ? (
              <div className="flex items-center justify-center py-16"><div className="size-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" /></div>
            ) : (
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="flex flex-col items-center gap-4 group cursor-pointer">
                <div className="relative" onClick={() => fileInputRef.current?.click()}>
                   <Avatar className="size-24 rounded-3xl border-2 border-blue-500/20 group-hover:border-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
                    <AvatarFallback className="bg-white/5 text-white text-xl font-bold">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 size-8 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-xl border-4 border-black group-hover:scale-110 transition-transform">
                    {uploading ? <RefreshCcw className="size-3 animate-spin" /> : <RefreshCcw className="size-3 font-bold" />}
                  </div>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                <Button variant="ghost" onClick={() => fileInputRef.current?.click()} className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] hover:text-white transition-colors">{uploading ? t("settings.uploading") : t("settings.change_avatar")}</Button>
              </div>

              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">{t("settings.full_name")}</Label>
                  <Input className="bg-white/[0.03] border-white/5 rounded-2xl h-12 focus:border-white/20 transition-all font-medium" value={fullName} onChange={e => setFullName(e.target.value)} placeholder={t("settings.name_placeholder")} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">{t("settings.email_address")}</Label>
                  <Input className="bg-white/[0.03] border-white/5 rounded-2xl h-12 focus:border-white/20 transition-all font-medium opacity-60" value={user?.email || ''} disabled />
                </div>
                <div className="space-y-2 md:col-span-2">
                   <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">{t("settings.account_bio")}</Label>
                   <Input className="bg-white/[0.03] border-white/5 rounded-2xl h-12 focus:border-white/20 transition-all font-medium" value={bio} onChange={e => setBio(e.target.value)} placeholder={t("settings.bio_placeholder")} />
                </div>
              </div>
            </div>
            )}
          </Card>

          {/* 3. Security Preferences Section */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] ml-2">{t("settings.hardware_ai")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: t("settings.two_factor"), desc: t("settings.two_factor_desc"), icon: ShieldCheck, state: true, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { title: t("settings.real_time"), desc: t("settings.real_time_desc"), icon: Bell, state: true, color: "text-blue-400", bg: "bg-blue-500/10" },
                { title: t("settings.login_activity"), desc: t("settings.login_activity_desc"), icon: Activity, state: false, color: "text-orange-400", bg: "bg-orange-500/10" },
                { title: t("settings.ai_pattern"), desc: t("settings.ai_pattern_desc"), icon: Bot, state: true, color: "text-purple-400", bg: "bg-purple-500/10" },
              ].map((pref, i) => (
                <Card key={i} className="p-6 rounded-[2rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.03] flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-4">
                    <div className={cn("size-10 rounded-xl bg-white/5 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-white/10", pref.color)}>
                      <pref.icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">{pref.title}</p>
                      <p className="text-[10px] text-white/40 font-medium leading-relaxed uppercase tracking-wider scale-y-90 origin-left">{pref.desc}</p>
                    </div>
                  </div>
                  <Switch defaultChecked={pref.state} className="data-[state=checked]:bg-blue-500" />
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* 4. Language & Accessibility */}
          <div className="space-y-6">
             <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] ml-2">{t("settings.regional")}</h3>
             <Card className="p-8 rounded-[2.5rem] border-white/5 bg-white/[0.01] space-y-6">
                <div className="space-y-4">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-white/20">{t("settings.preferred_lang")}</Label>
                   <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: 'English', code: 'en' },
                        { name: 'हिन्दी', code: 'hi' },
                        { name: 'ಕನ್ನಡ', code: 'kn' }
                      ].map((lang, i) => (
                        <button 
                          key={i} 
                          onClick={() => setLanguage(lang.code as any)}
                          className={cn(
                            "py-3 rounded-xl border text-[11px] font-black uppercase tracking-tight transition-all",
                            language === lang.code ? "bg-white text-black border-white" : "bg-white/5 text-white/40 border-white/5 hover:border-white/20"
                          )}
                        >
                          {lang.name}
                        </button>
                      ))}
                   </div>
                </div>
                <div className="pt-6 border-t border-white/5 space-y-4">
                   <div className="flex items-center justify-between">
                      <div>
                         <p className="text-xs font-bold text-white">{t("settings.system_theme")}</p>
                         <p className="text-[10px] text-white/20">{t("settings.dark_optimized")}</p>
                      </div>
                      <Badge className="bg-white/5 text-white/40 border-white/10">{t("settings.default_badge")}</Badge>
                   </div>
                   <div className="flex items-center justify-between">
                      <div>
                         <p className="text-xs font-bold text-white">{t("settings.screen_reader")}</p>
                         <p className="text-[10px] text-white/20">{t("settings.enhanced_accessibility")}</p>
                      </div>
                      <Switch />
                   </div>
                </div>
             </Card>
          </div>

          {/* 5. Danger Zone */}
          <div className="space-y-6">
             <h3 className="text-[11px] font-black text-red-500 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
               <ShieldAlert className="size-3" /> {t("settings.critical_actions")}
             </h3>
             <div className="glass p-8 rounded-[3rem] border-2 border-red-500/20 bg-red-500/[0.03] space-y-6 relative overflow-hidden group hover:border-red-500/40 transition-all shadow-[0_10px_40px_rgba(239,68,68,0.05)]">
                <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-10 transition-opacity bg-red-500 rounded-full blur-[60px] size-48 -mr-16 -mt-16" />
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity text-red-500">
                  <ShieldAlert className="size-20" />
                </div>
                <div className="space-y-2 relative z-10">
                   <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    {t("settings.warning_reset")}
                   </p>
                   <p className="text-sm font-medium text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">{t("settings.reset_desc")}</p>
                </div>
                
                <div className="space-y-2 relative z-10">
                   <Button variant="outline" className="w-full h-12 rounded-2xl border-white/5 bg-white/5 hover:bg-white text-black font-black text-[10px] uppercase tracking-widest transition-all">{t("settings.logout_everywhere")}</Button>
                   <Button variant="outline" className="w-full h-12 rounded-2xl border-red-500/20 hover:bg-red-500 text-white font-black text-[10px] uppercase tracking-widest transition-all">{t("settings.delete_account")}</Button>
                </div>
                <button className="w-full text-center text-[9px] font-black text-white/20 uppercase tracking-[0.4em] hover:text-red-400 transition-colors">{t("settings.reset_config")}</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const dashNavigate = useNavigate();
  const { t } = useTranslation();

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Protector';
  const userAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || '';
  const userEmail = user?.email || '';
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dashNavigate('/');
  };

  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard": return <DashboardView setActiveSection={setActiveSection} />;
      case "Scam Scanner": return <ScamScannerView />;
      case "Threat Feed": return <ThreatFeedView setActiveSection={setActiveSection} />;
      case "Scam Report Center": return <CommunityReportsView />;
      case "Learning Hub": return <LearningHubView />;
      case "Scam Quiz Arena": return <ScamQuizArenaView />;
      case "Settings": return <SettingsView />;
      default: return <DashboardView setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 border-r border-white/5 bg-black/40 backdrop-blur-2xl p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <img src="/logo.png" alt="ScamShield Logo" className="size-10 object-contain" referrerPolicy="no-referrer" />
          <span className="text-xl font-black tracking-tighter uppercase">ScamShield</span>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveSection(item.label)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                activeSection === item.label 
                  ? "bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.15)]" 
                  : "text-secondary hover:text-white hover:bg-white/5"
              )}
            >
              {activeSection === item.label && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-6 bg-black rounded-r-full"
                />
              )}
              <item.icon className={cn(
                "size-5 transition-all duration-300 group-hover:scale-110",
                activeSection === item.label ? "text-black" : "text-secondary group-hover:text-blue-400"
              )} />
              <TextRoll className="font-bold text-sm tracking-wide">{t(item.key)}</TextRoll>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
          <Link 
            to="/" 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-secondary hover:text-white hover:bg-white/5 transition-all group"
          >
            <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            <TextRoll className="font-bold text-sm tracking-wide">{t("common.back")}</TextRoll>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-secondary hover:text-red-400 hover:bg-red-500/5 transition-all group">
            <LogOut className="size-5 group-hover:translate-x-1 transition-transform" />
            <TextRoll className="font-bold text-sm tracking-wide">{t("nav.logout")}</TextRoll>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-2xl border-t border-white/5 z-50 px-4 flex items-center justify-between">
        {NAV_ITEMS.slice(0, 5).map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveSection(item.label)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              activeSection === item.label ? "text-white scale-110" : "text-secondary"
            )}
          >
            <item.icon className="size-6" />
            <TextRoll className="text-[10px] font-bold uppercase tracking-tighter">{t(item.key).split(' ')[0]}</TextRoll>
          </button>
        ))}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="flex flex-col items-center gap-1 text-secondary"
        >
          <Menu className="size-6" />
          <TextRoll className="text-[10px] font-bold uppercase tracking-tighter">{t("nav.more")}</TextRoll>
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-black border-l border-white/5 z-[70] p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-xl font-black tracking-tighter uppercase">{t("nav.menu")}</span>
                <Button size="icon" variant="ghost" onClick={() => setIsSidebarOpen(false)}>
                  <X className="size-6" />
                </Button>
              </div>
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveSection(item.label);
                      setIsSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200",
                      activeSection === item.label 
                        ? "bg-white text-black" 
                        : "text-secondary hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className="size-5" />
                    <TextRoll className="font-bold text-sm tracking-wide">{t(item.key)}</TextRoll>
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 min-h-screen overflow-y-auto no-scrollbar relative bg-black">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 md:px-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <Menu className="size-6" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white tracking-tight">{t("nav.welcome")}, {userName.split(' ')[0]}</h1>
              <p className="text-xs text-secondary font-medium">{userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-xl bg-white/10 p-[1px] overflow-hidden">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="size-full rounded-[11px] object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="size-full rounded-[11px] bg-black flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{userInitials}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Section Content */}
        <div className="px-6 md:px-10 py-8 pb-32 lg:pb-10 max-w-7xl mx-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
