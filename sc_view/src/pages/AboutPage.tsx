import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Shield, Award, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gradient mb-6">About SECURITY SOLUTION</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            আপনার নিরাপত্তা নিয়ে আমরা কাজ করতে চাই। We are dedicated to providing comprehensive security 
            solutions and business management systems for businesses across Bangladesh.
          </p>
        </section>

        {/* Company Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center p-6 shadow-card">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">500+</h3>
            <p className="text-muted-foreground">Security Systems Installed</p>
          </Card>
          <Card className="text-center p-6 shadow-card">
            <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">1000+</h3>
            <p className="text-muted-foreground">Happy Customers</p>
          </Card>
          <Card className="text-center p-6 shadow-card">
            <Award className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">5+</h3>
            <p className="text-muted-foreground">Years Experience</p>
          </Card>
          <Card className="text-center p-6 shadow-card">
            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">4.9/5</h3>
            <p className="text-muted-foreground">Customer Rating</p>
          </Card>
        </section>

        {/* Our Story */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gradient">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                SECURITY SOLUTION started with a simple mission: to make advanced security technology 
                accessible to businesses of all sizes in Bangladesh. Under the management of 
                পপুলার ইলেকট্রনিকস, we have grown to become a trusted name in security solutions.
              </p>
              <p>
                Our journey began with basic CCTV installations, but we quickly expanded our offerings 
                to include comprehensive business management software and GPS tracking solutions. 
                Today, we serve hundreds of satisfied customers across Comilla and beyond.
              </p>
              <p>
                We believe that every business deserves professional-grade security and management 
                tools, which is why we partner with leading brands like Hikvision, TP-Link, IMOU, 
                and many others to bring you the best technology at competitive prices.
              </p>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Shield className="h-5 w-5 text-primary mr-3" />
                <span>Authorized dealer of top security brands</span>
              </li>
              <li className="flex items-center">
                <Users className="h-5 w-5 text-primary mr-3" />
                <span>Expert installation and support team</span>
              </li>
              <li className="flex items-center">
                <Award className="h-5 w-5 text-primary mr-3" />
                <span>5+ years of industry experience</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-3" />
                <span>24/7 customer support</span>
              </li>
              <li className="flex items-center">
                <Star className="h-5 w-5 text-primary mr-3" />
                <span>Comprehensive warranty and maintenance</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Contact Information */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="p-8 shadow-card">
            <h3 className="text-2xl font-bold mb-6 text-gradient">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-muted-foreground">
                    বাখরাবাদ বাজার, করিম হাজি মারকেট<br />
                    মুরাদনগর, কুমিল্লা
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-muted-foreground">01325151531</p>
                  <p className="text-sm text-muted-foreground">Sales Manager: NaZmul Hasan</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-muted-foreground">info@securitysolution.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold">Business Hours</h4>
                  <p className="text-muted-foreground">
                    Sat - Thu: 9:00 AM - 8:00 PM<br />
                    Friday: 2:00 PM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 shadow-card">
            <h3 className="text-2xl font-bold mb-6 text-gradient">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Your Name" />
                <Input placeholder="Phone Number" />
              </div>
              <Input placeholder="Email Address" />
              <Input placeholder="Subject" />
              <Textarea placeholder="Your Message" rows={4} />
              <Button variant="hero" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>
        </section>

        {/* Partner Brands */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-gradient">Our Partner Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {["HIKVISION", "TP-LINK", "IMOU", "JOVISION", "DAHUA", "UNV", "TOSHIBA", "ONV", "SAMSUNG", "ORASIX", "STAREX", "DELL"].map((brand) => (
              <Card key={brand} className="p-4 shadow-card hover:shadow-elegant transition-smooth">
                <div className="text-center">
                  <h4 className="font-semibold text-sm">{brand}</h4>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;