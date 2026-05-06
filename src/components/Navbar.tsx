import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HoverAnimationButton from "@/components/ui/hover-animation-button";
import { Menu, X } from "lucide-react";
import AnimatedDropdown from "@/components/ui/animated-dropdown";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const languages = [
    { name: "English", link: "#" },
    { name: "हिंदी", link: "#" },
    { name: "ಕನ್ನಡ", link: "#" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", to: "/#about" },
    { label: "Features", to: "/#features" },
    { label: "FAQs", to: "/#faqs" },
  ];

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
          <span className="font-bold text-lg tracking-tight uppercase">ScamShield</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          <AnimatedDropdown 
            items={languages} 
            text="EN" 
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
            <HoverAnimationButton 
              onClick={() => navigate("/signup")}
              className="!p-0"
            >
              Get Started
            </HoverAnimationButton>
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
          items={languages} 
          text="Select Language" 
          className="mt-4"
        />

        <HoverAnimationButton 
          onClick={() => {
            setIsMobileMenuOpen(false);
            navigate("/signup");
          }}
          className="!p-0 mt-4"
        >
          Get Started
        </HoverAnimationButton>
      </div>
    </nav>
  );
}
