import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, ShieldCheck, MapPin, UploadCloud } from "lucide-react";

const GuideRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    languages: "",
    experience: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and Verification
    setTimeout(() => {
      setIsSubmitting(false);

      const descriptionLower = formData.experience.toLowerCase();
      // Basic fraud detection
      if (
        descriptionLower.includes("fraud") ||
        descriptionLower.includes("scam") ||
        descriptionLower.includes("fake") ||
        descriptionLower.includes("cheat") ||
        formData.experience.length < 20
      ) {
        toast.error("Application Rejected: Your profile could not be verified based on the provided description.");
        return; // Stop here, do not register
      }

      // If valid, accept the guide
      const newGuide = {
        id: `guide-${Date.now()}`,
        type: "guide",
        name: `${formData.firstName} ${formData.lastName}`,
        location: formData.city,
        price: Math.floor(Math.random() * (1000 - 400 + 1)) + 400, // Random price between 400 and 1000
        rating: 5.0, // Initial perfect rating
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop", // Default avatar
      };

      // Store in localStorage
      const existingGuides = JSON.parse(localStorage.getItem("verified_guides") || "[]");
      localStorage.setItem("verified_guides", JSON.stringify([...existingGuides, newGuide]));

      setIsRegistered(true);
      toast.success("Application Approved! You have been added as a verified local guide.");
    }, 1500);
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-12 flex items-center justify-center">
          <div className="max-w-md w-full text-center space-y-6 bg-card p-10 rounded-2xl border border-border shadow-sm">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-2xl font-display font-bold text-foreground">Application Approved!</h2>
            <p className="text-muted-foreground">
              Welcome to LocalLens! Your profile has been verified and you are now listed on the Bookings page as a Local Guide. Travelers can now book your services.
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
            <h1 className="text-4xl font-display font-bold tracking-tight">Become a Local Guide</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Share your passion for your city. Show travelers hidden gems and earn money by hosting authentic experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-card rounded-2xl border border-border">
              <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Verified Profiles</h3>
              <p className="text-sm text-muted-foreground">We verify all users to ensure safety for both guides and travelers.</p>
            </div>
            <div className="p-6 bg-card rounded-2xl border border-border">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Showcase Your City</h3>
              <p className="text-sm text-muted-foreground">Take tourists to spots only locals know and share unique stories.</p>
            </div>
            <div className="p-6 bg-card rounded-2xl border border-border">
              <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Earn Income</h3>
              <p className="text-sm text-muted-foreground">Set your own rates and schedule. Earn money doing what you love.</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm relative max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required placeholder="John" value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required placeholder="Doe" value={formData.lastName} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" required placeholder="john@example.com" value={formData.email} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" required placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City of Operation</Label>
                <Input id="city" required placeholder="e.g. Jaipur, Rajasthan" value={formData.city} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages">Languages Spoken</Label>
                <Input id="languages" required placeholder="e.g. English, Hindi, Marwari" value={formData.languages} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Why do you want to be a guide?</Label>
                <Textarea 
                  id="experience" 
                  required 
                  placeholder="Tell us about yourself and the types of tours you want to offer..."
                  className="min-h-[120px]"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>ID Proof Upload</Label>
                <div 
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors relative"
                  onClick={() => document.getElementById('id-upload')?.click()}
                >
                  <input 
                    type="file" 
                    id="id-upload" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <UploadCloud className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">
                    {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                  </p>
                  {!selectedFile && <p className="text-xs text-muted-foreground mt-1">Aadhar Card, Passport, or Driving License (PDF, JPG)</p>}
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Registration Request"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideRegistration;
