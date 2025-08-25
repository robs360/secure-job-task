import { Button } from "@/components/ui/button";
import { Shield, Search, Zap } from "lucide-react";
import heroImage from "@/assets/hero-security.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Security Solutions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            আপনার নিরাপত্তা নিয়ে
            <br />
            <span className="text-accent">আমরা কাজ করতে চাই</span> 
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Professional security solutions, POS software, and GPS tracking systems
            for complete business protection and management.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/products">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                <Search className="mr-2 h-5 w-5" />
                Explore Products
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
                <Shield className="mr-2 h-5 w-5" />
                Get Quote
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-card hover:bg-white/20 transition-smooth">
              <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">CCTV Security</h3>
              <p className="text-white/80">Advanced surveillance systems with WiFi, 4G, and IP cameras</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-card hover:bg-white/20 transition-smooth">
              <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">POS Software</h3>
              <p className="text-white/80">Complete management solutions for retail, restaurant & pharmacy</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-card hover:bg-white/20 transition-smooth">
              <Search className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">GPS Tracking</h3>
              <p className="text-white/80">Real-time vehicle tracking for cars, CNG autos, and bikes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;