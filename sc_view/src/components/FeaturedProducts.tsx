import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Hikvision WiFi Camera 2MP",
      price: 8500,
      originalPrice: 9500,
      category: "cctv",
      brand: "HIKVISION",
      rating: 4.8,
      reviews: 42,
      image: "/api/placeholder/300/300",
      features: ["2MP Resolution", "WiFi Connectivity", "Night Vision", "Mobile App"],
      inStock: true,
      isPopular: true
    },
    {
      id: 2,
      name: "TP-Link 4G Camera Pro",
      price: 12000,
      originalPrice: 13500,
      category: "cctv",
      brand: "TP-LINK",
      rating: 4.6,
      reviews: 28,
      image: "/api/placeholder/300/300",
      features: ["4G Connectivity", "Solar Power", "Weatherproof", "Cloud Storage"],
      inStock: true,
      isPopular: false
    },
    {
      id: 3,
      name: "Restaurant POS Software Pro",
      price: 25000,
      originalPrice: 30000,
      category: "pos",
      brand: "NEONECY",
      rating: 4.9,
      reviews: 67,
      image: "/api/placeholder/300/300",
      features: ["Multi-table Management", "Kitchen Display", "Inventory Control", "Reports"],
      inStock: true,
      isPopular: true
    },
    {
      id: 4,
      name: "Vehicle GPS Tracker Advanced",
      price: 6500,
      originalPrice: 7500,
      category: "gps",
      brand: "STAREX",
      rating: 4.7,
      reviews: 35,
      image: "/api/placeholder/300/300",
      features: ["Real-time Tracking", "Geofencing", "Speed Alerts", "Mobile App"],
      inStock: true,
      isPopular: false
    },
    {
      id: 5,
      name: "Pharmacy Management Software",
      price: 18000,
      originalPrice: 22000,
      category: "pos",
      brand: "NEONECY",
      rating: 4.8,
      reviews: 53,
      image: "/api/placeholder/300/300",
      features: ["Drug Database", "Prescription Management", "Billing System", "Stock Control"],
      inStock: true,
      isPopular: true
    },
    {
      id: 6,
      name: "IMOU IP Camera 4MP",
      price: 11500,
      originalPrice: 13000,
      category: "cctv",
      brand: "IMOU",
      rating: 4.5,
      reviews: 39,
      image: "/api/placeholder/300/300",
      features: ["4MP Ultra HD", "AI Detection", "Two-way Audio", "Cloud Recording"],
      inStock: false,
      isPopular: false
    }
  ];

  const categories = [
    { id: "all", name: "All Products", count: products.length },
    { id: "cctv", name: "CCTV", count: products.filter(p => p.category === "cctv").length },
    { id: "pos", name: "POS Software", count: products.filter(p => p.category === "pos").length },
    { id: "gps", name: "GPS Tracking", count: products.filter(p => p.category === "gps").length },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our top-rated security solutions and business management tools
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {category.name}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden shadow-card hover:shadow-elegant transition-smooth">
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isPopular && (
                    <Badge className="bg-accent text-accent-foreground">
                      Popular
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge variant="destructive">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
                  <Link to={`/products/${product.id}`}>
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="icon" variant="secondary" className="h-8 w-8" disabled={!product.inStock}>
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Brand & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.brand}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
                  {product.name}
                </h3>

                {/* Features */}
                <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                  {product.features.length > 3 && (
                    <li className="text-primary text-sm font-medium">
                      +{product.features.length - 3} more features
                    </li>
                  )}
                </ul>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">
                    ৳{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link to={`/products/${product.id}`} className="flex-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    className="flex-1" 
                    disabled={!product.inStock}
                    variant={product.inStock ? "default" : "outline"}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="hero" size="lg">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;