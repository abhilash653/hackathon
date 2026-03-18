import { X, Star, MapPin, Clock, BadgeCheck, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/data/experiences";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  experience: Experience | null;
  onClose: () => void;
}

const ExperienceDetail = ({ experience, onClose }: Props) => {
  if (!experience) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-background rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="relative h-64 sm:h-80">
            <img src={experience.image} alt={experience.title} className="w-full h-full object-cover sm:rounded-t-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-2 mb-2">
                {experience.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground text-xs border-none">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="font-display text-2xl text-foreground mb-1">{experience.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}, {experience.city}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold text-foreground">₹{experience.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">per person</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6 text-sm">
              <span className="flex items-center gap-1 text-saffron font-semibold">
                <Star className="w-4 h-4 fill-current" /> {experience.rating}
              </span>
              <span className="text-muted-foreground">({experience.reviewCount} reviews)</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" /> {experience.duration}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-2">About this experience</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{experience.longDescription}</p>
            </div>

            <div className="p-4 rounded-xl bg-muted mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm flex items-center gap-1">
                  {experience.vendor}
                  {experience.vendorVerified && <BadgeCheck className="w-4 h-4 text-secondary" />}
                </p>
                <p className="text-xs text-muted-foreground">Local Experience Provider</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 rounded-xl h-12 text-base" size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Book Now
              </Button>
              <Button variant="outline" className="rounded-xl h-12" size="lg">
                Save
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExperienceDetail;
