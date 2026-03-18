import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { UserPlus, Home, CheckCircle2, Star, MapPin } from "lucide-react";
import { toast } from "sonner";

interface BookingItem {
  id: string;
  type: "guide" | "homestay";
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

const mockData: BookingItem[] = [
  // Guides
  { id: "1", type: "guide", name: "Rahul Sharma", location: "Jaipur, Rajasthan", price: 800, rating: 4.8, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" },
  { id: "2", type: "guide", name: "Priya Patel", location: "Varanasi, UP", price: 600, rating: 4.9, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" },
  { id: "5", type: "guide", name: "Amit Kumar", location: "Delhi", price: 900, rating: 4.7, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" },
  { id: "6", type: "guide", name: "Anjali Desai", location: "Goa", price: 1000, rating: 4.9, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop" },
  { id: "7", type: "guide", name: "Ravi Singh", location: "Agra, UP", price: 700, rating: 4.6, image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop" },
  { id: "8", type: "guide", name: "Fatima Khan", location: "Hyderabad, Telangana", price: 850, rating: 4.8, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop" },

  // Homestays
  { id: "3", type: "homestay", name: "Heritage Haveli", location: "Udaipur, Rajasthan", price: 1500, rating: 4.7, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&h=200&fit=crop" },
  { id: "4", type: "homestay", name: "Backwaters Retreat", location: "Alappuzha, Kerala", price: 2200, rating: 4.9, image: "https://images.unsplash.com/photo-1596395819057-e37f55a8516d?w=300&h=200&fit=crop" },
  { id: "9", type: "homestay", name: "Mountain View Cottage", location: "Manali, HP", price: 1800, rating: 4.8, image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=300&h=200&fit=crop" },
  { id: "10", type: "homestay", name: "Beachfront Villa", location: "Goa", price: 3500, rating: 4.6, image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=300&h=200&fit=crop" },
  { id: "11", type: "homestay", name: "City Center Apartment", location: "Mumbai, Maharashtra", price: 2800, rating: 4.5, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop" },
  { id: "12", type: "homestay", name: "Ganges River Camp", location: "Rishikesh, Uttarakhand", price: 1200, rating: 4.7, image: "https://images.unsplash.com/photo-1504280327387-3310f6b78ece?w=300&h=200&fit=crop" },
];

const Bookings = () => {
  const [activeTab, setActiveTab] = useState<"guide" | "homestay">("guide");
  const [allData, setAllData] = useState<BookingItem[]>(mockData);

  useEffect(() => {
    const storedGuides = localStorage.getItem("verified_guides");
    if (storedGuides) {
      try {
        const parsedGuides = JSON.parse(storedGuides);
        // Prepend new dynamic guides so they appear first
        setAllData([...parsedGuides, ...mockData]);
      } catch (error) {
        console.error("Failed to parse verified_guides from localStorage", error);
      }
    }
  }, []);

  const filteredData = allData.filter((item) => item.type === activeTab);

  const handleBooking = (name: string) => {
    toast.success(`Booking request sent to ${name}!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold tracking-tight">Bookings</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Book verified local guides or authentic home stays near popular tourist places.
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={activeTab === "guide" ? "default" : "outline"}
              onClick={() => setActiveTab("guide")}
              className="w-1/3 max-w-[200px]"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Local Guides
            </Button>
            <Button
              variant={activeTab === "homestay" ? "default" : "outline"}
              onClick={() => setActiveTab("homestay")}
              className="w-1/3 max-w-[200px]"
            >
              <Home className="w-4 h-4 mr-2" />
              Home Stays
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredData.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center shadow-sm hover:border-primary/40 transition-all">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`object-cover ${item.type === "guide" ? "w-24 h-24 rounded-full" : "w-32 h-24 rounded-xl"}`}
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground flex items-center justify-center sm:justify-start gap-1">
                        {item.name} <CheckCircle2 className="w-4 h-4 text-primary" />
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-sm bg-primary/10 text-primary w-fit px-2 py-0.5 rounded-full mb-4 mx-auto sm:mx-0">
                    <Star className="w-3 h-3 fill-current" /> {item.rating}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-medium text-foreground">₹{item.price} <span className="text-xs text-muted-foreground">/{item.type === "guide" ? "day" : "night"}</span></span>
                    <Button onClick={() => handleBooking(item.name)} size="sm">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
