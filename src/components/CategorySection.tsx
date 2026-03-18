import { categories } from "@/data/experiences";
import { motion } from "framer-motion";

interface Props {
  activeCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
}

const CategorySection = ({ activeCategory, onCategoryChange }: Props) => {
  return (
    <section id="explore" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
            Explore by Category
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            From sizzling street food to thrilling adventures — find what moves you.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onCategoryChange(activeCategory === cat.name ? null : cat.name)}
              className={`p-6 rounded-2xl border-2 transition-all text-center group ${
                activeCategory === cat.name
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <span className="text-4xl block mb-3">{cat.icon}</span>
              <span className="font-semibold text-foreground block">{cat.name}</span>
              <span className="text-sm text-muted-foreground">{cat.count.toLocaleString()}+ experiences</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
