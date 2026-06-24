import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, Music, Tv, Volume2, RotateCcw, Play, Star, Sparkles, Award } from 'lucide-react';
import { Recommendation } from '../types';

interface HobbiesProps {
  activeHobby: string | null;
  onSelectHobby: (hobbyId: string) => void;
}

// Netflix Curated List for Jeongeun
const NETFLIX_LIST: Recommendation[] = [
  {
    title: '그 해 우리는 (Our Beloved Summer)',
    genre: '청춘 로맨스 드라마',
    comment: '인생에서 가장 따뜻하고 푸르렀던 시절의 연애 이야기. 아날로그 기타 감성 배경음악과 여름의 청량함이 최고의 조화를 이룹니다.',
    rating: 5,
  },
  {
    title: '인터스텔라 (Interstellar)',
    genre: 'SF · 드라마',
    comment: '시간과 공간, 그리고 중력을 초월하는 가족의 사랑에 관한 우주 대서사시. 한스 짐버의 오르간 선율은 언제 들어도 전율이 돋습니다.',
    rating: 5,
  },
  {
    title: '기묘한 이야기 (Stranger Things)',
    genre: '미스터리 · SF 스릴러',
    comment: '80년대 레트로 감성이 가득 묻어나는 SF 대작. 아이들의 끈끈한 우정과 미지의 세계를 탐험하는 흥미진진한 전개가 최고입니다.',
    rating: 4.8,
  },
  {
    title: '나의 아저씨 (My Mister)',
    genre: '휴먼 · 치유 드라마',
    comment: '삶의 무게를 버텨내는 평범한 사람들의 따뜻한 위로. 깊고 차분한 통기타 선율의 OST가 마음속 깊은 곳을 어루만져 줍니다.',
    rating: 5,
  },
  {
    title: '너의 이름은. (Your Name.)',
    genre: '판타지 애니메이션 · 로맨스',
    comment: '기적 같은 인연과 소중한 기억에 관한 아름다운 이야기. 작화와 색감의 황홀함, 그리고 밴드 래드윔프스(RADWIMPS)의 완벽한 음악까지.',
    rating: 4.9,
  }
];

// Guitar chord structures (Notes frequencies for Web Audio synth)
const CHORDS_DATA = {
  C: {
    name: 'C Major',
    diagram: [
      { string: 1, fret: 0 },
      { string: 2, fret: 1 },
      { string: 3, fret: 0 },
      { string: 4, fret: 2 },
      { string: 5, fret: 3 },
      { string: 6, fret: -1 }, // Muted
    ],
    freqs: [130.81, 164.81, 196.00, 261.63, 329.63] // C3, E3, G3, C4, E4
  },
  G: {
    name: 'G Major',
    diagram: [
      { string: 1, fret: 3 },
      { string: 2, fret: 0 },
      { string: 3, fret: 0 },
      { string: 4, fret: 0 },
      { string: 5, fret: 2 },
      { string: 6, fret: 3 },
    ],
    freqs: [98.00, 123.47, 146.83, 196.00, 246.94, 392.00] // G2, B2, D3, G3, B3, G4
  },
  Am: {
    name: 'A Minor',
    diagram: [
      { string: 1, fret: 0 },
      { string: 2, fret: 1 },
      { string: 3, fret: 2 },
      { string: 4, fret: 2 },
      { string: 5, fret: 0 },
      { string: 6, fret: -1 },
    ],
    freqs: [110.00, 164.81, 220.00, 261.63, 329.63] // A2, E3, A3, C4, E4
  },
  Em: {
    name: 'E Minor',
    diagram: [
      { string: 1, fret: 0 },
      { string: 2, fret: 0 },
      { string: 3, fret: 0 },
      { string: 4, fret: 2 },
      { string: 5, fret: 2 },
      { string: 6, fret: 0 },
    ],
    freqs: [82.41, 123.47, 164.81, 196.00, 246.94, 329.63] // E2, B2, E3, G3, B3, E4
  },
  F: {
    name: 'F Major',
    diagram: [
      { string: 1, fret: 1 },
      { string: 2, fret: 1 },
      { string: 3, fret: 2 },
      { string: 4, fret: 3 },
      { string: 5, fret: 3 },
      { string: 6, fret: 1 },
    ],
    freqs: [87.31, 130.81, 174.61, 220.00, 261.63, 349.23] // F2, C3, F3, A3, C4, F4
  }
};

type ChordKey = keyof typeof CHORDS_DATA;

export default function Hobbies({ activeHobby }: HobbiesProps) {
  // 1. Swimming States
  const [swimProgress, setSwimProgress] = useState(10);
  const [laps, setLaps] = useState(2);
  const [swimCalories, setSwimCalories] = useState(38);
  const [isSplashing, setIsSplashing] = useState(false);

  // 2. Guitar Synth States
  const [selectedChord, setSelectedChord] = useState<ChordKey>('C');
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [isVibrating, setIsVibrating] = useState(false);

  // 3. Netflix States
  const [currentRec, setCurrentRec] = useState<Recommendation>(NETFLIX_LIST[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  // Handle Swimming interaction
  const handleSwimStroke = () => {
    setIsSplashing(true);
    setSwimCalories(prev => prev + Math.floor(Math.random() * 3) + 2);
    
    setSwimProgress(prev => {
      const next = prev + 15;
      if (next >= 100) {
        setLaps(l => l + 1);
        return 5; // wrap around
      }
      return next;
    });

    setTimeout(() => setIsSplashing(false), 400);
  };

  const handleResetSwim = () => {
    setSwimProgress(10);
    setLaps(0);
    setSwimCalories(0);
  };

  // Web Audio Guitar Synth Engine
  const playGuitarChord = (chordKey: ChordKey) => {
    setSelectedChord(chordKey);
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 500);

    let ctx = audioCtx;
    if (!ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      ctx = new AudioCtxClass();
      setAudioCtx(ctx);
    }
    
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const chord = CHORDS_DATA[chordKey];
    
    chord.freqs.forEach((freq, idx) => {
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      const strumDelay = idx * 0.045;
      const now = ctx.currentTime + strumDelay;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(1, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 1.8);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.18, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.3);
    });
  };

  // Handle Netflix Recommendation Spinner
  const spinRecommendation = () => {
    setIsSpinning(true);
    let index = 0;
    
    const interval = setInterval(() => {
      setCurrentRec(NETFLIX_LIST[index % NETFLIX_LIST.length]);
      index++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const randomIndex = Math.floor(Math.random() * NETFLIX_LIST.length);
      setCurrentRec(NETFLIX_LIST[randomIndex]);
      setIsSpinning(false);
    }, 1200);
  };

  return (
    <main className="w-full max-w-4xl mx-auto px-6 py-6 select-none">
      <AnimatePresence mode="wait">
        {/* ==================== 🌊 1. SWIMMING MODULE ==================== */}
        {activeHobby === 'swimming' && (
          <motion.div
            key="swimming"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Bold Google Blue Card Header */}
            <div className="bg-white border border-[#4285F4]/20 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#4285F4]" />
              <span className="text-[10px] font-mono tracking-[0.25em] font-bold text-[#4285F4] mb-2 block uppercase">01 / ACTIVE OCEAN BLUE</span>
              <h2 className="text-3xl md:text-4xl font-black text-ink tracking-tighter leading-none mb-4">
                물과 하나가 될 때 느끼는 온전한 자유, 수영
              </h2>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-serif italic max-w-3xl">
                물살을 가르며 전신으로 흐르는 감각에 집중하다 보면, 마음을 무겁게 누르던 온갖 잡념이 시원하게 씻겨 내려갑니다. 
                숨을 참고 들이마시는 단순한 행위의 정교한 리듬을 속삭일 때, 저만의 온전한 우주가 활짝 열립니다.
              </p>
            </div>

            {/* Interactive Pool Track Sim */}
            <div className="bg-white border border-gray-150 p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-2 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] animate-ping" />
                  [VIRTUAL POOL] 정은의 수영 레인 트랙
                </h3>
                <button 
                  onClick={handleResetSwim}
                  className="p-1.5 border border-gray-200 hover:border-[#4285F4] rounded-xl hover:bg-[#4285F4]/5 text-[#4285F4] transition-all"
                  title="기록 초기화"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Pool Container */}
              <div className="relative w-full h-24 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 rounded-2xl border-2 border-dashed border-[#4285F4]/30 overflow-hidden flex items-center shadow-inner">
                {/* Visual Lane Lines */}
                <div className="absolute top-1/4 left-0 right-0 h-0.5 border-t border-dashed border-[#4285F4]/10" />
                <div className="absolute top-2/4 left-0 right-0 h-0.5 border-t border-dashed border-[#4285F4]/15" />
                <div className="absolute top-3/4 left-0 right-0 h-0.5 border-t border-dashed border-[#4285F4]/10" />

                {/* Swimming Avatar Wrapper */}
                <motion.div
                  animate={{ 
                    x: `${swimProgress}%`,
                    y: isSplashing ? [-5, 5, -5] : 0 
                  }}
                  transition={{ type: "spring", stiffness: 95, damping: 12 }}
                  className="absolute left-0 flex flex-col items-center justify-center -ml-8 z-10"
                >
                  {/* Splash Particle Effect */}
                  {isSplashing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1.1, y: -12 }}
                      className="absolute -top-6 text-[#4285F4] font-black text-[10px] font-mono tracking-widest bg-white border border-[#4285F4]/30 px-2 py-0.5 rounded-full shadow-md"
                    >
                      SPLASH!
                    </motion.div>
                  )}
                  {/* Swimmer Element */}
                  <div className="relative w-12 h-12 bg-white rounded-full border-2 border-[#4285F4] flex items-center justify-center text-xl shadow-[0_4px_10px_rgba(66,133,244,0.3)] cursor-pointer hover:scale-110 transition-transform">
                    🏊‍♀️
                  </div>
                </motion.div>

                {/* Pool Start / End banners */}
                <div className="absolute left-3 text-[9px] font-black tracking-widest text-[#4285F4] font-mono bg-white/80 backdrop-blur-sm border border-[#4285F4]/20 px-2 py-0.5 rounded-full">START</div>
                <div className="absolute right-3 text-[9px] font-black tracking-widest text-[#4285F4] font-mono bg-white/80 backdrop-blur-sm border border-[#4285F4]/20 px-2 py-0.5 rounded-full">LAP END</div>
              </div>

              {/* Pool Actions & Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 items-center">
                <button
                  onClick={handleSwimStroke}
                  className="md:col-span-2 py-4 px-6 rounded-2xl bg-[#4285F4] hover:bg-[#3b7ae0] text-white font-bold uppercase tracking-wider text-xs transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] shadow-md shadow-[#4285F4]/20"
                >
                  <Waves className={`w-4 h-4 ${isSplashing ? 'animate-bounce' : ''}`} />
                  발차기 & 양팔 스트로크 치기!
                </button>

                <div className="bg-[#4285F4]/5 border border-[#4285F4]/10 rounded-2xl p-3 text-center">
                  <div className="text-[10px] font-mono font-bold text-[#4285F4]/75 uppercase tracking-wider">완주한 레인수</div>
                  <div className="text-2xl font-black text-[#4285F4] font-display mt-0.5">{laps} <span className="text-xs font-normal text-stone-500">바퀴</span></div>
                </div>

                <div className="bg-[#4285F4]/5 border border-[#4285F4]/10 rounded-2xl p-3 text-center">
                  <div className="text-[10px] font-mono font-bold text-[#4285F4]/75 uppercase tracking-wider">소모 칼로리</div>
                  <div className="text-2xl font-black text-[#4285F4] font-display mt-0.5">{swimCalories} <span className="text-xs font-normal text-stone-500">kcal</span></div>
                </div>
              </div>

              {/* Tips & fun details */}
              <div className="mt-5 text-xs text-stone-500 flex items-center gap-2 px-1 border-t border-gray-100 pt-4 font-mono">
                <Award className="w-4 h-4 text-[#4285F4] shrink-0" />
                <span>양정은은 주로 <strong className="text-[#4285F4]">평영(Breaststroke)</strong>의 고요한 글라이딩과 <strong className="text-[#4285F4]">자유형(Freestyle)</strong>의 속도감을 애정합니다.</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== 🎸 2. ACOUSTIC GUITAR MODULE ==================== */}
        {activeHobby === 'guitar' && (
          <motion.div
            key="guitar"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Bold Google Green Card Header */}
            <div className="bg-white border border-[#34A853]/20 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#34A853]" />
              <span className="text-[10px] font-mono tracking-[0.25em] font-bold text-[#34A853] mb-2 block uppercase">02 / ACOUSTIC RESONANCE</span>
              <h2 className="text-3xl md:text-4xl font-black text-ink tracking-tighter leading-none mb-4">
                나무 울림통이 자아내는 편안하고 소박한 가사, 통기타
              </h2>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-serif italic max-w-3xl">
                나무 바디에 여섯 줄의 쇠줄. 손가락 끝에 굳은살을 올리며 한 코드씩 짚어 내려갈 때, 일렉기타에서는 느낄 수 없는 고유한 아날로그 감성이 살아납니다. 
                나지막한 통기타 선율에 조용한 허밍을 더하는 주말 오후는 최고의 충전 시간입니다.
              </p>
            </div>

            {/* Interactive Guitar Chord Synth Card */}
            <div className="bg-white border border-gray-150 p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Soundhole Visualizer Left */}
                <div className="flex-1 flex flex-col items-center justify-center bg-stone-50 border border-gray-200/60 p-6 rounded-2xl text-center min-h-[220px]">
                  <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest mb-4">Acoustic Soundhole</span>
                  
                  {/* Animated soundhole body with Swiss/Bold design */}
                  <div className="relative w-36 h-36 rounded-full bg-stone-900 flex items-center justify-center border-4 border-stone-800 shadow-xl">
                    {/* Ring decals */}
                    <div className="absolute w-32 h-32 rounded-full border border-white/10" />
                    <div className="absolute w-28 h-28 rounded-full border-2 border-[#34A853]/20" />
                    
                    {/* Inner hole */}
                    <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center relative overflow-hidden">
                      {/* Guitar Strings */}
                      <div className="absolute inset-x-0 inset-y-0 flex justify-between px-3">
                        {[1, 2, 3, 4, 5, 6].map((str) => (
                          <motion.div
                            key={str}
                            animate={isVibrating ? {
                              x: [0, -2, 2, -1, 1, 0]
                            } : {}}
                            transition={{ duration: 0.4 }}
                            className="h-full bg-[#34A853]/40"
                            style={{ 
                              width: `${0.8 + (6 - str) * 0.4}px`,
                              opacity: 0.8
                            }}
                          />
                        ))}
                      </div>

                      {/* Sparkle notes escaping */}
                      <AnimatePresence>
                        {isVibrating && (
                          <motion.div
                            initial={{ scale: 0.6, opacity: 0, y: 10 }}
                            animate={{ scale: 1.2, opacity: 1, y: -25 }}
                            exit={{ opacity: 0 }}
                            className="absolute text-[#34A853] text-sm font-black pointer-events-none font-mono tracking-widest drop-shadow-md"
                          >
                            STRUM!
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="absolute text-center z-15">
                        <span className="text-2xl font-black text-white tracking-tight font-display">{selectedChord}</span>
                        <div className="text-[8px] text-[#34A853] font-bold uppercase tracking-widest mt-0.5">CHORD</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 mt-4 flex items-center gap-1.5 font-mono">
                    <Volume2 className="w-4 h-4 text-[#34A853]" />
                    코드를 누르고 따뜻한 아날로그 사운드를 연주해 보세요
                  </p>
                </div>

                {/* Interactive Chord Keyboard Right */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-[#34A853] uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#34A853] rounded-full inline-block" />
                    [CHORDS] 코드 선택 & 스트럼 연주
                  </h3>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {(Object.keys(CHORDS_DATA) as ChordKey[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => playGuitarChord(key)}
                        className={`py-3.5 rounded-xl text-center border font-black font-display transition-all duration-200 active:scale-95 ${
                          selectedChord === key 
                            ? 'bg-[#34A853] text-white border-[#34A853] shadow-md shadow-[#34A853]/20 scale-102' 
                            : 'bg-white hover:bg-stone-50 border-gray-200 text-stone-700 hover:border-[#34A853]'
                        }`}
                      >
                        <span className="text-base block">{key}</span>
                        <span className="text-[8px] font-mono opacity-80 block mt-0.5">Strum</span>
                      </button>
                    ))}
                  </div>

                  {/* Chord Diagram Panel */}
                  <div className="bg-[#34A853]/5 rounded-2xl p-4 border border-[#34A853]/15">
                    <div className="text-[10px] font-mono font-bold text-[#34A853] uppercase tracking-wider mb-3">
                      Chord Diagram: {CHORDS_DATA[selectedChord].name}
                    </div>
                    
                    {/* Simple virtual fretboard diagram */}
                    <div className="flex justify-between items-center px-2">
                      <div className="flex gap-2.5">
                        {CHORDS_DATA[selectedChord].diagram.map((item, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-1.5">
                            <span className="text-[8px] font-mono text-stone-500 font-bold">{item.string}번</span>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black border-2 ${
                              item.fret === -1 ? 'bg-transparent text-stone-300 border-gray-200' :
                              item.fret === 0 ? 'bg-white text-[#34A853] border-[#34A853]/30' :
                              'bg-[#34A853] text-white border-[#34A853] shadow-sm'
                            }`}>
                              {item.fret === -1 ? 'X' : item.fret === 0 ? 'O' : item.fret}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-stone-400 flex items-center gap-1.5 font-mono pt-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#34A853] shrink-0" />
                    <span>사용 기술: Web Audio API 합성 오실레이터 탑재</span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== 🍿 3. WATCHING NETFLIX MODULE ==================== */}
        {activeHobby === 'netflix' && (
          <motion.div
            key="netflix"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Bold Google Red Card Header */}
            <div className="bg-white border border-[#EA4335]/20 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#EA4335]" />
              <span className="text-[10px] font-mono tracking-[0.25em] font-bold text-[#EA4335] mb-2 block uppercase">03 / CINEMATIC RETREAT</span>
              <h2 className="text-3xl md:text-4xl font-black text-ink tracking-tighter leading-none mb-4">
                새로운 세상의 시선을 경험하는 소통 창구, 넷플릭스
              </h2>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-serif italic max-w-3xl">
                좋은 컨텐츠는 가상의 이야기가 아니라 창작자의 깊은 시선이라고 믿습니다. 
                스크린 너머 광활한 우주 대서사시, 따스하고 푸른 청춘 로맨스에 깊이 몰입하고 나면, 
                제가 서 있는 일상 또한 한층 다채롭고 아름다운 색감으로 물들어갑니다.
              </p>
            </div>

            {/* Curated Recommendation Showroom */}
            <div className="bg-white border border-gray-150 p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-2 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] animate-pulse" />
                  [CURATED] 정은의 보물창고 인생 영화·드라마
                </h3>
                
                <button
                  onClick={spinRecommendation}
                  disabled={isSpinning}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#EA4335] hover:bg-[#c93326] disabled:bg-stone-300 text-white transition-all shadow-md shadow-[#EA4335]/20 flex items-center gap-1.5 font-mono"
                >
                  <Play className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                  SPIN RECOMMENDATION
                </button>
              </div>

              {/* Dynamic Curated Showroom Panel with Luxurious Cinematic Colors */}
              <div className="relative min-h-[220px] bg-gradient-to-br from-stone-900 via-stone-950 to-[#2E1216] text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 overflow-hidden border border-[#EA4335]/20 shadow-xl">
                {/* Decorative glowing back light */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#EA4335]/15 rounded-full filter blur-[50px] pointer-events-none" />

                {/* Cine ticket detail left */}
                <div className="flex-1 space-y-3 relative z-10 flex flex-col justify-center text-left">
                  <span className="px-2.5 py-1 text-[9px] font-mono font-bold tracking-widest bg-white/10 text-[#EA4335] self-start border border-[#EA4335]/40 rounded-full">
                    {currentRec.genre}
                  </span>
                  
                  <h4 className="text-2xl md:text-3xl font-black text-white font-display tracking-tight leading-none">
                    {currentRec.title}
                  </h4>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="w-4 h-4 fill-current" 
                        style={{ opacity: star <= Math.floor(currentRec.rating) ? 1 : 0.3 }}
                      />
                    ))}
                    <span className="text-xs text-stone-400 font-medium ml-1">({currentRec.rating})</span>
                  </div>

                  <p className="text-sm md:text-base text-stone-300 italic leading-relaxed pt-3 border-t border-white/10 font-serif">
                    &ldquo;{currentRec.comment}&rdquo;
                  </p>
                </div>

                {/* Decorative Cine Frame right */}
                <div className="w-full md:w-52 h-44 md:h-auto bg-stone-900/80 backdrop-blur-sm border border-stone-800 rounded-xl flex flex-col items-center justify-center p-4 text-center relative overflow-hidden shrink-0">
                  <div className="text-[10px] font-mono font-bold text-[#EA4335] uppercase tracking-widest mb-1">CINE SELECTION</div>
                  <div className="text-4xl my-2 animate-bounce">🍿</div>
                  <div className="text-[9px] text-stone-400 font-mono tracking-wider">JEONGEUN FAVORITE LIST</div>
                  <div className="absolute top-2 left-2 flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
