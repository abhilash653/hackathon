import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-bazaar.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [experienceQuery, setExperienceQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationQuery.trim() || experienceQuery.trim()) {
      const params = new URLSearchParams();
      if (locationQuery.trim()) params.append('location', locationQuery.trim());
      if (experienceQuery.trim()) params.append('query', experienceQuery.trim());
      navigate(`/explore?${params.toString()}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Vibrant Indian bazaar" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-16">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary font-semibold text-sm tracking-widest uppercase mb-4"
          >
            Discover Authentic India
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display text-primary-foreground leading-tight mb-6"
          >
            Experience India
            <br />
            <span className="text-primary">Like a Local</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-primary-foreground/80 mb-8 max-w-lg"
          >
            Connect with verified local guides, artisans, and food vendors. 
            Discover hidden gems that no guidebook will tell you about.
          </motion.p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="bg-background/95 backdrop-blur-sm rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 px-4 flex-1"
            >
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="What do you want to experience?"
                className="w-full py-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                value={experienceQuery}
                onChange={(e) => setExperienceQuery(e.target.value)}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 px-4 border-t sm:border-t-0 sm:border-l border-border flex-1"
            >
              <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Where? (e.g., Jaipur)"
                className="w-full py-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="shrink-0"
            >
              <Button type="submit" size="lg" className="rounded-xl px-8 w-full sm:w-auto">
                Search
              </Button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex items-center gap-6 text-primary-foreground/60 text-sm"
          >
            <span>🔥 Trending:</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Jaipur Food Walk</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Varanasi Boat Ride</span>
            <span className="hidden sm:inline hover:text-primary cursor-pointer transition-colors">Kerala Houseboat</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
