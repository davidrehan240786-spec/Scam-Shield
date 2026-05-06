import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Upload, 
  X, 
  MapPin, 
  Tag, 
  Clock, 
  MessageSquare, 
  Phone, 
  Sparkles,
  CheckCircle2,
  Info,
  ChevronDown,
  Image as ImageIcon,
  DollarSign,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/toast-context";

// --- Types ---

interface ItemData {
  title: string;
  description: string;
  category: string;
  type: "Private" | "Global";
  price: string;
  isFree: boolean;
  images: string[];
  location: string;
  tags: string[];
  condition: "High" | "Medium" | "Low";
  reportingPreference: string;
  incidentTime: string;
  allowContact: boolean;
}

const CATEGORIES = ["Phishing", "UPI Fraud", "Investment Scam", "Job Offer", "Social Media Hack"];
const PLATFORMS = ["WhatsApp", "Telegram", "Instagram", "Email", "SMS", "Phone Call"];
const TAGS = ["Financial", "Identity Theft", "Personal Safety", "AI Generated"];
const SEVERITIES = ["High", "Medium", "Low"];
const TIME_SKEW = ["Today", "Yesterday", "Last Week", "Older"];

export default function AddItemPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ItemData>({
    title: "",
    description: "",
    category: "Phishing",
    type: "Global",
    price: "",
    isFree: false,
    images: [],
    location: "WhatsApp",
    tags: [],
    condition: "Medium",
    reportingPreference: "WhatsApp",
    incidentTime: "Today",
    allowContact: false,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [smartAssist, setSmartAssist] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag) 
        : [...prev.tags, tag]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (formData.images.length + files.length > 5) {
      toast({
        title: "Limit Exceeded",
        message: "You can only upload up to 5 screenshots.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file as Blob));
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
      setIsUploading(false);
      
      setSmartAssist("Metadata Scanned: Potential Fraud Pattern Detected");
    }, 1000);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    if (formData.images.length <= 1) setSmartAssist(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast({
        title: "Missing Information",
        message: "Please provide a title and detailed description of the incident.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Submitted",
      message: "Your report has been securely submitted for AI analysis and community protection.",
      variant: "success"
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-secondary hover:text-white transition-colors group"
          >
            <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm uppercase tracking-widest">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="ScamShield Logo" className="size-8 object-contain" referrerPolicy="no-referrer" />
            <span className="font-black text-lg tracking-tighter uppercase">ScamShield</span>
          </div>
          <div className="w-20" /> 
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2">Report a Case</h1>
          <p className="text-sm sm:text-base text-secondary font-medium">Submit details of the suspicious activity to protect yourself and others.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-7 space-y-10">
            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* 1. Incident Details */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 font-bold text-xs shrink-0">01</div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight">Incident Overview</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-white/40">Scam Headline *</Label>
                    <Input 
                      id="title"
                      name="title"
                      placeholder="e.g. Fake Electricity Bill Payment Link on WhatsApp"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="h-14 bg-white/5 border-white/10 rounded-2xl focus:border-white/20 transition-all text-lg font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-white/40">Full Incident Description</Label>
                      <span className="text-[10px] font-bold text-white/20">{formData.description.length}/1000</span>
                    </div>
                    <Textarea 
                      id="description"
                      name="description"
                      placeholder="Describe exactly what happened, the platform used, and any loss incurred..."
                      value={formData.description}
                      onChange={handleInputChange}
                      maxLength={1000}
                      className="min-h-[160px] bg-white/5 border-white/10 rounded-2xl focus:border-white/20 transition-all resize-none"
                    />
                  </div>
                </div>
              </section>

              {/* 2. Type & Platform */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 font-bold text-xs shrink-0">02</div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight">Classification</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/40">Scam Category</Label>
                    <div className="relative">
                      <select 
                        value={formData.category}
                        onChange={(e) => handleSelectChange("category", e.target.value)}
                        className="w-full h-14 pl-6 pr-12 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white appearance-none focus:outline-none focus:border-white/20 transition-all"
                      >
                        {CATEGORIES.map(cat => <option key={cat} value={cat} className="bg-zinc-900">{cat}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-white/20 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/40">Privacy Type</Label>
                    <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 h-14">
                      {["Private", "Global"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, type: type as any }))}
                          className={cn(
                            "flex-1 rounded-xl font-bold text-sm transition-all",
                            formData.type === type ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Financial Impact */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 font-bold text-xs shrink-0">03</div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight">Financial Statistics (Optional)</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-6 items-end">
                  <div className="flex-1 space-y-2 w-full">
                    <Label htmlFor="price" className="text-xs font-bold uppercase tracking-widest text-white/40">Amount Lost (₹)</Label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">₹</div>
                      <Input 
                        id="price"
                        name="price"
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="h-14 pl-10 bg-white/5 border-white/10 rounded-2xl focus:border-white/20 transition-all text-lg font-bold"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. Proof/Evidence */}
              <section className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 font-bold text-xs shrink-0">04</div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight">Screenshots/Evidence</h3>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Max 5</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "md:col-span-1 aspect-square rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-white/30 hover:bg-white/[0.02] transition-all group relative overflow-hidden",
                      formData.images.length >= 5 && "opacity-50 pointer-events-none"
                    )}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      multiple 
                      onChange={handleImageUpload} 
                    />
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="size-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-white/40">Analyzing...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="size-6 text-white/20 group-hover:text-white transition-colors mb-2" />
                        <span className="text-[10px] font-black uppercase tracking-tighter text-white/40 group-hover:text-white transition-colors">Add Proof</span>
                      </>
                    )}
                  </div>

                  <AnimatePresence>
                    {formData.images.map((img, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        key={idx} 
                        className="aspect-square rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative group"
                      >
                        <img src={img} alt="Preview" className="size-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 size-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                        >
                          <X className="size-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {smartAssist && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20"
                  >
                    <Sparkles className="size-4 text-blue-400" />
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{smartAssist}</span>
                  </motion.div>
                )}
              </section>

              {/* 5. Platform & Severity */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 font-bold text-xs shrink-0">05</div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight">Impact & Platform</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/40">Scam Platform</Label>
                    <div className="relative">
                      <select 
                        value={formData.location}
                        onChange={(e) => handleSelectChange("location", e.target.value)}
                        className="w-full h-14 pl-12 pr-12 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white appearance-none focus:outline-none focus:border-white/20 transition-all"
                      >
                        {PLATFORMS.map(loc => <option key={loc} value={loc} className="bg-zinc-900">{loc}</option>)}
                      </select>
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white/20 pointer-events-none" />
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-white/20 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/40">Tags of Incident</Label>
                    <div className="flex flex-wrap gap-2">
                      {TAGS.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={cn(
                            "px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2",
                            formData.tags.includes(tag)
                              ? "bg-white text-black border-white"
                              : "bg-white/5 text-white/40 border-white/5 hover:border-white/20"
                          )}
                        >
                          <Tag className="size-3" /> {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* 6. Severity */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 font-bold text-xs shrink-0">06</div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight">Threat Level</h3>
                </div>
                <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 h-14">
                  {SEVERITIES.map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => handleSelectChange("condition", cond)}
                      className={cn(
                        "flex-1 rounded-xl font-bold text-sm transition-all",
                        formData.condition === cond ? "bg-red-500 text-white shadow-lg" : "text-white/40 hover:text-white"
                      )}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </section>

              {/* Action Buttons */}
              <div className="pt-10 flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit"
                  className="flex-1 h-14 sm:h-16 rounded-2xl bg-white text-black hover:bg-white/90 text-base sm:text-lg font-black uppercase tracking-tighter shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                >
                  Submit Report
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => toast({ title: "Draft Saved", message: "Your report has been saved to drafts.", variant: "default" })}
                  className="h-14 sm:h-16 px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-base sm:text-lg font-bold"
                >
                  Save as Draft
                </Button>
              </div>

            </form>
          </div>

          {/* Live Preview Section */}
          <div className="lg:col-span-5 pb-20 lg:pb-0">
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Report Summary</h3>
                <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest animate-pulse">
                  <div className="size-1.5 rounded-full bg-blue-400" />
                  AI Ready
                </div>
              </div>

              {/* Preview Card */}
              <motion.div 
                layout
                className="glass rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl"
              >
                <div className="relative aspect-[4/3] bg-white/5 overflow-hidden">
                  {formData.images.length > 0 ? (
                    <motion.img 
                      key={formData.images[0]}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={formData.images[0]} 
                      alt="Preview" 
                      className="size-full object-cover" 
                    />
                  ) : (
                    <div className="size-full flex flex-col items-center justify-center text-white/10">
                      <ImageIcon className="size-16 mb-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">No Evidence Uploaded</span>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4">
                    <div className="size-10 rounded-full bg-red-400/20 backdrop-blur-md flex items-center justify-center text-red-400">
                      <Tag className="size-5" />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <span key={tag} className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white shadow-lg",
                        "bg-red-500"
                      )}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                      {formData.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black tracking-tight leading-tight line-clamp-2">
                      {formData.title || "Incident Headline"}
                    </h4>
                    <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest">
                      <MapPin className="size-3" /> {formData.location}
                      <span className="size-1 rounded-full bg-white/10" />
                      {formData.condition} Threat Level
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">Loss Reported</span>
                      <span className="text-3xl font-black text-white">
                        {formData.price ? `₹${formData.price}` : "₹0"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/5">
                      <div className="size-2 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Verified Reporter</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="size-4 text-white/20" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Submission Info</span>
                      </div>
                      <p className="text-xs font-medium text-white/60">
                        {formData.type} Submission • {formData.incidentTime}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tips Card */}
              <div className="p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/10 flex gap-4">
                <Info className="size-6 text-blue-400 shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-blue-400">Analysis Tip</h4>
                  <p className="text-xs text-blue-400/60 leading-relaxed font-medium">
                    Include clear screenshots of sender details and suspicious links. This helps our AI pattern identification engine work faster.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
