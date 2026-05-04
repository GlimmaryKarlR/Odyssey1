import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trip, UserProfile, Activity, DayItinerary } from '../types';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

interface OdysseyContextType {
  user: UserProfile | null;
  loading: boolean;
  currentTrip: Partial<Trip> | null;
  setCurrentTrip: (trip: Partial<Trip> | null) => void;
  updateTrip: (updates: Partial<Trip>) => void;
  confirmBooking: () => Promise<void>;
  loginAsDemo: () => void;
}

const OdysseyContext = createContext<OdysseyContextType | undefined>(undefined);

export const OdysseyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTrip, setCurrentTrip] = useState<Partial<Trip> | null>(null);

  const loginAsDemo = () => {
    const demoUser: UserProfile = {
      userId: 'demo-user',
      email: 'demo@odyssey.com',
      displayName: 'Elite Voyager',
      photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop',
      tier: 'elite',
      createdAt: new Date().toISOString()
    };
    setUser(demoUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as UserProfile);
        } else {
          const newUser: UserProfile = {
            userId: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Traveler',
            photoURL: firebaseUser.photoURL || '',
            tier: 'basic',
            createdAt: new Date().toISOString()
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateTrip = (updates: Partial<Trip>) => {
    setCurrentTrip(prev => ({ ...prev, ...updates }));
  };

  const confirmBooking = async () => {
    if (!user || !currentTrip) return;
    // Simulate booking logic
    console.log("Confirming booking for", currentTrip);
  };

  return (
    <OdysseyContext.Provider value={{ user, loading, currentTrip, setCurrentTrip, updateTrip, confirmBooking, loginAsDemo }}>
      {children}
    </OdysseyContext.Provider>
  );
};

export const useOdyssey = () => {
  const context = useContext(OdysseyContext);
  if (context === undefined) {
    throw new Error('useOdyssey must be used within an OdysseyProvider');
  }
  return context;
};
