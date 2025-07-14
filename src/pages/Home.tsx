
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

const Home = () => {
  const [displayText, setDisplayText] = useState("");
  const [showCards, setShowCards] = useState(false);
  const fullText = "AI-Powered Skin Disease Detection";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        // Show cards after typing animation completes
        setTimeout(() => setShowCards(true), 300);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Accurate Analysis",
      description: "Advanced AI models for reliable skin condition detection"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get predictions in seconds with confidence scores"
    },
    {
      icon: Users,
      title: "Easy to Use",
      description: "Simple upload process with clear, understandable results"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 min-h-[120px] md:min-h-[150px] flex items-center justify-center">
              <span className="inline-block">
                {displayText}
                {displayText.length < fullText.length && (
                  <span className="animate-pulse text-blue-600 ml-1">|</span>
                )}
              </span>
            </h1>
            <div className={`transition-all duration-1000 ${displayText === fullText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Upload an image and get instant AI analysis for skin conditions. 
                Professional-grade detection with confidence scoring.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8 py-4 h-auto">
                  <Link to="/prediction">
                    Start Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Sehat?
            </h2>
            <p className="text-xl text-slate-600">
              Advanced technology made simple for everyone
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`text-center h-full border-0 shadow-lg transition-all duration-700 transform ${
                  showCards 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: showCards ? `${index * 200}ms` : '0ms'
                }}
              >
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform duration-300 hover:scale-110">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Upload your first image and experience AI-powered skin analysis
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
