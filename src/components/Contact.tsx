import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Copy, Check, Send, Sparkles, MessageSquare } from 'lucide-react';

export default function Contact() {
  const email = 'jeyang17@gmail.com';
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedStamp, setSelectedStamp] = useState('☕');

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stamps = ['☕', '🌊', '🎸', '🍿', '🍀', '✨'];

  // Compiles and triggers a real mailto link with structured client-side body!
  const handleSubmitMail = (e: FormEvent) => {
    e.preventDefault();
    if (!message) return;

    const subject = encodeURIComponent(`[양정은 자기소개 페이지] ${name || '방문자'}님의 메시지 ${selectedStamp}`);
    const body = encodeURIComponent(
      `안녕하세요 양정은님!\n\n${message}\n\n보낸 사람: ${name || '익명의 방문자'}\n선택한 스탬프: ${selectedStamp}\n\n---\n자기소개 페이지에서 발송됨`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-6 select-none">
      {/* High-Impact Cinematic Google-Themed Card Container */}
      <div className="bg-gradient-to-tr from-[#1F2023] via-[#2F3036] to-[#1F2023] text-white p-6 md:p-10 shadow-2xl rounded-3xl relative overflow-hidden border border-[#4285F4]/15">
        
        {/* Google Colorful Glow Background Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#4285F4]/10 via-[#EA4335]/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-[#34A853]/10 via-[#FBBC05]/5 to-transparent rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-white text-[10px] font-mono font-bold tracking-[0.25em] uppercase rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" />
              CONTACT ME
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white leading-none tracking-tighter">
              새로운 물결을 <br className="hidden md:inline" />함께 만들어요
            </h2>

            <p className="text-sm text-stone-300 font-serif italic leading-relaxed">
              수영, 통기타 연주, 영화 분석 등 흥미로운 일상에 관해 함께 이야기 나누고 싶다면 언제든 편하게 연락해 주세요.
            </p>

            <div className="pt-4 space-y-3">
              <div className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#4285F4] rounded-full" />
                직접 이메일 보내기
              </div>
              
              {/* Clipboard Action Row */}
              <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-sm p-3.5 rounded-2xl border border-white/5 shadow-inner">
                <Mail className="w-4.5 h-4.5 text-stone-400 shrink-0" />
                <span className="text-xs font-mono text-stone-100 select-all truncate">
                  {email}
                </span>

                <div className="ml-auto flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-xl hover:bg-white/10 text-stone-400 hover:text-white transition-all border border-transparent hover:border-white/10"
                    title="이메일 주소 복사"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#34A853]" /> : <Copy className="w-4 h-4" />}
                  </button>
                  
                  <a
                    href={`mailto:${email}`}
                    className="p-2 rounded-xl hover:bg-white/10 text-stone-400 hover:text-white transition-all border border-transparent hover:border-white/10"
                    title="기본 메일 앱 열기"
                  >
                    <Send className="w-4 h-4 text-[#4285F4]" />
                  </a>
                </div>
              </div>
              
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[11px] text-[#34A853] font-mono tracking-wide pl-1"
                  >
                    ✓ 이메일 주소가 클립보드에 복사되었습니다!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Direct Message Form Panel */}
          <div className="lg:col-span-7 bg-white text-ink p-6 md:p-8 rounded-3xl border border-gray-150 shadow-2xl">
            <h3 className="text-xs font-mono font-black text-ink uppercase tracking-wider mb-5 flex items-center gap-1.5 border-b border-gray-100 pb-3">
              <MessageSquare className="w-4 h-4 text-[#4285F4]" />
              간편 메시지 작성 후 Gmail 보내기
            </h3>

            <form onSubmit={handleSubmitMail} className="space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wide">보내시는 분 성함</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full bg-stone-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-ink focus:outline-none focus:border-[#4285F4] focus:bg-white transition-all font-sans font-medium"
                  />
                </div>
                
                {/* Stamp selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wide">메시지 스탬프</label>
                  <div className="flex items-center gap-1 bg-stone-50 border border-gray-200 rounded-xl p-1 justify-around">
                    {stamps.map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setSelectedStamp(st)}
                        className={`w-7 h-7 flex items-center justify-center text-xs transition-all rounded-lg font-mono ${
                          selectedStamp === st ? 'bg-ink text-white scale-105 font-black shadow-md' : 'hover:bg-gray-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wide">메시지 본문 (필수)</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="양정은님 안녕하세요! 자기소개 웹사이트를 보고 연락 드립니다..."
                  className="w-full bg-stone-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-ink focus:outline-none focus:border-[#EA4335] focus:bg-white transition-all font-sans font-medium resize-none"
                />
              </div>

              {/* Google Brand Gradient Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] hover:opacity-95 text-white font-sans font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-red-500/10"
              >
                <Mail className="w-4 h-4" />
                Gmail 작성 화면 열기
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

