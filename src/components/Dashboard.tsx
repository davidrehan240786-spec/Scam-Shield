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
  ChevronLeft
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
  { label: "Dashboard", icon: LayoutGrid, key: 'nav_dashboard' },
  { label: "Scam Scanner", icon: ShieldCheck, key: 'nav_scanner' },
  { label: "Threat Feed", icon: Activity, key: 'nav_threat_feed' },
  { label: "Scam Report Center", icon: Flag, key: 'nav_reports' },
  { label: "Learning Hub", icon: BookOpen, key: 'nav_learning' },
  { label: "Scam Quiz Arena", icon: Brain, key: 'nav_quiz' },
  { label: "Settings", icon: Settings, key: 'nav_settings' },
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

const DashboardView = ({ setActiveSection }: { setActiveSection: (section: Section) => void }) => {
  const threatData = [
    { name: 'Mon', threats: 45, prevented: 38 },
    { name: 'Tue', threats: 52, prevented: 48 },
    { name: 'Wed', threats: 38, prevented: 35 },
    { name: 'Thu', threats: 65, prevented: 60 },
    { name: 'Fri', threats: 48, prevented: 45 },
    { name: 'Sat', threats: 32, prevented: 30 },
    { name: 'Sun', threats: 28, prevented: 25 },
  ];

  const distributionData = [
    { name: 'Phishing', value: 400, color: '#3b82f6' },
    { name: 'UPI Fraud', value: 300, color: '#ef4444' },
    { name: 'Job Scam', value: 200, color: '#f59e0b' },
    { name: 'Identity', value: 100, color: '#8b5cf6' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome & Top Stats */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">System Secure, John</h1>
          <p className="text-secondary">Your digital perimeter is being monitored by SCAMSHIELD AI in real-time.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="glass border-white/5 h-10 px-4 rounded-xl gap-2 text-white">
            <Calendar className="size-4" /> May 2026
          </Button>
          <Button className="bg-white text-black hover:bg-white/90 h-10 px-6 rounded-xl font-bold gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <Download className="size-4" /> Report
          </Button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Left 3 Columns: Main Content */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group glass p-6 rounded-[2rem] border-blue-500/10 hover:border-blue-500/30 transition-all relative overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.05)] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity bg-blue-500 rounded-full blur-2xl size-32 -mr-10 -mt-10" />
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-blue-400">
                <ShieldCheck className="size-16" />
              </div>
              <p className="text-xs font-bold text-blue-400/60 uppercase tracking-[0.2em] mb-4">Active Protection</p>
              <div className="flex items-end gap-2">
                <h2 className="text-4xl font-black text-white">99.9%</h2>
                <span className="text-emerald-400 text-sm font-bold pb-1 flex items-center bg-emerald-400/10 px-2 py-0.5 rounded-lg"><TrendingUp className="size-3 mr-1" />+0.2%</span>
              </div>
              <p className="text-xs text-white/40 mt-4 leading-relaxed">Safety score across all connected accounts.</p>
            </div>

            <div className="group glass p-6 rounded-[2rem] border-red-500/10 hover:border-red-500/30 transition-all relative overflow-hidden shadow-[0_0_20px_rgba(239,68,68,0.05)] hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity bg-red-500 rounded-full blur-2xl size-32 -mr-10 -mt-10" />
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-red-400">
                <Radar className="size-16" />
              </div>
              <p className="text-xs font-bold text-red-400/60 uppercase tracking-[0.2em] mb-4">Detected Threats</p>
              <div className="flex items-end gap-2">
                <h2 className="text-4xl font-black text-white">1,284</h2>
                <span className="text-white/40 text-sm font-bold pb-1 bg-white/5 px-2 py-0.5 rounded-lg">This Week</span>
              </div>
              <p className="text-xs text-white/40 mt-4 leading-relaxed">Blocked malicious attempts globally.</p>
            </div>

            <div className="group glass p-6 rounded-[2rem] border-purple-500/10 hover:border-purple-500/30 transition-all relative overflow-hidden bg-purple-500/[0.02] shadow-[0_0_20px_rgba(168,85,247,0.05)] hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity bg-purple-500 rounded-full blur-2xl size-32 -mr-10 -mt-10" />
              <div className="absolute top-0 right-0 p-4 opacity-20 transition-opacity text-purple-400">
                <Bot className="size-16" />
              </div>
              <p className="text-xs font-bold text-purple-400/60 uppercase tracking-[0.2em] mb-4">AI Analysis</p>
              <div className="flex items-end gap-2">
                <h2 className="text-4xl font-black text-white">247</h2>
                <span className="text-secondary text-sm font-bold pb-1 bg-white/5 px-2 py-0.5 rounded-lg">Requests</span>
              </div>
              <p className="text-xs text-white/40 mt-4 leading-relaxed">Suspicious messages analyzed by our engine today.</p>
            </div>
          </div>

          {/* Activity Graph */}
          <div className="glass p-8 rounded-[2.5rem] border-white/5">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-white">Threat Activity</h3>
                <p className="text-xs text-secondary mt-1 tracking-wider uppercase">Live analysis of blocked cyber attempts</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Prevented</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-white/10" />
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Total Threats</span>
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={threatData}>
                  <defs>
                    <linearGradient id="gradientPrevented" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gradientTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '800'}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '800'}}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                    cursor={{ stroke: 'rgba(59, 130, 246, 0.2)', strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="threats" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    fill="url(#gradientTotal)" 
                    strokeDasharray="5 5"
                    dot={false}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="prevented" 
                    stroke="#3b82f6" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#gradientPrevented)" 
                    dot={{ r: 4, fill: '#000', stroke: '#3b82f6', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Row Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Scam Reports Table */}
            <div className="glass p-6 rounded-[2.5rem] border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white text-lg">Community Reports</h3>
                <Button variant="ghost" className="text-secondary hover:text-white text-xs font-bold uppercase" onClick={() => setActiveSection("Scam Report Center")}>All Reports <ChevronRight className="size-3 ml-1" /></Button>
              </div>
              <div className="space-y-4">
                {[
                  { user: "Sarah K.", type: "Fake Job Offer", level: "High", time: "2m ago", color: "text-orange-400", bg: "bg-orange-500/10" },
                  { user: "Rahul M.", type: "UPI Payment Request", level: "Critical", time: "15m ago", color: "text-red-500", bg: "bg-red-500/10" },
                  { user: "James W.", type: "Bank Phishing", level: "Medium", time: "1h ago", color: "text-yellow-400", bg: "bg-yellow-500/10" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group/item">
                    <div className="flex items-center gap-3">
                      <div className={cn("size-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm", item.bg, item.color)}>{item.user.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover/item:text-blue-400 transition-colors">{item.type}</p>
                        <p className="text-[10px] text-secondary font-medium tracking-wide">{item.user} • {item.time}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "px-2 py-1 rounded-lg text-[8px] font-extrabold uppercase tracking-widest",
                      item.level === "Critical" ? "bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.2)]" : 
                      item.level === "High" ? "bg-orange-500 text-white shadow-[0_0_10px_rgba(245,158,11,0.2)]" :
                      "border border-white/20 text-white"
                    )}>
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiz Performance / Learning */}
            <div className="glass p-6 rounded-[2.5rem] border-white/5">
              <h3 className="font-bold text-white text-lg mb-6">Learning Hub</h3>
              <div className="relative h-[180px] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center flex-col z-10">
                  <span className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors">85%</span>
                  <span className="text-[10px] font-extrabold text-secondary uppercase tracking-[0.2em] mt-1">Modules Done</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Completed', value: 85 },
                        { name: 'Remaining', value: 15 },
                      ]}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#06b6d4" />
                      <Cell fill="rgba(255,255,255,0.05)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs h-10 border border-white/5">Next Module</Button>
                <Button className="flex-1 rounded-xl bg-white text-black hover:bg-white/90 font-bold text-xs h-10" onClick={() => setActiveSection("Scam Quiz Arena")}>Take Quiz</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-[2.5rem] border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-white">Live Alerts</h3>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10">
                <div className="size-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[8px] font-black text-white uppercase tracking-widest">Live</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { title: "New Phishing Trend", desc: "Rise in electricity bill scam messages reported across Mumbai region.", time: "12m ago", icon: AlertTriangle, color: "text-red-500", glow: "bg-red-500/20" },
                { title: "Vault Sync Success", desc: "All your connected wallets and banking apps are now synchronized.", time: "45m ago", icon: RefreshCcw, color: "text-emerald-400", glow: "bg-emerald-500/20" },
                { title: "Threat Quarantined", desc: "A malicious link in your SMS was automatically identified and neutralized.", time: "2h ago", icon: ShieldAlert, color: "text-blue-400", glow: "bg-blue-500/20" },
              ].map((alert, i) => (
                <div key={i} className="group relative pl-4 border-l border-white/10 hover:border-white transition-colors cursor-default">
                  <div className={cn("absolute left-[-4.5px] top-0 size-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-[0_0_10px_currentColor]", alert.color.replace('text-', 'bg-'))} />
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <alert.icon className={cn("size-3", alert.color)} />
                      <span className="text-[10px] font-black text-white uppercase tracking-wide">{alert.title}</span>
                    </div>
                    <span className="text-[9px] text-white/30 font-bold">{alert.time}</span>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed group-hover:text-white/80 transition-colors">{alert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border-white/5">
            <h3 className="font-bold text-white mb-6">Threat Distribution</h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData}>
                  <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <XAxis dataKey="name" hide />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-y-4 mt-6">
              {distributionData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white uppercase">{item.name}</span>
                    <span className="text-[9px] text-secondary">{(item.value / 10).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="glass p-4 rounded-3xl border-white/5 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors" onClick={() => setActiveSection("Scam Scanner")}>
              <div className="size-10 rounded-2xl bg-white/5 flex items-center justify-center">
                <ShieldCheck className="size-5 text-white" />
              </div>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Scan Message</span>
            </button>
            <button className="glass p-4 rounded-3xl border-white/5 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors" onClick={() => setActiveSection("Scam Report Center")}>
              <div className="size-10 rounded-2xl bg-white/5 flex items-center justify-center">
                <Flag className="size-5 text-white" />
              </div>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Report Scam</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScamScannerView = () => {
  const [inputText, setInputText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | 'safe' | 'suspicious' | 'danger'>(null);

  const handleScan = () => {
    if (!inputText.trim()) return;
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      const lower = inputText.toLowerCase();
      if (lower.includes("win") || lower.includes("congratulations") || lower.includes("prize") || lower.includes("lottery")) {
        setScanResult('danger');
      } else if (lower.includes("http") || lower.includes("verify") || lower.includes("update") || lower.includes("urgent")) {
        setScanResult('suspicious');
      } else {
        setScanResult('safe');
      }
    }, 2000);
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="relative group overflow-hidden rounded-[3rem] p-10 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
        <div className="absolute top-[-10%] right-[-10%] size-96 bg-white/[0.02] rounded-full blur-[100px] group-hover:bg-white/[0.05] transition-all duration-1000" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10">
              <div className="size-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">AI Engine v4.0 Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">AI Scam Scanner</h1>
            <p className="text-secondary text-lg max-w-xl leading-relaxed">
              Analyze suspicious messages, links, emails, and screenshots using advanced neural patterns and community-verified threat intelligence.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { label: "Real-time AI", icon: Bot },
                { label: "Pattern Detection", icon: Radar },
                { label: "Community Verified", icon: ShieldCheck }
              ].map((pill, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-white/60">
                  <pill.icon className="size-4" /> {pill.label}
                </div>
              ))}
            </div>
          </div>
          <div className="size-64 md:size-80 flex items-center justify-center relative">
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Scanner Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 rounded-[2.5rem] border-white/5 bg-white/[0.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Bot className="size-32" />
            </div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <Activity className="size-5 text-secondary" /> Scan Input
            </h3>
            <div className="space-y-4 relative z-10">
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste the message, URL, or email content here..."
                className="w-full h-48 bg-black/40 border border-white/10 rounded-2xl p-6 text-white text-sm focus:outline-none focus:border-white/30 transition-all resize-none placeholder:text-white/20"
              />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-xl border-white/5 bg-white/5 hover:bg-white/10 h-11 px-4 gap-2 font-bold text-xs uppercase tracking-widest transition-all">
                    <LogOut className="size-4 rotate-90" /> Upload File
                  </Button>
                  <Button variant="outline" className="rounded-xl border-white/5 bg-white/5 hover:bg-white/10 h-11 px-4 gap-2 font-bold text-xs uppercase tracking-widest transition-all">
                    <Share2 className="size-4" /> Link
                  </Button>
                </div>
                <Button 
                  disabled={isScanning || !inputText.trim()}
                  onClick={handleScan}
                  className="w-full sm:w-auto rounded-xl bg-white text-black hover:bg-white/90 h-11 px-10 font-black uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-50 transition-all"
                >
                  {isScanning ? (
                    <div className="flex items-center gap-2">
                      <RefreshCcw className="size-4 animate-spin" /> Analyzing...
                    </div>
                  ) : "Analyze Threat"}
                </Button>
              </div>
            </div>
          </Card>

          {/* AI Result Section */}
          <AnimatePresence mode="wait">
            {scanResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className={cn(
                  "p-8 rounded-[2.5rem] border-white/10",
                  scanResult === 'safe' && "bg-emerald-500/10 border-emerald-500/20",
                  scanResult === 'suspicious' && "bg-orange-500/10 border-orange-500/20",
                  scanResult === 'danger' && "bg-red-500/10 border-red-500/20"
                )}>
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className={cn(
                      "size-20 rounded-3xl flex items-center justify-center shrink-0",
                      scanResult === 'safe' && "bg-emerald-500/20 text-emerald-400",
                      scanResult === 'suspicious' && "bg-orange-500/20 text-orange-400",
                      scanResult === 'danger' && "bg-red-500/20 text-red-500"
                    )}>
                      {scanResult === 'safe' && <ShieldCheck className="size-10" />}
                      {scanResult === 'suspicious' && <AlertTriangle className="size-10" />}
                      {scanResult === 'danger' && <ShieldAlert className="size-10" />}
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                         <h4 className={cn(
                           "text-2xl font-black uppercase tracking-tighter",
                           scanResult === 'safe' && "text-emerald-400",
                           scanResult === 'suspicious' && "text-orange-400",
                           scanResult === 'danger' && "text-red-500"
                         )}>
                           {scanResult === 'safe' ? "Safe Pattern Detected" : scanResult === 'suspicious' ? "Suspicious Content" : "High Risk Scam Alert"}
                         </h4>
                         <span className="text-3xl font-black text-white">{scanResult === 'safe' ? "98%" : scanResult === 'suspicious' ? "64%" : "99%"}</span>
                      </div>
                      <p className="text-white/60 leading-relaxed font-medium">
                        {scanResult === 'safe' 
                          ? "Our AI analysis suggests this content is safe. It matches standard communication patterns from verified sources."
                          : scanResult === 'suspicious'
                          ? "Caution advised. We've detected elements often found in phishing attempts, such as unusual links or urgency."
                          : "Danger! This content matches identified fraud databases and common social engineering techniques used for financial scams."}
                      </p>
                      <div className="pt-4 flex flex-wrap gap-3">
                         <Button variant="outline" className="border-white/10 text-white font-bold text-xs rounded-xl h-10 px-6">View red flags</Button>
                         {scanResult !== 'safe' && <Button className="bg-white text-black hover:bg-white/90 font-bold text-xs rounded-xl h-10 px-6">Report to authorities</Button>}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Scans Table */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Recent Scans</h3>
            <Card className="p-0 overflow-hidden border-white/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/[0.02]">
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-white/20">Scan Type</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-white/20">Threat Level</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-white/20">Confidence</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-white/20">Date</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-white/20">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { type: "SMS Content", level: "Danger", score: "99%", date: "2m ago", status: "Blocked" },
                      { type: "Email Link", level: "Safe", score: "98%", date: "1h ago", status: "Verified" },
                      { type: "WhatsApp Text", level: "Suspicious", score: "72%", date: "3h ago", status: "Alerted" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-4 text-xs font-bold text-white">{row.type}</td>
                        <td className="p-4">
                          <span className={cn(
                            "text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded",
                            row.level === 'Danger' && "text-red-500 bg-red-500/10",
                            row.level === 'Safe' && "text-emerald-400 bg-emerald-500/10",
                            row.level === 'Suspicious' && "text-orange-400 bg-orange-500/10"
                          )}>{row.level}</span>
                        </td>
                        <td className="p-4 text-xs font-bold text-white/60">{row.score}</td>
                        <td className="p-4 text-xs font-medium text-white/20">{row.date}</td>
                        <td className="p-4 text-xs font-bold text-white">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
             {[
               { label: "Detected Today", val: "1,240", icon: ShieldAlert, color: "text-red-400" },
               { label: "Common Type", val: "Phishing", icon: Bot, color: "text-blue-400" },
               { label: "Global Rating", val: "9.8/10", icon: Star, color: "text-orange-400" },
               { label: "Total Users", val: "450k", icon: Users, color: "text-emerald-400" },
             ].map((stat, i) => (
               <Card key={i} className="p-4 flex items-center gap-4 border-white/5 bg-white/[0.01]">
                 <div className={cn("size-10 rounded-xl bg-white/5 flex items-center justify-center", stat.color)}>
                   <stat.icon className="size-5" />
                 </div>
                 <div>
                   <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-lg font-black text-white">{stat.val}</p>
                 </div>
               </Card>
             ))}
          </div>

          <Card className="p-8 rounded-[2.5rem] border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
            <h3 className="font-bold text-white mb-6">Quick Safety Tips</h3>
            <div className="space-y-6">
              {[
                { title: "Check the URL", desc: "Always verify the domain name before entering credentials." },
                { title: "Look for Urgency", desc: "Scammers often create fake deadlines to rush you." },
                { title: "2FA is Mandatory", desc: "Enable hardware or app-based 2FA on all important accounts." }
              ].map((tip, i) => (
                <div key={i} className="space-y-1">
                   <p className="text-[10px] font-black text-white uppercase tracking-wider">{tip.title}</p>
                   <p className="text-xs text-secondary leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
            <Button className="w-full mt-10 rounded-[1.2rem] bg-red-600/10 border border-red-600/20 text-red-500 hover:bg-red-600/20 font-bold text-xs h-12 uppercase tracking-widest">
               Report Emergency
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ThreatFeedView = ({ setActiveSection }: { setActiveSection: (section: Section) => void }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const categories = ["All", "Banking", "UPI", "WhatsApp", "Telegram", "Social Media", "Fake Websites", "OTP Theft"];

  const trendingThreats = [
    { id: 1, title: "UPI Phishing Attack", platform: "UPI/Bank Apps", reports: "2.4k", risk: "Critical", color: "text-red-500", bg: "bg-red-500/10" },
    { id: 2, title: "Fake Delivery Message", platform: "SMS/WhatsApp", reports: "1.8k", risk: "High", color: "text-orange-500", bg: "bg-orange-500/10" },
    { id: 3, title: "OTP Refund Fraud", platform: "Direct Call", reports: "850", risk: "Critical", color: "text-red-500", bg: "bg-red-500/10" },
    { id: 4, title: "Identity Theft Portal", platform: "Fake Website", reports: "1.2k", risk: "Suspicious", color: "text-blue-500", bg: "bg-blue-500/10" },
  ];

  const feedItems = [
    {
      id: 1,
      title: "Bank KYC Update Scam",
      risk: "Critical",
      timestamp: "5m ago",
      platform: "SMS",
      reports: 124,
      desc: "Users receiving SMS claiming their bank account is suspended and asking to update KYC via a suspicious link.",
      tags: ["Banking", "OTP Theft"],
      color: "text-red-500",
      border: "border-red-500/20",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.1)]"
    },
    {
      id: 2,
      title: "WhatsApp Gift Voucher",
      risk: "Suspicious",
      timestamp: "18m ago",
      platform: "WhatsApp",
      reports: 45,
      desc: "Viral message promising gift cards from major retailers. Link leads to a data harvesting page.",
      tags: ["Social Media", "Phishing"],
      color: "text-blue-500",
      border: "border-blue-500/20",
      glow: "shadow-[0_0_20px_rgba(59,130,246,0.1)]"
    },
    {
      id: 3,
      title: "Fake Internship Program",
      risk: "High",
      timestamp: "45m ago",
      platform: "LinkedIn/Telegram",
      reports: 89,
      desc: "Scammers impersonating tech companies offering remote internships with an 'onboarding fee'.",
      tags: ["Job Scam", "Financial"],
      color: "text-orange-500",
      border: "border-orange-500/20",
      glow: "shadow-[0_0_20px_rgba(249,115,22,0.1)]"
    },
    {
      id: 4,
      title: "Crypto Wallet 'Sync'",
      risk: "Critical",
      timestamp: "1h ago",
      platform: "Telegram",
      reports: 210,
      desc: "Fake support groups asking users to enter their seed phrases on a 'secure' synchronization portal.",
      tags: ["Crypto", "OTP Theft"],
      color: "text-red-500",
      border: "border-red-500/20",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.1)]"
    }
  ];

  const filteredItems = feedItems.filter(item => {
    const matchesCategory = activeCategory === "All" || 
                           item.tags.includes(activeCategory) || 
                           item.platform.includes(activeCategory);
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Live Threat Feed</h1>
             <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-red-500/10 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <div className="size-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest leading-none">Live Monitoring</span>
             </div>
          </div>
          <p className="text-secondary font-medium text-sm">Real-time intelligence from the SCAMSHIELD global safety network.</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Last Updated</p>
            <p className="text-sm font-bold text-white">Just now</p>
          </div>
          <div className="h-10 w-px bg-white/10 hidden sm:block" />
          <div className="flex flex-col items-end">
             <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Active Threats</p>
             <p className="text-2xl font-black text-white">1,284</p>
          </div>
        </div>
      </div>

      {/* Trending Horizontal Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-white/30 uppercase tracking-[0.2em]">Trending Alerts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingThreats.map((threat) => (
            <Card key={threat.id} className={cn(
              "p-5 rounded-[2rem] border-white/5 transition-all hover:scale-[1.02] cursor-pointer relative overflow-hidden group/card shadow-[0_4px_20px_rgba(0,0,0,0.3)]", 
              threat.color.includes('red') ? "hover:border-red-500/30 shadow-red-500/5 hover:shadow-red-500/10" : 
              threat.color.includes('orange') ? "hover:border-orange-500/30 shadow-orange-500/5 hover:shadow-orange-500/10" : 
              "hover:border-blue-500/30 shadow-blue-500/5 hover:shadow-blue-500/10",
              threat.bg
            )}>
              <div className="flex justify-between items-start mb-4">
                <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm", threat.color, "bg-white/10")}>
                  {threat.risk}
                </span>
                <span className="text-[10px] font-bold text-white/40 group-hover/card:text-white/60 transition-colors">{threat.reports} Reports</span>
              </div>
              <h4 className="font-bold text-white mb-1 group-hover/card:text-blue-400 transition-colors">{threat.title}</h4>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">{threat.platform}</p>
              <div className={cn(
                "absolute top-[-20%] right-[-10%] size-24 rounded-full blur-3xl opacity-0 group-hover/card:opacity-30 transition-opacity duration-500",
                threat.color.includes('red') ? "bg-red-500" : threat.color.includes('orange') ? "bg-orange-500" : "bg-blue-500"
              )} />
            </Card>
          ))}
        </div>
      </div>

      {/* Filters Area */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20" />
           <input 
             type="text"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             placeholder="Search active threats..."
             className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/5 rounded-2xl text-white text-sm focus:outline-none focus:border-white/20 transition-all placeholder:text-white/20"
           />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeCategory === cat 
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                  : "bg-white/5 text-white/40 border border-white/5 hover:border-white/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Feed + Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Thread Timeline */}
        <div className="xl:col-span-3 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <Card className={cn("p-8 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group", item.border, item.glow)}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10", item.color)}>
                              {item.risk}
                            </span>
                            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{item.timestamp}</span>
                         </div>
                         <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/40">
                            <Users className="size-3" /> {item.reports} Reports
                         </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/80 transition-colors uppercase tracking-tight">{item.title}</h3>
                        <p className="text-secondary leading-relaxed text-sm">{item.desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] font-black uppercase tracking-wider text-white/30 bg-white/5 px-2 py-0.5 rounded">#{tag.replace(' ', '')}</span>
                        ))}
                        <span className="ml-auto text-[9px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1 text-[10px]">Source: {item.platform} <Share2 className="size-3" /></span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredItems.length === 0 && (
            <div className="p-20 text-center space-y-4">
               <div className="size-20 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/10">
                  <Radar className="size-10" />
               </div>
               <p className="text-secondary font-medium">No threats found matching your filters.</p>
            </div>
          )}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
           {/* Section 1: Stats */}
           <div className="glass p-8 rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
              <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-6">Threat Insights</h4>
              <div className="space-y-6">
                {[
                  { label: "Today's Volume", val: "1.2k+", inc: "+12%", color: "text-red-400" },
                  { label: "Active Nodes", val: "482", color: "text-emerald-400" },
                  { label: "Community Verified", val: "94%", color: "text-blue-400" },
                  { label: "High Risk Alerts", val: "12", color: "text-orange-400" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div>
                       <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
                       <p className="text-lg font-black text-white">{stat.val}</p>
                     </div>
                     {stat.inc && <span className={cn("text-[10px] font-black", stat.color)}>{stat.inc}</span>}
                  </div>
                ))}
              </div>
           </div>

           {/* Section 2: Trending Platforms */}
           <div className="glass p-8 rounded-[2.5rem] border-white/5">
              <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-6">Targeted Platforms</h4>
              <div className="space-y-4">
                {[
                  { name: "WhatsApp", risk: "Critical", val: 85 },
                  { name: "Banking Apps", risk: "High", val: 72 },
                  { name: "Telegram", risk: "High", val: 64 },
                  { name: "Instagram", risk: "Medium", val: 42 },
                  { name: "Twitter/X", risk: "Medium", val: 38 },
                ].map((plat, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-white">{plat.name}</span>
                        <span className={cn(plat.risk === "Critical" ? "text-red-500" : "text-white/40")}>{plat.risk}</span>
                     </div>
                     <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-white transition-all duration-1000" style={{ width: `${plat.val}%`, opacity: plat.val / 100 }} />
                     </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Section 3: Safety Tips */}
           <div className="p-8 rounded-[2.5rem] bg-white text-black relative overflow-hidden group border border-white/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
              <div className="absolute top-[-20%] right-[-10%] size-32 bg-black/5 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
              <ShieldCheck className="size-8 mb-4" />
              <h4 className="text-lg font-black leading-tight mb-2 uppercase tracking-tighter">Stay Ahead of Scammers</h4>
              <p className="text-xs font-bold opacity-60 leading-relaxed mb-6 italic">"Never share your OTP or click on unverified links from unknown numbers."</p>
              <Button className="w-full bg-black text-white hover:bg-black/90 font-black uppercase tracking-widest text-[10px] rounded-xl h-10 border-none">Browse Hub</Button>
           </div>
        </div>
      </div>
    </div>
  );
};


const CommunityReportsView = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: "",
    platform: "",
    title: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    link: ""
  });
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { id: "upi", label: "UPI Fraud", icon: QrCode, color: "text-red-500", bg: "bg-red-500/10" },
    { id: "banking", label: "Banking Scam", icon: ShieldAlert, color: "text-orange-500", bg: "bg-orange-500/10" },
    { id: "otp", label: "OTP Theft", icon: ShieldCheck, color: "text-red-500", bg: "bg-red-500/10" },
    { id: "job", label: "Fake Job Scam", icon: User, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: "social", label: "Social Media Scam", icon: Share2, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ];

  const recentReports = [
    { id: 1, title: "Fake Electricity Bill SMS", platform: "SMS", risk: "Critical", time: "5m ago", color: "text-red-500" },
    { id: 2, title: "Instant Loan Approval Fraud", platform: "WhatsApp", risk: "High", time: "12m ago", color: "text-orange-500" },
    { id: 3, title: "KYC Verification Link", platform: "Bank App/Email", risk: "Critical", time: "45m ago", color: "text-red-500" },
    { id: 4, title: "Fake Amazon Review Job", platform: "Telegram", risk: "Suspicious", time: "1h ago", color: "text-blue-500" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Report Submitted",
      message: "Thank you for contributing to community safety. Our AI is analyzing the threat.",
      variant: "default"
    });
    setFormData({
      type: "",
      platform: "",
      title: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      link: ""
    });
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Scam Report Center</h1>
          <p className="text-secondary font-medium text-sm">Contribute to the global safety network by reporting suspicious activities.</p>
        </div>
        <div className="flex items-center gap-6 bg-blue-500/5 border border-blue-500/20 p-4 rounded-2xl shadow-[0_10px_20px_rgba(59,130,246,0.1)]">
          <div className="text-right">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Live Reports Today</p>
            <p className="text-2xl font-black text-white leading-none">4,829</p>
          </div>
          <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Activity className="size-5 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-10">
          {/* 3. Scam Category Cards */}
          <div className="space-y-4">
             <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">Quick Filter Categories</h3>
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.label)}
                    className={cn(
                      "flex flex-col items-center justify-center p-6 rounded-[2rem] border transition-all hover:scale-105 gap-3 group/cat",
                      activeCategory === cat.label 
                        ? "bg-white text-black border-white shadow-[0_15px_30px_rgba(255,255,255,0.15)] scale-105" 
                        : "bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/[0.05] hover:border-white/10"
                    )}
                  >
                    <div className={cn(
                      "size-12 rounded-2xl flex items-center justify-center transition-all duration-300", 
                      activeCategory === cat.label ? "bg-black/5" : cn(cat.bg, "group-hover/cat:scale-110 shadow-sm")
                    )}>
                      <cat.icon className={cn("size-6", activeCategory === cat.label ? "text-black" : cat.color)} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-center leading-tight">{cat.label}</span>
                  </button>
                ))}
             </div>
          </div>

          {/* 2. Scam Reporting Form */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">Incident Report Form</h3>
            <Card className="p-10 rounded-[3rem] border-white/5 bg-white/[0.01] relative overflow-hidden group">
              <div className="absolute top-[-10%] right-[-10%] size-64 bg-white/[0.02] rounded-full blur-3xl group-hover:bg-white/[0.04] transition-all duration-1000" />
              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Scam Type</Label>
                    <div className="relative">
                       <Shield className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                       <select 
                         value={formData.type}
                         onChange={(e) => setFormData({...formData, type: e.target.value})}
                         className="w-full h-14 pl-12 pr-4 bg-black/40 border border-white/5 rounded-2xl text-white text-sm focus:outline-none focus:border-white/20 transition-all appearance-none cursor-pointer"
                         required
                       >
                         <option value="" disabled className="bg-zinc-900">Select Type</option>
                         <option className="bg-zinc-900">Phishing</option>
                         <option className="bg-zinc-900">UPI Fraud</option>
                         <option className="bg-zinc-900">Identity Theft</option>
                         <option className="bg-zinc-900">Job Scam</option>
                         <option className="bg-zinc-900">Investment Fraud</option>
                       </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Platform</Label>
                    <div className="relative">
                       <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                       <input 
                         type="text"
                         placeholder="WhatsApp, SMS, Bank Site, etc."
                         value={formData.platform}
                         onChange={(e) => setFormData({...formData, platform: e.target.value})}
                         className="w-full h-14 pl-12 pr-4 bg-black/40 border border-white/5 rounded-2xl text-white text-sm focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                         required
                       />
                    </div>
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Incident Title</Label>
                    <div className="relative">
                       <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                       <input 
                         type="text"
                         placeholder="e.g. Received suspicious KYC update link from unknown number"
                         value={formData.title}
                         onChange={(e) => setFormData({...formData, title: e.target.value})}
                         className="w-full h-14 pl-12 pr-4 bg-black/40 border border-white/5 rounded-2xl text-white text-sm focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                         required
                       />
                    </div>
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Description</Label>
                    <textarea 
                      placeholder="Provide detailed description of the incident..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full h-32 bg-black/40 border border-white/5 rounded-2xl p-6 text-white text-sm focus:outline-none focus:border-white/20 transition-all resize-none placeholder:text-white/10"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Occurrence Date</Label>
                    <div className="relative">
                       <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                       <input 
                         type="date"
                         value={formData.date}
                         onChange={(e) => setFormData({...formData, date: e.target.value})}
                         className="w-full h-14 pl-12 pr-4 bg-black/40 border border-white/5 rounded-2xl text-white text-sm focus:outline-none focus:border-white/20 transition-all"
                         required
                       />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Suspicious Link/Number</Label>
                    <div className="relative">
                       <Share2 className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                       <input 
                         type="text"
                         placeholder="+91-XXXXX or bit.ly/example"
                         value={formData.link}
                         onChange={(e) => setFormData({...formData, link: e.target.value})}
                         className="w-full h-14 pl-12 pr-4 bg-black/40 border border-white/5 rounded-2xl text-white text-sm focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                       />
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button type="submit" className="h-14 rounded-2xl bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-sm px-12 group">
                    Submit Incident Report <ArrowLeft className="size-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* 4. Recent Reports Section */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">Latest Community Submissions</h3>
            <div className="space-y-4">
               {recentReports.map((report) => (
                 <Card key={report.id} className="p-6 rounded-[2.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group flex items-center gap-6">
                    <div className={cn("size-14 rounded-2xl flex items-center justify-center bg-white/5", report.color)}>
                       <AlertTriangle className="size-6" />
                    </div>
                    <div className="flex-1">
                       <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-white uppercase tracking-tight">{report.title}</h4>
                          <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 border border-white/10", report.color)}>
                            {report.risk}
                          </span>
                       </div>
                       <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Platform: {report.platform} • Reported {report.time}</p>
                    </div>
                    <Button variant="ghost" className="text-white/20 hover:text-white hover:bg-white/5 rounded-xl px-4 text-[10px] font-bold uppercase tracking-widest h-10">
                       Details
                    </Button>
                 </Card>
               ))}
            </div>
          </div>
        </div>

        {/* 5. Side Widgets */}
        <div className="space-y-8">
           {/* Section 1: Stats */}
           <div className="glass p-8 rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
              <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-6 whitespace-nowrap">Global Stats</h4>
              <div className="space-y-6">
                {[
                  { label: "Cases Solved", val: "1.2k+", inc: "+12%", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                  { label: "Verified Threats", val: "482", color: "text-blue-400", bg: "bg-blue-500/10" },
                  { label: "Alert Precision", val: "94%", color: "text-purple-400", bg: "bg-purple-500/10" },
                  { label: "Active Guards", val: "125k", color: "text-orange-400", bg: "bg-orange-500/10" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between group/stat p-2 rounded-xl hover:bg-white/5 transition-colors">
                     <div>
                       <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1 group-hover/stat:text-white/60 transition-colors">{stat.label}</p>
                       <p className="text-lg font-black text-white">{stat.val}</p>
                     </div>
                     <div className="flex flex-col items-end gap-1">
                        {stat.inc && <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-lg", stat.color, stat.bg)}>{stat.inc}</span>}
                     </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Section 2: Safety Tips */}
           <div className="glass p-8 rounded-[2.5rem] border-white/5">
              <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-6">Quick Safety Tips</h4>
              <div className="space-y-4">
                {[
                  { title: "Never Share OTP", desc: "Banks never ask for OTPs via call or SMS." },
                  { title: "Verify Callers", desc: "Use Truecaller or official apps to verify bank calls." },
                  { title: "Avoid Links", desc: "Don't click links in messages claiming urgent KYC." },
                ].map((tip, i) => (
                  <div key={i} className="space-y-1">
                     <p className="text-[10px] font-black text-white uppercase tracking-wider">{tip.title}</p>
                     <p className="text-xs text-secondary leading-relaxed opacity-60">{tip.desc}</p>
                  </div>
                ))}
              </div>
           </div>

           {/* Section 3: Emergency Help */}
           <div className="p-8 rounded-[2.5rem] bg-white text-black relative overflow-hidden group border border-white/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
              <div className="absolute top-[-20%] right-[-10%] size-32 bg-black/5 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
              <div className="size-10 rounded-2xl bg-black/5 flex items-center justify-center mb-4">
                 <ShieldAlert className="size-6" />
              </div>
              <h4 className="text-lg font-black leading-tight mb-2 uppercase tracking-tighter">Emergency Help</h4>
              <p className="text-xs font-bold opacity-60 leading-relaxed mb-6 italic">"If you've lost money, call 1930 (National Cyber Crime Helpline) immediately."</p>
              <div className="space-y-2">
                 <Button className="w-full bg-black text-white hover:bg-black/90 font-black uppercase tracking-widest text-[10px] rounded-xl h-10 border-none">Contact Support</Button>
                 <Button variant="outline" className="w-full border-black/10 text-black hover:bg-black/5 font-black uppercase tracking-widest text-[10px] rounded-xl h-10">Call Helpline</Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const TrustSystemView = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <SectionHeader title="User Trust System" subtitle="Verified network for safe cyber interactions." />
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col items-center justify-center p-8 glass rounded-[3rem] border border-white/10">
        <div className="p-4 bg-white rounded-3xl mb-6">
          <QrCode className="size-64 text-black" />
        </div>
        <p className="text-white font-bold text-xl mb-2">Your Safety ID</p>
        <p className="text-secondary text-sm font-medium">Verified Protector • Trust Score: 98%</p>
      </div>

      <div className="space-y-6">
        <Card className="glass border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Security Settings</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Public Trust Badge</p>
                <p className="text-sm text-secondary">Show your verification level on reports</p>
              </div>
              <Checkbox id="public-score" defaultChecked className="size-6 rounded-lg border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Protector Rank</Label>
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
                <Share2 className="size-4" /> Export Safety ID
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold">
                View Achievements
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
          <Shield className="size-5 text-emerald-400" />
          <p className="text-xs text-white/40 font-medium">Your identity is secured via encrypted hashing and community verification.</p>
        </div>
      </div>
    </div>
  </div>
);

const InsightsView = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <SectionHeader title="Threat Analytics" subtitle="Track global scam trends and individual alert performance." />
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <div className="flex items-center justify-between mb-4">
          <div className="size-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Shield className="size-6" />
          </div>
          <span className="text-xs font-bold text-emerald-400">+12%</span>
        </div>
        <p className="text-3xl font-bold text-white">850 <span className="text-sm font-medium text-white/40">Alerts</span></p>
        <p className="text-xs text-white/40 mt-1">Total Threats Blocked</p>
      </Card>
      <Card className="border-white/10 bg-white/5 glass">
        <div className="flex items-center justify-between mb-4">
          <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
            <Activity className="size-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">+5%</span>
        </div>
        <p className="text-3xl font-bold text-white">210 <span className="text-sm font-medium text-secondary">Verified</span></p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mt-1">Confirmed Patterns</p>
      </Card>
      <Card className="border-blue-500/20 bg-blue-500/5">
        <div className="flex items-center justify-between mb-4">
          <div className="size-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
            <CheckCircle className="size-6" />
          </div>
          <span className="text-xs font-bold text-blue-400">95%</span>
        </div>
        <p className="text-3xl font-bold text-white">95 <span className="text-sm font-medium text-white/40">%</span></p>
        <p className="text-xs text-white/40 mt-1">Success Recovery Rate</p>
      </Card>
    </div>

      <Card className="h-[400px] p-6 glass border-white/10">
      <h3 className="text-lg font-bold text-white mb-6">Threat Volume History</h3>
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

const MeetupView = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <SectionHeader title="Safety Alerts" subtitle="Monitor and manage real-time security warnings." />
    
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
            <span className="text-2xl font-black uppercase tracking-tighter">Emergency</span>
          </div>
        </motion.button>
        <p className="text-white/60 font-medium text-center max-w-xs">Broadcast a critical alert to the community in your area.</p>
      </div>

      <div className="space-y-6">
        <Card className="glass border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="size-8 text-white" />
            <h4 className="font-bold text-lg text-white">Active Guard Zones</h4>
          </div>
          <p className="text-sm font-medium text-secondary mb-6">Explore neighborhoods documented for high scam activity and stay vigilant.</p>
          <Button className="w-full bg-white text-black hover:bg-white/90 font-bold rounded-xl h-12">Browse Risk Map</Button>
        </Card>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest">Recent Alerts</h4>
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

const LearningHubView = () => {
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
    { id: "v1", title: "What is Cyber Fraud", url: "https://www.youtube.com/watch?v=qdpReVgpQhc", category: "Cyber Safety", desc: "A basic introduction to how cyber fraud happens and why it's a major threat." },
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
          Back to Hub
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
                       {selectedArticle.threatLevel} Threat
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
                    <History className="size-6 text-blue-500" /> How It Works
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
                       <ShieldAlert className="size-5" /> Red Flags
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
                       <ShieldCheck className="size-5" /> Prevention Tips
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
                      <Lightbulb className="size-5 text-yellow-500" /> Real Scenario
                   </h4>
                   <p className="text-sm text-white/60 leading-relaxed italic relative z-10">
                     "{selectedArticle.realExample}"
                   </p>
                </div>

                {/* Video Support */}
                {selectedArticle.videoUrl && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <Youtube className="size-6 text-red-600" /> Video Awareness
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
              <h4 className="text-lg font-bold text-white mb-6">Key Takeaways</h4>
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
              <h4 className="text-lg font-bold text-white mb-6">Safety Checklist</h4>
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
                <Brain className="size-5 text-red-500" /> Knowledge Check
              </h4>
              <div className="space-y-8 relative z-10">
                {selectedArticle.quiz.map((q: any, i: number) => (
                  <div key={i} className="space-y-4">
                    <p className="text-[11px] font-black text-white/40 uppercase tracking-widest">Question {i + 1}</p>
                    <p className="text-sm font-bold text-white leading-tight">{q.question}</p>
                    {quizAnswers[`${selectedArticle.id}-${i}`] ? (
                       <div className="p-4 rounded-xl bg-white/10 border border-white/10 animate-in fade-in zoom-in-95 duration-500">
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Answer</p>
                          <p className="text-xs text-white/80 font-medium leading-relaxed">{q.answer}</p>
                       </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        onClick={() => handleRevealAnswer(`${selectedArticle.id}-${i}`)}
                        className="w-full rounded-xl border-white/10 bg-white/5 hover:bg-white hover:text-black font-black text-[10px] uppercase tracking-widest"
                      >
                        Reveal Answer
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
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Learning Hub</h1>
          <p className="text-secondary font-medium text-sm max-w-lg">Advanced education for the digital age. Learn to spot scams before they spot you.</p>
        </div>
        <div className="flex items-center gap-6 bg-white/5 border border-white/5 p-4 rounded-2xl">
          <div className="text-right">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Global Safety Status</p>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-black text-white">Verified</p>
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
            {cat}
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
                   {featuredArticle.threatLevel} Threat
                 </span>
                 <span className="text-[10px] font-bold text-white/40 border-l border-white/10 pl-3 uppercase tracking-widest">
                   {featuredArticle.readTime} Read
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
                    <Youtube className="size-5 text-red-500" /> Watch Video
                  </Button>
                )}
                <div className="h-14 flex items-center px-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-blue-500 transition-colors">
                   Tap to read full article
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
            {activeCategory === "All" ? "Latest Researches" : `${activeCategory} Articles`}
          </h3>
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{gridArticles.length} Resources Available</span>
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
                      {article.threatLevel}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {article.readTime}</span>
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
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-blue-500 transition-colors">Open Article</span>
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
            title="Cyber Awareness Videos" 
            subtitle="Watch cybersecurity awareness videos and learn how to identify online scams and digital threats."
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
                      {video.category}
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
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/20 group-hover:text-blue-500 transition-colors">Play Video</span>
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
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Scam Quiz Arena</h1>
          <p className="text-secondary font-medium text-sm max-w-lg">Sharpen your investigative skills. Face real-world scam scenarios and prove your awareness.</p>
        </div>
        <div className="flex items-center gap-6 bg-white/5 border border-white/5 p-4 rounded-2xl">
          <div className="text-right">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Global Rank</p>
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
        <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">Select Arena</h3>
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
                Start Quiz
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. Live Quiz Challenge Section */}
      <div className="space-y-8 pt-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">Live Quiz Challenge</h3>
            <p className="text-[10px] text-secondary">Interactive simulation of real-world threats</p>
          </div>
          
          {quizState === 'question' && (
            <div className="flex items-center gap-6 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Progress</p>
                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }} />
                </div>
                <p className="text-[10px] font-black text-white">{currentQuestionIndex + 1}/{questions.length}</p>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                 <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Score</p>
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
              <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Daily Challenge Ready</h4>
              <p className="text-sm text-secondary font-medium max-w-sm mx-auto">Test your investigation skills with today's high-alert scam scenarios.</p>
            </div>
            <Button 
              onClick={() => handleStartQuiz(0)}
              className="rounded-2xl bg-white text-black px-12 h-14 font-black uppercase tracking-widest text-[11px] relative z-10 hover:bg-white/90 transform transition-all active:scale-95"
            >
              Start Daily Challenge
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
                    <div className="absolute -top-4 -left-4 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Suspect Match</div>
                    "{questions[currentQuestionIndex].scenario}"
                  </div>

                  {!showExplanation ? (
                    <div className="grid grid-cols-2 gap-6">
                      <Button 
                        onClick={() => handleAnswer('scam')}
                        className="h-24 rounded-[2rem] bg-red-500/10 border-2 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white text-xl font-black uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-red-500/20"
                      >
                        Scam
                      </Button>
                      <Button 
                        onClick={() => handleAnswer('safe')}
                        className="h-24 rounded-[2rem] bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black text-xl font-black uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-emerald-500/20"
                      >
                        Safe
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
                            {selectedAnswer === questions[currentQuestionIndex].type ? "Correct Analysis!" : "Security Breach!"}
                          </p>
                          <p className="text-sm font-medium opacity-70">Identified as a {questions[currentQuestionIndex].type}.</p>
                        </div>
                      </div>

                      <div className="space-y-6 bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5">
                        <p className="text-secondary text-sm leading-relaxed">{questions[currentQuestionIndex].explanation}</p>
                        
                        <div className="space-y-3">
                          <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Red Flags Spotted:</p>
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
                        {currentQuestionIndex < questions.length - 1 ? "Analyze Next Case" : "Review Performance"}
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
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none italic">Assessment Over</h2>
              <p className="text-secondary font-medium uppercase tracking-widest text-[10px]">Security capability analysis complete</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-10 rounded-[2.5rem] border-white/5 bg-white/[0.01]">
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">Precision Rate</p>
                 <p className="text-6xl font-black text-white leading-none">{Math.round((score / questions.length) * 100)}%</p>
              </Card>
              <Card className="p-10 rounded-[2.5rem] border-white/5 bg-white/[0.01]">
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">Threat Index</p>
                 <p className="text-2xl font-black text-emerald-400 uppercase tracking-widest">{score === questions.length ? "Elite" : "Protector"}</p>
              </Card>
            </div>

            <Button 
              onClick={() => setQuizState('idle')}
              className="w-full h-16 rounded-[2rem] bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-xs"
            >
              Reset Session
            </Button>
          </motion.div>
        )}
      </div>

      {/* 4. Quick Scam Tips & Recent Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">Quick Scam Tips</h3>
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
          <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">Recent Statistics</h3>
          <Card className="p-8 rounded-[2.5rem] border-white/5 bg-white/[0.01] space-y-8">
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Last Score</p>
                   <p className="text-3xl font-black text-emerald-400">4/5</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Peak Performance</p>
                   <p className="text-3xl font-black text-yellow-500">100%</p>
                </div>
             </div>
             <div className="pt-6 border-t border-white/5">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-4">Top Skill Category</p>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                   <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Mail className="size-5" />
                   </div>
                   <div>
                      <p className="text-xs font-black text-white uppercase tracking-tighter leading-none">Phishing Expert</p>
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">Level 4</p>
                   </div>
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SettingsView = () => {
  const [protectionEnabled, setProtectionEnabled] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Security & Settings</h1>
          <p className="text-secondary font-medium text-sm">Advanced account control and privacy configuration.</p>
        </div>
        <div className="flex items-center gap-4 bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.05)]">
          <div className="flex flex-col items-end">
            <p className="text-[10px] font-black text-emerald-500/40 uppercase tracking-widest leading-none mb-1">Protection Status</p>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <p className="text-sm font-black text-emerald-400 capitalize tracking-tight">Maximum Secure</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col items-end">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">Last AI Scan</p>
            <p className="text-sm font-black text-white">4m ago</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* 2. Profile & Account Card */}
          <Card className="rounded-[2.5rem] border-white/5 bg-white/[0.01]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white">Profile Information</h3>
              <div className="flex gap-2">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">Cancel</Button>
                <Button className="bg-white text-black hover:bg-white/90 rounded-xl px-6 h-10 font-bold text-xs uppercase tracking-widest">Save Changes</Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="flex flex-col items-center gap-4 group cursor-pointer">
                <div className="relative">
                   <Avatar className="size-24 rounded-3xl border-2 border-blue-500/20 group-hover:border-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop" />
                    <AvatarFallback className="bg-white/5 text-white">SJ</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 size-8 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-xl border-4 border-black group-hover:scale-110 transition-transform">
                    <RefreshCcw className="size-3 font-bold" />
                  </div>
                </div>
                <Button variant="ghost" className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] hover:text-white transition-colors">Change Avatar</Button>
              </div>

              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Full Name</Label>
                  <Input className="bg-white/[0.03] border-white/5 rounded-2xl h-12 focus:border-white/20 transition-all font-medium" defaultValue="Sarah Johnson" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Email Address</Label>
                  <Input className="bg-white/[0.03] border-white/5 rounded-2xl h-12 focus:border-white/20 transition-all font-medium" defaultValue="sarah.j@scamshield.ai" />
                </div>
                <div className="space-y-2 md:col-span-2">
                   <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Account Bio</Label>
                   <Input className="bg-white/[0.03] border-white/5 rounded-2xl h-12 focus:border-white/20 transition-all font-medium" defaultValue="Cybersecurity enthusiast and digital safety pioneer." />
                </div>
              </div>
            </div>
          </Card>

          {/* 3. Security Preferences Section */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] ml-2">Hardware & AI Protection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Two-Factor Auth", desc: "Require a secure code for all logins.", icon: ShieldCheck, state: true, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { title: "Real-Time Alerts", desc: "Instant push notifications for threats.", icon: Bell, state: true, color: "text-blue-400", bg: "bg-blue-500/10" },
                { title: "Login Activity", desc: "Monitor sessions across all systems.", icon: Activity, state: false, color: "text-orange-400", bg: "bg-orange-500/10" },
                { title: "AI Pattern Scan", desc: "Autonomous monitoring of your feed.", icon: Bot, state: true, color: "text-purple-400", bg: "bg-purple-500/10" },
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
             <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] ml-2">Regional</h3>
             <Card className="p-8 rounded-[2.5rem] border-white/5 bg-white/[0.01] space-y-6">
                <div className="space-y-4">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-white/20">Preferred Language</Label>
                   <div className="grid grid-cols-3 gap-2">
                      {['English', 'हिन्दी', 'ಕನ್ನಡ'].map((lang, i) => (
                        <button key={i} className={cn(
                          "py-3 rounded-xl border text-[11px] font-black uppercase tracking-tight transition-all",
                          i === 0 ? "bg-white text-black border-white" : "bg-white/5 text-white/40 border-white/5 hover:border-white/20"
                        )}>
                          {lang}
                        </button>
                      ))}
                   </div>
                </div>
                <div className="pt-6 border-t border-white/5 space-y-4">
                   <div className="flex items-center justify-between">
                      <div>
                         <p className="text-xs font-bold text-white">System Theme</p>
                         <p className="text-[10px] text-white/20">Dark mode optimized</p>
                      </div>
                      <Badge className="bg-white/5 text-white/40 border-white/10">Default</Badge>
                   </div>
                   <div className="flex items-center justify-between">
                      <div>
                         <p className="text-xs font-bold text-white">Screen Reader</p>
                         <p className="text-[10px] text-white/20">Enhanced accessibility</p>
                      </div>
                      <Switch />
                   </div>
                </div>
             </Card>
          </div>

          {/* 5. Danger Zone */}
          <div className="space-y-6">
             <h3 className="text-[11px] font-black text-red-500 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
               <ShieldAlert className="size-3" /> Critical Actions
             </h3>
             <div className="glass p-8 rounded-[3rem] border-2 border-red-500/20 bg-red-500/[0.03] space-y-6 relative overflow-hidden group hover:border-red-500/40 transition-all shadow-[0_10px_40px_rgba(239,68,68,0.05)]">
                <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-10 transition-opacity bg-red-500 rounded-full blur-[60px] size-48 -mr-16 -mt-16" />
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity text-red-500">
                  <ShieldAlert className="size-20" />
                </div>
                <div className="space-y-2 relative z-10">
                   <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    Warning: System Reset
                   </p>
                   <p className="text-sm font-medium text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">This operation is irreversible. All safety records, AI patterns, and personalized detection modules will be permanently purged.</p>
                </div>
                
                <div className="space-y-2 relative z-10">
                   <Button variant="outline" className="w-full h-12 rounded-2xl border-white/5 bg-white/5 hover:bg-white text-black font-black text-[10px] uppercase tracking-widest transition-all">Logout Everywhere</Button>
                   <Button variant="outline" className="w-full h-12 rounded-2xl border-red-500/20 hover:bg-red-500 text-white font-black text-[10px] uppercase tracking-widest transition-all">Delete Account</Button>
                </div>
                <button className="w-full text-center text-[9px] font-black text-white/20 uppercase tracking-[0.4em] hover:text-red-400 transition-colors">Reset Safety Config</button>
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
              <TextRoll className="font-bold text-sm tracking-wide">{item.label}</TextRoll>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
          <Link 
            to="/" 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-secondary hover:text-white hover:bg-white/5 transition-all group"
          >
            <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            <TextRoll className="font-bold text-sm tracking-wide">Back to Home</TextRoll>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-secondary hover:text-red-400 hover:bg-red-500/5 transition-all group">
            <LogOut className="size-5 group-hover:translate-x-1 transition-transform" />
            <TextRoll className="font-bold text-sm tracking-wide">Logout</TextRoll>
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
              "flex flex-col items-center gap-1 transition-all",
              activeSection === item.label ? "text-white" : "text-secondary"
            )}
          >
            <item.icon className="size-6" />
            <TextRoll className="text-[10px] font-bold uppercase tracking-tighter">{item.label.split(' ')[0]}</TextRoll>
          </button>
        ))}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="flex flex-col items-center gap-1 text-secondary"
        >
          <Menu className="size-6" />
          <TextRoll className="text-[10px] font-bold uppercase tracking-tighter">More</TextRoll>
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
                <span className="text-xl font-black tracking-tighter uppercase">Menu</span>
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
                    <TextRoll className="font-bold text-sm tracking-wide">{item.label}</TextRoll>
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto no-scrollbar relative">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-bottom border-white/5 px-6 md:px-10 py-6 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white tracking-tight">Welcome back, Protector</h1>
            <p className="text-xs text-secondary font-medium">You have 3 new community alerts today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-xl bg-white/10 p-[1px]">
              <div className="size-full rounded-[11px] bg-black flex items-center justify-center">
                <User className="size-5 text-white" />
              </div>
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
