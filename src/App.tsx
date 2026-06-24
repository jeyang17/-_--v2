import { useState } from 'react';
import { motion } from 'motion/react';
import Header from './components/Header';
import Hobbies from './components/Hobbies';
import Contact from './components/Contact';
import { Sparkles, ArrowDown } from 'lucide-react';

export default function App() {
  const [activeHobby, setActiveHobby] = useState<string>('swimming');

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-ink font-sans relative overflow-x-hidden pb-12">
      
      {/* Google Brand Ambient Glowing Blobs */}
      <div className="absolute top-0 inset-x-0 h-[1000px] pointer-events-none -z-10 overflow-hidden">
        {/* Blue Glow */}
        <motion.div 
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-[#4285F4]/12 rounded-full filter blur-[100px]"
        />
        {/* Red Glow */}
        <motion.div 
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 40, -50, 0],
            scale: [1, 0.85, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-[#EA4335]/10 rounded-full filter blur-[120px]"
        />
        {/* Yellow Glow */}
        <motion.div 
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 60, 0],
            scale: [1, 1.1, 0.85, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-2/4 -left-30 w-80 h-80 bg-[#FBBC05]/10 rounded-full filter blur-[90px]"
        />
        {/* Green Glow */}
        <motion.div 
          animate={{
            x: [0, -20, 30, 0],
            y: [0, 50, -40, 0],
            scale: [1, 1.2, 0.95, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#34A853]/12 rounded-full filter blur-[130px]"
        />
      </div>

      {/* Delicate dot pattern overlay */}
      <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 -z-20 pointer-events-none" />

      {/* Main Content Layout */}
      <div className="relative">
        
        {/* Header Section */}
        <Header 
          activeHobby={activeHobby} 
          onSelectHobby={(hobbyId) => setActiveHobby(hobbyId)} 
        />

        {/* Dynamic Micro Prompt */}
        <div className="w-full flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-ink/40 tracking-wider py-4">
          <ArrowDown className="w-3.5 h-3.5 text-ink/30 animate-bounce" />
          <span>직접 카드를 클릭하거나 아래 빠른 탐색 버튼을 누르세요</span>
        </div>

        {/* Hobbies Interactive Playground */}
        <Hobbies 
          activeHobby={activeHobby} 
          onSelectHobby={(hobbyId) => setActiveHobby(hobbyId)}
        />

        {/* Quick Horizontal Hobby Cards to prompt discovery with Google Palette */}
        <section className="w-full max-w-4xl mx-auto px-6 py-6 grid grid-cols-3 gap-4 select-none">
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveHobby('swimming')}
            className={`cursor-pointer p-5 rounded-2xl border-2 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 shadow-sm ${
              activeHobby === 'swimming' 
                ? 'bg-[#4285F4] text-white border-[#4285F4] shadow-lg shadow-[#4285F4]/30' 
                : 'bg-white hover:bg-slate-50 border-[#E0E0E0] text-ink hover:border-[#4285F4]'
            }`}
          >
            <span className="text-2xl md:text-3xl animate-pulse">🌊</span>
            <span className="text-xs md:text-sm font-black tracking-tight font-display">01 / SWIMMING</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveHobby('guitar')}
            className={`cursor-pointer p-5 rounded-2xl border-2 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 shadow-sm ${
              activeHobby === 'guitar' 
                ? 'bg-[#34A853] text-white border-[#34A853] shadow-lg shadow-[#34A853]/30' 
                : 'bg-white hover:bg-slate-50 border-[#E0E0E0] text-ink hover:border-[#34A853]'
            }`}
          >
            <span className="text-2xl md:text-3xl animate-pulse">🎸</span>
            <span className="text-xs md:text-sm font-black tracking-tight font-display">02 / GUITAR</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveHobby('netflix')}
            className={`cursor-pointer p-5 rounded-2xl border-2 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 shadow-sm ${
              activeHobby === 'netflix' 
                ? 'bg-[#EA4335] text-white border-[#EA4335] shadow-lg shadow-[#EA4335]/30' 
                : 'bg-white hover:bg-slate-50 border-[#E0E0E0] text-ink hover:border-[#EA4335]'
            }`}
          >
            <span className="text-2xl md:text-3xl animate-pulse">🍿</span>
            <span className="text-xs md:text-sm font-black tracking-tight font-display">03 / NETFLIX</span>
          </motion.div>
        </section>

        {/* Contact and Direct Mailto Section */}
        <Contact />

        {/* Sleek Minimalist Footer */}
        <footer className="w-full text-center py-12 mt-10 border-t border-ink/10 max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-xs text-ink/55 font-bold tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#FBBC05] fill-[#FBBC05]" />
              <span>양정은 PORTFOLIO ARCHIVE © 2026.</span>
            </div>
            <p className="text-[10px] font-mono text-ink/40 md:text-right">
              Built with React 19, Google Brand Colors, Web Audio API, Framer Motion.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
