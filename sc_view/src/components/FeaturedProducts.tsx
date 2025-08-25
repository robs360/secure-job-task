import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";


const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products,setProducts]= useState([])
  const [loading, setLoading] = useState(true);
    useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data); 
      } catch (err) {
        
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const categories = [
    { id: "all", name: "All Products", count: products.length },
    { id: "cctv", name: "CCTV", count: products.filter(p => p.category === "cctv").length },
    { id: "pos", name: "POS Software", count: products.filter(p => p.category === "pos").length },
    { id: "gps", name: "GPS Tracking", count: products.filter(p => p.category === "gps").length },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
    console.log("it is products ",products)
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
                  src={`http://localhost:5000/uploads/${product.images[0]}`}
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
                    ৳{product.price}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ৳{product.originalPrice}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link to={`/products/${product._id}`} className="flex-1">
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