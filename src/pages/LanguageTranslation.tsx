import { useState } from "react";
import { ArrowRightLeft, Loader2, Languages, Copy, Check, Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "te", name: "Telugu" },
  { code: "ta", name: "Tamil" },
  { code: "ml", name: "Malayalam" },
  { code: "kn", name: "Kannada" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "bn", name: "Bengali" },
  { code: "pa", name: "Punjabi" },
  { code: "ur", name: "Urdu" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" }
];

const LanguageTranslation = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Speech Recognition setup
  const CustomSpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = CustomSpeechRecognition ? new CustomSpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    // Map minimal code to full BCP-47 if needed, but these often work
    recognition.lang = sourceLang === 'en' ? 'en-US' : sourceLang;
  }

  const toggleListening = () => {
    if (!recognition) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.lang = sourceLang === 'en' ? 'en-US' : sourceLang;
      recognition.start();
      setIsListening(true);
      toast.info("Listening...");

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSourceText(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        toast.error("Error recognizing speech. Please try again.");
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  };

  const speakText = (text: string, lang: string) => {
    if (!('speechSynthesis' in window)) {
      toast.error("Text-to-speech is not supported in this browser.");
      return;
    }
    
    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : lang; // BCP 47 language tag
    window.speechSynthesis.speak(utterance);
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setTranslatedText("");
      return;
    }

    if (sourceLang === targetLang) {
      setTranslatedText(sourceText);
      return;
    }

    setIsTranslating(true);
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(sourceText)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Translation failed");
      
      const data = await response.json();
      if (data && data[0]) {
        const translated = data[0].map((item: any) => item[0]).join("");
        setTranslatedText(translated);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to translate text. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const copyToClipboard = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    toast.success("Translation copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
              <Languages className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight">Language Translation</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Translate seamlessly between English, Hindi, and Telugu.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm relative">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="w-full md:w-[45%]">
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={swapLanguages}
                className="rounded-full shrink-0"
              >
                <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
              </Button>

              <div className="w-full md:w-[45%]">
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 relative">
                <Textarea
                  placeholder="Enter text to translate or use voice input..."
                  className="min-h-[200px] resize-none text-base p-4"
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                />
                <div className="absolute bottom-2 right-2 flex gap-2">
                  {sourceText && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-background/80 hover:bg-background shadow-sm"
                      onClick={() => speakText(sourceText, sourceLang)}
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`bg-background/80 hover:bg-background shadow-sm ${isListening ? 'text-red-500 animate-pulse' : ''}`}
                    onClick={toggleListening}
                    title="Voice Input"
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="relative group">
                <Textarea
                  placeholder="Translation will appear here..."
                  className="min-h-[200px] resize-none bg-muted/50 text-base p-4"
                  value={translatedText}
                  readOnly
                />
                <div className="absolute bottom-2 right-2 flex gap-2">
                  {translatedText && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-background/80 hover:bg-background shadow-sm"
                        onClick={() => speakText(translatedText, targetLang)}
                        title="Listen to translation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-background/80 hover:bg-background shadow-sm"
                        onClick={copyToClipboard}
                        title="Copy"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button size="lg" onClick={handleTranslate} disabled={isTranslating || !sourceText.trim()}>
                {isTranslating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Translating...
                  </>
                ) : (
                  'Translate'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageTranslation;
