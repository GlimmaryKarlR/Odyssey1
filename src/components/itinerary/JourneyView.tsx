import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plane, Hotel, Star, Clock, MapPin, CheckCircle2, Navigation } from 'lucide-react';
import { useOdyssey } from '../../hooks/useOdyssey';
import { cn } from '../../lib/utils';

export default function JourneyView({ onNext }: { onNext: () => void }) {
  const { currentTrip } = useOdyssey();
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);
  const [selectedStay, setSelectedStay] = useState<number | null>(null);

  const flights = [
    { id: 1, provider: 'Emirates', time: '14:20 - 08:30', duration: '12h 10m', type: 'Nonstop', price: 1240 },
    { id: 2, provider: 'Qatar Airways', time: '11:00 - 23:45', duration: '16h 45m', type: '1 Stop (DOH)', price: 980 },
    { id: 3, provider: 'Singapore Airlines', time: '22:15 - 19:20', duration: '15h 05m', type: 'Nonstop', price: 1450 }
  ];

  const stays = [
    { 
      id: 1, 
      name: 'Aman Tokyo', 
      desc: 'Architectural masterpiece with panoramic city views', 
      price: 1800, 
      rating: 4.9, 
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      id: 2, 
      name: 'Park Hyatt', 
      desc: 'Sleek luxury in the heart of Shinjuku', 
      price: 1200, 
      rating: 4.8, 
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      id: 3, 
      name: 'Hoshinoya', 
      desc: 'A modern ryokan experience in the capital', 
      price: 1500, 
      rating: 5.0, 
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800' 
    }
  ];

  const canContinue = selectedFlight !== null && selectedStay !== null;

  return (
    <div className="p-8 space-y-12 bg-dark-gradient">
      <header>
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2">Refinement</p>
        <h2 className="text-3xl font-display text-white mb-2 leading-none uppercase tracking-tighter italic">Assemble Journey</h2>
        <p className="text-white/40 font-serif italic text-sm">Fine-tuning the details for {currentTrip?.destination || 'your destination'}.</p>
      </header>

      {/* Flight Selection */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-gold">
          <Plane size={16} />
          <h3 className="font-display text-[10px] tracking-[0.3em] uppercase">Aviation Options</h3>
        </div>
        <div className="space-y-4">
          {flights.map(f => (
            <div 
              key={f.id}
              className={cn(
                "bg-black-deep/40 rounded-sm p-6 border transition-all duration-500",
                selectedFlight === f.id ? "border-gold shadow-[0_0_15px_rgba(197,160,89,0.2)]" : "border-white/5 hover:border-gold/20"
              )}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-sans font-bold text-gold/60 uppercase tracking-widest mb-1">{f.provider}</p>
                  <p className="text-xl font-display text-white">{f.time}</p>
                </div>
                <div className="text-right">
                   <p className="text-gold font-display text-xl">${f.price}</p>
                   <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-sans font-bold">{f.type}</p>
                </div>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-sm">
                <div className="text-[9px] text-white/40 uppercase tracking-[0.2em] flex items-center gap-2 font-sans font-bold">
                  <Clock size={12} className="text-gold/40"/> {f.duration}
                </div>
                <button 
                  onClick={() => setSelectedFlight(f.id)}
                  className={cn(
                    "px-6 py-2 text-[9px] font-display uppercase tracking-[0.3em] font-bold transition-all border",
                    selectedFlight === f.id ? "bg-gold text-black-deep border-gold" : "bg-transparent text-gold border-gold/40 hover:bg-gold hover:text-black"
                  )}
                >
                  {selectedFlight === f.id ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accommodation Selection */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-gold">
          <Hotel size={16} />
          <h3 className="font-display text-[10px] tracking-[0.3em] uppercase">Accommodations</h3>
        </div>
        <div className="space-y-8">
          {stays.map(s => (
            <div 
              key={s.id}
              className={cn(
                "bg-black-deep/40 overflow-hidden border transition-all duration-500 rounded-sm",
                selectedStay === s.id ? "border-gold shadow-[0_0_20px_rgba(197,160,89,0.1)]" : "border-white/5"
              )}
            >
              <div className="h-48 relative">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute top-4 right-4 bg-black-deep/80 backdrop-blur-sm border border-gold/40 px-3 py-1 flex items-center gap-2 shadow-lg">
                  <Star size={10} className="text-gold fill-gold" />
                  <span className="text-[10px] font-sans font-bold text-white uppercase">{s.rating}</span>
                </div>
                {/* Styled MiniMap Placeholder */}
                <div className="absolute bottom-4 left-4 w-16 h-16 rounded-sm bg-black-deep/60 backdrop-blur-md border border-white/20 overflow-hidden shadow-inner group">
                   <div className="w-full h-full flex items-center justify-center relative">
                      <Navigation size={18} className="text-gold/40" />
                      <div className="absolute inset-0 bg-gold/5"></div>
                   </div>
                   <div className="absolute top-0 right-0 p-1">
                      <div className="w-1 h-1 bg-gold rounded-full shadow-[0_0_5px_#C5A059]"></div>
                   </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-display text-white tracking-tighter italic">{s.name}</h4>
                  <p className="text-gold font-display text-lg">${s.price}<span className="text-[10px] text-white/20 uppercase tracking-widest font-sans font-bold"> / night</span></p>
                </div>
                <p className="text-white/40 font-serif text-xs italic mb-8 leading-relaxed line-clamp-2">"{s.desc}"</p>
                <button 
                  onClick={() => setSelectedStay(s.id)}
                  className={cn(
                    "w-full py-4 text-[10px] font-display uppercase tracking-[0.4em] font-bold transition-all border",
                    selectedStay === s.id ? "bg-gold text-black-deep border-gold" : "bg-transparent text-gold border-gold/40 hover:bg-gold hover:text-black"
                  )}
                >
                  {selectedStay === s.id ? "Sanctuary Selected" : "Select Accommodation"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="pt-10 sticky bottom-0 z-10">
        <button 
          disabled={!canContinue}
          onClick={onNext}
          className={cn(
            "w-full p-5 rounded-sm flex items-center justify-center gap-4 transition-all duration-700 uppercase text-xs tracking-[0.4em] font-display font-bold border",
            canContinue ? "bg-gold text-black-deep border-gold shadow-[0_0_30px_rgba(197,160,89,0.3)] scale-100" : "bg-white/5 text-white/10 border-white/5 cursor-not-allowed scale-95"
          )}
        >
          <span>Verify Itinerary</span>
          <CheckCircle2 size={16} />
        </button>
      </div>
    </div>
  );
}
