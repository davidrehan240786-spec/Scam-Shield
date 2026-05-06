import { ShieldAlert, KeyRound, Smartphone, Briefcase, Trophy, UserRound } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
      title: "Phishing Attacks",
      description: "Learn to spot fake emails and websites that steal your login credentials and personal information."
    },
    {
      icon: <KeyRound className="w-6 h-6 text-yellow-400" />,
      title: "OTP Fraud",
      description: "Understand why you should never share your One-Time Password, even with someone claiming to be from your bank."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
      title: "UPI Scams",
      description: "Protect your digital payments. Learn about collect requests and QR code scams common in digital wallets."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-blue-400" />,
      title: "Job Scams",
      description: "Identify fake job offers that ask for 'security deposits' or 'processing fees' before you start working."
    },
    {
      icon: <Trophy className="w-6 h-6 text-purple-400" />,
      title: "Lottery Scam",
      description: "If it sounds too good to be true, it is. Spot fake prize notifications designed to trick you into paying taxes."
    },
    {
      icon: <UserRound className="w-6 h-6 text-pink-400" />,
      title: "Social Media Hacks",
      description: "Secure your accounts with 2FA and learn how hackers use social engineering to take over your profile."
    }
  ];

  return (
    <section className="py-32 px-6" id="features">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full glass border-white/10 text-[12px] font-medium text-white/50 mb-6 uppercase tracking-wider">
            ● Learning Hub
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">Stay One Step Ahead</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="group glass p-10 rounded-[2.5rem] hover:-translate-y-[6px] hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-300 relative overflow-hidden animate-on-scroll"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-3xl font-bold mb-4">{f.title}</h3>
              <p className="text-brand-text-secondary leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
