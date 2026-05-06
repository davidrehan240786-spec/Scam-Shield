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
  Send,
  XCircle,
  Smartphone,
  Key,
  Briefcase,
  Cpu,
  Globe,
  Radio,
  Camera,
  Image as ImageIcon,
  Trash2
} from "lucide-react";
import { createWorker } from 'tesseract.js';
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
import { QUIZ_DATA } from "../data/quizData";
import { RippleCircles } from "@/components/ui/ripple-circles";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useTranslation, Language } from "@/i18n/TranslationContext";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- Error Boundary ---

class QuizErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Quiz Arena Crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-12 rounded-[3rem] border-2 border-red-500/20 bg-red-500/[0.03] text-center space-y-6">
          <div className="size-20 rounded-[2rem] bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-500">
            <ShieldAlert className="size-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Arena Connection Interrupted</h2>
            <p className="text-sm text-secondary max-w-sm mx-auto">We encountered a temporary issue with the quiz data. Your progress has been saved.</p>
          </div>
          <Button 
            onClick={() => {
              localStorage.removeItem("quiz_session_backup");
              window.location.reload();
            }} 
            className="rounded-2xl bg-white text-black hover:bg-white/90 font-bold px-8"
          >
            Reset Arena Session
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
  const [communityReports, setCommunityReports] = useState<number>(0);
  const [userReports, setUserReports] = useState<number>(0);
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const [{ count: total }, { count: mine }, { data: alerts }, { data: reports }] = await Promise.all([
          supabase.from('scam_reports').select('*', { count: 'exact', head: true }),
          supabase.from('scam_reports').select('*', { count: 'exact', head: true }).eq('user_id', user?.id || ''),
          supabase.from('threat_alerts').select('id,title,severity,category,created_at').order('created_at', { ascending: false }).limit(2),
          supabase.from('scam_reports').select('id,incident_title,severity,scam_type,created_at').order('created_at', { ascending: false }).limit(1),
        ]);
        setCommunityReports(total || 0);
        setUserReports(mine || 0);
        const combined = [
          ...(alerts || []).map(a => ({ ...a, _type: 'alert', _label: t('threat_feed.global_alert') })),
          ...(reports || []).map(r => ({ ...r, title: r.incident_title, category: r.scam_type, _type: 'report', _label: t('threat_feed.community_report') })),
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 3);
        setFeedItems(combined);
      } catch { /* silent */ } finally { setStatsLoading(false); }
    };
    fetchStats();
  }, [user]);

  const severityColor: Record<string, string> = {
    critical: 'text-red-500', high: 'text-orange-500', medium: 'text-yellow-500', low: 'text-blue-400'
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader 
        title={`${t("nav.welcome")}, ${userName}`}
        subtitle={t("dashboard.subtitle")}
      />
      
      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t("dashboard.stats.protected"), value: statsLoading ? "..." : (12000 + communityReports * 3).toLocaleString(), sub: t("dashboard.stats.verified"), icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: t("dashboard.stats.reports"), value: statsLoading ? "..." : communityReports.toString(), sub: t("dashboard.stats.verified"), icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Your Reports", value: statsLoading ? "..." : userReports.toString(), sub: "Submitted by you", icon: Flag, color: "text-purple-500", bg: "bg-purple-500/10" },
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
            {statsLoading ? (
              <div className="py-8 text-center text-white/20 text-xs font-black uppercase tracking-widest animate-pulse">{t("dashboard.syncing")}</div>
            ) : feedItems.length === 0 ? (
              <div className="py-8 text-center text-white/20 text-xs font-black uppercase tracking-widest">No alerts yet — check back soon</div>
            ) : feedItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group cursor-pointer"
                onClick={() => setActiveSection("Threat Feed")}>
                <div className={cn("size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5", item._type === 'alert' ? 'bg-blue-500/10' : 'bg-emerald-500/10')}>
                  {item._type === 'alert' ? <ShieldAlert className="size-4 text-blue-400" /> : <Flag className="size-4 text-emerald-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40">{item._label}</span>
                    <span className={cn("text-[9px] font-black uppercase tracking-widest", severityColor[(item.severity || 'medium').toLowerCase()] || 'text-white/40')}>{item.severity}</span>
                  </div>
                  <p className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">{item.title}</p>
                  <p className="text-[10px] text-white/30 mt-1">{item.category} • {new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <ChevronRight className="size-4 text-white/10 group-hover:text-blue-400 transition-colors shrink-0 mt-1" />
              </motion.div>
            ))}
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

// ── OpenRouter-powered Scam Scanner ──────────────────────────────────────────

interface ScanResult {
  risk: "Low" | "Medium" | "High" | "Critical";
  confidence: string;   // e.g. "92%"
  verdict: "Safe" | "Suspicious" | "Scam";
  redFlags: string[];
  explanation: string;
  recommendation: string;
}

const VERDICT_CONFIG = {
  Safe:       { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "shadow-[0_0_40px_rgba(16,185,129,0.12)]",  label: "SAFE",       Icon: ShieldCheck  },
  Suspicious: { color: "text-orange-400",  bg: "bg-orange-500/10",  border: "border-orange-500/20",  glow: "shadow-[0_0_40px_rgba(249,115,22,0.12)]",  label: "SUSPICIOUS", Icon: AlertTriangle },
  Scam:       { color: "text-red-500",     bg: "bg-red-500/10",     border: "border-red-500/20",     glow: "shadow-[0_0_40px_rgba(239,68,68,0.18)]",   label: "⚠ SCAM",    Icon: ShieldAlert  },
};

const RISK_PILL: Record<string, string> = {
  Low:      "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Medium:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  High:     "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Critical: "bg-red-500/10 text-red-500 border-red-500/20",
};

const OPENROUTER_MODELS = [
  "deepseek/deepseek-chat",
  "meta-llama/llama-3-8b-instruct",
  "mistralai/mistral-7b-instruct",
  "openchat/openchat-7b"
];

// ── Heuristic Validation Layer (Safety Fallback) ──────────────────────────────
const HEURISTIC_SCAM_SIGNALS = [
  "otp", "verify", "account suspended", "kyc", "sbi", "hdfc", "icici", "bank",
  "payment", "upi", "pay", "scan qr", "lottery", "won", "prize", "gift card",
  "urgent", "immediately", "block", "freeze", "telegram", "whatsapp", "investment",
  "profit", "bonus", "cashback", "refund", "customer care", "support", "remote access",
  "anydesk", "teamviewer", "internship", "job offer", "application fee", "salary",
  "login", "password", "credential", "update"
];

const DANGEROUS_KEYWORDS = ["OTP", "URGENT", "CLICK HERE", "VERIFY NOW", "PAYMENT", "KYC", "BANK", "REFUND", "CASHBACK", "REWARD", "WINNER", "LOCKED", "SUSPENDED"];

const highlightDangerousWords = (text: string) => {
  if (!text) return text;
  const parts = text.split(new RegExp(`(\\b(?:${DANGEROUS_KEYWORDS.join("|")})\\b)`, 'gi'));
  return (
    <>
      {parts.map((part, i) => 
        DANGEROUS_KEYWORDS.includes(part.toUpperCase()) ? (
          <span key={i} className="text-red-500 font-black animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.3)] px-1 rounded bg-red-500/10">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

const containsScamSignal = (text: string) => {
  const lowText = text.toLowerCase();
  return HEURISTIC_SCAM_SIGNALS.some(signal => lowText.includes(signal));
};


const ScamScannerView = () => {
  const [scanInput, setScanInput] = useState("");
  const [scanType, setScanType] = useState<"text" | "image">("text");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const { t } = useTranslation();

  // OCR & Image States
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrStatus, setOcrStatus] = useState("");
  const [isOcrRunning, setIsOcrRunning] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // History States
  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      fetchScanHistory();
    } else {
      setLoadingHistory(false);
    }
  }, [user]);

  const fetchScanHistory = async () => {
    setLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from('scan_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("DEBUG: Supabase Fetch Error:", error);
        throw error;
      }
      console.log("DEBUG: Supabase Fetch Success:", data?.length, "items retrieved.");
      setScanHistory(data || []);
    } catch (err: any) {
      console.error("Error fetching history:", err.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  const saveToHistory = async (scanResult: ScanResult, input: string, ocrText?: string, specificType?: string) => {
    console.log("DEBUG: saveToHistory triggered", { scanResult, input, ocrText, specificType, user });
    
    if (!user) {
      console.warn("DEBUG: No authenticated user found, skipping history save.");
      return;
    }

    const payload = {
      user_id: user.id,
      scan_type: specificType || scanType,
      input_text: input,
      ocr_text: ocrText,
      verdict: scanResult.verdict,
      risk: scanResult.risk,
      confidence: scanResult.confidence,
      red_flags: scanResult.redFlags,
      explanation: scanResult.explanation,
      recommendation: scanResult.recommendation
    };

    console.log("DEBUG: Supabase Insert Payload:", payload);

    try {
      const { data, error } = await supabase
        .from('scan_history')
        .insert(payload)
        .select()
        .single();

      if (error) {
        console.error("DEBUG: Supabase Insert Error:", error);
        throw error;
      }

      console.log("DEBUG: Supabase Insert Success:", data);
      
      // Optimistic update
      if (data) {
        setScanHistory(prev => [data, ...prev]);
      } else {
        fetchScanHistory();
      }

      toast({
        title: "Scan Archived",
        message: "Investigation has been saved to your history.",
        variant: "success"
      });
    } catch (err: any) {
      console.error("Error saving to history:", err.message);
      toast({
        title: "Persistence Failed",
        message: "Could not save scan to history. Check console for details.",
        variant: "error"
      });
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      const { error } = await supabase.from('scan_history').delete().eq('id', id);
      if (error) throw error;
      setScanHistory(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Record Deleted",
        message: "The scan record has been removed from history.",
        variant: "success"
      });
    } catch (err: any) {
      console.error("Error deleting item:", err.message);
      toast({
        title: "Delete Failed",
        message: err.message,
        variant: "error"
      });
    }
  };

  const clearHistory = async () => {
    if (!user) return;
    try {
      const { error } = await supabase.from('scan_history').delete().eq('user_id', user.id);
      if (error) throw error;
      setScanHistory([]);
      setShowClearConfirm(false);
      toast({
        title: "History Cleared",
        message: "Your investigation history has been wiped.",
        variant: "success"
      });
    } catch (err: any) {
      console.error("Error clearing history:", err.message);
      toast({
        title: "Clear Failed",
        message: err.message,
        variant: "error"
      });
    }
  };

  const loadHistoryItem = (item: any) => {
    const isImage = item.scan_type === "image";
    setScanType(isImage ? "image" : "text");
    setScanInput(item.input_text || item.ocr_text || "");
    setSelectedImage(null);
    setImagePreview(null);
    setResult({
      verdict: item.verdict,
      risk: item.risk,
      confidence: item.confidence,
      redFlags: item.red_flags,
      explanation: item.explanation,
      recommendation: item.recommendation
    });
    // Scroll to results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const SCAN_TYPES = [
    { key: "text"  as const, label: "TEXT",   Icon: MessageSquare },
    { key: "image" as const, label: "IMAGE", Icon: ImageIcon },
  ] as const;

  const runOcr = async (file: File): Promise<string> => {
    setIsOcrRunning(true);
    setOcrProgress(0);
    setOcrStatus("Initializing OCR Engine...");
    
    try {
      const worker = await createWorker('eng', 1, {
        logger: m => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.floor(m.progress * 100));
            setOcrStatus("Extracting text from screenshot...");
          }
        }
      });
      
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();
      
      if (!text.trim()) throw new Error("Unable to detect readable text from this screenshot.");
      
      setOcrStatus("Extraction complete.");
      return text;
    } catch (error: any) {
      console.error("OCR Error:", error);
      throw new Error(error.message || "Failed to extract text from image.");
    } finally {
      setIsOcrRunning(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)) {
        setScanError("Unsupported file type. Please upload PNG, JPG, or WEBP.");
        return;
      }
      setOcrStatus("Processing screenshot...");
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setOcrStatus("Ready for scan.");
      };
      reader.readAsDataURL(file);
      setScanError(null);
      setResult(null);
    }
  };

  const handleScan = async () => {
    // If image scan, we need an image. If text scan, we need text.
    if (scanType !== "image" && !scanInput.trim()) return;
    if (scanType === "image" && !selectedImage) {
      setScanError("Please upload a screenshot first.");
      return;
    }
    setScanning(true);
    console.log("DEBUG: handleScan called. Type:", scanType, "Input Length:", scanInput.length, "Has Image:", !!selectedImage);
    setResult(null);
    setScanError(null);

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      setScanError("OpenRouter API key not configured. Add VITE_OPENROUTER_API_KEY to .env.local");
      setScanning(false);
      return;
    }

    const typeLabel = { 
      text: "text content", 
      image: "screenshot content"
    }[scanType];

    let textToScan = scanInput;

    if (scanType === "image") {
      console.log("DEBUG: Starting OCR Pipeline for file:", selectedImage?.name);
      setScanning(true); // Ensure overall scanning state is true
      try {
        textToScan = await runOcr(selectedImage!);
        console.log("DEBUG: OCR Extracted Text:", textToScan);
        setScanInput(textToScan); // Update UI, but use textToScan locally
      } catch (err: any) {
        console.error("DEBUG: OCR Pipeline Failed:", err.message);
        setScanError(err.message);
        setScanning(false);
        return;
      }
    }

    setScanning(true);
    setResult(null);
    setScanError(null);
    setOcrStatus("Running AI Neural Scan...");

    if (!textToScan.trim()) {
      setScanError("No text found to analyze.");
      setScanning(false);
      return;
    }
    const prompt = `You are a Tier-1 Cybersecurity Analyst and Phishing Detection Engine.
Your goal is to protect users from financial loss and data theft.

ANALYSIS GUIDELINES:
- ASSUME SUSPICIOUS INTENT unless strong evidence proves the content is legitimate.
- PRIORITIZE SAFETY OVER OPTIMISM.
- Aggressively detect: Phishing, Social Engineering, Financial Fraud, and Indian UPI/KYC Scams.
- Watch for: Urgency, Fear tactics, Fake authority, Payment requests, and Link manipulation.

HIGH-RISK INDICATORS (Automatic Critical/High Risk):
- Requests for OTP, PIN, or Password.
- Bank KYC updates via SMS (SBI, HDFC, ICICI, etc.).
- UPI payment/refund links or QR code requests.
- Job offers asking for "registration fees" or "security deposits".
- Account suspension/blocking threats.
- Telegram/WhatsApp "Investment/Crypto" schemes.
- Cashback/Lottery/Winning claims.
- Requests for remote access (AnyDesk, TeamViewer).

Analyze this ${typeLabel}:
"""
${textToScan}
"""

RESPONSE FORMAT (Strict JSON):
{
  "verdict": "Safe" | "Suspicious" | "Scam",
  "risk": "Low" | "Medium" | "High" | "Critical",
  "confidence": "Number%", 
  "redFlags": ["Exact reasons for risk"],
  "explanation": "Brief technical analysis",
  "recommendation": "Clear protective action"
}

LOGIC RULES:
1. If Urgency + Payment/Link exists -> Verdict MUST be "Scam" and Risk MUST be "High" or "Critical".
2. If Personal Info (KYC/Bank) is requested -> Verdict MUST be "Scam".
3. NEVER return "Safe" or "Low" if any high-risk indicator is present.
4. If uncertain, return "Suspicious" with Medium risk.
5. redFlags MUST NOT be empty if verdict is not "Safe".`;

    try {
      let lastError = "";
      let success = false;

      for (const model of OPENROUTER_MODELS) {
        try {
          const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`,
              "HTTP-Referer": import.meta.env.VITE_APP_URL || "http://localhost:5173",
              "X-Title": "ScamShield AI Scanner",
            },
            body: JSON.stringify({
              model: model,
              messages: [{ role: "user", content: prompt }],
              temperature: 0.1,
              max_tokens: 400,
            }),
          });

          console.log(`DEBUG: AI Request (${model}) payload sent.`);
          setOcrStatus("Generating threat report...");

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData?.error?.message || `HTTP ${res.status}`);
          }

          const data = await res.json();
          const raw = data?.choices?.[0]?.message?.content || "";
          console.log(`DEBUG: AI Response (${model}) received:`, raw);
          if (!raw) throw new Error("Empty response from AI");

          const cleaned = raw.replace(/```(?:json)?|```/g, "").trim();
          const match = cleaned.match(/\{[\s\S]*\}/);
          if (!match) throw new Error("Invalid format in AI response");
          
          const parsed: ScanResult = JSON.parse(match[0]);
          
          if ((parsed.verdict === "Safe" || parsed.risk === "Low" || parsed.risk === "Medium") && containsScamSignal(textToScan)) {
            parsed.verdict = "Suspicious";
            parsed.risk = parsed.risk === "Low" ? "Medium" : parsed.risk;
            parsed.confidence = "70% (Heuristic Override)";
            if (parsed.redFlags.length === 0) {
              parsed.redFlags = ["Suspicious keywords detected", "Potential social engineering patterns"];
            }
          }

          parsed.verdict = (parsed.verdict as string).charAt(0).toUpperCase() + (parsed.verdict as string).slice(1).toLowerCase() as ScanResult["verdict"];
          setResult(parsed);
          await saveToHistory(parsed, scanType === "image" ? "" : textToScan, scanType === "image" ? textToScan : undefined, scanType);
          success = true;
          break;
        } catch (err: any) {
          console.warn(`Model ${model} failed:`, err.message);
          lastError = err.message;
          continue; 
        }
      }

      if (!success) {
        throw new Error(lastError || "All AI models failed to respond");
      }

    } catch (err: any) {
      const msg = err?.message || "";
      if (msg.includes("rate limit") || msg.includes("429"))
        setScanError("Rate limit reached. Please wait a moment and try again.");
      else if (msg.includes("401") || msg.includes("unauthorized"))
        setScanError("Invalid API key. Check your VITE_OPENROUTER_API_KEY in .env");
      else
        setScanError(`Analysis failed: ${msg || "Service temporarily unavailable."}`);
    } finally {
      setScanning(false);
    }
  };

  const vcfg = result?.verdict ? VERDICT_CONFIG[result.verdict] ?? VERDICT_CONFIG.Suspicious : null;
  const confNum = result ? parseInt(result.confidence) || 0 : 0;
  const confBarColor = result?.verdict === "Safe" ? "bg-emerald-500" : result?.verdict === "Suspicious" ? "bg-orange-500" : "bg-red-500";

  return (
    <div className="relative space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* AI Atmosphere Visuals */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:30px_30px]" />
      </div>

      <SectionHeader title={t("scanner.title")} subtitle={t("scanner.subtitle")} />

      <div className="grid grid-cols-1 gap-8 relative z-10">

        {/* Enhanced Scan Type Tabs */}
        <div className="flex flex-wrap gap-3">
          {SCAN_TYPES.map(({ key, label, Icon }) => (
            <button key={key} onClick={() => setScanType(key)}
              className={cn("flex items-center gap-2.5 px-6 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group",
                scanType === key
                  ? "bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
                  : "bg-white/[0.02] text-white/40 border-white/5 hover:border-white/20 hover:text-white"
              )}>
              <Icon className={cn("size-3.5 transition-transform group-hover:scale-110", scanType === key ? "text-black" : "text-blue-400")} />
              {label}
              {scanType === key && (
                <motion.div layoutId="scanner-tab-glow" className="absolute inset-0 bg-white/10 blur-xl pointer-events-none" />
              )}
            </button>
          ))}
        </div>

        {/* Premium Scanner Card */}
        <Card className="p-1 md:p-1 rounded-[3.5rem] bg-gradient-to-br from-white/10 via-transparent to-transparent border-white/5 overflow-hidden shadow-2xl relative group">
           <div className="p-8 md:p-12 rounded-[3.4rem] bg-[#0A0A0B]/90 backdrop-blur-3xl space-y-8 relative overflow-hidden">
              {/* Animated Scan Line */}
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none z-0" 
              />

              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none duration-700">
                <Bot className="size-64" />
              </div>
              
              <div className="max-w-4xl mx-auto space-y-8 relative z-10">
                <div className="space-y-4 group/field">
                  <div className="flex items-center justify-between px-2">
                    <Label className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-400/60 group-focus-within/field:text-blue-400 transition-colors">
                      {scanType === "image" ? "Screenshot Analysis" : t("scanner.input_label")}
                    </Label>
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                      {isOcrRunning ? ocrStatus : scanning ? "AI Neural Scan..." : "System Ready"}
                    </span>
                  </div>
                  
                  {scanType === "image" ? (
                    <div className="space-y-6">
                      {(!imagePreview && !result) ? (
                        <div className="relative group/upload">
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                          <div className="w-full h-56 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 bg-white/[0.01] group-hover/upload:bg-white/[0.03] group-hover/upload:border-blue-500/30 transition-all">
                             <div className="size-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                                <ImageIcon className="size-8 text-blue-400" />
                             </div>
                             <div className="text-center">
                                <p className="text-sm font-bold text-white">Drag & drop or click to upload</p>
                                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                             </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Image Preview with Scan Overlay */}
                          <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-white/5 bg-black/40 group/preview h-64 flex items-center justify-center">
                             {imagePreview ? (
                               <img src={imagePreview} alt="Scan Target" className="w-full h-full object-contain" />
                             ) : (
                               <div className="flex flex-col items-center gap-3 opacity-40">
                                 <ImageIcon className="size-10" />
                                 <span className="text-[10px] font-black uppercase tracking-widest text-center px-4 max-w-[200px]">Original image not saved in history</span>
                               </div>
                             )}
                             
                             {/* Cyber Scan Overlay */}
                             {(isOcrRunning || scanning) && (
                               <motion.div 
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 className="absolute inset-0 bg-blue-500/10 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4"
                               >
                                  <motion.div 
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10" 
                                  />
                                  <div className="text-center z-20">
                                     <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-2">{isOcrRunning ? "Extracting Text" : "Analyzing Patterns"}</p>
                                     <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div 
                                          className="h-full bg-blue-500"
                                          initial={{ width: 0 }}
                                          animate={{ width: `${isOcrRunning ? ocrProgress : 100}%` }}
                                        />
                                     </div>
                                  </div>
                               </motion.div>
                             )}
                             
                             <button 
                               onClick={() => { setImagePreview(null); setSelectedImage(null); setScanInput(""); }}
                               className="absolute top-4 right-4 size-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all opacity-0 group-hover/preview:opacity-100"
                             >
                               <X className="size-4" />
                             </button>
                          </div>

                          {/* Extracted Text Preview */}
                          <div className="relative h-64">
                             <textarea
                               value={scanInput}
                               onChange={(e) => setScanInput(e.target.value)}
                               placeholder="Extracted text will appear here..."
                               className="w-full h-full bg-white/[0.02] border-2 border-white/5 rounded-[2.5rem] p-8 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/40 transition-all resize-none font-medium leading-relaxed text-xs"
                               readOnly={isOcrRunning}
                             />
                             <div className="absolute bottom-6 right-8">
                                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">OCR Output</p>
                             </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative group/textarea">
                      <textarea
                        value={scanInput}
                        onChange={(e) => setScanInput(e.target.value)}
                        onKeyDown={(e) => { if (e.ctrlKey && e.key === "Enter") handleScan(); }}
                        placeholder="Paste suspicious message, email, URL, or job offer..."
                        className="w-full h-56 bg-white/[0.02] border-2 border-white/5 rounded-[2.5rem] p-10 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all resize-none font-medium leading-relaxed text-sm shadow-inner group-focus-within/textarea:bg-white/[0.04]"
                      />
                      <div className="absolute bottom-8 right-10 flex items-center gap-3">
                         <div className="flex gap-1">
                            {[1,2,3].map(i => <div key={i} className="size-1 rounded-full bg-blue-500/20 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />)}
                         </div>
                         <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Ctrl + Enter</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Button onClick={handleScan} disabled={scanning || isOcrRunning || (scanType === "image" ? !selectedImage : !scanInput.trim())}
                    className="w-full md:w-auto h-20 px-16 rounded-[2rem] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black uppercase tracking-[0.3em] text-xs disabled:opacity-50 gap-4 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] group/btn relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                    {isOcrRunning 
                      ? <><RefreshCcw className="size-5 animate-spin" /> {ocrStatus}</>
                      : scanning
                        ? <><RefreshCcw className="size-5 animate-spin" /> {t("scanner.scanning")}</>
                        : <><ShieldCheck className="size-5" /> {scanType === "image" ? "ANALYZE SCREENSHOT" : t("scanner.run_scan")}</>
                    }
                  </Button>

                  {result && (
                    <Button variant="outline" onClick={() => { setResult(null); setScanInput(""); setScanError(null); }}
                      className="h-16 px-10 rounded-[1.5rem] border-white/10 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                      Reset
                    </Button>
                  )}

                  <div className="md:ml-auto flex items-center gap-4 py-4 px-6 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="flex -space-x-2">
                       {OPENROUTER_MODELS.slice(0, 3).map((_, i) => (
                         <div key={i} className="size-6 rounded-full border-2 border-[#0A0A0B] bg-blue-500/20 flex items-center justify-center">
                            <Bot className="size-3 text-blue-400" />
                         </div>
                       ))}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
                      Multi-Model Consensus Enabled
                    </span>
                  </div>
                </div>
              </div>
           </div>
        </Card>

        {/* Error Banner */}
        {scanError && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[2.5rem] border-2 border-red-500/20 bg-red-500/5 text-red-400 font-bold text-sm flex items-start gap-4 shadow-[0_0_40px_rgba(239,68,68,0.05)] backdrop-blur-xl">
            <ShieldAlert className="size-6 shrink-0 mt-0.5" />
            <div className="space-y-1">
               <p className="font-black uppercase tracking-widest text-[10px] text-red-500/60 mb-2">Scan Interrupted</p>
               <p className="leading-relaxed">{scanError}</p>
            </div>
          </motion.div>
        )}

        {/* ── Results Card ── */}
        {result && vcfg && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "circOut" }}>
            <Card className={cn("p-1 rounded-[4rem] transition-all duration-1000 overflow-hidden", vcfg.glow)}>
               <div className={cn("p-10 md:p-16 rounded-[3.9rem] border-2 transition-all duration-700 space-y-12 bg-[#0A0A0B]/80 backdrop-blur-3xl", vcfg.border)}>
                  {/* Result Content */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
                    <div className="flex items-center gap-10">
                      <div className={cn("size-32 rounded-[3rem] flex items-center justify-center border-2 shadow-2xl relative group/res", vcfg.bg, vcfg.border)}>
                        <div className={cn("absolute inset-0 rounded-[3rem] blur-2xl opacity-40 group-hover/res:opacity-70 transition-opacity", vcfg.bg)} />
                        <vcfg.Icon className={cn("size-16 relative z-10", vcfg.color)} />
                      </div>
                      <div className="space-y-3">
                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30">AI Final Verdict</p>
                        <h2 className={cn("text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none", vcfg.color)}>
                          {vcfg.label}
                        </h2>
                        <div className="flex items-center gap-3">
                          <span className={cn("inline-flex items-center px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-widest", RISK_PILL[result.risk] || RISK_PILL.Medium)}>
                            Risk Severity: {result.risk}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 min-w-[280px] w-full md:w-auto p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Detection Precision</p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                          className={cn("text-3xl font-black", vcfg.color)}>
                          {result.confidence}
                        </motion.p>
                      </div>
                      <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${confNum}%` }}
                          transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                          className={cn("h-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]", confBarColor)}
                        />
                      </div>
                      <div className="flex justify-between mt-2">
                         <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Heuristic</span>
                         <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Neural</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-4 relative overflow-hidden group/expl">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/expl:opacity-10 transition-opacity">
                       <Brain className="size-32" />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-blue-400 flex items-center gap-3">
                      <Bot className="size-4" /> Neural Analysis Summary
                    </p>
                    <p className="text-white/80 leading-relaxed font-medium text-lg max-w-5xl">
                      {highlightDangerousWords(result.explanation)}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[3rem] bg-red-500/[0.03] border border-red-500/10 space-y-6">
                      <h4 className="text-red-500 font-black text-sm uppercase tracking-widest flex items-center gap-3">
                        <ShieldAlert className="size-5" /> Threat Indicators
                      </h4>
                      <div className="space-y-4">
                        {result.redFlags.length > 0 ? (
                          result.redFlags.map((flag, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.1 }}
                              className="flex items-start gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/5 group/flag">
                              <div className="size-2 rounded-full bg-red-500 mt-2 shrink-0 animate-pulse" />
                              <p className="text-xs text-white/70 font-medium leading-relaxed group-hover/flag:text-white transition-colors">
                                {highlightDangerousWords(flag)}
                              </p>
                            </motion.div>
                          ))
                        ) : (
                          <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/5">
                             <ShieldCheck className="size-5 text-emerald-400" />
                             <p className="text-xs text-emerald-400/60 font-black uppercase tracking-widest">No anomalies detected</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-emerald-500/[0.03] border border-emerald-500/10 space-y-6">
                      <h4 className="text-emerald-400 font-black text-sm uppercase tracking-widest flex items-center gap-3">
                        <ShieldCheck className="size-5" /> Countermeasures
                      </h4>
                      <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
                         <p className="text-sm text-white/80 font-medium leading-relaxed italic">
                           "{highlightDangerousWords(result.recommendation)}"
                         </p>
                      </div>
                      <div className="space-y-2 pt-4">
                         <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-3">Next Defensive Actions:</p>
                         <div className="flex flex-wrap gap-2">
                            {["Block Sender", "Report Scam", "Secure Account"].map(a => (
                              <span key={a} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-white/40 uppercase tracking-widest">{a}</span>
                            ))}
                         </div>
                      </div>
                    </div>
                  </div>
               </div>
            </Card>
          </motion.div>
        )}

        {/* ── Investigation History ── */}
        <div className="mt-24 space-y-10">
          <div className="flex items-center justify-between px-4">
             <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                   <Clock className="size-6 text-blue-400" />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Investigation History</h3>
                   <p className="text-xs text-white/40 font-medium">Persistent records of your AI neural scans</p>
                </div>
             </div>
             {scanHistory.length > 0 && (
               <Button 
                 variant="ghost" 
                 onClick={() => setShowClearConfirm(true)}
                 className="text-red-400/60 hover:text-red-400 hover:bg-red-400/10 gap-2 font-black uppercase tracking-widest text-[10px]"
               >
                 <Trash2 className="size-4" />
                 Clear All
               </Button>
             )}
          </div>

          {loadingHistory ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="h-48 rounded-[2.5rem] bg-white/[0.02] border border-white/5 animate-pulse" />
              ))}
            </div>
          ) : scanHistory.length === 0 ? (
            <div className="p-20 rounded-[3.5rem] bg-white/[0.02] border border-dashed border-white/5 flex flex-col items-center justify-center text-center space-y-6">
               <div className="size-20 rounded-3xl bg-white/[0.02] flex items-center justify-center border border-white/5 opacity-50">
                  <History className="size-10 text-white/20" />
               </div>
               <div className="space-y-2">
                  <p className="text-lg font-bold text-white/40">No Investigations Yet</p>
                  <p className="text-xs text-white/20 max-w-xs leading-relaxed uppercase tracking-widest">Your future investigation results will be archived here for deep analysis</p>
               </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {scanHistory.map((item) => {
                  const typeIcon = SCAN_TYPES.find(t => t.key === item.scan_type)?.Icon || MessageSquare;
                  const vcfg_item = VERDICT_CONFIG[item.verdict as keyof typeof VERDICT_CONFIG] || VERDICT_CONFIG.Suspicious;
                  
                  return (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -5 }}
                      className="group relative"
                    >
                      <Card className="h-full rounded-[2.5rem] bg-[#0A0A0B]/80 border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden backdrop-blur-xl">
                        <div className="p-8 space-y-6 flex flex-col h-full">
                          <div className="flex items-center justify-between">
                             <div className="size-10 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/5">
                                {React.createElement(typeIcon as any, { className: "size-5 text-white/40" })}
                             </div>
                             <div className="flex items-center gap-2">
                                <Badge className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1", vcfg_item.bg, vcfg_item.color, vcfg_item.border)}>
                                  {vcfg_item.label}
                                </Badge>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); deleteHistoryItem(item.id); }}
                                  className="size-8 rounded-full hover:bg-red-500/10 flex items-center justify-center text-white/20 hover:text-red-500 transition-all"
                                >
                                  <Trash2 className="size-3.5" />
                                </button>
                             </div>
                          </div>

                          <div className="space-y-2 flex-grow">
                             <p className="text-xs text-white/60 font-medium line-clamp-3 leading-relaxed italic">
                                {`"${item.input_text || item.ocr_text || 'Image Scan'}"`}
                             </p>
                          </div>

                          <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                             <div className="flex flex-col">
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Analyzed on</p>
                                <p className="text-[10px] font-bold text-white/40">{new Date(item.created_at).toLocaleDateString()}</p>
                             </div>
                             <Button 
                               onClick={() => loadHistoryItem(item)}
                               variant="ghost" 
                               className="size-10 rounded-full bg-white/[0.03] hover:bg-blue-500 hover:text-white transition-all p-0"
                             >
                               <ChevronRight className="size-5" />
                             </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Clear History Confirmation Modal */}
        <AnimatePresence>
          {showClearConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 onClick={() => setShowClearConfirm(false)}
                 className="absolute inset-0 bg-black/80 backdrop-blur-md" 
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                 animate={{ opacity: 1, scale: 1, y: 0 }} 
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="relative w-full max-w-md p-10 rounded-[3.5rem] bg-[#0A0A0B] border-2 border-white/10 shadow-2xl overflow-hidden"
               >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                     <AlertTriangle className="size-48" />
                  </div>
                  
                  <div className="space-y-8 relative z-10">
                     <div className="size-20 rounded-[2rem] bg-red-500/10 flex items-center justify-center border border-red-500/20">
                        <AlertTriangle className="size-10 text-red-500 animate-pulse" />
                     </div>
                     <div className="space-y-4">
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Wipe History?</h3>
                        <p className="text-white/40 text-sm font-medium leading-relaxed">This will permanently delete all investigation records from the SCAMSHIELD cloud. This action cannot be reversed.</p>
                     </div>
                     <div className="flex gap-4">
                        <Button onClick={() => setShowClearConfirm(false)}
                          className="flex-1 h-16 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/5 font-black uppercase tracking-widest text-[10px]">
                           Cancel
                        </Button>
                        <Button onClick={clearHistory}
                          className="flex-1 h-16 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-[10px] shadow-[0_15px_30px_rgba(220,38,38,0.3)]">
                           Delete All
                        </Button>
                     </div>
                  </div>
               </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};



const TRENDING_FRAUDS = [
  {
    id: "electricity",
    title: "Fake Electricity Bill Scam",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    shortDesc: "Urgent SMS claiming power will be cut due to unpaid bills.",
    affected: ["Homeowners", "Small Businesses"],
    workflow: [
      { step: "The Hook", desc: "SMS: 'Your power will be cut tonight at 9PM. Pay pending bill now.'", icon: Mail },
      { step: "Panic Interaction", desc: "Victim calls the fake support number provided in the message.", icon: Smartphone },
      { step: "Remote Access", desc: "Scammer tricks user into installing a screen-sharing app (AnyDesk).", icon: Bot },
      { step: "Small Payment", desc: "Victim is asked to pay a small Rs. 10 fee via a malicious link.", icon: Key },
      { step: "Account Drain", desc: "Scammer sees credentials via screen-share and steals all funds.", icon: AlertTriangle },
    ],
    redFlags: ["Urgent deadlines", "Asking to install remote apps", "Calling from personal numbers"],
    prevention: "Only pay through official electricity board apps or authorized portals."
  },
  {
    id: "upi-qr",
    title: "UPI QR Cashback Scam",
    icon: QrCode,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    shortDesc: "Scanning a QR code to 'receive' cashback or rewards.",
    affected: ["Digital Payers", "Online Sellers"],
    workflow: [
      { step: "Fake Offer", desc: "User sees 'Scan to receive Rs. 500 cashback' offer on social media.", icon: Flame },
      { step: "QR Scan", desc: "User scans the provided QR code using a payment app.", icon: QrCode },
      { step: "PIN Request", desc: "The app asks for the UPI PIN (which is ONLY for sending money).", icon: Key },
      { step: "Authorization", desc: "Victim enters PIN thinking they are authorizing a credit.", icon: CheckCircle },
      { step: "Instant Loss", desc: "Money is instantly deducted from the victim's bank account.", icon: AlertTriangle },
    ],
    redFlags: ["QR code for receiving money", "Entering PIN to receive funds", "Unknown senders"],
    prevention: "Remember: You NEVER need to enter your UPI PIN to receive money."
  },
  {
    id: "kyc-phish",
    title: "KYC Expiry Phishing",
    icon: ShieldAlert,
    color: "text-red-500",
    bg: "bg-red-500/10",
    shortDesc: "Fake bank alerts claiming your KYC has expired.",
    affected: ["Bank Customers", "Senior Citizens"],
    workflow: [
      { step: "Bank Alert", desc: "Victim receives SMS impersonating a major bank (SBI, HDFC, etc.).", icon: Shield },
      { step: "Phishing Link", desc: "SMS contains a link like 'bank-kyc-update.com/login'.", icon: ExternalLink },
      { step: "Fake Portal", desc: "A perfectly cloned banking website asks for login ID and password.", icon: LayoutGrid },
      { step: "OTP Capture", desc: "Scammer triggers a real transaction and asks for the OTP on the fake site.", icon: Smartphone },
      { step: "Account Takeover", desc: "Scammer gains full access to net banking and changes credentials.", icon: AlertTriangle },
    ],
    redFlags: ["Non-official links", "SMS from personal 10-digit numbers", "Urgency threats"],
    prevention: "Visit your bank branch or use the verified official net banking app only."
  },
  {
    id: "job-fraud",
    title: "Fake Job Offer Scam",
    icon: Briefcase,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    shortDesc: "High-paying work-from-home offers asking for 'fees'.",
    affected: ["Job Seekers", "Students"],
    workflow: [
      { step: "Job Ad", desc: "Attractive job post on LinkedIn/Telegram: 'Earn 5k daily from home'.", icon: Briefcase },
      { step: "Fast Interview", desc: "Scammer 'hires' the victim immediately via a short chat.", icon: MessageSquare },
      { step: "Security Deposit", desc: "Victim is asked to pay for 'laptop', 'training', or 'ID card fee'.", icon: ShoppingBag },
      { step: "Task Scam", desc: "User is asked to do simple tasks and 'invest' to unlock earnings.", icon: PlusCircle },
      { step: "Ghosting", desc: "After collecting several payments, the scammer disappears.", icon: XCircle },
    ],
    redFlags: ["Jobs asking for money", "Too good to be true salaries", "Hiring via WhatsApp"],
    prevention: "Legitimate companies never ask for money to provide a job or training."
  },
  {
    id: "whatsapp-takeover",
    title: "WhatsApp Account Takeover",
    icon: MessageSquare,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    shortDesc: "Tricking users into sharing their WhatsApp registration code.",
    affected: ["Everyone", "Contacts of victims"],
    workflow: [
      { step: "Friend's Message", desc: "Scammer uses a compromised account to message their contacts.", icon: Users },
      { step: "Urgent Favor", desc: "Scammer says: 'I sent you a code by mistake, can you send it back?'", icon: MessageSquare },
      { step: "The Code", desc: "Victim receives a 6-digit WhatsApp registration code via SMS.", icon: Mail },
      { step: "Sharing Code", desc: "Victim shares the code thinking they are helping a friend.", icon: Smartphone },
      { step: "Total Lockout", desc: "Scammer registers the victim's account on their device and blocks them.", icon: AlertTriangle },
    ],
    redFlags: ["Sharing verification codes", "Friends asking for random SMS codes"],
    prevention: "Enable 2-Step Verification (2FA) in WhatsApp settings immediately."
  }
];

const ThreatFeedView = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFraud, setActiveFraud] = useState<string | null>(null);
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

      {/* Trending Frauds Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="size-5 text-orange-500" />
          <h3 className="text-xl font-black text-white uppercase tracking-tighter">Trending Frauds</h3>
          <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[9px] font-black text-red-500 animate-pulse uppercase tracking-widest ml-auto">Live Intelligence</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {TRENDING_FRAUDS.map((fraud) => (
            <motion.button
              key={fraud.id}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveFraud(activeFraud === fraud.id ? null : fraud.id)}
              className={cn(
                "p-6 rounded-3xl border-2 transition-all text-left relative overflow-hidden group",
                activeFraud === fraud.id 
                  ? "bg-white text-black border-white shadow-[0_20px_50px_rgba(255,255,255,0.15)]" 
                  : "bg-white/[0.02] border-white/5 hover:border-white/10 text-white"
              )}
            >
              <div className={cn(
                "size-10 rounded-xl flex items-center justify-center mb-4 transition-colors",
                activeFraud === fraud.id ? "bg-black text-white" : cn(fraud.bg, fraud.color)
              )}>
                <fraud.icon className="size-5" />
              </div>
              <h4 className="font-bold text-xs leading-tight mb-2 uppercase tracking-tight">{fraud.title}</h4>
              <p className={cn(
                "text-[10px] leading-relaxed line-clamp-2 font-medium",
                activeFraud === fraud.id ? "text-black/60" : "text-white/40"
              )}>
                {fraud.shortDesc}
              </p>
              
              <div className={cn(
                "absolute -bottom-1 -right-1 p-2 transition-transform duration-500",
                activeFraud === fraud.id ? "rotate-180 scale-125" : "group-hover:translate-x-1"
              )}>
                <ChevronRight className={cn("size-4", activeFraud === fraud.id ? "text-black/10" : "text-white/10")} />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Fraud Detail Workflow */}
        <AnimatePresence mode="wait">
          {activeFraud && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="overflow-hidden"
            >
              <Card className="p-8 md:p-12 rounded-[3rem] border-white/10 bg-white/[0.03] relative">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  {React.createElement(TRENDING_FRAUDS.find(f => f.id === activeFraud)!.icon, { className: "size-48" })}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                  <div className="space-y-8">
                    <div className="space-y-2">
                       <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Fraud Workflow Analysis</span>
                       <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
                         {TRENDING_FRAUDS.find(f => f.id === activeFraud)?.title}
                       </h3>
                       <p className="text-secondary font-medium leading-relaxed">
                         {TRENDING_FRAUDS.find(f => f.id === activeFraud)?.shortDesc}
                       </p>
                    </div>

                    <div className="space-y-6">
                      <h5 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Activity className="size-3" /> Step-by-Step Attack Vector
                      </h5>
                      <div className="space-y-4">
                        {TRENDING_FRAUDS.find(f => f.id === activeFraud)?.workflow.map((item, idx) => (
                          <div key={idx} className="flex gap-6 relative group">
                            {idx !== 4 && (
                              <div className="absolute left-[11px] top-8 bottom-[-16px] w-[2px] bg-white/5 group-hover:bg-blue-500/20 transition-colors" />
                            )}
                            <div className="size-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-1 relative z-10 group-hover:border-blue-500/50 group-hover:bg-blue-500/20 transition-all">
                               <item.icon className="size-3 text-white/40 group-hover:text-blue-400 transition-colors" />
                            </div>
                            <div className="space-y-1 pb-4">
                               <p className="text-[11px] font-black text-white uppercase tracking-tight">{item.step}</p>
                               <p className="text-xs text-white/40 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                     <div className="p-8 rounded-[2rem] bg-red-500/5 border border-red-500/10 space-y-4">
                        <h4 className="text-red-500 font-bold flex items-center gap-2 text-sm">
                           <ShieldAlert className="size-4" /> Red Flags to Watch
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                           {TRENDING_FRAUDS.find(f => f.id === activeFraud)?.redFlags.map((flag, i) => (
                             <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                               <div className="size-1.5 rounded-full bg-red-500 shrink-0" />
                               <p className="text-xs text-white/70 font-medium">{flag}</p>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                        <h4 className="text-emerald-400 font-bold flex items-center gap-2 text-sm">
                           <ShieldCheck className="size-4" /> Prevention & Countermeasures
                        </h4>
                        <p className="text-xs text-white/70 leading-relaxed font-medium p-4 bg-white/[0.02] rounded-xl border border-white/5 italic">
                          "{TRENDING_FRAUDS.find(f => f.id === activeFraud)?.prevention}"
                        </p>
                     </div>

                     <div className="flex flex-wrap gap-2 pt-4">
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-widest block w-full mb-2">Affected Targets</span>
                        {TRENDING_FRAUDS.find(f => f.id === activeFraud)?.affected.map((target, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-white/40 uppercase tracking-widest">{target}</span>
                        ))}
                     </div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveFraud(null)}
                  className="absolute top-6 right-6 size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                >
                  <X className="size-4" />
                </button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Activity className="size-5 text-blue-500" />
          <h3 className="text-xl font-black text-white uppercase tracking-tighter">Live Alert Feed</h3>
        </div>
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
      if (error) throw error;
      alert(t("reports.success"));
      setFormData({ scam_type: "", platform: "", incident_title: "", description: "", severity: "high", evidence_url: "" });
    } catch (e: any) { 
      alert(t("reports.error") + (e.message ? ": " + e.message : ""));
    } finally { 
      setSubmitting(false); 
    }
  };

  return (
    <div className="relative space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Background Visual Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.02] via-transparent to-red-500/[0.01]" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Info Panel / Banner */}
        <div className="lg:w-1/3 space-y-6">
           <div className="p-8 rounded-[3rem] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
              <div className="relative z-10 space-y-6">
                 <div className="size-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                    <Radio className="size-7 text-blue-400 animate-pulse" />
                 </div>
                 <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-tight">
                      Community<br />Intelligence
                    </h2>
                    <p className="text-sm text-white/40 font-medium leading-relaxed">
                      Your report feeds into our live threat detection engine, protecting thousands of users in real-time.
                    </p>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                       <ShieldCheck className="size-3" /> Live Shield Active
                    </span>
                    <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[9px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                       <Activity className="size-3" /> Global Alerts
                    </span>
                 </div>
              </div>
              <div className="absolute -bottom-12 -right-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
                 <Globe className="size-48" />
              </div>
           </div>

           <Card className="p-8 rounded-[2.5rem] border-white/5 bg-white/[0.01] space-y-4">
              <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">System Status</h4>
              <div className="space-y-4">
                 {[
                   { label: "Scanner Online", status: "Active", icon: Cpu, color: "text-emerald-400" },
                   { label: "Network Analysis", status: "Running", icon: Activity, color: "text-blue-400" },
                   { label: "Fraud Database", status: "Synced", icon: ListChecks, color: "text-purple-400" },
                 ].map((s, i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-center gap-3">
                         <s.icon className={cn("size-4", s.color)} />
                         <span className="text-xs font-bold text-white/60">{s.label}</span>
                      </div>
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{s.status}</span>
                   </div>
                 ))}
              </div>
           </Card>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 w-full">
          <Card className="p-8 md:p-12 rounded-[3.5rem] border-white/10 bg-white/[0.01] backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <ShieldAlert className="size-48" />
             </div>
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
             
             <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3 group/field">
                      <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30 ml-2 group-focus-within/field:text-blue-400 transition-colors">{t("reports.form.type")}</Label>
                      <div className="relative">
                        <Input 
                          required
                          value={formData.scam_type}
                          onChange={(e) => setFormData({...formData, scam_type: e.target.value})}
                          placeholder="e.g. WhatsApp Phishing"
                          className="h-16 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-white placeholder:text-white/10 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all text-sm font-medium"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                          <AlertTriangle className="size-5" />
                        </div>
                      </div>
                   </div>
                   <div className="space-y-3 group/field">
                      <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30 ml-2 group-focus-within/field:text-cyan-400 transition-colors">{t("reports.form.platform")}</Label>
                      <Input 
                        required
                        value={formData.platform}
                        onChange={(e) => setFormData({...formData, platform: e.target.value})}
                        placeholder="e.g. Telegram / SMS"
                        className="h-16 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-white placeholder:text-white/10 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all text-sm font-medium"
                      />
                   </div>
                </div>

                <div className="space-y-3 group/field">
                   <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30 ml-2 group-focus-within/field:text-purple-400 transition-colors">{t("reports.form.title")}</Label>
                   <Input 
                     required
                     value={formData.incident_title}
                     onChange={(e) => setFormData({...formData, incident_title: e.target.value})}
                     placeholder={t("reports.form.title_placeholder")}
                     className="h-16 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-white placeholder:text-white/10 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all text-sm font-medium"
                   />
                </div>

                <div className="space-y-3 group/field">
                   <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30 ml-2 group-focus-within/field:text-red-400 transition-colors">{t("reports.form.description")}</Label>
                   <textarea 
                     required
                     value={formData.description}
                     onChange={(e) => setFormData({...formData, description: e.target.value})}
                     placeholder={t("reports.form.description_placeholder")}
                     className="w-full h-44 bg-white/[0.03] border-white/10 rounded-[2.5rem] p-8 text-white placeholder:text-white/10 focus:ring-2 focus:ring-red-500/20 focus:border-red-500/40 transition-all resize-none font-medium leading-relaxed text-sm scrollbar-hide"
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 group/field">
                    <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30 ml-2 group-focus-within/field:text-orange-400 transition-colors">{t("reports.form.severity")}</Label>
                    <div className="relative">
                      <select 
                        value={formData.severity}
                        onChange={(e) => setFormData({...formData, severity: e.target.value})}
                        className="w-full h-16 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all appearance-none text-sm font-medium cursor-pointer"
                      >
                        <option value="low" className="bg-[#0A0A0B] text-white">{t("reports.form.severity_low")}</option>
                        <option value="medium" className="bg-[#0A0A0B] text-white">{t("reports.form.severity_medium")}</option>
                        <option value="high" className="bg-[#0A0A0B] text-white">{t("reports.form.severity_high")}</option>
                        <option value="critical" className="bg-[#0A0A0B] text-white">{t("reports.form.severity_critical")}</option>
                      </select>
                      <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 size-4 text-white/20 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-3 group/field">
                     <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30 ml-2 group-focus-within/field:text-blue-400 transition-colors">{t("reports.form.evidence")}</Label>
                     <Input 
                       value={formData.evidence_url}
                       onChange={(e) => setFormData({...formData, evidence_url: e.target.value})}
                       placeholder="https://..."
                       className="h-16 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-white placeholder:text-white/10 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all text-sm font-medium"
                     />
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={submitting}
                  className="w-full h-20 rounded-[2rem] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black uppercase tracking-[0.3em] transition-all shadow-[0_20px_50px_rgba(37,99,235,0.2)] disabled:opacity-50 group/btn overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  <div className="relative z-10 flex items-center justify-center gap-4">
                    {submitting ? (
                      <>
                         <RefreshCcw className="size-6 animate-spin" /> {t("reports.form.submitting")}
                      </>
                    ) : (
                      <>
                         {t("reports.form.submit")} <Send className="size-6 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform duration-500" />
                      </>
                    )}
                  </div>
                </Button>
             </form>
          </Card>
        </div>
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
  const { user } = useAuth();
  const { toast } = useToast();
  const [sessionQuestions, setSessionQuestions] = useState<number[]>([]);
  const [dailyStats, setDailyStats] = useState<any>(null);
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState<'idle' | 'question'>('idle');
  const [selectedAnswer, setSelectedAnswer] = useState<'scam' | 'safe' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { title: "Phishing Quiz", icon: ShieldAlert, bg: "bg-red-500/10", color: "text-red-500", desc: "Test your ability to spot fake emails and malicious links." },
    { title: "UPI Scam Quiz", icon: Smartphone, bg: "bg-blue-500/10", color: "text-blue-500", desc: "Identify fraudulent UPI requests and payment links." },
    { title: "OTP Theft Quiz", icon: Key, bg: "bg-emerald-500/10", color: "text-emerald-500", desc: "Learn to protect your one-time passwords from scammers." },
    { title: "Fake Job Scam Quiz", icon: Briefcase, bg: "bg-purple-500/10", color: "text-purple-500", desc: "Recognize too-good-to-be-true job offers and fees." },
    { title: "Social Media Scam Quiz", icon: Share2, bg: "bg-pink-500/10", color: "text-pink-500", desc: "Avoid giveaway scams and fake profiles on social platforms." }
  ];

  useEffect(() => {
    if (user) {
      fetchQuizStats();
      restoreSession();
    }
  }, [user]);

  const restoreSession = () => {
    if (!user) return;
    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = localStorage.getItem(`quiz_session_${user.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.date === today && typeof parsed.categoryIndex === 'number') {
          // Validate indices exist in QUIZ_DATA
          const cat = categories[parsed.categoryIndex];
          if (cat && QUIZ_DATA[cat.title] && Array.isArray(parsed.questionIndices) && parsed.questionIndices.length > 0) {
            setCurrentQuiz(parsed.categoryIndex);
            setSessionQuestions(parsed.questionIndices);
            setCurrentQuestionIndex(parsed.currentIndex || 0);
            setScore(parsed.score || 0);
            setQuizState(parsed.state || 'idle');
          } else {
            localStorage.removeItem(`quiz_session_${user.id}`);
          }
        } else {
          localStorage.removeItem(`quiz_session_${user.id}`);
        }
      }
    } catch (e) {
      console.error("Failed to restore session:", e);
      localStorage.removeItem(`quiz_session_${user.id}`);
    }
  };

  const saveSession = (updates: any) => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    const current = JSON.parse(localStorage.getItem(`quiz_session_${user.id}`) || '{"date":"' + today + '"}');
    const newState = { ...current, date: today, ...updates };
    localStorage.setItem(`quiz_session_${user.id}`, JSON.stringify(newState));
  };

  const fetchQuizStats = async () => {
    setIsLoading(true);
    if (!user?.id) {
      setIsLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('user_quiz_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      
      const today = new Date().toISOString().split('T')[0];
      
      if (!data) {
        const initial = { 
          user_id: user?.id, 
          total_answered: 0, 
          correct_answers: 0, 
          daily_attempts: 0, 
          last_attempt_date: today,
          streak_count: 0
        };
        await supabase.from('user_quiz_stats').insert(initial);
        setDailyStats(initial);
      } else {
        let updatedData = { ...data };
        const lastDate = new Date(data.last_attempt_date);
        const todayDate = new Date(today);
        const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (data.last_attempt_date !== today) {
          updatedData.daily_attempts = 0;
          if (diffDays > 1) {
            updatedData.streak_count = 0;
          }
          await supabase.from('user_quiz_stats').update({
            daily_attempts: 0,
            streak_count: updatedData.streak_count,
            last_attempt_date: today
          }).eq('user_id', user?.id);
          
          localStorage.removeItem(`quiz_session_${user.id}`);
        }
        
        setDailyStats(updatedData);
      }
    } catch (err) {
      console.error('Error fetching quiz stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuizStats = async (isCorrect: boolean) => {
    if (!user || !dailyStats) return;

    const today = new Date().toISOString().split('T')[0];
    const isFirstAttemptToday = dailyStats.last_attempt_date !== today || dailyStats.daily_attempts === 0;
    
    let newStreak = dailyStats.streak_count || 0;
    if (isFirstAttemptToday) {
      const lastDate = new Date(dailyStats.last_attempt_date);
      const todayDate = new Date(today);
      const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1 || dailyStats.streak_count === 0) {
        newStreak = 1;
      }
    }

    const updates = {
      total_answered: (dailyStats.total_answered || 0) + 1,
      correct_answers: (dailyStats.correct_answers || 0) + (isCorrect ? 1 : 0),
      daily_attempts: (dailyStats.daily_attempts || 0) + 1,
      last_attempt_date: today,
      streak_count: newStreak,
      updated_at: new Date().toISOString()
    };

    try {
      const { error } = await supabase
        .from('user_quiz_stats')
        .update(updates)
        .eq('user_id', user.id);
      
      if (error) throw error;
      setDailyStats({ ...dailyStats, ...updates });
    } catch (err) {
      console.error('Error updating quiz stats:', err);
    }
  };

  const handleStartQuiz = (index: number) => {
    if (dailyStats && dailyStats.daily_attempts >= 3) {
      toast({
        title: "Daily Limit Reached",
        message: "You've completed your 3 learning scenarios for today. Come back tomorrow!",
        variant: "error"
      });
      return;
    }

    const cat = categories[index];
    if (!cat || !QUIZ_DATA[cat.title] || QUIZ_DATA[cat.title].length === 0) {
      toast({
        title: "Category Unavailable",
        message: "This arena is currently undergoing maintenance. Please try another!",
        variant: "error"
      });
      return;
    }

    const allQuestions = QUIZ_DATA[cat.title];
    
    // Balanced Randomization: Pick 3 questions, ensure at least 1 scam and 1 safe if possible
    const scams = allQuestions.map((q, i) => q.type === 'scam' ? i : -1).filter(i => i !== -1);
    const safes = allQuestions.map((q, i) => q.type === 'safe' ? i : -1).filter(i => i !== -1);
    
    // Randomly shuffle
    const shuffle = (array: number[]) => array.sort(() => Math.random() - 0.5);
    const shuffledScams = shuffle([...scams]);
    const shuffledSafes = shuffle([...safes]);
    
    const sessionIndices: number[] = [];
    
    // Pick 1 scam if available
    if (shuffledScams.length > 0) sessionIndices.push(shuffledScams.pop()!);
    // Pick 1 safe if available
    if (shuffledSafes.length > 0) sessionIndices.push(shuffledSafes.pop()!);
    
    // Fill the rest (up to 3) from remaining pooled questions
    const remaining = shuffle([...shuffledScams, ...shuffledSafes]);
    while (sessionIndices.length < 3 && remaining.length > 0) {
      sessionIndices.push(remaining.pop()!);
    }

    if (sessionIndices.length === 0) return;

    // Randomize the order of the chosen scenarios
    shuffle(sessionIndices);

    setSessionQuestions(sessionIndices);
    setCurrentQuiz(index);
    setQuizState('question');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);

    saveSession({
      categoryIndex: index,
      questionIndices: sessionIndices,
      currentIndex: 0,
      score: 0,
      state: 'question'
    });
  };

  const handleAnswer = async (choice: 'scam' | 'safe') => {
    // Prevent multiple clicks and ensure question existence
    if (selectedAnswer !== null || currentQuiz === null || sessionQuestions[currentQuestionIndex] === undefined) return;
    
    const cat = categories[currentQuiz];
    if (!cat || !QUIZ_DATA[cat.title]) return;
    
    const catTitle = cat.title;
    const qIndex = sessionQuestions[currentQuestionIndex];
    const currentQ = QUIZ_DATA[catTitle][qIndex];
    
    if (!currentQ) return;
    
    const isCorrect = choice === currentQ.type;
    
    const newScore = isCorrect ? score + 1 : score;
    setSelectedAnswer(choice);
    setScore(newScore);
    setShowExplanation(true);
    
    await updateQuizStats(isCorrect);
    saveSession({ score: newScore, state: 'question' });
  };

  const handleNext = () => {
    if (currentQuestionIndex < 2) { 
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setShowExplanation(false);
      saveSession({ currentIndex: nextIndex });
    } else {
      setQuizState('result');
      saveSession({ state: 'result' });
    }
  };

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
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Daily Scenarios</p>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-black text-white">
                {dailyStats ? 3 - dailyStats.daily_attempts : 3}/3
              </p>
              <div className={cn(
                "size-8 rounded-full flex items-center justify-center transition-colors",
                dailyStats?.daily_attempts >= 3 ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
              )}>
                {dailyStats?.daily_attempts >= 3 ? <XCircle className="size-4" /> : <Clock className="size-4" />}
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
                  <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / 3) * 100}%` }} />
                </div>
                <p className="text-[10px] font-black text-white">{currentQuestionIndex + 1}/3</p>
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
          <div className="space-y-4">
            <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">Select a Category to Begin</h3>
            <Card className="p-12 rounded-[3.5rem] border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center gap-8 py-24 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="size-20 rounded-[2rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 relative z-10 transition-transform group-hover:scale-110">
                <Brain className="size-10" />
              </div>
              <div className="space-y-3 relative z-10">
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Your Daily Learning Goal</h4>
                <p className="text-sm text-secondary font-medium max-w-sm mx-auto">Master 3 real-world scam scenarios every day to build your cybersecurity immunity.</p>
              </div>
              <div className="flex items-center gap-12 relative z-10">
                <div className="text-center">
                   <p className="text-3xl font-black text-white">{dailyStats?.streak_count || 0}</p>
                   <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Day Streak</p>
                </div>
                <div className="text-center">
                   <p className="text-3xl font-black text-emerald-400">{dailyStats?.total_answered ? Math.round((dailyStats?.correct_answers / dailyStats?.total_answered) * 100) : 0}%</p>
                   <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Precision</p>
                </div>
              </div>
            </Card>
          </div>
        ) : quizState === 'question' && currentQuiz !== null && sessionQuestions.length > 0 && categories[currentQuiz] && QUIZ_DATA[categories[currentQuiz].title]?.[sessionQuestions[currentQuestionIndex]] ? (
          <div className="w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} layout>
              <Card className="p-10 rounded-[3rem] border-white/5 bg-white/[0.01] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Brain className="size-32" />
                </div>
                
                <div className="relative z-10 space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Category: {categories[currentQuiz].title}</p>
                      <p className="text-lg font-black text-white uppercase tracking-tighter">Scenario {currentQuestionIndex + 1}/3</p>
                    </div>
                  </div>

                  <div className="p-10 rounded-[2.5rem] bg-white text-black font-semibold text-lg leading-relaxed italic border-4 border-dashed border-black/10 relative shadow-2xl">
                    <div className="absolute -top-4 -left-4 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">New Scenario Detected</div>
                    "{QUIZ_DATA[categories[currentQuiz].title][sessionQuestions[currentQuestionIndex]].scenario}"
                  </div>

                  {!showExplanation ? (
                    <div className="grid grid-cols-2 gap-6">
                      <Button 
                        onClick={() => handleAnswer('scam')}
                        className="h-24 rounded-[2rem] bg-red-500/10 border-2 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white text-xl font-black uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-red-500/20"
                      >
                        SCAM
                      </Button>
                      <Button 
                        onClick={() => handleAnswer('safe')}
                        className="h-24 rounded-[2rem] bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black text-xl font-black uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-emerald-500/20"
                      >
                        SAFE
                      </Button>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                      <div className={cn(
                        "p-8 rounded-[2.5rem] flex items-center gap-6",
                        selectedAnswer === QUIZ_DATA[categories[currentQuiz].title][sessionQuestions[currentQuestionIndex]].type 
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          : "bg-red-500/10 border border-red-500/20 text-red-500"
                      )}>
                        <div className="size-16 rounded-2xl bg-black/20 flex items-center justify-center">
                          {selectedAnswer === QUIZ_DATA[categories[currentQuiz].title][sessionQuestions[currentQuestionIndex]].type ? <CheckCircle className="size-10" /> : <ShieldAlert className="size-10" />}
                        </div>
                        <div>
                          <p className="text-2xl font-black uppercase tracking-tighter">
                            {selectedAnswer === QUIZ_DATA[categories[currentQuiz].title][sessionQuestions[currentQuestionIndex]].type ? "CORRECT" : "INCORRECT"}
                          </p>
                          <p className="text-sm font-medium opacity-70">Identified as {QUIZ_DATA[categories[currentQuiz].title][sessionQuestions[currentQuestionIndex]].type}.</p>
                        </div>
                      </div>

                      <div className="space-y-6 bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5">
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Cybersecurity Expert Analysis</p>
                           <p className="text-secondary text-sm leading-relaxed">{QUIZ_DATA[categories[currentQuiz].title][sessionQuestions[currentQuestionIndex]].explanation}</p>
                        </div>
                        
                        {QUIZ_DATA[categories[currentQuiz].title][sessionQuestions[currentQuestionIndex]].type === 'scam' ? (
                          <div className="space-y-3">
                            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Scam Indicators (Red Flags)</p>
                            <div className="flex flex-wrap gap-2">
                              {QUIZ_DATA[categories[currentQuiz].title][sessionQuestions[currentQuestionIndex]].redFlags.map((flag: string, i: number) => (
                                <span key={i} className="text-[10px] font-bold text-white/50 bg-white/5 border border-white/5 px-4 py-2 rounded-full">{flag}</span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Trust Indicators (Safe Signs)</p>
                            <div className="flex flex-wrap gap-2">
                              {QUIZ_DATA[categories[currentQuiz].title][sessionQuestions[currentQuestionIndex]].trustIndicators?.map((indicator: string, i: number) => (
                                <span key={i} className="text-[10px] font-bold text-white/50 bg-white/5 border border-white/5 px-4 py-2 rounded-full">{indicator}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <Button 
                        onClick={handleNext}
                        className="w-full h-16 rounded-[2rem] bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-xs shadow-xl"
                      >
                        {currentQuestionIndex < 2 ? "Next Scenario" : "Finish Assessment"}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto w-full text-center space-y-10 py-12">
            <div className="space-y-4">
              <div className="size-24 rounded-[2.5rem] bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-8 animate-bounce">
                <Star className="size-12 text-yellow-500" fill="currentColor" />
              </div>
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none italic">{t("quiz.assessment_over")}</h2>
              <p className="text-secondary font-medium uppercase tracking-widest text-[10px]">{t("quiz.analysis_complete")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-10 rounded-[2.5rem] border-white/5 bg-white/[0.01]">
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">Assessment Accuracy</p>
                 <p className="text-6xl font-black text-white leading-none">{Math.round((score / 3) * 100)}%</p>
                 <p className="text-[10px] text-secondary mt-4 uppercase font-bold tracking-widest">{score === 3 ? "Perfect Precision" : "Keep Learning"}</p>
              </Card>
              <Card className="p-10 rounded-[2.5rem] border-white/5 bg-white/[0.01]">
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">Threat Index Level</p>
                 <p className={cn("text-3xl font-black uppercase tracking-widest leading-none", score === 3 ? "text-emerald-400" : "text-yellow-400")}>
                   {score === 3 ? "ELITE DEFENDER" : "AWARE PROTECTOR"}
                 </p>
                 <div className="flex items-center justify-center gap-2 mt-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className={cn("size-2 rounded-full", i < score ? "bg-emerald-400" : "bg-white/10")} />
                    ))}
                 </div>
              </Card>
            </div>

            <Button 
              onClick={() => {
                setQuizState('idle');
                setCurrentQuiz(null);
                localStorage.removeItem(`quiz_session_${user?.id}`);
              }}
              className="w-full h-16 rounded-[2rem] bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-xs"
            >
              Back to Arena
            </Button>
          </motion.div>
        )}
      </div>


    </div>
  );
};


const SettingsView = ({ onLogout }: { onLogout: () => void }) => {
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
      toast({ title: 'Upload failed', message: uploadErr.message, variant: 'error' });
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
      toast({ title: 'Error', message: error.message, variant: 'error' });
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
                   <Button 
                     onClick={onLogout}
                     className="w-full h-12 rounded-2xl bg-white text-black hover:bg-white/90 font-black text-[10px] uppercase tracking-widest transition-all shadow-xl"
                   >
                     {t("nav.logout")}
                   </Button>
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
      case "Scam Quiz Arena": return (
        <QuizErrorBoundary>
          <ScamQuizArenaView />
        </QuizErrorBoundary>
      );
      case "Settings": return <SettingsView onLogout={handleLogout} />;
      default: return <DashboardView setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 border-r border-white/5 bg-black/40 backdrop-blur-2xl p-6 z-50">
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
      <main className="flex-1 min-w-0 lg:ml-72 h-full overflow-y-auto no-scrollbar relative bg-black">
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
