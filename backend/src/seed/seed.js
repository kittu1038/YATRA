import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Destination from '../models/Destination.js';
import Stay from '../models/Stay.js';
import Food from '../models/Food.js';
import User from '../models/User.js';

dotenv.config({ path: '../../.env' });

const destinations = [
  {
    name: 'Jaipur',
    slug: 'jaipur',
    state: 'Rajasthan',
    region: 'Western India',
    type: 'heritage',
    tagline: 'The Pink City of Rajputana',
    description: "Jaipur, the capital of Rajasthan, is a city that wears its royal heritage on its terracotta walls. Founded in 1727 by Maharaja Sawai Jai Singh II, it was India's first planned city. The city's signature pink hue, applied in 1876 to welcome Prince Albert, still defines its old city lanes, grand havelis, and bustling bazaars.",
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80',
      'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=1200&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80',
    ],
    coordinates: { lat: 26.9124, lng: 75.7873 },
    elevation: 431,
    bestTimeToVisit: ['October', 'November', 'December', 'January', 'February', 'March'],
    weather: {
      summer: 'Extreme heat, 40-45°C. Avoid midday excursions.',
      monsoon: '25-35°C, periodic heavy rainfall. Palaces look dramatic.',
      winter: 'Pleasant 10-25°C. Peak tourist season.',
    },
    entryFee: { indian: 50, foreign: 500, currency: 'INR' },
    timings: { open: '09:00', close: '17:00', closedOn: [] },
    avgStayDays: 3,
    avgDailyCost: 1800,
    tags: ['heritage', 'royal', 'architecture', 'bazaar', 'photography'],
    highlights: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar', 'Nahargarh Fort'],
    culturalNotes: 'Dress modestly at religious sites. Bargaining is expected in bazaars. Photography fees apply at most monuments.',
    dressCode: 'Conservative at temples. Light cotton in summer. Layers in winter.',
    rating: 4.6,
    reviewCount: 1240,
    isFeatured: true,
    isTrending: true,
  },
  {
    name: 'Udaipur',
    slug: 'udaipur',
    state: 'Rajasthan',
    region: 'Western India',
    type: 'heritage',
    tagline: 'The City of Lakes',
    description: "Nestled among the Aravalli hills and shimmering lakes, Udaipur is Rajasthan's most romantic city. Its marble palaces, island hotels, and labyrinthine old city lanes create an atmosphere of timeless Mewar grandeur. The Lake Pichola and its palace are among India's most photographed sights.",
    heroImage: 'https://images.unsplash.com/photo-1579531403068-8fc27c72aab1?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600100397608-14b5c8d53a40?w=1200&q=80',
      'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1200&q=80',
    ],
    coordinates: { lat: 24.5854, lng: 73.7125 },
    elevation: 598,
    bestTimeToVisit: ['September', 'October', 'November', 'December', 'January', 'February', 'March'],
    weather: {
      summer: 'Very hot, 38-42°C. Lakes are low.',
      monsoon: 'Beautiful, 25-32°C. Lakes fill up dramatically.',
      winter: 'Ideal, 10-28°C. Clear skies, perfect for photography.',
    },
    entryFee: { indian: 30, foreign: 300, currency: 'INR' },
    timings: { open: '09:30', close: '17:30', closedOn: [] },
    avgStayDays: 3,
    avgDailyCost: 2200,
    tags: ['lakes', 'palaces', 'romance', 'heritage', 'boat-ride', 'sunsets'],
    highlights: ['City Palace', 'Lake Pichola', 'Jag Mandir', 'Sajjangarh Palace', 'Fateh Sagar Lake'],
    culturalNotes: 'Boat rides are best at sunset. The old city is best explored on foot. Many rooftop restaurants offer lake views.',
    dressCode: 'Smart casual for rooftop restaurants. Covered shoulders at palace temples.',
    rating: 4.8,
    reviewCount: 980,
    isFeatured: true,
    isTrending: true,
  },
  {
    name: 'Rishikesh',
    slug: 'rishikesh',
    state: 'Uttarakhand',
    region: 'North India — Garhwal Himalaya',
    type: 'adventure',
    tagline: 'Yoga Capital of the World',
    description: "Where the Ganges descends from the Himalayas into the plains, Rishikesh has evolved from a sacred pilgrimage town into India's adventure capital. The town offers white-water rafting, bungee jumping, and cliff diving alongside its ancient ashrams, riverside ghats, and suspension bridges.",
    heroImage: 'https://images.unsplash.com/photo-1622308644420-b20142dc993c?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80',
      'https://images.unsplash.com/photo-1584268386695-c06a0da27e8b?w=1200&q=80',
    ],
    coordinates: { lat: 30.0869, lng: 78.2676 },
    elevation: 356,
    bestTimeToVisit: ['February', 'March', 'April', 'May', 'September', 'October', 'November'],
    weather: {
      summer: 'Warm, 25-38°C. Good for rafting (pre-monsoon).',
      monsoon: 'Heavy rain, Ganges floods. Rafting suspended June-Sept.',
      winter: 'Cold, 5-20°C. Clear skies. Good for yoga retreats.',
    },
    entryFee: { indian: 0, foreign: 0, currency: 'INR' },
    timings: { open: '00:00', close: '23:59', closedOn: [] },
    avgStayDays: 4,
    avgDailyCost: 1200,
    tags: ['adventure', 'rafting', 'yoga', 'pilgrimage', 'bungee', 'camping'],
    highlights: ['Laxman Jhula', 'Ram Jhula', 'Triveni Ghat Aarti', 'White Water Rafting', 'Beatles Ashram'],
    culturalNotes: 'Alcohol and meat are prohibited in the city. Ganga Aarti at Triveni Ghat happens every evening. Respect ashram timings.',
    dressCode: 'Modest attire near ghats and ashrams. Adventure gear for rafting.',
    rating: 4.5,
    reviewCount: 1560,
    isFeatured: true,
    isTrending: true,
  },
  {
    name: 'Kedarnath',
    slug: 'kedarnath',
    state: 'Uttarakhand',
    region: 'North India — Garhwal Himalaya',
    type: 'pilgrimage',
    tagline: 'Abode of Lord Shiva at 3,583m',
    description: 'One of the twelve Jyotirlingas, Kedarnath sits at 3,583 metres in the Rudraprayag district, flanked by snow-covered Himalayan peaks. The ancient stone temple, believed to be built by the Pandavas and reconstructed by Adi Shankaracharya in the 8th century, survived the 2013 Uttarakhand floods with the temple structure intact — an event many devotees consider miraculous.',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
    ],
    coordinates: { lat: 30.7352, lng: 79.0669 },
    elevation: 3583,
    bestTimeToVisit: ['May', 'June', 'September', 'October'],
    weather: {
      summer: '5-15°C. Temple open May to October/November.',
      monsoon: 'Dangerous. Temple remains open but trek is risky.',
      winter: 'Temple closed November to April. Heavy snowfall.',
    },
    entryFee: { indian: 0, foreign: 0, currency: 'INR' },
    timings: { open: '05:00', close: '21:00', closedOn: [] },
    avgStayDays: 2,
    avgDailyCost: 1500,
    tags: ['pilgrimage', 'jyotirlinga', 'himalaya', 'trekking', 'spiritual', 'char-dham'],
    highlights: ['Kedarnath Temple', 'Bhairav Temple', 'Gandhi Sarovar', 'Vasuki Tal Trek', 'Helicopter View'],
    culturalNotes: 'Register online at devasthanam board website. Carry only essentials. Ponies and dolis available for those unable to trek. Temple VIP darshan available.',
    dressCode: 'Warm layers essential (even in summer nights). Cover head inside temple. No leather items.',
    rating: 4.9,
    reviewCount: 2100,
    isFeatured: true,
    isTrending: true,
  },
  {
    name: 'Badrinath',
    slug: 'badrinath',
    state: 'Uttarakhand',
    region: 'North India — Garhwal Himalaya',
    type: 'pilgrimage',
    tagline: 'The Abode of Badrinarayan — Char Dham',
    description: 'Situated at 3,133 metres in the Chamoli district, Badrinath is one of the four sacred dhams in Hinduism and one of the 108 Divya Desams for Vaishnavas. The colourful temple façade backed by the Nilkantha peak (6,596m) creates one of the most dramatic religious settings in the Himalayas.',
    heroImage: 'https://images.unsplash.com/photo-1593766788306-28561086694f?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1593766788306-28561086694f?w=1200&q=80',
    ],
    coordinates: { lat: 30.7433, lng: 79.4938 },
    elevation: 3133,
    bestTimeToVisit: ['May', 'June', 'September', 'October'],
    weather: {
      summer: '5-18°C. Best season, May to June.',
      monsoon: 'Landslide risk. Temple open but risky travel.',
      winter: 'Temple closed November to April. Extreme cold.',
    },
    entryFee: { indian: 0, foreign: 0, currency: 'INR' },
    timings: { open: '04:30', close: '21:00', closedOn: [] },
    avgStayDays: 2,
    avgDailyCost: 1400,
    tags: ['pilgrimage', 'char-dham', 'vaishnavite', 'himalaya', 'hot-springs', 'spiritual'],
    highlights: ['Badrinath Temple', 'Tapt Kund Hot Springs', 'Brahma Kapal', 'Mana Village', 'Vasudhara Falls'],
    culturalNotes: 'Mana Village, 3km away, is the last Indian village before Tibet border. Brahma Kapal is the site for ancestral rituals (pind daan). Dress code strictly enforced.',
    dressCode: 'Traditional attire preferred. No leather inside temple. Head covering mandatory.',
    rating: 4.9,
    reviewCount: 1890,
    isFeatured: true,
    isTrending: false,
  },
  {
    name: 'Jageshwar Dham',
    slug: 'jageshwar-dham',
    state: 'Uttarakhand',
    region: 'North India — Kumaon',
    type: 'temple',
    tagline: 'Valley of a Hundred Ancient Shiva Temples',
    description: 'Hidden in a dense deodar forest in the Almora district, Jageshwar Dham is one of the most atmospheric temple complexes in India. A cluster of 124 ancient Nagara-style stone temples dating from the 7th to 12th centuries AD, set alongside the Jataganga stream. The 2,500-year-old Mrityunjaya temple is the main shrine. Largely undiscovered by mass tourism.',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&q=80',
    images: [],
    coordinates: { lat: 29.6367, lng: 79.8508 },
    elevation: 1870,
    bestTimeToVisit: ['March', 'April', 'May', 'September', 'October', 'November'],
    weather: {
      summer: 'Cool, 15-28°C. Deodar forests are lush.',
      monsoon: 'Very green, 10-22°C. Mist in the forest.',
      winter: 'Cold, 0-15°C. Occasional snow. Very peaceful.',
    },
    entryFee: { indian: 0, foreign: 0, currency: 'INR' },
    timings: { open: '06:00', close: '20:00', closedOn: [] },
    avgStayDays: 2,
    avgDailyCost: 900,
    tags: ['temple', 'ancient', 'off-beat', 'forest', 'archaeology', 'kumaon'],
    highlights: ['Mrityunjaya Temple', 'Dandeshwar Temple', 'Jageshwar Archaeological Museum', 'Vriddha Jageshwar', 'Deodar Forest Walk'],
    culturalNotes: 'Photography inside main sanctum is prohibited. This is an active pilgrimage site, not just a tourist attraction. The Shravani Mela in August draws thousands of pilgrims.',
    dressCode: 'Traditional/modest attire. No footwear inside temple complex.',
    rating: 4.7,
    reviewCount: 340,
    isFeatured: false,
    isTrending: false,
  },
  {
    name: 'Almora',
    slug: 'almora',
    state: 'Uttarakhand',
    region: 'North India — Kumaon',
    type: 'hill-station',
    tagline: 'The Cultural Capital of Kumaon',
    description: "Almora sits on a crescent-shaped ridge at 1,638 metres in the Kumaon Himalayas, with the Himalayan range including Nanda Devi visible on clear days. It is the cultural and historical capital of the Kumaon region, known for its unique copper utensils, traditional architecture, Kumaoni folk music, and Bal Mithai sweet.",
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&q=80',
    images: [],
    coordinates: { lat: 29.5971, lng: 79.6591 },
    elevation: 1638,
    bestTimeToVisit: ['March', 'April', 'May', 'September', 'October', 'November'],
    weather: {
      summer: 'Pleasant, 15-30°C. Good panoramic views.',
      monsoon: 'Green hills, 10-25°C. Leeches on trails.',
      winter: 'Cold, 2-15°C. Occasional frost. Good sunrise views.',
    },
    entryFee: { indian: 0, foreign: 0, currency: 'INR' },
    timings: { open: '00:00', close: '23:59', closedOn: [] },
    avgStayDays: 2,
    avgDailyCost: 1000,
    tags: ['hill-station', 'kumaon', 'culture', 'off-beat', 'trekking', 'sunrise'],
    highlights: ['Bright End Corner Sunrise', 'Chitai Golu Devta Temple', 'Kasar Devi', 'Zero Point', 'Almora Bazaar Copper Craft'],
    culturalNotes: "Kasar Devi was a retreat for Swami Vivekananda, Timothy Leary, and Bob Dylan. Bal Mithai (chocolate-coloured fudge with white sugar balls) is Almora's signature sweet.",
    dressCode: 'Casual. Warm layers in winter.',
    rating: 4.4,
    reviewCount: 520,
    isFeatured: false,
    isTrending: false,
  },
];

const staysData = [
  {
    name: 'Zostel Jaipur',
    slug: 'zostel-jaipur',
    destinationSlug: 'jaipur',
    type: 'hostel',
    description: "India's most popular hostel chain's Jaipur property. Set in a restored pink city haveli with rooftop views, social kitchen, and an energetic travellers' community.",
    heroImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80'],
    address: 'Near Sindhi Camp, Pink City, Jaipur 302001',
    coordinates: { lat: 26.9219, lng: 75.7876 },
    distanceFromCenter: 1.2,
    priceRange: { min: 450, max: 2200 },
    roomTypes: [
      { name: '6-Bed Mixed Dorm', type: 'dorm', pricePerNight: 450, capacity: 6, amenities: ['Locker', 'Reading light', 'Power outlet', 'AC'], images: [] },
      { name: '4-Bed Female Dorm', type: 'dorm', pricePerNight: 500, capacity: 4, amenities: ['Locker', 'Reading light', 'AC', 'Curtains'], images: [] },
      { name: 'Private Double', type: 'private', pricePerNight: 1800, capacity: 2, amenities: ['Attached bath', 'AC', 'WiFi'], images: [] },
    ],
    amenities: ['Rooftop terrace', 'Free WiFi', 'Common kitchen', 'Luggage storage', 'City maps', 'Tour desk', '24hr reception'],
    policies: { checkIn: '14:00', checkOut: '11:00', cancellation: 'Free cancellation up to 48 hours before check-in' },
    rating: 4.3,
    reviewCount: 892,
    isFeatured: true,
    contactPhone: '+91-9876543210',
  },
  {
    name: 'Pearl Palace Heritage',
    slug: 'pearl-palace-heritage-jaipur',
    destinationSlug: 'jaipur',
    type: 'hotel',
    description: 'An award-winning boutique heritage hotel in the heart of the Pink City. Each room is individually designed with Rajasthani murals, antique furniture, and Jaipur-blue pottery. The rooftop Peacock Restaurant is beloved by travellers worldwide.',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80'],
    address: 'Hathroi Fort, Ajmer Road, Jaipur 302001',
    coordinates: { lat: 26.9240, lng: 75.7791 },
    distanceFromCenter: 2.1,
    priceRange: { min: 2500, max: 6500 },
    roomTypes: [
      { name: 'Heritage Standard', type: 'private', pricePerNight: 2500, capacity: 2, amenities: ['AC', 'Hot water', 'WiFi', 'Satellite TV'], images: [] },
      { name: 'Deluxe Mural Room', type: 'deluxe', pricePerNight: 4200, capacity: 2, amenities: ['AC', 'Hot water', 'WiFi', 'Minibar', 'Balcony'], images: [] },
      { name: 'Maharaja Suite', type: 'suite', pricePerNight: 6500, capacity: 3, amenities: ['AC', 'Jacuzzi', 'Private terrace', 'Butler', 'Minibar'], images: [] },
    ],
    amenities: ['Rooftop restaurant', 'Free WiFi', 'Airport transfer', 'Heritage walks', 'Jewellery workshop', 'Ayurvedic spa'],
    policies: { checkIn: '12:00', checkOut: '12:00', cancellation: 'Free cancellation up to 72 hours before check-in' },
    rating: 4.7,
    reviewCount: 1240,
    isFeatured: true,
    contactPhone: '+91-9765432109',
  },
  {
    name: 'Zostel Rishikesh',
    slug: 'zostel-rishikesh',
    destinationSlug: 'rishikesh',
    type: 'hostel',
    description: 'Riverside hostel in Tapovan area with hammock garden, Ganga views, and a community of adventure seekers. The best base for rafting, yoga, and Himalayan day trips.',
    heroImage: 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=1200&q=80',
    images: [],
    address: 'Tapovan, Laxman Jhula, Rishikesh 249192',
    coordinates: { lat: 30.1358, lng: 78.3261 },
    distanceFromCenter: 3.0,
    priceRange: { min: 400, max: 1800 },
    roomTypes: [
      { name: '8-Bed Mixed Dorm', type: 'dorm', pricePerNight: 400, capacity: 8, amenities: ['Locker', 'Fan', 'Linen included'], images: [] },
      { name: '4-Bed Dorm', type: 'dorm', pricePerNight: 480, capacity: 4, amenities: ['Locker', 'Fan', 'Linen included', 'Mountain view'], images: [] },
      { name: 'Private with River View', type: 'private', pricePerNight: 1800, capacity: 2, amenities: ['River view', 'Attached bath', 'Fan'], images: [] },
    ],
    amenities: ['Riverside hammock garden', 'Free WiFi', 'Yoga deck', 'Rafting booking desk', 'Bonfire area', 'Common kitchen'],
    policies: { checkIn: '13:00', checkOut: '11:00', cancellation: 'Free cancellation up to 24 hours before check-in' },
    rating: 4.4,
    reviewCount: 1120,
    isFeatured: true,
    contactPhone: '+91-9654321098',
  },
  {
    name: 'The Ramada Udaipur Resort & Spa',
    slug: 'ramada-udaipur',
    destinationSlug: 'udaipur',
    type: 'resort',
    description: 'Lakeside resort with stunning views of the Aravalli hills and Lake Pichola. Features multiple pools, an Ayurvedic spa, rooftop dining, and curated heritage experiences.',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80'],
    address: 'Fateh Sagar Road, Udaipur, Rajasthan 313001',
    coordinates: { lat: 24.5900, lng: 73.6800 },
    distanceFromCenter: 2.5,
    priceRange: { min: 5500, max: 18000 },
    roomTypes: [
      { name: 'Deluxe Lake View', type: 'deluxe', pricePerNight: 5500, capacity: 2, amenities: ['Lake view', 'AC', 'WiFi', 'Minibar', 'Bathtub'], images: [] },
      { name: 'Premium Suite', type: 'suite', pricePerNight: 12000, capacity: 3, amenities: ['Private plunge pool', 'Butler service', 'Lake view terrace'], images: [] },
    ],
    amenities: ['Infinity pool', 'Ayurvedic spa', 'Rooftop restaurant', 'Boat transfers', 'Cooking classes', 'Sunset cruise'],
    policies: { checkIn: '14:00', checkOut: '12:00', cancellation: 'Free cancellation up to 7 days before arrival' },
    rating: 4.6,
    reviewCount: 760,
    isFeatured: true,
    contactPhone: '+91-9543210987',
  },
];

const foodsData = [
  {
    name: 'Laxmi Mishthan Bhandar (LMB)',
    destinationSlug: 'jaipur',
    type: 'veg',
    cuisine: 'rajasthani',
    description: "Jaipur's most iconic sweet shop and restaurant, in business since 1954. Famous for dal baati churma, ghewar, and an enormous sweet counter. A Jaipur institution.",
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
    dishes: [
      { name: 'Dal Baati Churma', price: 280, isSignature: true, isVeg: true },
      { name: 'Ghewar', price: 120, isSignature: true, isVeg: true },
      { name: 'Pyaaz Kachori', price: 60, isSignature: false, isVeg: true },
      { name: 'Mawa Kachori', price: 80, isSignature: true, isVeg: true },
      { name: 'Lassi', price: 80, isSignature: false, isVeg: true },
    ],
    priceRange: { min: 150, max: 600 },
    address: 'Johari Bazaar, Jaipur 302003',
    timings: { open: '08:00', close: '22:00' },
    rating: 4.5,
    mustTry: ['Dal Baati Churma', 'Ghewar', 'Mawa Kachori'],
    tags: ['iconic', 'sweets', 'rajasthani', 'thali', 'budget-friendly'],
  },
  {
    name: 'Chokhi Dhani Village Resort Restaurant',
    destinationSlug: 'jaipur',
    type: 'veg',
    cuisine: 'rajasthani',
    description: 'Authentic village-style Rajasthani thali experience in a folk-culture village resort. Served while seated on the floor with live folk music. The unlimited thali changes with seasonal produce.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
    dishes: [
      { name: 'Unlimited Rajasthani Thali', price: 850, isSignature: true, isVeg: true },
      { name: 'Ker Sangri', price: 0, isSignature: true, isVeg: true },
      { name: 'Gatte ki Sabzi', price: 0, isSignature: true, isVeg: true },
    ],
    priceRange: { min: 850, max: 1200 },
    address: 'Tonk Road, Vatika, Jaipur 303905',
    timings: { open: '17:30', close: '23:00' },
    rating: 4.3,
    mustTry: ['Unlimited Rajasthani Thali', 'Ker Sangri'],
    tags: ['cultural', 'thali', 'village-experience', 'folk-music', 'family'],
  },
  {
    name: "Chotiwala Restaurant",
    destinationSlug: 'rishikesh',
    type: 'veg',
    cuisine: 'north-indian',
    description: "Rishikesh's most famous vegetarian restaurant for over 50 years, right on the banks of the Ganga near Ram Jhula. Known for its mascot — the red-painted Chotiwala man at the entrance.",
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
    dishes: [
      { name: 'Thali', price: 180, isSignature: true, isVeg: true },
      { name: 'Aloo Puri', price: 90, isSignature: false, isVeg: true },
      { name: 'Lassi', price: 60, isSignature: false, isVeg: true },
      { name: 'Kheer', price: 70, isSignature: false, isVeg: true },
    ],
    priceRange: { min: 80, max: 300 },
    address: 'Ram Jhula, Swarg Ashram, Rishikesh 249304',
    timings: { open: '08:00', close: '22:00' },
    rating: 4.1,
    mustTry: ['Thali', 'Lassi'],
    tags: ['iconic', 'budget', 'ganga-view', 'vegetarian', 'pilgrims'],
  },
  {
    name: 'Little Buddha Cafe',
    destinationSlug: 'rishikesh',
    type: 'veg',
    cuisine: 'cafe',
    description: 'Beloved backpacker café perched above the Ganga at Laxman Jhula. Offers an eclectic menu of Israeli, Italian, and Indian food. The terrace with hammocks and river views is legendary.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    dishes: [
      { name: 'Shakshuka', price: 220, isSignature: true, isVeg: true },
      { name: 'Banana Pancakes', price: 150, isSignature: true, isVeg: true },
      { name: 'Hummus Platter', price: 180, isSignature: false, isVeg: true },
      { name: 'Masala Chai', price: 60, isSignature: false, isVeg: true },
      { name: 'Fresh Juice', price: 100, isSignature: false, isVeg: true },
    ],
    priceRange: { min: 100, max: 400 },
    address: 'Near Laxman Jhula, Tapovan, Rishikesh 249192',
    timings: { open: '07:30', close: '21:30' },
    rating: 4.4,
    mustTry: ['Shakshuka', 'Banana Pancakes'],
    tags: ['backpacker', 'cafe', 'river-view', 'eclectic', 'hammocks'],
  },
  {
    name: 'Ambrai Restaurant',
    destinationSlug: 'udaipur',
    type: 'veg',
    cuisine: 'rajasthani',
    description: 'Udaipur\'s most romantic dining experience, right on the edge of Lake Pichola with unobstructed views of the City Palace and Jagmandir. The sunset here is extraordinary.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    dishes: [
      { name: 'Dal Baati', price: 350, isSignature: true, isVeg: true },
      { name: 'Laal Maas', price: 480, isSignature: false, isVeg: false },
      { name: 'Murgh Jaipuri', price: 420, isSignature: false, isVeg: false },
      { name: 'Malpua with Rabri', price: 220, isSignature: true, isVeg: true },
    ],
    priceRange: { min: 400, max: 1500 },
    address: 'Amet Haveli, Outside Chandpole, Udaipur 313001',
    timings: { open: '12:00', close: '22:30' },
    rating: 4.6,
    mustTry: ['Dal Baati', 'Malpua with Rabri'],
    tags: ['romantic', 'lake-view', 'city-palace-view', 'fine-dining', 'sunset'],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Destination.deleteMany({}),
      Stay.deleteMany({}),
      Food.deleteMany({}),
      User.deleteMany({ role: { $ne: 'admin' } }),
    ]);
    console.log('Cleared existing data');

    // Insert destinations
    const insertedDestinations = await Destination.insertMany(destinations);
    console.log(`Inserted ${insertedDestinations.length} destinations`);

    // Build slug → _id map
    const destMap = {};
    for (const d of insertedDestinations) {
      destMap[d.slug] = d._id;
    }

    // Insert stays with resolved destination IDs
    const staysWithIds = staysData.map(({ destinationSlug, ...stay }) => ({
      ...stay,
      destination: destMap[destinationSlug],
    }));
    const insertedStays = await Stay.insertMany(staysWithIds);
    console.log(`Inserted ${insertedStays.length} stays`);

    // Insert foods with resolved destination IDs
    const foodsWithIds = foodsData.map(({ destinationSlug, ...food }) => ({
      ...food,
      destination: destMap[destinationSlug],
    }));
    const insertedFoods = await Food.insertMany(foodsWithIds);
    console.log(`Inserted ${insertedFoods.length} food entries`);

    // Create admin user
    const admin = await User.create({
      name: 'YATRA Admin',
      email: 'admin@yatra.dev',
      password: 'yatraAdmin@2024',
      role: 'admin',
    });
    console.log(`Admin user created: ${admin.email}`);

    console.log('\n✅ Seed completed successfully');
    console.log('='.repeat(40));
    console.log(`Destinations : ${insertedDestinations.length}`);
    console.log(`Stays        : ${insertedStays.length}`);
    console.log(`Food entries : ${insertedFoods.length}`);
    console.log(`Admin email  : admin@yatra.dev`);
    console.log(`Admin pass   : yatraAdmin@2024`);
    console.log('='.repeat(40));
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
