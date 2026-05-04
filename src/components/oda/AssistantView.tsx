import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Music, Navigation, Shield, User, Info, Volume2, Mic } from 'lucide-react';
import { askOda } from '../../lib/gemini';
import { useOdyssey } from '../../hooks/useOdyssey';
import { cn } from '../../lib/utils';

interface Message {
  role: 'user' | 'oda';
  text: string;
  type?: 'text' | 'action' | 'audio_tour';
}

export default function AssistantView() {
  const { currentTrip } = useOdyssey();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'oda', text: "Greetings, I am Oda. Your dedicated agent for this expedition. How may I assist your traversal today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const odysseyContext = {
        destination: currentTrip?.destination,
        budget: currentTrip?.budgetLevel,
        status: currentTrip?.status
    };

    const odaResponse = await askOda(input, odysseyContext);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'oda', text: odaResponse }]);
  };

  const startAudioTour = () => {
    setMessages(prev => [...prev, { 
      role: 'oda', 
      text: "Initializing Geolocation Audio Tour for your current coordinates. I will now guide your path. Please ensure your earpieces are secure.",
      type: 'audio_tour'
    }]);
  };

  return (
    <div className="flex flex-col h-full bg-navy-dark relative">
      {/* Voice Visualization Background */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-black-deep pointer-events-none overflow-hidden opacity-20">
         <div className="flex items-center justify-around h-full px-12">
            {[...Array(12)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ height: ['10%', '60%', '20%', '80%', '10%'] }}
                transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 bg-gold rounded-full opacity-40 shadow-[0_0_8px_rgba(197,160,89,0.3)]"
              />
            ))}
         </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 pb-32">
        {messages.map((msg, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={idx}
            className={cn(
              "flex gap-4",
              msg.role === 'user' ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-display border transition-all duration-700",
              msg.role === 'user' ? "bg-white/5 text-white/50 border-white/10" : "bg-gold text-black-deep border-gold shadow-[0_0_15px_rgba(197,160,89,0.3)]"
            )}>
              {msg.role === 'user' ? <User size={16}/> : <span className="font-bold">ODA</span>}
            </div>
            <div className={cn(
              "max-w-[80%] p-6 rounded-sm text-sm leading-relaxed relative",
              msg.role === 'user' 
                ? "bg-white/5 border border-white/10 text-white font-sans rounded-tr-none" 
                : "bg-gold/5 border border-gold/20 text-white font-serif italic text-[13px] rounded-tl-none"
            )}>
              {msg.text}
              
              {msg.type === 'audio_tour' && (
                <div className="mt-6 p-4 border border-gold/30 bg-gold/10 flex items-center gap-4 group">
                   <div className="w-10 h-10 border border-gold/40 flex items-center justify-center bg-black-deep">
                      <Volume2 size={20} className="text-gold animate-pulse" />
                   </div>
                   <div className="flex-1">
                      <p className="text-[9px] font-display uppercase tracking-[0.3em] text-gold mb-2">Live Audio Guide Active</p>
                      <div className="h-0.5 bg-gold/10 rounded-full overflow-hidden">
                         <motion.div animate={{ x: ['100%', '-100%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="w-1/2 h-full bg-gold shadow-[0_0_8px_#C5A059]" />
                      </div>
                   </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-gold border border-gold flex items-center justify-center animate-pulse text-black-deep font-bold text-[10px]">ODA</div>
             <div className="bg-white/5 p-5 rounded-sm flex gap-1.5 items-center border border-white/10">
                <span className="w-1 h-1 bg-gold rounded-full animate-bounce" />
                <span className="w-1 h-1 bg-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1 h-1 bg-gold rounded-full animate-bounce [animation-delay:0.4s]" />
             </div>
          </div>
        )}
      </div>

      {/* Suggested Actions */}
      <div className="px-8 mb-6 flex gap-3 overflow-x-auto no-scrollbar">
         {[
           { label: "Start Audio Tour", icon: <Navigation size={12}/>, action: startAudioTour },
           { label: "Safety Protocols", icon: <Shield size={12}/>, action: () => {} },
           { label: "Cultural Etiquette", icon: <Info size={12}/>, action: () => {} }
         ].map((btn, i) => (
           <button 
             key={i}
             onClick={btn.action}
             className="whitespace-nowrap bg-black-deep/40 border border-gold/20 px-5 py-2.5 rounded-sm text-[10px] uppercase font-display tracking-[0.2em] text-gold/60 flex items-center gap-3 hover:bg-gold hover:text-black-deep hover:border-gold transition-all duration-500 shadow-lg"
           >
              {btn.icon} {btn.label}
           </button>
         ))}
      </div>

      {/* Input Bar */}
      <div className="p-8 pt-0">
        <div className="bg-black-deep/60 border border-gold/30 rounded-sm p-1.5 pl-6 flex items-center gap-3 luxury-shadow backdrop-blur-md">
          <input 
            type="text" 
            placeholder="Address Oda..."
            className="flex-1 bg-transparent outline-none text-sm font-serif italic text-white placeholder:text-white/20"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="p-3 text-white/20 hover:text-gold transition-colors">
             <Mic size={18} />
          </button>
          <button 
            onClick={handleSend}
            className="w-12 h-12 bg-gold text-black-deep rounded-sm flex items-center justify-center hover:brightness-110 transition-all active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
