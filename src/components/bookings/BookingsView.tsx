import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Hotel, 
  Plane, 
  Car, 
  Ticket, 
  ChevronRight, 
  Copy, 
  ExternalLink,
  QrCode,
  ShieldCheck,
  RefreshCcw
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';

type BookingCategory = 'Hotels' | 'Flights' | 'Rental Cars' | 'Events';

export default function BookingsView() {
  const [activeTab, setActiveTab] = useState<BookingCategory>('Hotels');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const bookings = [
    { id: 'BK-TO34', type: 'Hotels', provider: 'Aman Tokyo', date: 'May 15-20', cost: 9000, code: 'XJ82910', status: 'Confirmed' },
    { id: 'BK-FL92', type: 'Flights', provider: 'Emirates', date: 'May 14', cost: 1240, code: 'CONF-EMA-33', status: 'Confirmed' },
    { id: 'BK-EV01', type: 'Events', provider: 'Tsukiji Private Tour', date: 'May 16', cost: 450, code: 'EV-882', status: 'Vetted' },
    { id: 'BK-EV02', type: 'Events', provider: 'Tea Master Ceremony', date: 'May 16', cost: 200, code: 'TEA-44', status: 'Vetted' },
  ];

  const filteredBookings = bookings.filter(b => b.type === activeTab);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-navy-dark">
      <header className="p-8 pb-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-display text-white uppercase tracking-tighter leading-none italic">Vault</h2>
          <button 
            onClick={handleRefresh}
            className={cn("w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 hover:text-gold hover:border-gold/40 transition-all rounded-sm", isRefreshing && "animate-spin text-gold")}
          >
            <RefreshCcw size={16} />
          </button>
        </div>

        {/* Tab Scroller */}
        <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
          {(['Hotels', 'Flights', 'Rental Cars', 'Events'] as BookingCategory[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "whitespace-nowrap px-6 py-3 rounded-sm font-display text-[9px] uppercase tracking-[0.2em] transition-all border",
                activeTab === tab 
                  ? "bg-gold text-black-deep border-gold shadow-[0_0_15px_rgba(197,160,89,0.3)] font-bold" 
                  : "bg-black-deep/40 text-white/40 border-white/5 hover:border-gold/20"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 space-y-8 pb-32">
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={booking.id} 
              className="bg-black-deep/60 p-6 border border-white/5 relative overflow-hidden group rounded-sm luxury-shadow"
            >
              {/* Status Badge */}
              <div className="absolute top-0 right-0">
                 <div className="bg-gold/10 text-gold text-[8px] font-sans font-bold uppercase tracking-[0.2em] px-4 py-2 border-l border-b border-gold/10 flex items-center gap-2">
                    <ShieldCheck size={10} className="text-gold" /> {booking.status}
                 </div>
              </div>

              <div className="flex items-center gap-6 mb-8 pt-4">
                <div className="w-14 h-14 border border-gold/30 flex items-center justify-center text-gold bg-[#0A1428] relative group-hover:scale-105 transition-transform">
                   <div className="absolute inset-1 border border-gold/10"></div>
                   {booking.type === 'Hotels' && <Hotel size={20} />}
                   {booking.type === 'Flights' && <Plane size={20} />}
                   {booking.type === 'Rental Cars' && <Car size={20} />}
                   {booking.type === 'Events' && <Ticket size={20} />}
                </div>
                <div>
                   <h4 className="font-display text-xl text-white tracking-widest italic">{booking.provider}</h4>
                   <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-sans font-bold mt-1">{booking.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-white/5 p-4 border border-white/5 relative">
                    <p className="text-[9px] uppercase tracking-widest text-white/20 mb-2 font-sans font-bold">Confirmation</p>
                    <div className="flex items-center justify-between">
                       <code className="text-xs font-mono text-gold/80">{booking.code}</code>
                       <button className="text-white/20 hover:text-gold transition-colors"><Copy size={12}/></button>
                    </div>
                 </div>
                 <div className="bg-white/5 p-4 border border-white/5">
                    <p className="text-[9px] uppercase tracking-widest text-white/20 mb-2 font-sans font-bold">Investment</p>
                    <p className="text-lg font-display text-white">{formatCurrency(booking.cost)}</p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button className="flex-1 bg-gold text-black-deep py-4 font-display text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-[0_0_15px_rgba(197,160,89,0.2)]">
                    <QrCode size={16} /> Digital Alpha Pass
                 </button>
                 <button className="w-14 h-14 flex items-center justify-center border border-white/10 text-white/20 hover:text-gold hover:border-gold/40 transition-all rounded-sm">
                    <ExternalLink size={20} />
                 </button>
              </div>

              {/* Dev Simulation Badge */}
              <div className="mt-8 p-4 bg-gold/5 border-l-2 border-gold/30 flex items-center gap-4 group-hover:bg-gold/10 transition-all">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse shadow-[0_0_8px_#C5A059]" />
                <span className="text-[9px] font-sans font-bold text-gold/60 uppercase tracking-[0.2em]">Secure Protocol Active • Vault Card 7742</span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-center opacity-40">
             <div className="w-16 h-16 border border-white/10 rounded-full mb-6 flex items-center justify-center text-gold/50">
               <ShieldCheck size={32} />
             </div>
             <p className="font-display uppercase text-xs tracking-[0.4em]">Vault Isolated</p>
             <p className="font-serif italic text-[11px] mt-4 max-w-[200px]">Bookings approved by Oda will appear here securely.</p>
          </div>
        )}
      </div>

      {/* Safety/Contact Bar */}
      <div className="p-8 pt-0">
         <div className="bg-black-deep/80 border border-gold/30 p-6 flex justify-between items-center group cursor-pointer hover:border-gold transition-all luxury-shadow rounded-sm backdrop-blur-md">
            <div className="flex items-center gap-5">
               <div className="w-12 h-12 border border-gold/40 flex items-center justify-center text-gold bg-gold/5">
                  <ShieldCheck size={24} />
               </div>
               <div>
                  <p className="text-white font-display text-xs uppercase tracking-[0.2em] mb-1">Global Safeguard</p>
                  <p className="text-gold/40 font-serif italic text-[10px]">Priority Embassy & Medical Liaison Protocol</p>
               </div>
            </div>
            <ChevronRight className="text-gold/20 group-hover:translate-x-1 group-hover:text-gold transition-all" />
         </div>
      </div>
    </div>
  );
}
