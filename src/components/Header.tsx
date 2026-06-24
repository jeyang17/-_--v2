import { motion } from 'motion/react';
import { Sparkles, MapPin, Calendar, Heart } from 'lucide-react';

interface HeaderProps {
  activeHobby: string | null;
  onSelectHobby: (hobbyId: string) => void;
}

export default function Header({ activeHobby, onSelectHobby }: HeaderProps) {
  return (
    <header className="relative w-full max-w-4xl mx-auto pt-10 pb-6 px-6 select-none text-left">
      {/* Google Brand Top Colored Ribbon */}
      <div className="w-full h-[5px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] rounded-full mb-6 shadow-sm" />

      {/* Top Editorial Ribbon */}
      <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-150">
        <div className="space-y-1">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-ink/50">Google-Themed Portfolio / 2026</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-ink/50">Seoul, South Korea</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Massive Bold Heading & Tagline */}
        <div className="relative flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black leading-none tracking-tighter mb-4 relative">
              {/* Individual Korean letters styled with Google Brand Colors! */}
              <motion.span whileHover={{ scale: 1.1 }} className="inline-block text-[#4285F4] transition-transform cursor-pointer">양</motion.span>
              <motion.span whileHover={{ scale: 1.1 }} className="inline-block text-[#EA4335] transition-transform cursor-pointer">정</motion.span>
              <motion.span whileHover={{ scale: 1.1 }} className="inline-block text-[#FBBC05] transition-transform cursor-pointer">은</motion.span>
              <span className="text-[#34A853] font-bold">.</span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#4285F4] border border-[#4285F4]/30 px-2 py-0.5 rounded-full absolute top-0 ml-2">GOOGLE ARTIST</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl font-serif italic text-stone-700 border-l-4 border-[#4285F4] pl-5 py-1.5 my-4 bg-white shadow-sm rounded-r-2xl max-w-xl"
          >
            "물살을 가르고, 선율을 타며, 이야기를 수집하는 사람"
          </motion.div>
        </div>

        {/* Custom Mini Initials Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="relative inline-block self-start md:self-end shrink-0"
        >
          <div className="relative w-24 h-24 rounded-2xl border-2 border-gray-200 bg-white p-1.5 flex items-center justify-center shadow-lg">
            <div className="w-full h-full rounded-xl bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05] text-white flex flex-col items-center justify-center font-display relative overflow-hidden shadow-inner">
              <span className="text-2xl font-black tracking-tighter">JE</span>
              <span className="text-[9px] font-bold tracking-widest opacity-90 font-sans">양정은</span>
            </div>
          </div>
          
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className={`absolute -bottom-2 -right-2 border text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold tracking-wider shadow-md text-white ${
              activeHobby === 'swimming' ? 'bg-[#4285F4] border-[#4285F4]' :
              activeHobby === 'guitar' ? 'bg-[#34A853] border-[#34A853]' :
              activeHobby === 'netflix' ? 'bg-[#EA4335] border-[#EA4335]' :
              'bg-[#FBBC05] border-[#FBBC05]'
            }`}
          >
            {activeHobby === 'swimming' ? '🌊 SWIMMING' :
             activeHobby === 'guitar' ? '🎸 GUITAR' :
             activeHobby === 'netflix' ? '🍿 NETFLIX' :
             '✨ ACTIVE'}
          </motion.span>
        </motion.div>
      </div>

      {/* Sub Info Tags Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-wrap items-center gap-3 mt-8 text-xs font-mono text-ink/75 font-medium"
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#4285F4]/20 bg-white rounded-full shadow-sm hover:border-[#4285F4] transition-colors">
          <MapPin className="w-3.5 h-3.5 text-[#4285F4]" />
          <span>대한민국</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#34A853]/20 bg-white rounded-full shadow-sm hover:border-[#34A853] transition-colors">
          <Calendar className="w-3.5 h-3.5 text-[#34A853]" />
          <span>취미 수집가</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#EA4335]/20 bg-white rounded-full shadow-sm hover:border-[#EA4335] transition-colors">
          <Heart className="w-3.5 h-3.5 text-[#EA4335]" />
          <span>수영 · 통기타 · 넷플릭스</span>
        </div>
      </motion.div>

      {/* Elegant minimalist Navigation tab row with color-coded markers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-10 flex items-center border-b border-gray-200"
      >
        <button
          onClick={() => onSelectHobby('swimming')}
          className={`px-5 py-3 text-xs uppercase tracking-widest font-black font-mono transition-all relative ${
            activeHobby === 'swimming' ? 'text-[#4285F4]' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          01 / 🌊 수영
          {activeHobby === 'swimming' && (
            <motion.div layoutId="activeTabBorder" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#4285F4] rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => onSelectHobby('guitar')}
          className={`px-5 py-3 text-xs uppercase tracking-widest font-black font-mono transition-all relative ${
            activeHobby === 'guitar' ? 'text-[#34A853]' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          02 / 🎸 통기타
          {activeHobby === 'guitar' && (
            <motion.div layoutId="activeTabBorder" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#34A853] rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => onSelectHobby('netflix')}
          className={`px-5 py-3 text-xs uppercase tracking-widest font-black font-mono transition-all relative ${
            activeHobby === 'netflix' ? 'text-[#EA4335]' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          03 / 🍿 넷플릭스
          {activeHobby === 'netflix' && (
            <motion.div layoutId="activeTabBorder" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EA4335] rounded-t-full" />
          )}
        </button>
      </motion.div>
    </header>
  );
}

