import { useState, useRef, useEffect } from "react";
import { MapPin, Menu, X, ChevronDown, Map, Utensils, Languages, CalendarCheck, Store, UserPlus, ShieldAlert, LogOut, User, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

// ─── Dropdown Types ────────────────────────────────────────────────────────────
interface DropdownItem { label: string; to: string; icon: React.ReactNode; hash?: boolean; }
interface NavDropdown { label: string; items: DropdownItem[]; }

const EXPLORE_DROPDOWN: NavDropdown = {
  label: "Explore",
  items: [
    { label: "Explore Map", to: "/explore", icon: <Map className="w-4 h-4" /> },
    { label: "Street Food", to: "/street-food", icon: <Utensils className="w-4 h-4" /> },
    { label: "Translate", to: "/translate", icon: <Languages className="w-4 h-4" /> },
  ],
};

const JOIN_DROPDOWN: NavDropdown = {
  label: "Join Us",
  items: [
    { label: "Register Business", to: "/local-business", icon: <Store className="w-4 h-4" /> },
    { label: "Become a Guide", to: "/guide-registration", icon: <UserPlus className="w-4 h-4" /> },
  ],
};

// ─── Dropdown Component ────────────────────────────────────────────────────────
const NavDropdownMenu = ({ group }: { group: NavDropdown }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {group.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-52 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
          >
            {group.items.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <span className="text-primary">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── User Avatar Dropdown ──────────────────────────────────────────────────────
const UserMenu = ({ email, onSignOut }: { email: string; onSignOut: () => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initials = email ? email[0].toUpperCase() : "U";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 transition-colors rounded-full pl-2 pr-3 py-1.5"
      >
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
          {initials}
        </div>
        <span className="text-sm font-medium text-foreground max-w-[100px] truncate">{email.split("@")[0]}</span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-border">
              <p className="text-xs text-muted-foreground">Signed in as</p>
              <p className="text-sm font-medium text-foreground truncate">{email}</p>
            </div>
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-primary" /> Admin Panel
            </Link>
            <button
              onClick={() => { setOpen(false); onSignOut(); }}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Navbar ───────────────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl text-foreground">LocalLens</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          <HashLink smooth to="/#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </HashLink>
          <NavDropdownMenu group={EXPLORE_DROPDOWN} />
          <Link to="/bookings" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Bookings
          </Link>
          <NavDropdownMenu group={JOIN_DROPDOWN} />
          <HashLink smooth to="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </HashLink>
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <UserMenu email={user.email || ""} onSignOut={signOut} />
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>Sign In</Button>
              <Button size="sm" onClick={() => navigate("/auth")}>Get Started</Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              <HashLink smooth to="/#" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <MapPin className="w-4 h-4 text-primary" /> Home
              </HashLink>

              <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider px-3 pt-3 pb-1">Explore</p>
              <Link to="/explore" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Map className="w-4 h-4 text-primary" /> Explore Map
              </Link>
              <Link to="/street-food" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Utensils className="w-4 h-4 text-primary" /> Street Food
              </Link>
              <Link to="/translate" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Languages className="w-4 h-4 text-primary" /> Translate
              </Link>
              <Link to="/bookings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <CalendarCheck className="w-4 h-4 text-primary" /> Bookings
              </Link>

              <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider px-3 pt-3 pb-1">Join Us</p>
              <Link to="/local-business" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Store className="w-4 h-4 text-primary" /> Register Business
              </Link>
              <Link to="/guide-registration" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <UserPlus className="w-4 h-4 text-primary" /> Become a Guide
              </Link>
              <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <ShieldAlert className="w-4 h-4 text-primary" /> Admin Panel
              </Link>
              <HashLink smooth to="/#how-it-works" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Info className="w-4 h-4 text-primary" /> How It Works
              </HashLink>

              <div className="border-t border-border mt-3 pt-3">
                {user ? (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground px-3 truncate">{user.email}</p>
                    <Button size="sm" variant="ghost" className="w-full text-red-500 hover:text-red-500" onClick={() => { signOut(); setIsOpen(false); }}>
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" className="w-full" onClick={() => { navigate("/auth"); setIsOpen(false); }}>Get Started</Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
