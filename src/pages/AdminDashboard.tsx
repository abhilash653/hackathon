import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Users, UserIcon, Utensils, ShieldAlert, Store, TrendingUp, MapPin, Star, CheckCircle2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Mock Data
const MOCK_USERS = [
  { id: "usr_1", name: "Ramesh Kumar", email: "ramesh@example.com", joined: "2023-10-12", role: "Tourist" },
  { id: "usr_2", name: "Priya Desai", email: "priya@example.com", joined: "2023-11-05", role: "Tourist" },
  { id: "usr_3", name: "Fatima Syed", email: "fatima@example.com", joined: "2024-01-22", role: "Tourist" },
  { id: "usr_4", name: "Michael Chen", email: "michael@example.com", joined: "2024-02-15", role: "Tourist" },
];

const MOCK_STREET_FOOD = [
  { id: 1, name: "Pani Puri (Gol Gappa)", location: "Delhi", price: "₹20 - ₹50" },
  { id: 2, name: "Vada Pav", location: "Mumbai", price: "₹15 - ₹40" },
  { id: 3, name: "Pav Bhaji", location: "Mumbai", price: "₹80 - ₹150" },
  { id: 4, name: "Chole Bhature", location: "Delhi", price: "₹60 - ₹120" },
  { id: 5, name: "Momos", location: "Delhi", price: "₹50 - ₹100" },
  { id: 6, name: "Dahi Puri", location: "Mumbai", price: "₹30 - ₹60" },
];

// Avatar initials helper
const getInitials = (name: string) => {
  if (!name || name === "Unknown User") return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

// Avatar color based on name
const getAvatarColor = (name: string) => {
  const colors = [
    "bg-violet-500", "bg-blue-500", "bg-emerald-500", 
    "bg-orange-500", "bg-pink-500", "bg-cyan-500", "bg-amber-500"
  ];
  const idx = name ? name.charCodeAt(0) % colors.length : 0;
  return colors[idx];
};

type TabType = "users" | "guides" | "food" | "businesses";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [localGuides, setLocalGuides] = useState<any[]>([]);
  const [localBusinesses, setLocalBusinesses] = useState<any[]>([]);
  const [localUsers, setLocalUsers] = useState<any[]>(MOCK_USERS);

  useEffect(() => {
    try {
      const storedGuides = localStorage.getItem("verified_guides");
      if (storedGuides) setLocalGuides(JSON.parse(storedGuides));
      const storedBusinesses = localStorage.getItem("local_businesses");
      if (storedBusinesses) setLocalBusinesses(JSON.parse(storedBusinesses));
    } catch (e) {
      console.error("Failed to parse local admin data", e);
    }

    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });
        if (data && !error) {
          const formatted = data.map((p: any) => ({
            id: p.user_id || `usr_${Date.now()}`,
            name: p.display_name || "Unknown User",
            email: "—",
            joined: p.created_at ? new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "N/A",
            role: (p.role || "tourist").charAt(0).toUpperCase() + (p.role || "tourist").slice(1),
          }));
          setLocalUsers([...formatted, ...MOCK_USERS]);
        }
      } catch (err) {
        console.error("Failed to fetch supabase profiles", err);
      }
    };
    fetchUsers();
  }, []);

  const tabs: { key: TabType; label: string; icon: React.ReactNode; count: number }[] = [
    { key: "users", label: "Users", icon: <UserIcon className="w-4 h-4" />, count: localUsers.length },
    { key: "guides", label: "Local Guides", icon: <Users className="w-4 h-4" />, count: localGuides.length },
    { key: "food", label: "Street Food", icon: <Utensils className="w-4 h-4" />, count: MOCK_STREET_FOOD.length },
    { key: "businesses", label: "Businesses", icon: <Store className="w-4 h-4" />, count: localBusinesses.length },
  ];

  const statCards = [
    { label: "Total Users", value: localUsers.length, icon: <UserIcon className="w-6 h-6" />, color: "from-violet-500 to-violet-700" },
    { label: "Verified Guides", value: localGuides.length, icon: <Users className="w-6 h-6" />, color: "from-blue-500 to-blue-700" },
    { label: "Registered Businesses", value: localBusinesses.length, icon: <Store className="w-6 h-6" />, color: "from-emerald-500 to-emerald-700" },
    { label: "Street Food Items", value: MOCK_STREET_FOOD.length, icon: <Utensils className="w-6 h-6" />, color: "from-orange-500 to-orange-700" },
  ];

  const EmptyState = ({ message }: { message: string }) => (
    <TableRow>
      <TableCell colSpan={10} className="text-center py-16">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <TrendingUp className="w-8 h-8 opacity-30" />
          <p className="text-sm">{message}</p>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 rounded-2xl bg-primary/10">
            <ShieldAlert className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Manage users, guides, food listings and businesses</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-5 flex items-center gap-4 shadow-md`}
            >
              <div className="bg-white/20 p-2.5 rounded-xl">{stat.icon}</div>
              <div>
                <p className="text-3xl font-bold leading-tight">{stat.value}</p>
                <p className="text-xs text-white/80 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                activeTab === tab.key ? "bg-white/20" : "bg-muted"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">

          {/* Users Table */}
          {activeTab === "users" && (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="w-10 pl-6">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localUsers.map((user, i) => (
                  <TableRow key={`${user.id}-${i}`} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 text-muted-foreground text-sm">{i + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${getAvatarColor(user.name)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                          {getInitials(user.name)}
                        </div>
                        <span className="font-medium text-sm">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.joined}</TableCell>
                    <TableCell>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-primary/10 text-primary">
                        {user.role}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Guides Table */}
          {activeTab === "guides" && (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="pl-6">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Price / Day</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localGuides.length === 0 ? (
                  <EmptyState message="No guides registered yet. Guides appear here once verified." />
                ) : (
                  localGuides.map((guide, i) => (
                    <TableRow key={guide.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="pl-6 text-muted-foreground text-sm">{i + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${getAvatarColor(guide.name)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                            {getInitials(guide.name)}
                          </div>
                          <span className="font-medium text-sm">{guide.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" /> {guide.location}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-sm">₹{guide.price}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-100 text-emerald-700 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}

          {/* Street Food Table */}
          {activeTab === "food" && (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="pl-6">#</TableHead>
                  <TableHead>Food Item</TableHead>
                  <TableHead>City / Origin</TableHead>
                  <TableHead>Avg. Price Range</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_STREET_FOOD.map((food, i) => (
                  <TableRow key={food.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 text-muted-foreground text-sm">{i + 1}</TableCell>
                    <TableCell className="font-medium text-sm">{food.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" /> {food.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-orange-100 text-orange-700">
                        {food.price}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Businesses Table */}
          {activeTab === "businesses" && (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="pl-6">#</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Services</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localBusinesses.length === 0 ? (
                  <EmptyState message="No businesses registered yet. They will appear here once submitted." />
                ) : (
                  localBusinesses.map((b, i) => (
                    <TableRow key={b.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="pl-6 text-muted-foreground text-sm">{i + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl ${getAvatarColor(b.name)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                            {getInitials(b.name)}
                          </div>
                          <span className="font-medium text-sm">{b.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{b.owner}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" /> {b.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                          {b.category}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[180px]">
                        <p className="text-xs text-muted-foreground truncate" title={b.services}>{b.services}</p>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
