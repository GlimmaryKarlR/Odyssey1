import React from 'react';
import { useOdyssey } from '../hooks/useOdyssey';
import { 
  User, 
  Settings, 
  Shield, 
  CreditCard, 
  UserRound, 
  LogOut, 
  Crown,
  ChevronRight,
  FileText
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { cn } from '../lib/utils';

export default function ProfileView() {
  const { user } = useOdyssey();

  if (!user) return null;

  return (
    <div className="flex flex-col h-full bg-navy-dark">
      <header className="p-10 pb-16 bg-black-deep relative overflow-hidden border-b border-gold/20">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 right-0 w-64 h-64 border border-gold rounded-full -translate-y-1/2 translate-x-1/2 rotate-45" />
           <div className="absolute bottom-0 left-0 w-32 h-32 border border-gold rounded-full translate-y-1/2 -translate-x-1/2 -rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
           <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full border border-gold/40 p-2 bg-navy-dark shadow-[0_0_20px_rgba(197,160,89,0.2)]">
                 <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gold text-black-deep px-4 py-1 rounded-sm text-[8px] font-display font-medium uppercase tracking-[0.2em] shadow-xl border border-gold/40">
                 {user.tier} Tier
              </div>
           </div>
           <h2 className="text-4xl font-display text-white mb-2 uppercase tracking-tighter italic">{user.displayName}</h2>
           <p className="text-gold/60 font-serif italic text-xs tracking-widest">{user.email}</p>
        </div>
      </header>

      <div className="flex-1 bg-dark-gradient px-8 pt-12 space-y-12 overflow-y-auto pb-32">
        {/* Elite Banner */}
        {user.tier === 'basic' && (
          <div className="bg-[#0A1428] p-8 border border-gold/20 flex items-center justify-between group cursor-pointer hover:border-gold transition-all duration-700 luxury-shadow relative overflow-hidden">
             <div className="absolute inset-0 bg-gold/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 text-gold mb-3">
                   <Crown size={16} />
                   <p className="font-display text-[10px] uppercase tracking-[0.3em] font-bold">Upgrade to Elite Status</p>
                </div>
                <p className="text-white/40 text-[10px] font-serif italic max-w-[200px]">Access priority landmarks & bespoke concierge protocols</p>
             </div>
             <ChevronRight className="text-gold relative z-10 group-hover:translate-x-1 transition-transform" />
          </div>
        )}

        {/* Categories */}
        <div className="space-y-6">
           <h3 className="font-display text-[10px] text-white/20 uppercase tracking-[0.4em] ml-2">Personal Vault</h3>
           <div className="bg-black-deep/60 rounded-sm luxury-shadow border border-white/5 overflow-hidden divide-y divide-white/5">
              <ProfileItem icon={<UserRound />} label="Document Manager" desc="Visas & Digital Passports" count={3} />
              <ProfileItem icon={<FileText />} label="Health Records" desc="Vaccinations & Insurance" count={1} />
              <ProfileItem icon={<CreditCard />} label="Payment Secure Vault" desc="Manage cards & authorization" />
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="font-display text-[10px] text-white/20 uppercase tracking-[0.4em] ml-2">System Config</h3>
           <div className="bg-black-deep/60 rounded-sm luxury-shadow border border-white/5 overflow-hidden divide-y divide-white/5">
              <ProfileItem icon={<Settings />} label="Preferences" desc="Notification & Language" />
              <ProfileItem icon={<Shield />} label="Emergency Protocols" desc="US Embassy & Family Liaison" />
              <button 
                onClick={() => signOut(auth)}
                className="w-full flex items-center gap-5 p-6 text-red-500/60 hover:bg-red-500/5 transition-all text-left group"
              >
                 <LogOut size={20} className="group-hover:scale-110 transition-transform" />
                 <div>
                    <span className="font-display text-[10px] uppercase tracking-[0.3em] font-bold">Terminate Session</span>
                    <p className="text-[9px] text-red-500/20 font-serif italic mt-0.5">Clears local cache and vault access</p>
                 </div>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, desc, count }: { icon: React.ReactNode, label: string, desc: string, count?: number }) {
  return (
    <button className="w-full flex items-center justify-between p-6 hover:bg-gold/5 transition-all group group cursor-pointer text-left">
        <div className="flex items-center gap-5">
           <div className="text-gold opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all">
              {React.cloneElement(icon as React.ReactElement, { size: 18 })}
           </div>
           <div>
              <p className="text-white font-display text-[11px] uppercase tracking-[0.2em] mb-1 group-hover:text-gold transition-colors">{label}</p>
              <p className="text-white/20 font-serif italic text-[10px] group-hover:text-white/40 transition-colors">{desc}</p>
           </div>
        </div>
        <div className="flex items-center gap-3">
           {count !== undefined && <span className="bg-gold/10 text-gold text-[9px] font-sans font-bold px-3 py-1 border border-gold/20">{count}</span>}
           <ChevronRight size={14} className="text-white/10 group-hover:text-gold transition-all" />
        </div>
    </button>
  );
}
