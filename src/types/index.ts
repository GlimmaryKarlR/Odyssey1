export type UserTier = 'basic' | 'elite';

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  photoURL: string;
  tier: UserTier;
  passportCountry?: string;
  createdAt: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Trip {
  id: string;
  userId: string;
  destination: string;
  destinationCoords?: Coordinates;
  startDate?: string;
  endDate?: string;
  budgetLevel: number; // 1-5
  status: 'planning' | 'proposed' | 'confirmed';
  proposedItinerary?: DayItinerary[];
  createdAt: string;
}

export interface DayItinerary {
  day: number;
  date?: string;
  activities: Activity[];
  summary: string;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  price?: number;
  duration?: string;
  type: 'flight' | 'hotel' | 'transit' | 'sightseeing' | 'dining' | 'emergency' | 'guided_tour';
  status: 'available' | 'proposed' | 'booked';
  isExclusive?: boolean;
  transitToNext?: string;
  coordinates?: Coordinates;
}

export interface Booking {
  id: string;
  tripId: string;
  userId: string;
  type: 'hotel' | 'flight' | 'rental_car' | 'event';
  provider: string;
  details: any;
  cost: number;
  currency: string;
  confirmationCode: string;
  timestamp: string;
}

export interface TravelDocument {
  id: string;
  userId: string;
  type: 'visa' | 'vaccination' | 'insurance' | 'passport';
  name: string;
  expiryDate: string;
  fileUrl: string;
}
