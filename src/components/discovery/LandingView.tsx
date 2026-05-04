import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { motion } from 'motion/react';
import { Search, Compass } from 'lucide-react';
import { useOdyssey } from '../../hooks/useOdyssey';

export default function LandingView({ onStart }: { onStart: () => void }) {
  const globeEl = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }
    
    // Auto-rotate
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <div ref={containerRef} className="h-full flex flex-col bg-navy-dark relative overflow-hidden">
      {/* Globe Container */}
      <div className="absolute inset-0 opacity-40 pointer-events-none scale-110">
        {dimensions.width > 0 && (
          <Globe
            ref={globeEl}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            showGraticules={false}
            atmosphereColor="#C5A059"
            atmosphereAltitude={0.15}
          />
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-between p-8 pt-24">
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 border border-gold/40 rotate-45 mx-auto mb-10 flex items-center justify-center p-2"
          >
             <div className="w-2 h-2 bg-gold animate-pulse"></div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-display text-white mb-6 leading-tight uppercase tracking-[0.2em] font-light"
          >
            Where shall we <br />
            <span className="text-gold italic font-serif lowercase tracking-wider">begin?</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-12 h-px bg-gold/30 mx-auto mb-6"
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/40 font-serif italic text-sm tracking-wide max-w-[240px] mx-auto leading-relaxed"
          >
            "The world is a book, and those who do not travel read only one page."
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="w-full space-y-6"
        >
          <button 
            onClick={onStart}
            className="w-full border border-gold/40 text-gold py-5 rounded-sm flex items-center justify-center gap-4 group luxury-shadow hover:bg-gold hover:text-black transition-all duration-700 bg-black-deep/40 backdrop-blur-sm"
          >
            <Search size={18} className="group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-xs font-display tracking-[0.3em] uppercase">Plan an amazing trip</span>
          </button>

          <div className="flex justify-center items-center gap-4">
             <div className="h-px w-8 bg-gold/20"></div>
             <p className="text-[9px] text-white/30 uppercase tracking-[0.4em]">Touch to spin planetary view</p>
             <div className="h-px w-8 bg-gold/20"></div>
          </div>
        </motion.div>
      </div>

      {/* Modern Gradient Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-transparent to-black-deep pointer-events-none"></div>
    </div>
  );
}
