import { Star, MapPin, Clock, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/data/experiences";
import { motion } from "framer-motion";

interface Props {
  experience: Experience;
  index: number;
  onClick: (exp: Experience) => void;
}

const ExperienceCard = ({ experience, index, onClick }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onClick(experience)}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-sm border-none">
          {experience.category}
        </Badge>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>{experience.location}, {experience.city}</span>
        </div>

        <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {experience.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {experience.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-saffron font-semibold">
              <Star className="w-4 h-4 fill-current" />
              {experience.rating}
            </span>
            <span className="text-muted-foreground">({experience.reviewCount})</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {experience.duration}
            </span>
          </div>
          <span className="font-semibold text-foreground">
            ₹{experience.price.toLocaleString()}
          </span>
        </div>

        {experience.vendorVerified && (
          <div className="mt-3 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-secondary">
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>Verified Vendor</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
