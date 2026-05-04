import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Hotel, Compass, Calendar, ArrowRight, ArrowLeft, DollarSign } from 'lucide-react';
import { useOdyssey } from '../../hooks/useOdyssey';
import { cn } from '../../lib/utils';

type Step = 'where' | 'stay' | 'do' | 'when' | 'price';

const STEPS: Step[] = ['where', 'stay', 'do', 'when', 'price'];

export default function WorkflowView({ onComplete }: { onComplete: () => void }) {
  const { updateTrip, currentTrip } = useOdyssey();
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = STEPS[stepIndex];

  const handleNext = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const setTripData = (data: any) => {
    updateTrip(data);
  };

  return (
    <div className="h-full flex flex-col p-8 pt-10 bg-dark-gradient">
      {/* Progress */}
      <div className="flex justify-between mb-12 gap-2">
        {STEPS.map((s, i) => (
          <div 
            key={s} 
            className={cn(
              "h-0.5 flex-1 transition-all duration-700",
              i <= stepIndex ? "bg-gold shadow-[0_0_8px_rgba(197,160,89,0.5)]" : "bg-white/10"
            )}
          />
        ))}
      </div>

      <div className="flex-1 overflow-y-auto relative no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 pb-4"
          >
            {currentStep === 'where' && (
              <div className="space-y-8">
                <header>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2">Step I</p>
                  <h3 className="text-3xl font-display text-white mb-2 leading-none uppercase tracking-tighter italic">Destination</h3>
                  <p className="text-white/40 font-serif italic text-sm">Where does your shadow wish to fall?</p>
                </header>
                <div className="relative group">
                  <textarea 
                    placeholder="Describe your ideal location or name a specific city..." 
                    className="w-full h-40 p-6 rounded-sm border border-white/10 bg-black-deep/40 focus:border-gold/40 outline-none transition-all font-serif italic text-sm resize-none leading-relaxed text-white/80"
                    value={currentTrip?.destination || ''}
                    onChange={(e) => setTripData({ destination: e.target.value })}
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gold group-focus-within:w-full transition-all duration-1000"></div>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {['Santorini', 'Kyoto', 'Amalfi Coast', 'Reykjavik'].map(city => (
                    <button 
                      key={city}
                      onClick={() => setTripData({ destination: city })}
                      className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-white/20 hover:text-gold transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'stay' && (
              <div className="space-y-8">
                <header>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2">Step II</p>
                  <h3 className="text-3xl font-display text-white mb-2 leading-none uppercase tracking-tighter italic">Sanctuary</h3>
                  <p className="text-white/40 font-serif italic text-sm">Find your place among the architecture.</p>
                </header>
                <div className="relative group">
                  <textarea 
                    placeholder="Tell Oda about your ideal stay... A cliffside villa? A historic ryokan? A minimalist penthouse?" 
                    className="w-full h-40 p-6 rounded-sm border border-white/10 bg-black-deep/40 focus:border-gold/40 outline-none transition-all font-serif italic text-sm resize-none leading-relaxed text-white/80"
                    value={currentTrip?.lodgingPreference || ''}
                    onChange={(e) => setTripData({ lodgingPreference: e.target.value })}
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gold group-focus-within:w-full transition-all duration-1000"></div>
                </div>
              </div>
            )}

            {currentStep === 'do' && (
              <div className="space-y-8">
                <header>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2">Step III</p>
                  <h3 className="text-3xl font-display text-white mb-2 leading-none uppercase tracking-tighter italic">Exploration</h3>
                  <p className="text-white/40 font-serif italic text-sm">Define the rhythm of your day.</p>
                </header>
                <div className="relative group">
                  <textarea 
                    placeholder="What activities call to you? Private gallery tours, deep-sea fishing, or perhaps total isolation?" 
                    className="w-full h-40 p-6 rounded-sm border border-white/10 bg-black-deep/40 focus:border-gold/40 outline-none transition-all font-serif italic text-sm resize-none leading-relaxed text-white/80"
                    value={currentTrip?.activityPreference || ''}
                    onChange={(e) => setTripData({ activityPreference: e.target.value })}
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gold group-focus-within:w-full transition-all duration-1000"></div>
                </div>
              </div>
            )}

            {currentStep === 'when' && (
              <div className="space-y-6">
                <header>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2">Step IV</p>
                  <h3 className="text-3xl font-display text-white mb-2 leading-none uppercase tracking-tighter italic">Chronology</h3>
                  <p className="text-white/40 font-serif italic text-sm">Choose your departure window.</p>
                </header>
                <div className="bg-black-deep/60 p-6 rounded-sm luxury-shadow border border-white/10 backdrop-blur-md">
                   <div className="flex flex-col gap-6">
                      <div className="flex justify-between items-center px-1">
                        <span className="font-display uppercase text-[10px] tracking-[0.3em] text-gold">May 2026</span>
                        <Calendar size={16} className="text-white/40" />
                      </div>
                      <div className="grid grid-cols-7 gap-2 text-center text-[8px] text-white/20 uppercase tracking-widest mb-1 font-sans font-bold">
                        {['M','T','W','T','F','S','S'].map(d => <div key={d}>{d}</div>)}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({length: 31}, (_, i) => i + 1).map(d => {
                          const date = `2026-05-${d.toString().padStart(2, '0')}`;
                          const isStart = currentTrip?.startDate === date;
                          const isEnd = currentTrip?.endDate === date;
                          const inRange = currentTrip?.startDate && currentTrip?.endDate && 
                                          date > currentTrip.startDate && date < currentTrip.endDate;
                          
                          return (
                            <button 
                              key={d} 
                              onClick={() => {
                                if (!currentTrip?.startDate || (currentTrip.startDate && currentTrip.endDate)) {
                                  setTripData({ startDate: date, endDate: undefined });
                                } else if (date > currentTrip.startDate) {
                                  setTripData({ endDate: date });
                                } else {
                                  setTripData({ startDate: date, endDate: undefined });
                                }
                              }}
                              className={cn(
                                "aspect-square rounded-sm flex items-center justify-center text-xs transition-all duration-300 font-sans",
                                (isStart || isEnd) ? "bg-gold text-black-deep font-bold shadow-[0_0_10px_rgba(197,160,89,0.4)] scale-110 z-10" : 
                                inRange ? "bg-gold/20 text-gold" :
                                "text-white/40 hover:bg-white/5 hover:text-white"
                              )}
                            >
                              {d}
                            </button>
                          );
                        })}
                      </div>
                   </div>
                </div>
                <button 
                  onClick={() => setTripData({ startDate: undefined, endDate: undefined })}
                  className="w-full text-[10px] font-bold text-gold/40 uppercase tracking-[0.4em] py-4 border border-gold/10 hover:border-gold/40 transition-colors"
                >
                    Leave dates open
                </button>
              </div>
            )}

            {currentStep === 'price' && (
              <div className="space-y-12">
                <header>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2">Step V</p>
                  <h3 className="text-3xl font-display text-white mb-2 leading-none uppercase tracking-tighter italic">Investment</h3>
                  <p className="text-white/40 font-serif italic text-sm">Establish your tier of exploration.</p>
                </header>
                <div className="px-4">
                  <div className="flex justify-between mb-8">
                    {[1, 2, 3, 4, 5].map(lvl => (
                      <div key={lvl} className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-500",
                        (currentTrip?.budgetLevel || 3) >= lvl ? "text-gold" : "text-white/10"
                      )}>
                        <div className="flex gap-px mb-2">
                           {Array.from({length: lvl}).map((_, i) => <DollarSign key={i} size={12} />)}
                        </div>
                        <div className={cn("w-1 h-1 rounded-full", (currentTrip?.budgetLevel || 3) >= lvl ? "bg-gold animate-pulse" : "bg-white/5")}></div>
                      </div>
                    ))}
                  </div>
                  <div className="relative">
                    <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      step="1"
                      className="w-full accent-gold h-0.5 bg-white/10 rounded-full appearance-none outline-none mb-12 hover:bg-white/20 transition-colors"
                      value={currentTrip?.budgetLevel || 3}
                      onChange={(e) => setTripData({ budgetLevel: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="mt-8 text-center bg-black-deep/60 p-8 border border-white/5 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gold/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 pointer-events-none"></div>
                    <p className="font-display tracking-[0.4em] text-[9px] mb-4 uppercase text-gold/60 relative z-10">Selected Tier</p>
                    <p className="font-serif italic text-2xl text-white relative z-10">{['Nomadic', 'Traveler', 'Voyager', 'Diplomat', 'Ambassador'][ (currentTrip?.budgetLevel || 3) - 1 ]}</p>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Controls */}
      <div className="flex gap-4 pt-12 items-center">
        {stepIndex > 0 && (
          <button 
            onClick={handleBack}
            className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/40 hover:text-gold hover:border-gold/40 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <button 
          onClick={handleNext}
          className="flex-1 border border-gold text-gold p-4 flex items-center justify-center gap-4 group luxury-shadow hover:bg-gold hover:text-black transition-all duration-500 uppercase text-xs tracking-[0.3em] font-display font-bold"
        >
          <span>
            {stepIndex === STEPS.length - 1 ? "Initialize Expedition" : "Next Step"}
          </span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function SelectionCard({ title, selected, onClick }: { title: string, selected?: boolean, onClick?: () => void, key?: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-5 border transition-all duration-500 text-left relative overflow-hidden group h-28 flex flex-col justify-between",
        selected 
          ? "border-gold bg-[#0A1428] shadow-[0_0_15px_rgba(197,160,89,0.2)]" 
          : "border-white/5 bg-white/5 hover:border-gold/20"
      )}
    >
      <div className={cn(
        "transition-transform duration-700",
        selected ? "translate-x-0" : "translate-x-full opacity-0"
      )}>
        <div className="w-1.5 h-1.5 bg-gold rotate-45"></div>
      </div>
      <span className={cn(
        "font-display tracking-[0.2em] uppercase text-[10px] z-10",
        selected ? "text-gold" : "text-white/40 group-hover:text-white/60"
      )}>
        {title}
      </span>
    </button>
  );
}

function SelectionListItem({ title, desc, icon, selected, onClick }: { title: string, desc: string, icon: React.ReactNode, selected: boolean, onClick: () => void, key?: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-5 p-5 border transition-all duration-500 text-left",
        selected 
          ? "border-gold bg-[#0A1428]" 
          : "border-white/5 bg-white/5 hover:border-gold/20"
      )}
    >
      <div className={cn(
        "p-3 transition-all duration-500",
        selected ? "text-gold border border-gold/40" : "text-white/20 border border-white/10"
      )}>
        {icon}
      </div>
      <div>
        <p className={cn(
          "font-display tracking-[0.2em] uppercase text-[10px]",
          selected ? "text-gold" : "text-white/60"
        )}>{title}</p>
        <p className={cn(
          "text-[10px] font-serif italic mt-0.5",
          selected ? "text-white/40" : "text-white/20"
        )}>{desc}</p>
      </div>
      {selected && (
        <div className="ml-auto w-1 h-1 bg-gold rounded-full shadow-[0_0_8px_#C5A059]"></div>
      )}
    </button>
  );
}
