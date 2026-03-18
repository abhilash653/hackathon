import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, Store, MapPin, Tag, UploadCloud } from "lucide-react";

const LocalBusinessRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    city: "",
    category: "",
    services: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and saving logic
    setTimeout(() => {
      setIsSubmitting(false);

      // Validate inputs
      const servicesLower = formData.services.toLowerCase();
      if (formData.services.length < 15 || servicesLower.includes("fraud") || servicesLower.includes("fake")) {
         toast.error("Registration Rejected: Please provide a valid description of your services.");
         return;
      }

      // If valid, save business locally
      const newBusiness = {
        id: `bus-${Date.now()}`,
        name: formData.businessName,
        owner: formData.ownerName,
        city: formData.city,
        category: formData.category,
        services: formData.services,
        rating: 5.0,
      };

      const existingBusinesses = JSON.parse(localStorage.getItem("local_businesses") || "[]");
      localStorage.setItem("local_businesses", JSON.stringify([...existingBusinesses, newBusiness]));

      setIsRegistered(true);
      toast.success("Business Registered Successfully! You are now listed on LocalLens.");
    }, 1500);
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-12 flex items-center justify-center">
          <div className="max-w-md w-full text-center space-y-6 bg-card p-10 rounded-2xl border border-border shadow-sm">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-2xl font-display font-bold text-foreground">Registration Successful!</h2>
            <p className="text-muted-foreground">
              Welcome to LocalLens! Your business has been added locally. Customers can now discover your services.
            </p>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold tracking-tight">Register Your Business</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of local vendors on LocalLens. Increase your digital visibility, receive bookings, and connect with travelers directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-card rounded-2xl border border-border">
              <Store className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Digital Storefront</h3>
              <p className="text-sm text-muted-foreground">List your local shop, restaurant, or service and reach millions of travelers instantly.</p>
            </div>
            <div className="p-6 bg-card rounded-2xl border border-border">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Location Based Search</h3>
              <p className="text-sm text-muted-foreground">Get discovered by tourists and visitors specifically searching in your city and neighborhood.</p>
            </div>
            <div className="p-6 bg-card rounded-2xl border border-border">
              <Tag className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Zero Commission</h3>
              <p className="text-sm text-muted-foreground">Register for free without paying middleman fees. Retain 100% of your earnings.</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm relative max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Business Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" required placeholder="ex. Sharma Sweets" value={formData.businessName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner's Full Name</Label>
                  <Input id="ownerName" required placeholder="ex. Ravi Sharma" value={formData.ownerName} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input id="email" type="email" required placeholder="contact@business.com" value={formData.email} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input id="phone" type="tel" required placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City Located In</Label>
                  <Input id="city" required placeholder="e.g. Jaipur, Rajasthan" value={formData.city} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Business Category</Label>
                  <Input id="category" required placeholder="e.g. Food, Handloom, Transport" value={formData.category} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="services">What does your business serve or offer?</Label>
                <Textarea 
                  id="services" 
                  required 
                  placeholder="Describe your primary products or services, store history, operating hours, etc..."
                  className="min-h-[120px]"
                  value={formData.services}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Business Photos (Optional)</Label>
                <div 
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors relative"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <input 
                    type="file" 
                    id="image-upload" 
                    className="hidden" 
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <UploadCloud className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">
                    {selectedImage ? selectedImage.name : "Click to upload store photos or drag and drop"}
                  </p>
                  {!selectedImage && <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB to attract tourists</p>}
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Complete Registration"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalBusinessRegistration;
