import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsForgotPassword(true);
        setIsResetPassword(true);
        setOtpSent(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isResetPassword) {
        // This updates the password securely in the Supabase database using the active session from verifyOtp
        const { error } = await supabase.auth.updateUser({ password: password });
        if (error) throw error;
        toast.success("Password reset successful! Please sign in.");
        setIsForgotPassword(false);
        setIsResetPassword(false);
        setIsLogin(true);
        setOtpSent(false);
        setPassword("");
        setOtp("");
      } else if (isForgotPassword) {
        if (!otpSent) {
          // Request Supabase to send a real recovery email
          const { error } = await supabase.auth.resetPasswordForEmail(email);
          if (error) throw error;
          toast.success("Recovery link sent to your email!");
          setOtpSent(true);
        }
      } else if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        
        toast.success("Account created! Check your email to verify.");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative items-center justify-center p-12">
        <div className="text-primary-foreground max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <MapPin className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="font-display text-3xl">LocalLens</span>
          </div>
          <h2 className="font-display text-4xl mb-4">Discover India Like Never Before</h2>
          <p className="text-primary-foreground/70 text-lg">
            Connect with verified local guides, artisans, and food vendors across India.
          </p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </button>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl text-foreground">LocalLens</span>
          </div>

          <h1 className="font-display text-3xl text-foreground mb-2">
            {isForgotPassword 
              ? (isResetPassword ? "Reset Password" : (otpSent ? "Check Email" : "Forgot Password"))
              : (isLogin ? "Welcome back" : "Create your account")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isForgotPassword 
              ? (isResetPassword ? "Enter your new password below." : (otpSent ? "We've sent a password reset link to your email." : "Enter your email to receive a reset link."))
              : (isLogin ? "Sign in to access your bookings and saved experiences." : "Join thousands of travelers discovering authentic India.")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !isForgotPassword && (
              <div>
                <Label htmlFor="name">Display Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" className="pl-10" required />
                </div>
              </div>
            )}
            
            {(!isResetPassword) && (
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10" required disabled={otpSent && isForgotPassword} />
                </div>
              </div>
            )}

            {isForgotPassword && otpSent && !isResetPassword && (
              <div className="text-center p-4 bg-primary/10 rounded-xl border border-primary/20">
                <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-foreground">
                  Please click the link in the email we just sent to reset your password.
                </p>
              </div>
            )}

            {(!isForgotPassword || isResetPassword) && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="password">{isResetPassword ? "New Password" : "Password"}</Label>
                  {isLogin && !isForgotPassword && (
                    <button type="button" onClick={() => setIsForgotPassword(true)} className="text-xs text-primary font-medium hover:underline">
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••" 
                    className="pl-10 pr-10" 
                    required 
                    minLength={6} 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-base rounded-xl mt-6" disabled={loading || (isForgotPassword && otpSent && !isResetPassword)}>
              {loading ? "Please wait..." : isForgotPassword ? (isResetPassword ? "Reset Password" : (otpSent ? "Link Sent" : "Send Reset Link")) : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isForgotPassword ? (
              <>
                Remember your password?{' '}
                <button type="button" onClick={() => { setIsForgotPassword(false); setOtpSent(false); setIsResetPassword(false); }} className="text-primary font-semibold hover:underline">
                  Sign in
                </button>
              </>
            ) : (
              <>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary font-semibold hover:underline">
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
