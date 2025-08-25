import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Camera, Monitor, MapPin } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ React Router Link
import cctvImage from "@/assets/cctv-category.jpg";
import posImage from "@/assets/pos-software.jpg";
import gpsImage from "@/assets/gps-tracking.jpg";

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      title: "CCTV Products",
      subtitle: "Advanced Security Surveillance",
      description:
        "Complete range of WiFi, 4G, Analog, Network & IP cameras for comprehensive security monitoring.",
      image: cctvImage,
      icon: Camera,
      products: [
        "WiFi Camera",
        "4G Camera",
        "Analog Camera",
        "Network Camera",
        "IP Camera",
      ],
      color: "from-primary to-primary-glow",
    },
    {
      id: 2,
      title: "POS Software",
      subtitle: "Business Management Solutions",
      description:
        "Professional software solutions for electronic shops, restaurants, and pharmacies with complete management features.",
      image: posImage,
      icon: Monitor,
      products: [
        "Electronic Shop Management",
        "Restaurant Management",
        "Pharmacy Management",
      ],
      color: "from-secondary to-secondary-glow",
    },
    {
      id: 3,
      title: "GPS Tracking",
      subtitle: "Live Location Monitoring",
      description:
        "Real-time tracking solutions for vehicles, CNG autos, and motorcycles with advanced monitoring features.",
      image: gpsImage,
      icon: MapPin,
      products: [
        "গাড়ি Live Tracking",
        "Auto CNG Live Tracking",
        "বাইক Live Tracking",
      ],
      color: "from-accent to-accent-glow",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Our Product Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive security and business solutions tailored for your
            needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="group overflow-hidden shadow-card hover:shadow-elegant transition-smooth bg-card flex flex-col"
              >
                {/* Category Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}
                  ></div>

                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                    <p className="text-white/90">{category.subtitle}</p>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 flex flex-col h-full flex-grow">
                  {/* Description + Products */}
                  <div className="flex-grow">
                    {/* Description */}
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {category.description}
                    </p>

                    {/* Product List */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">
                        Available Products:
                      </h4>
                      <ul className="space-y-2">
                        {category.products.map((product, index) => (
                          <li
                            key={index}
                            className="flex items-center text-sm text-muted-foreground"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                            {product}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button pinned bottom */}
                  <Link to="/products">
                    <Button
                      variant="outline"
                      className="w-full mt-auto group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                    >
                      View Products
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trusted Brands Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            Trusted Partner Brands
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            {[
              "HIKVISION",
              "TP-LINK",
              "IMOU",
              "JOVISION",
              "DAHUA",
              "UNV",
              "TOSHIBA",
              "ONV",
              "SAMSUNG",
              "ORASIX",
              "STAREX",
              "DELL",
              "MSI",
            ].map((brand) => (
              <div
                key={brand}
                className="px-4 py-2 bg-card rounded-lg shadow-card hover:shadow-elegant transition-smooth"
              >
                <span className="font-semibold text-sm">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
