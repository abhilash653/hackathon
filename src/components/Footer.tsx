import { MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-teal-deep text-secondary-foreground py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl">LocalLens</span>
          </div>
          <p className="text-sm opacity-70">Connecting tourists with India's most authentic local experiences.</p>
        </div>
        {[
          { title: "Explore", links: ["Food Tours", "Cultural", "Adventure", "Shopping"] },
          { title: "For Vendors", links: ["List Business", "Dashboard", "Pricing", "Support"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold mb-4 text-sm">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-8 border-t border-secondary-foreground/20 text-center text-sm opacity-50">
        © 2026 LocalLens. Made with ❤️ in India.
      </div>
    </div>
  </footer>
);

export default Footer;
