import foodImg from "@/assets/food-experience.jpg";
import culturalImg from "@/assets/cultural-experience.jpg";
import adventureImg from "@/assets/adventure-experience.jpg";
import shoppingImg from "@/assets/shopping-experience.jpg";

export type Category = "Food" | "Cultural" | "Adventure" | "Shopping";

export interface Experience {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: Category;
  image: string;
  location: string;
  city: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
  vendor: string;
  vendorVerified: boolean;
  tags: string[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Old Delhi Street Food Walk",
    description: "Taste 10+ iconic dishes through the narrow lanes of Chandni Chowk with a local foodie guide.",
    longDescription: "Embark on a 3-hour culinary adventure through the legendary streets of Chandni Chowk. Your local guide will take you to hidden gems that have been serving authentic Delhi food for generations. From crispy paranthas at Paranthe Wali Gali to creamy lassi and jalebi, experience the flavors that define Old Delhi.",
    category: "Food",
    image: foodImg,
    location: "Chandni Chowk",
    city: "Delhi",
    price: 950,
    rating: 4.8,
    reviewCount: 342,
    duration: "3 hours",
    vendor: "Delhi Food Trails",
    vendorVerified: true,
    tags: ["Street Food", "Walking Tour", "Local Guide"],
  },
  {
    id: "2",
    title: "Bharatanatyam Temple Performance",
    description: "Watch a live classical dance performance at an ancient South Indian temple.",
    longDescription: "Experience the magic of Bharatanatyam in its most authentic setting — a centuries-old temple in Mahabalipuram. The performance by award-winning dancer Priya Natarajan tells stories from Indian mythology through expressive movement and rhythm.",
    category: "Cultural",
    image: culturalImg,
    location: "Shore Temple",
    city: "Mahabalipuram",
    price: 800,
    rating: 4.9,
    reviewCount: 187,
    duration: "1.5 hours",
    vendor: "Heritage Arts Collective",
    vendorVerified: true,
    tags: ["Dance", "Temple", "Heritage"],
  },
  {
    id: "3",
    title: "Rishikesh White Water Rafting",
    description: "Navigate Grade III-IV rapids on the Ganges with experienced local rafting guides.",
    longDescription: "Feel the adrenaline rush as you tackle the thrilling rapids of the Ganges near Rishikesh. Our certified local guides ensure safety while delivering an unforgettable adventure. Includes all equipment, safety briefing, and riverside snacks.",
    category: "Adventure",
    image: adventureImg,
    location: "Shivpuri",
    city: "Rishikesh",
    price: 900,
    rating: 4.7,
    reviewCount: 521,
    duration: "4 hours",
    vendor: "Ganga Adventures",
    vendorVerified: true,
    tags: ["Rafting", "River", "Thrilling"],
  },
  {
    id: "4",
    title: "Marble Inlay Workshop with Artisan",
    description: "Learn the ancient Mughal art of marble inlay from a 5th-generation craftsman near Taj Mahal.",
    longDescription: "Step into the workshop of Mohammad Sharif, a 5th-generation marble inlay artisan whose ancestors worked on the Taj Mahal. Learn the painstaking process of cutting semi-precious stones and embedding them into marble. Take home your own small creation.",
    category: "Shopping",
    image: shoppingImg,
    location: "Near Taj Mahal",
    city: "Agra",
    price: 850,
    rating: 4.9,
    reviewCount: 156,
    duration: "2.5 hours",
    vendor: "Sharif Marble Arts",
    vendorVerified: true,
    tags: ["Handicraft", "Workshop", "Artisan"],
  },
  {
    id: "5",
    title: "Hyderabadi Biryani Masterclass",
    description: "Cook authentic Hyderabadi dum biryani with a local home chef in their kitchen.",
    longDescription: "Join Fatima Begum in her traditional Hyderabadi home and learn the secrets of making the world-famous dum biryani. From selecting spices at the local market to the final dum cooking process, this is an immersive culinary experience.",
    category: "Food",
    image: foodImg,
    location: "Old City",
    city: "Hyderabad",
    price: 750,
    rating: 4.8,
    reviewCount: 89,
    duration: "3.5 hours",
    vendor: "Home Kitchen Hyderabad",
    vendorVerified: true,
    tags: ["Cooking Class", "Biryani", "Home Chef"],
  },
  {
    id: "6",
    title: "Pearl Market Walking Tour",
    description: "Explore Hyderabad's hidden pearl markets near Charminar with an expert guide.",
    longDescription: "Discover the pearl trading heritage of Hyderabad with a guided walk through the bustling markets near Charminar. Learn to identify quality pearls, visit century-old pearl shops, and understand the art of pearl stringing.",
    category: "Shopping",
    image: shoppingImg,
    location: "Charminar",
    city: "Hyderabad",
    price: 600,
    rating: 4.6,
    reviewCount: 234,
    duration: "2 hours",
    vendor: "Deccan Heritage Walks",
    vendorVerified: true,
    tags: ["Pearls", "Market", "Heritage Walk"],
  },
];

export const categories: { name: Category; icon: string; count: number }[] = [
  { name: "Food", icon: "🍛", count: 2400 },
  { name: "Cultural", icon: "🎭", count: 1800 },
  { name: "Adventure", icon: "🏔️", count: 1200 },
  { name: "Shopping", icon: "🛍️", count: 960 },
];

export const popularCities = [
  { name: "Delhi", experiences: 480 },
  { name: "Mumbai", experiences: 450 },
  { name: "Jaipur", experiences: 320 },
  { name: "Goa", experiences: 410 },
  { name: "Varanasi", experiences: 290 },
  { name: "Agra", experiences: 220 },
  { name: "Taj Mahal", experiences: 215 },
  { name: "Udaipur", experiences: 280 },
  { name: "Manali", experiences: 310 },
  { name: "Shimla", experiences: 260 },
  { name: "Darjeeling", experiences: 190 },
  { name: "Ooty", experiences: 220 },
  { name: "Amritsar", experiences: 240 },
  { name: "Tirupati", experiences: 300 },
  { name: "Rishikesh", experiences: 350 },
  { name: "Leh", experiences: 180 },
  { name: "Kochi", experiences: 270 },
  { name: "Alappuzha", experiences: 210 },
  { name: "Puri", experiences: 150 },
  { name: "Mysuru", experiences: 190 },
];
