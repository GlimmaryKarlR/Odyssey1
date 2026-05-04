import React from 'react';
import { useOdyssey } from '../hooks/useOdyssey';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { LogIn, Shield, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, loginAsDemo } = useOdyssey();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#02050A]">
        <div className="flex flex-col items-center gap-8">
          <div className="w-16 h-16 border border-gold/20 flex items-center justify-center relative">
             <div className="absolute inset-0 border-t-2 border-gold animate-spin"></div>
             <span className="text-gold font-display text-xs">O</span>
          </div>
          <p className="text-gold/40 font-display tracking-[0.6em] uppercase text-[10px] animate-pulse">Initializing Odyssey</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-navy-dark p-8 text-center relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gold/20 rounded-full blur-[150px]"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold/20 rounded-full blur-[150px]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 max-w-sm"
        >
          <div className="w-24 h-24 bg-black-deep rounded-sm mx-auto mb-12 flex items-center justify-center border border-gold/30 shadow-[0_0_50px_rgba(197,160,89,0.1)] relative group">
             <div className="absolute inset-2 border border-gold/10"></div>
             <span className="text-gold font-display text-5xl italic transition-transform duration-1000 group-hover:scale-110">O</span>
          </div>
          
          <h1 className="text-5xl font-display text-white mb-4 tracking-tighter uppercase italic leading-none">Odyssey</h1>
          <p className="text-gold/60 font-serif italic mb-16 text-sm leading-relaxed px-4">
            "The world is a book, and those who do not travel read only one page."
          </p>
          
          <button 
            onClick={() => signInWithPopup(auth, googleProvider)}
            className="w-full flex items-center justify-center gap-4 bg-gold text-black-deep px-10 py-5 rounded-sm font-display font-bold text-[10px] uppercase tracking-[0.3em] transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <LogIn size={16} className="relative z-10" />
            <span className="relative z-10">Access the Vault</span>
          </button>

          <button 
            onClick={loginAsDemo}
            className="w-full mt-4 flex items-center justify-center gap-4 bg-white/5 text-white/40 px-10 py-5 rounded-sm font-display font-bold text-[10px] uppercase tracking-[0.3em] transition-all hover:bg-white/10 hover:text-white group border border-white/10"
          >
            <span className="relative z-10">Demo Protocol</span>
          </button>
          
          <div className="mt-12 flex gap-8 justify-center opacity-20 hover:opacity-100 transition-opacity duration-1000">
            <div className="text-white text-[9px] font-sans font-bold uppercase tracking-[0.2em] flex items-center gap-2">
               <Shield size={12} className="text-gold" /> Encrypted
            </div>
            <div className="text-white text-[9px] font-sans font-bold uppercase tracking-[0.2em] flex items-center gap-2">
               <User size={12} className="text-gold" /> Private
            </div>
          </div>
        </motion.div>

        {/* Footer info */}
        <div className="absolute bottom-12 left-0 right-0 opacity-20">
           <p className="text-[10px] font-display uppercase tracking-[0.5em] text-white">Member of the 1% Club</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
