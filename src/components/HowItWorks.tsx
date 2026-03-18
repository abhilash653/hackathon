import { Search, CalendarCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: Search, title: "Discover", desc: "Browse authentic local experiences curated by verified vendors near you." },
  { icon: CalendarCheck, title: "Book Instantly", desc: "Reserve your spot with secure online payments. No middlemen." },
  { icon: Sparkles, title: "Experience", desc: "Enjoy unique, unforgettable moments with passionate local experts." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-muted/50">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">How LocalLens Works</h2>
        <p className="text-muted-foreground">Three simple steps to your next unforgettable experience.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <step.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
