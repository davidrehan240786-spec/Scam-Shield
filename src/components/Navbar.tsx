import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HoverAnimationButton from "@/components/ui/hover-animation-button";
import { Menu, X } from "lucide-react";
import AnimatedDropdown from "@/components/ui/animated-dropdown";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useTranslation, Language } from "@/i18n/TranslationContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { t, setLanguage, language } = useTranslation();

  const languageOptions = [
    { name: "English", onClick: () => setLanguage("en") },
    { name: "हिंदी", onClick: () => setLanguage("hi") },
    { name: "ಕನ್ನಡ", onClick: () => setLanguage("kn") },
  ];

  const currentLangLabel = language === "en" ? "EN" : language === "hi" ? "HI" : "KN";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("nav.about"), to: "/#about" },
    { label: t("nav.features"), to: "/#features" },
    { label: t("nav.faqs"), to: "/#faqs" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-center transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-black/80 backdrop-blur-md border-b border-white/5" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] w-full px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 z-50">
          <img src="/logo.png" alt="SafeNet AI Logo" className="h-8 w-8 object-contain" />
          <span className="font-bold text-lg tracking-tight uppercase">ScamShield</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          <AnimatedDropdown 
            items={languageOptions} 
            text={currentLangLabel} 
            className="mr-2"
          />
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 py-2 rounded-full text-[14px] font-medium text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {loading ? (
              <div className="size-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-full text-[14px] font-medium text-white/70 hover:text-white hover:bg-white/10 border border-white/10 transition-all"
                >
                  {t("nav.dashboard")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full text-[14px] font-medium text-red-400/80 hover:text-red-400 hover:bg-red-400/10 border border-red-400/10 transition-all"
                >
                  {t("nav.logout")}
                </button>
              </div>
            ) : (
              <HoverAnimationButton 
                onClick={() => navigate("/signup")}
                className="!p-0"
              >
                {t("nav.get_started")}
              </HoverAnimationButton>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        {navLinks.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl font-bold text-white/70 hover:text-white transition-all"
          >
            {item.label}
          </Link>
        ))}
        
        <AnimatedDropdown 
          items={languageOptions} 
          text={t("landing.select_lang")} 
          className="mt-4"
        />

        <HoverAnimationButton 
          onClick={() => {
            setIsMobileMenuOpen(false);
            if (user) {
              handleLogout();
            } else {
              navigate("/signup");
            }
          }}
          className="!p-0 mt-4"
        >
          {user ? t("nav.logout") : t("nav.get_started")}
        </HoverAnimationButton>
        
        {user && (
          <Link
            to="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-xl font-medium text-white/70 hover:text-white transition-all"
          >
            {t("landing.go_dashboard")}
          </Link>
        )}
      </div>
    </nav>
  );
}
