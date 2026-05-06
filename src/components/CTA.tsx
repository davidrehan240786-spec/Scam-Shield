import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass p-8 sm:p-16 md:p-32 rounded-[2rem] sm:rounded-[4rem] overflow-hidden text-center group"
        >
          {/* Gradient Corner Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-red-500/20 via-blue-500/10 to-transparent blur-[120px] -z-10 group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 md:mb-10 leading-tight">
              Be prepared. Stay informed. <br className="hidden sm:block" /> Secure your future.
            </h2>
            <p className="text-lg sm:text-xl text-white/50 mb-10 md:mb-14 leading-relaxed">
              Join thousands of users who trust ScamShield for secure, instant protection against digital fraud.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/signup" className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] text-center">
                Start Using ScamShield
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
