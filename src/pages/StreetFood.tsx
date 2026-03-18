import { motion } from "framer-motion";
import { Star, MapPin, IndianRupee, Map as MapIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const streetFoods = [
  {
    id: 1,
    name: "Pani Puri (Gol Gappa)",
    location: "Delhi",
    description: "Crisp hollow spheres filled with spicy tangy water, potatoes, and chickpeas. A burst of flavors in every bite.",
    quality: "Excellent hygienic preparation with mineral water used for the tangy mix.",
    price: "₹200 - ₹500"
  },
  {
    id: 2,
    name: "Vada Pav",
    location: "Mumbai",
    description: "Spicy potato dumpling coated in gram flour batter, deep-fried and served in a warm bread bun with garlic and green chutneys.",
    quality: "High-quality ingredients and authentic Maharashtrian street-style taste.",
    price: "₹200 - ₹500"
  },
  {
    id: 3,
    name: "Pav Bhaji",
    location: "Mumbai",
    description: "A spicy curry of mixed vegetables cooked in a special blend of spices and served with soft buttered bread rolls.",
    quality: "Fresh vegetables, rich butter, and perfectly toasted pavs.",
    price: "₹200 - ₹500"
  },
  {
    id: 4,
    name: "Chole Bhature",
    location: "Delhi",
    description: "A mouthwatering combination of chana masala (spicy white chickpeas) and bhatura (a deep-fried bread made from refined flour).",
    quality: "Deep-fried to golden perfection with authentic Punjabi spices.",
    price: "₹200 - ₹500"
  },
  {
    id: 5,
    name: "Momos",
    location: "Delhi",
    description: "Steamed or fried dumplings filled with vegetables or meat, served with a fiery red chili and garlic chutney.",
    quality: "Thin translucent wrappers, juicy filling, and highly hygienic.",
    price: "₹200 - ₹500"
  },
  {
    id: 6,
    name: "Dabeli",
    location: "Gujarat",
    description: "A sweet, tangy and spicy potato mixture filled in a bun, generously garnished with pomegranate, roasted peanuts, and sev.",
    quality: "Perfectly balanced flavor profile with fresh garnishes.",
    price: "₹200 - ₹500"
  },
  {
    id: 7,
    name: "Kathi Roll",
    location: "Kolkata",
    description: "Skewer-roasted kebab and veggies wrapped in a crisp paratha layered with egg, onions, and sauces.",
    quality: "Freshly handmade parathas and succulent, well-marinated filling.",
    price: "₹200 - ₹500"
  },
  {
    id: 8,
    name: "Mirchi Bajji",
    location: "Hyderabad",
    description: "Spicy green chili peppers coated in gram flour batter and deep-fried, often split and stuffed with a tangy onion mixture.",
    quality: "Crispy on the outside, perfectly spiced, and fried in pure oil.",
    price: "₹200 - ₹500"
  },
  {
    id: 9,
    name: "Jalebi & Fafda",
    location: "Ahmedabad",
    description: "A classic sweet and savory breakfast combination of crispy sugar-syrup soaked jalebis and crunchy fafda made of gram flour.",
    quality: "Freshly fried every morning in premium cooking medium.",
    price: "₹200 - ₹500"
  },
  {
    id: 10,
    name: "Egg Bhurji",
    location: "Mumbai",
    description: "Indian-style spiced scrambled eggs cooked with finely chopped onions, tomatoes, green chilies, and fresh coriander.",
    quality: "Farm-fresh eggs cooked rapidly on a hot tawa with vibrant spices.",
    price: "₹200 - ₹500"
  },
  {
    id: 11,
    name: "Samosa Chaat",
    location: "Varanasi",
    description: "Crushed hot samosas topped with spicy chickpea curry, sweetened yogurt, tamarind chutney, and fresh mint chutney.",
    quality: "A perfect balance of sweet, spicy, and tangy, served fresh.",
    price: "₹200 - ₹500"
  },
  {
    id: 12,
    name: "Poha Jalebi",
    location: "Indore",
    description: "Flattened rice cooked beautifully with turmeric, onions, and peanuts, served alongside hot, sweet jalebis and topped with sev.",
    quality: "Light, fluffy poha and perfectly crisp, syrupy jalebis.",
    price: "₹200 - ₹500"
  },
  {
    id: 13,
    name: "Aloo Tikki",
    location: "Delhi",
    description: "Golden, crisp-fried potato patties served with an accompaniment of ragda (white pea curry) and various rich chutneys.",
    quality: "Extraordinarily crisp exterior with a soft, flavorful interior.",
    price: "₹200 - ₹500"
  },
  {
    id: 14,
    name: "Puchka",
    location: "Kolkata",
    description: "The classic Kolkata version of Pani Puri, slightly larger and filled with an intensely spicy potato and black gram mixture.",
    quality: "Authentic spicy tamarind water, carefully balanced ingredients.",
    price: "₹200 - ₹500"
  },
  {
    id: 15,
    name: "Bhutta (Roasted Corn)",
    location: "Mumbai",
    description: "Fresh corn on the cob roasted over hot coals, generously rubbed with a mixture of lemon, rock salt, and red chili powder.",
    quality: "Freshly picked sweet corn, roasted to smoky perfection.",
    price: "₹200 - ₹500"
  },
  {
    id: 16,
    name: "Litti Chokha",
    location: "Bihar",
    description: "Whole wheat dough balls stuffed with spiced sattu (roasted chickpea flour), served with a smoky mashed eggplant and potato chokha.",
    quality: "Traditionally roasted on cow dung cakes for the authentic smoky taste.",
    price: "₹200 - ₹500"
  },
  {
    id: 17,
    name: "Bhel Puri",
    location: "Mumbai",
    description: "A popular savory street snack made from puffed rice, crunchy sev, onions, potatoes, and a tangy tamarind-date sauce.",
    quality: "Crunchy, light, refreshing, and perfectly spiced.",
    price: "₹200 - ₹500"
  },
  {
    id: 18,
    name: "Misal Pav",
    location: "Pune",
    description: "A fiery and highly flavorful curry usually made from sprouted moth beans, topped with crunchy farsan and served with bread.",
    quality: "Rich authentic Kat (spicy oil layer), delightful and deeply flavorful.",
    price: "₹200 - ₹500"
  },
  {
    id: 19,
    name: "Khasta Kachori",
    location: "Jaipur",
    description: "Crisp, flaky, deep-fried pastry filled with a very spicy and savory moong dal mixture, served with sweet and spicy chutneys.",
    quality: "Perfect flaky texture, deep-fried correctly to ensure a long shelf life.",
    price: "₹200 - ₹500"
  },
  {
    id: 20,
    name: "Ram Ladoo",
    location: "Delhi",
    description: "Deep-fried, crispy moong dal fritters topped generously with freshly grated radish and zesty green mint-coriander chutney.",
    quality: "Served hot and fresh out of the wok, very light and fluffy inside.",
    price: "₹200 - ₹500"
  }
];

const StreetFood = () => {
  const navigate = useNavigate();

  const handleVisitPlace = (location: string) => {
    navigate(`/explore?location=${encodeURIComponent(location)}`);
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <div className="pt-24 container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Discover Incredible Street Food
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the vibrant and bustling streets of India through 20 iconic culinary delights.
            A feast of spices, textures, and aromas awaits you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {streetFoods.map((food, index) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-xl text-foreground leading-tight">
                  {food.name}
                </h3>
              </div>
              
              <div className="flex items-center text-muted-foreground mb-3 text-sm">
                <MapPin className="w-4 h-4 mr-1 text-primary" />
                {food.location}
              </div>

              <div className="flex-1 space-y-3">
                <p className="text-sm text-foreground/80">
                  <span className="font-medium text-foreground">Description:</span> {food.description}
                </p>
                <p className="text-sm text-foreground/80">
                  <span className="font-medium text-foreground">Quality:</span> {food.quality}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-primary font-semibold">
                    <span>{food.price}</span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleVisitPlace(food.location)}
                  className="w-full flex items-center justify-center gap-2"
                  variant="default"
                >
                  <MapIcon className="w-4 h-4" />
                  Visit Place on Map
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreetFood;
