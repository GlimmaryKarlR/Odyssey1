import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Map as MapIcon, 
  Calendar, 
  Plane, 
  Hotel, 
  Compass, 
  Shield, 
  User, 
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { useOdyssey, OdysseyProvider } from './hooks/useOdyssey';
import LandingView from './components/discovery/LandingView';
import WorkflowView from './components/discovery/WorkflowView';
import JourneyView from './components/itinerary/JourneyView';
import ProposedItineraryView from './components/itinerary/ProposedItineraryView';
import BookingsView from './components/bookings/BookingsView';
import AssistantView from './components/oda/AssistantView';
import ProfileView from './components/ProfileView';
import AuthGuard from './components/AuthGuard';

type View = 'landing' | 'discovery' | 'journey' | 'itinerary' | 'bookings' | 'assistant' | 'profile';

function OdysseyApp() {
  const { user, currentTrip } = useOdyssey();
  const [activeView, setActiveView] = useState<View>('landing');

  const renderView = () => {
    switch (activeView) {
      case 'landing': return <LandingView onStart={() => setActiveView('discovery')} />;
      case 'discovery': return <WorkflowView onComplete={() => setActiveView('journey')} />;
      case 'journey': return <JourneyView onNext={() => setActiveView('itinerary')} />;
      case 'itinerary': return <ProposedItineraryView />;
      case 'bookings': return <BookingsView />;
      case 'assistant': return <AssistantView />;
      case 'profile': return <ProfileView />;
      default: return <LandingView onStart={() => setActiveView('discovery')} />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-navy-dark text-white relative overflow-hidden ring-1 ring-gold/20 shadow-[0_0_100px_rgba(0,0,0,0.8)] font-serif">
      {/* Top Header */}
      <header className="h-16 px-6 flex justify-between items-center bg-black-deep border-b border-gold/30 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-gold rotate-45 flex items-center justify-center p-1 group">
            <div className="w-1 h-1 bg-gold transition-transform group-hover:scale-150"></div>
          </div>
          <h1 className="text-xl font-display text-gold tracking-[0.2em] uppercase font-light">Odyssey</h1>
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[8px] uppercase tracking-[0.2em] text-gold font-sans font-bold border border-gold/40 px-2 py-0.5 rounded-sm">Elite Member</span>
            </div>
            <button 
              onClick={() => setActiveView('profile')} 
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-white/20 p-[1px] hover:scale-105 transition-transform"
            >
              <div className="w-full h-full rounded-full bg-navy-dark overflow-hidden">
                <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
              </div>
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 relative bg-dark-gradient">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      <nav className="absolute bottom-0 left-0 right-0 h-20 bg-black-deep border-t border-gold/20 flex justify-around items-center px-4 z-20">
        <NavButton active={activeView === 'landing' || activeView === 'discovery'} onClick={() => setActiveView('landing')} icon={<Globe size={22} />} label="Explore" />
        <NavButton active={activeView === 'journey' || activeView === 'itinerary'} onClick={() => currentTrip ? setActiveView('journey') : setActiveView('discovery')} icon={<MapIcon size={22} />} label="Journey" />
        <NavButton active={activeView === 'assistant'} onClick={() => setActiveView('assistant')} icon={<MessageSquare size={22} />} label="Guide" />
        <NavButton active={activeView === 'bookings'} onClick={() => setActiveView('bookings')} icon={<BookOpen size={22} />} label="Bookings" />
      </nav>
    </div>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${active ? 'text-gold' : 'text-white/30 hover:text-white/50'}`}
    >
      <div className={`transition-all duration-500 ${active ? 'scale-110' : 'scale-100'}`}>
        {icon}
      </div>
      <span className="text-[10px] uppercase font-display tracking-[0.2em] font-medium">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-active-dot" 
          className="w-1 h-1 bg-gold rounded-full shadow-[0_0_8px_rgba(197,160,89,1)]" 
        />
      )}
    </button>
  );
}

export default function App() {
  return (
    <OdysseyProvider>
      <AuthGuard>
        <OdysseyApp />
      </AuthGuard>
    </OdysseyProvider>
  );
}
