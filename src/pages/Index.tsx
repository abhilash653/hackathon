import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ExperienceCard from "@/components/ExperienceCard";
import ExperienceDetail from "@/components/ExperienceDetail";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { experiences as fallbackExperiences, popularCities } from "@/data/experiences";
import type { Experience } from "@/data/experiences";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import images for mapping
import foodImg from "@/assets/food-experience.jpg";
import culturalImg from "@/assets/cultural-experience.jpg";
import adventureImg from "@/assets/adventure-experience.jpg";
import shoppingImg from "@/assets/shopping-experience.jpg";

const categoryImages: Record<string, string> = {
  Food: foodImg,
  Cultural: culturalImg,
  Adventure: adventureImg,
  Shopping: shoppingImg,
};

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>(fallbackExperiences);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data, error } = await supabase.from("experiences").select("*").eq("is_active", true).limit(8);
      if (!error && data && data.length > 0) {
        const mapped: Experience[] = data.map((d) => ({
          id: d.id,
          title: d.title,
          description: d.description,
          longDescription: d.long_description || d.description,
          category: d.category as Experience["category"],
          image: d.image_url || categoryImages[d.category] || foodImg,
          location: d.location,
          city: d.city,
          price: d.price,
          rating: Number(d.rating),
          reviewCount: d.review_count,
          duration: d.duration || "",
          vendor: d.vendor_name || "Local Vendor",
          vendorVerified: d.vendor_verified,
          tags: d.tags || [],
        }));
        setExperiences(mapped);
      }
    };
    fetchExperiences();
  }, []);

  const filtered = useMemo(
    () => activeCategory ? experiences.filter((e) => e.category === activeCategory) : experiences,
    [activeCategory, experiences]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategorySection activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display text-foreground">
              {activeCategory ? `${activeCategory} Experiences` : "Featured Experiences"}
            </h2>
            <span className="text-sm text-muted-foreground">{filtered.length} experiences</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} index={i} onClick={setSelectedExperience} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section id="destinations" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">Popular Destinations</h2>
            <p className="text-muted-foreground">Start exploring India's most loved cities.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCities.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/explore?location=${encodeURIComponent(city.name)}`)}
                className="p-5 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer text-center group"
              >
                <MapPin className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-foreground">{city.name}</p>
                <p className="text-xs text-muted-foreground">{city.experiences}+ experiences</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display text-primary-foreground mb-4">
            Are You a Local Business?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Join 10,000+ vendors on LocalLens. Get digital visibility, receive bookings, and grow your business.
          </p>
          <button onClick={() => navigate('/local-business')} className="bg-background text-foreground font-semibold px-8 py-3 rounded-xl hover:bg-background/90 transition-colors">
            Register Your Business — Free
          </button>
        </div>
      </section>

      <Footer />
      <ExperienceDetail experience={selectedExperience} onClose={() => setSelectedExperience(null)} />
    </div>
  );
};

export default Index;
