
export interface RecommendationSet {
  flights: {
    id: number;
    provider: string;
    time: string;
    duration: string;
    type: string;
    price: number;
  }[];
  stays: {
    id: number;
    name: string;
    desc: string;
    price: number;
    rating: number;
    image: string;
  }[];
  events: {
    id: number;
    time: string;
    title: string;
    desc: string;
    type: 'exclusive' | 'dining';
    active: boolean;
  }[];
}

export const recommendations: Record<string, RecommendationSet> = {
  'Santorini': {
    flights: [
      { id: 1, provider: 'Aegean Airlines', time: '07:15 - 08:00', duration: '45m', type: 'Nonstop (from ATH)', price: 180 },
      { id: 2, provider: 'British Airways', time: '10:30 - 16:15', duration: '3h 45m', type: 'Nonstop (from LHR)', price: 450 },
      { id: 3, provider: 'Lufthansa', time: '14:00 - 21:30', duration: '5h 30m', type: '1 Stop (FRA)', price: 380 }
    ],
    stays: [
      { 
        id: 1, 
        name: 'Grace Hotel, Auberge Resorts Collection', 
        desc: 'Breathtaking infinity pool overlooking the caldera', 
        price: 1200, 
        rating: 4.9, 
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800' 
      },
      { 
        id: 2, 
        name: 'Canaves Oia Epitome', 
        desc: 'Private plunge pools and unparalleled sunset views', 
        price: 1500, 
        rating: 5.0, 
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' 
      },
      { 
        id: 3, 
        name: 'Andronis Luxury Suites', 
        desc: 'Traditional cave dwellings carved into the cliffside', 
        price: 950, 
        rating: 4.8, 
        image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&q=80&w=800' 
      }
    ],
    events: [
      {
        id: 1,
        time: '05:30 PM',
        title: 'Caldera Sunset Sail',
        desc: '"As an Elite member, we\'ve secured a private catamaran for a sunset cruise. You\'ll enjoy local wines and fresh seafood while the sun dips below the horizon."',
        type: 'exclusive',
        active: true
      },
      {
        id: 2,
        time: '08:30 PM',
        title: 'Selene Gastronomy',
        desc: '"Personalized Recommendation: You mentioned an interest in volcanic wines. We have secured the private cellar table for a tasting menu paired with local vintages."',
        type: 'dining',
        active: false
      }
    ]
  },
  'Kyoto': {
    flights: [
      { id: 1, provider: 'JAL', time: '10:00 - 11:15', duration: '1h 15m', type: 'Nonstop (from HND)', price: 320 },
      { id: 2, provider: 'All Nippon Airways', time: '13:45 - 15:00', duration: '1h 15m', type: 'Nonstop (from NRT)', price: 290 },
      { id: 3, provider: 'Shinkansen', time: 'Flexible', duration: '2h 15m', type: 'Nozomi Express', price: 130 }
    ],
    stays: [
      { 
        id: 1, 
        name: 'Aman Kyoto', 
        desc: 'Hidden sanctuary in a secret garden setting', 
        price: 2200, 
        rating: 5.0, 
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800' 
      },
      { 
        id: 2, 
        name: 'The Ritz-Carlton Kyoto', 
        desc: 'Elegant riverside luxury inspired by tradition', 
        price: 1800, 
        rating: 4.9, 
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=800' 
      },
      { 
        id: 3, 
        name: 'Suiran', 
        desc: 'Tranquil retreat along the Arashiyama riverbank', 
        price: 1400, 
        rating: 4.8, 
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800' 
      }
    ],
    events: [
      {
        id: 1,
        time: '06:00 AM',
        title: 'Zen Meditation at Ryoan-ji',
        desc: '"As an Elite member, we\'ve secured dawn access to the rock garden before it opens to the public. You will be guided by a resident monk."',
        type: 'exclusive',
        active: true
      },
      {
        id: 2,
        time: '07:00 PM',
        title: 'Kikunoi Honten',
        desc: '"Personalized Recommendation: You mentioned a preference for Kaiseki. We have reserved the private Gion room for a seasonal 12-course feast."',
        type: 'dining',
        active: false
      }
    ]
  },
  'Amalfi Coast': {
    flights: [
      { id: 1, provider: 'Alitalia', time: '09:00 - 10:30', duration: '1h 30m', type: 'Nonstop (from FCO)', price: 150 },
      { id: 2, provider: 'EasyJet', time: '11:45 - 14:20', duration: '2h 35m', type: 'Nonstop (from LGW)', price: 210 }
    ],
    stays: [
      { 
        id: 1, 
        name: 'Le Sirenuse', 
        desc: 'Legendary Positano luxury with iconic red walls', 
        price: 2800, 
        rating: 5.0, 
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800' 
      },
      { 
        id: 2, 
        name: 'Hotel Santa Caterina', 
        desc: 'Historic villa perched above the Mediterranean', 
        price: 2400, 
        rating: 4.9, 
        image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&q=80&w=800' 
      }
    ],
    events: [
      {
        id: 1,
        time: '10:00 AM',
        title: 'Private Yacht to Capri',
        desc: '"We\'ve chartered a Riva for your exclusive transfer to Capri, including a stop at the Blue Grotto before the crowds."',
        type: 'exclusive',
        active: true
      },
      {
        id: 2,
        time: '08:00 PM',
        title: 'Da Paolino Lemon Garden',
        desc: '"Dine under a canopy of vibrant lemon trees. We have secured the most secluded table in the garden."',
        type: 'dining',
        active: false
      }
    ]
  },
  'Reykjavik': {
    flights: [
      { id: 1, provider: 'Icelandair', time: '08:00 - 11:30', duration: '3h 30m', type: 'Nonstop (from JFK)', price: 850 },
      { id: 2, provider: 'Play', time: '12:00 - 15:30', duration: '3h 30m', type: 'Nonstop (from STN)', price: 420 }
    ],
    stays: [
      { 
        id: 1, 
        name: 'The Retreat at Blue Lagoon', 
        desc: 'Luxury carved into the volcanic landscape', 
        price: 1600, 
        rating: 4.9, 
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800' 
      }
    ],
    events: [
      {
        id: 1,
        time: '09:00 PM',
        title: 'Private Aurora Hunt',
        desc: '"Our expert tracker will take you into the highlands by Super Jeep to find the best viewing for the Northern Lights, with a private chef catering."',
        type: 'exclusive',
        active: true
      }
    ]
  }
};

export const defaultRecommendations: RecommendationSet = {
  flights: [
    { id: 1, provider: 'Premium Hybrid', time: 'Flexible', duration: 'Calculated', type: 'First Class', price: 1500 },
    { id: 2, provider: 'Elite Charter', time: 'On Demand', duration: 'Optimized', type: 'Private Jet', price: 5000 }
  ],
  stays: [
    { 
      id: 1, 
      name: 'The Signature Estate', 
      desc: 'Most exclusive property in the region', 
      price: 2500, 
      rating: 5.0, 
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800' 
    }
  ],
  events: [
    {
      id: 1,
      time: '10:00 AM',
      title: 'Bespoke Exploration',
      desc: '"Oda is currently coordinating a tailored experience based on your specific profile."',
      type: 'exclusive',
      active: true
    }
  ]
};

export function getRecommendations(destination: string | undefined): RecommendationSet {
  if (!destination) return defaultRecommendations;
  
  // Try exact match
  if (recommendations[destination]) return recommendations[destination];
  
  // Try fuzzy match
  const match = Object.keys(recommendations).find(key => 
    destination.toLowerCase().includes(key.toLowerCase()) || 
    key.toLowerCase().includes(destination.toLowerCase())
  );
  
  return match ? recommendations[match] : defaultRecommendations;
}
