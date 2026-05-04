import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, Coffee, Utensils, Music, Shield, Info, CreditCard } from 'lucide-react';
import { useOdyssey } from '../../hooks/useOdyssey';
import { cn, formatCurrency } from '../../lib/utils';

export default function ProposedItineraryView() {
  const { currentTrip } = useOdyssey();
  const [selectedDay, setSelectedDay] = useState(3);

  const days = [1, 2, 3, 4, 5];

  const events = [
    {
      id: 1,
      time: '09:00 AM',
      title: 'Colosseum Private Access',
      desc: '"As an Elite member, we\'ve secured dawn access before public entry. You\'ll enter through the Gladiator\'s gate directly onto the arena floor."',
      type: 'exclusive',
      active: true
    },
    {
      id: 2,
      time: '01:30 PM',
      title: 'Trattoria Da Danilo',
      desc: '"Personalized Recommendation: You mentioned a love for authentic Carbonara. We have secured a corner table near the window."',
      type: 'dining',
      active: false
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-dark-gradient p-8">
      <header className="mb-12 flex flex-col items-center">
        <h3 className="text-[10px] uppercase tracking-[0.4em] mb-8 text-white/50">Proposed Itinerary</h3>
        <div className="flex gap-2 items-center flex-wrap justify-center">
          {days.map(day => (
            <button 
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "w-20 py-2 text-[10px] uppercase tracking-widest transition-all duration-500 border",
                selectedDay === day 
                  ? "bg-gold text-black-deep border-gold shadow-[0_0_15px_rgba(197,160,89,0.3)] font-bold" 
                  : "bg-white/5 border-white/10 text-white/40 hover:text-white"
              )}
            >
              Day {day}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 space-y-8 pb-32">
        <AnimatePresence mode="popLayout">
          {events.map((event, idx) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "group p-6 relative border-l-2 transition-all duration-500",
                event.active ? "bg-white/5 border-gold" : "bg-white/[0.02] border-white/10 opacity-60"
              )}
            >
              <span className="absolute right-6 top-6 text-[9px] font-sans font-bold text-gold/40 uppercase tracking-widest">
                {event.time}
              </span>
              
              <div className="flex items-center gap-3 mb-3">
                {event.type === 'exclusive' && <Shield size={14} className="text-gold" />}
                {event.type === 'dining' && <Utensils size={14} className="text-gold/60" />}
                <h4 className="text-xl font-display text-white tracking-widest">{event.title}</h4>
              </div>
              
              <p className="text-sm font-serif italic leading-relaxed text-white/70 mb-6 max-w-md">
                {event.desc}
              </p>
              
              <div className="flex gap-6 items-center">
                <button className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-gold border-b border-gold/40 pb-0.5 hover:border-gold transition-all">
                  {event.type === 'exclusive' ? 'Secure Access' : 'See Reservation'}
                </button>
                <button className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-white/20 hover:text-white/40 transition-all">
                  Modification
                </button>
              </div>

              {event.active && (
                <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-1.5 h-1.5 bg-gold rotate-45"></div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Oda Advice Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gold/5 border border-gold/20 p-6 rounded-sm flex gap-5 items-start backdrop-blur-sm relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="w-12 h-12 bg-gold shadow-[0_0_15px_rgba(197,160,89,0.3)] rounded-full flex items-center justify-center text-black-deep font-display font-bold text-xs shrink-0 relative z-10">ODA</div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={12} className="text-gold" />
                  <p className="text-[10px] font-sans font-bold text-gold uppercase tracking-[0.3em]">Proactive Insight</p>
                </div>
                <p className="text-xs leading-relaxed text-white/80 font-serif italic">
                  "Based on the heat forecast for tomorrow, I've moved your Pantheon visit to 7:00 PM when the shadows are longest and the air is cool. I've already updated your transport."
                </p>
            </div>
        </motion.div>
      </div>

      <div className="mt-16 border-t border-gold/10 pt-10 pb-12">
         <div className="flex justify-between items-center bg-black-deep/40 p-6 border border-white/5 rounded-sm">
            <div>
               <p className="text-[10px] text-white/20 uppercase tracking-widest font-sans font-bold mb-1">Total Estimated</p>
               <p className="text-2xl font-display text-gold">$4,850</p>
            </div>
            <button className="bg-gold text-black-deep px-8 py-3 font-display font-bold text-[10px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(197,160,89,0.2)]">
               Reserve Journey
            </button>
         </div>
         <p className="text-[8px] text-center mt-4 text-white/20 uppercase tracking-[0.2em] font-sans">Authorizes Oda to secure all bookings via Vault Card •7742</p>
      </div>
    </div>
  );
}
