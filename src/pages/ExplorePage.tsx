import { useEffect, useRef, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "@/integrations/supabase/client";
import { Star, MapPin, Clock, Filter, X, Navigation, Search, List, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Lower Leaflet's z-index so Navbar dropdowns always show above the map
const leafletZIndexFix = `
  .leaflet-pane,
  .leaflet-top,
  .leaflet-bottom {
    z-index: 10 !important;
  }
  .leaflet-control {
    z-index: 11 !important;
  }
`;

const categoryColors: Record<string, string> = {
  Food: "#e97c1f",
  Cultural: "#c0392b",
  Adventure: "#27ae60",
  Shopping: "#8e44ad",
};

function createCategoryIcon(category: string) {
  const color = categoryColors[category] || "#e97c1f";
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background:${color};width:32px;height:32px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="${color}"/></svg>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

interface DbExperience {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  city: string;
  latitude: number;
  longitude: number;
  price: number;
  rating: number;
  review_count: number;
  duration: string | null;
  vendor_name: string | null;
  vendor_verified: boolean;
  tags: string[] | null;
  image_url: string | null;
}

const ExplorePage = () => {
  const [experiences, setExperiences] = useState<DbExperience[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedExp, setSelectedExp] = useState<DbExperience | null>(null);
  const [loading, setLoading] = useState(true);
  // Mobile: "sidebar" or "map"
  const [mobileView, setMobileView] = useState<"sidebar" | "map">("sidebar");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get("location");
  const [searchedLocation, setSearchedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if (locationQuery) {
      setSearchInput(locationQuery);
      fetchCoordinates(locationQuery);
    }
  }, [locationQuery]);

  const fetchCoordinates = async (query: string) => {
    try {
      const queryToSearch = query.toLowerCase().includes('india') ? query : `${query}, India`;
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(queryToSearch)}&format=json&limit=1`);
      const data = await response.json();
      if (data && data.length > 0) {
        setSearchedLocation({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
        setSelectedExp(null);
      }
    } catch (error) {
      console.error("Failed to fetch coordinates", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchCoordinates(searchInput.trim());
      navigate(`/explore?location=${encodeURIComponent(searchInput.trim())}`, { replace: true });
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(loc);
          setSearchedLocation(loc);
          setSelectedExp(null);
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Could not get your location. Please check browser permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const handleSelectExp = (exp: DbExperience) => {
    setSelectedExp(exp);
    // On mobile, switching to map view when an item is selected is nice UX
    setMobileView("map");
  };

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("id, title, description, category, location, city, latitude, longitude, price, rating, review_count, duration, vendor_name, vendor_verified, tags, image_url")
        .eq("is_active", true);
      if (!error && data) setExperiences(data);
      setLoading(false);
    };
    fetchExperiences();
  }, []);

  const filtered = useMemo(
    () => activeFilter ? experiences.filter((e) => e.category === activeFilter) : experiences,
    [activeFilter, experiences]
  );

  const categories = ["Food", "Cultural", "Adventure", "Shopping"];

  return (
    <div className="min-h-screen bg-background">
      {/* Inject CSS to fix Leaflet z-index so navbar dropdowns appear above map */}
      <style>{leafletZIndexFix}</style>
      <Navbar />

      {/* Mobile toggle bar */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2 bg-card border border-border shadow-lg rounded-full px-3 py-2">
        <button
          onClick={() => setMobileView("sidebar")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            mobileView === "sidebar" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          <List className="w-4 h-4" /> List
        </button>
        <button
          onClick={() => setMobileView("map")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            mobileView === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          <Map className="w-4 h-4" /> Map
        </button>
      </div>

      {/* Main layout */}
      <div className="pt-16 flex flex-col lg:flex-row h-[calc(100vh-4rem)]">

        {/* Sidebar — hidden on mobile when map is active */}
        <div className={`
          ${mobileView === "map" ? "hidden" : "flex"} lg:flex
          w-full lg:w-96 bg-background border-r border-border overflow-y-auto p-4 flex-col gap-4
          h-[calc(100vh-4rem)] lg:h-auto
        `}>
          
          <form onSubmit={handleSearch} className="flex gap-2 mb-2">
            <Input 
              placeholder="Search destination..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" variant="secondary">
              <Search className="w-4 h-4" />
            </Button>
          </form>

          <Button 
            onClick={handleGetLocation} 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 mb-2 border-primary/20 text-primary hover:bg-primary/10"
          >
            <Navigation className="w-4 h-4" />
            Get My Location
          </Button>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filter by category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">{filtered.length} experiences found</div>

          <div className="flex flex-col gap-3 pb-20 lg:pb-4">
            {filtered.map((exp) => (
              <button
                key={exp.id}
                onClick={() => handleSelectExp(exp)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedExp?.id === exp.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs" style={{ borderColor: categoryColors[exp.category], color: categoryColors[exp.category] }}>
                    {exp.category}
                  </Badge>
                  <span className="flex items-center gap-0.5 text-xs font-semibold text-amber-500">
                    <Star className="w-3 h-3 fill-current" /> {exp.rating}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{exp.title}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3" /> {exp.location}, {exp.city}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {exp.duration}</span>
                  <span className="font-semibold text-sm text-foreground">₹{exp.price.toLocaleString()}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map — hidden on mobile when sidebar is active */}
        <div className={`
          ${mobileView === "sidebar" ? "hidden" : "flex"} lg:flex
          flex-1 relative h-[calc(100vh-4rem)]
        `}>
          {loading ? (
            <div className="flex items-center justify-center w-full h-full text-muted-foreground">Loading map...</div>
          ) : (
            <MapContainer
              center={[22.5, 78.9]}
              zoom={5}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filtered.map((exp) => (
                <Marker
                  key={exp.id}
                  position={[exp.latitude, exp.longitude]}
                  icon={createCategoryIcon(exp.category)}
                  eventHandlers={{ click: () => setSelectedExp(exp) }}
                >
                  <Popup>
                    <div className="min-w-[200px]">
                      <h3 className="font-semibold text-sm">{exp.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{exp.location}, {exp.city}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs flex items-center gap-1">⭐ {exp.rating} ({exp.review_count})</span>
                        <span className="font-semibold text-sm">₹{exp.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {selectedExp && <FlyToMarker lat={selectedExp.latitude} lng={selectedExp.longitude} />}
              {searchedLocation && !selectedExp && !userLocation && (
                <>
                  <FlyToMarker lat={searchedLocation.lat} lng={searchedLocation.lng} />
                  <Marker position={[searchedLocation.lat, searchedLocation.lng]}>
                    <Popup>
                      <div className="min-w-[200px]">
                        <h3 className="font-semibold text-lg">{searchInput || locationQuery}</h3>
                        <p className="text-sm mt-1">
                          Popular tourist destination. Explore local guides, experiences and homestays nearby!
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                </>
              )}
              {userLocation && !selectedExp && (
                <>
                  <FlyToMarker lat={userLocation.lat} lng={userLocation.lng} />
                  <Marker position={[userLocation.lat, userLocation.lng]}>
                    <Popup>
                      <div className="min-w-[150px]">
                        <h3 className="font-semibold text-primary">Your Location</h3>
                      </div>
                    </Popup>
                  </Marker>
                </>
              )}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};

function FlyToMarker({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 13, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
}

export default ExplorePage;
