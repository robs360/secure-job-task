import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-2 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-accent">SECURITY SOLUTION</h3>
            <p className="text-xs sm:text-sm text-primary-foreground/80">
              আপনার নিরাপত্তা নিয়ে আমরা কাজ করতে চাই। Professional security solutions, POS software, and GPS tracking systems.
            </p>
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                <span className="text-xs sm:text-sm">Sales Manager: NaZmul Hasan</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                <span className="text-xs sm:text-sm">Mobile: 01325151531</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                <span className="text-xs sm:text-sm">বাখরাবাদ বাজার, করিম হাজি মারকেট, মুরাদনগর, কুমিল্লা</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-2 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-accent">Product Categories</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link to="/products?category=cctv" className="text-xs sm:text-sm text-primary-foreground/80 hover:text-accent transition-smooth">WiFi Camera</Link></li>
              <li><Link to="/products?category=cctv" className="text-xs sm:text-sm text-primary-foreground/80 hover:text-accent transition-smooth">4G Camera</Link></li>
              <li><Link to="/products?category=cctv" className="text-xs sm:text-sm text-primary-foreground/80 hover:text-accent transition-smooth">IP Camera</Link></li>
              <li><Link to="/products?category=cctv" className="text-xs sm:text-sm text-primary-foreground/80 hover:text-accent transition-smooth">Network Camera</Link></li>
              <li><Link to="/products?category=cctv" className="text-xs sm:text-sm text-primary-foreground/80 hover:text-accent transition-smooth">Analog Camera</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-2 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-accent">Our Services</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link to="/products?category=pos" className="text-xs sm:text-sm text-primary-foreground/80 hover:text-accent transition-smooth">Electronic Shop Management</Link></li>
              <li><Link to="/products?category=pos" className="text-xs sm:text-sm text-primary-foreground/80 hover:text-accent transition-smooth">Restaurant Management</Link></li>
              <li><Link to="/products?category=pos" className="text-xs sm:text-sm text-primary-foreground/80 hover:text-accent transition-smooth">Pharmacy Management</Link></li>
              <li><Link to="/products?category=gps" className="text-xs sm:text-sm text-primary-foreground/80 hover:text-accent transition-smooth">গাড়ি Live Tracking</Link></li>
              <li><Link to="/products?category=gps" className="text-xs sm:text-sm text-primary-foreground/80 hover:text-accent transition-smooth">বাইক Live Tracking</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-2 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-accent">Stay Connected</h4>
            <p className="text-xs sm:text-sm text-primary-foreground/80">
              Get updates on new products and special offers
            </p>
            <div className="flex gap-1 sm:gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 text-xs sm:text-sm"
              />
              <Button variant="accent" size="sm" className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                Subscribe
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground hover:text-accent">
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground hover:text-accent">
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground hover:text-accent">
                  <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground hover:text-accent">
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Brands */}
      <div className="border-t border-primary-foreground/20 py-4 sm:py-8">
        <div className="container mx-auto px-4">
          <h4 className="text-center text-base sm:text-lg font-semibold text-accent mb-4 sm:mb-6">Authorized Dealer & Partner</h4>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            {["HIKVISION", "TP-LINK", "IMOU", "JOVISION", "DAHUA", "UNV", "TOSHIBA", "ONV", "SAMSUNG", "ORASIX", "STAREX", "DELL", "MSI"].map((brand) => (
              <div key={brand} className="px-2 py-1 sm:px-3 sm:py-2 bg-primary-foreground/10 rounded text-primary-foreground/80 hover:text-accent transition-smooth">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20 py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-primary-foreground/60">
            <div className="mb-2 md:mb-0">
              © 2024 SECURITY SOLUTION. All rights reserved. | Management: পপুলার ইলেকট্রনিকস
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm">Powered by</span>
              <span className="text-accent font-semibold text-xs sm:text-sm">NEONECY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;