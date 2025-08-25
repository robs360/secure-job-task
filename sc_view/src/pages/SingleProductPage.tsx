import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, Shield, Truck, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  stockCount: number;
  features: string[];
  specifications: Record<string, string>;
  isPopular?: boolean;
  isFeatured?: boolean;
}

const SingleProductPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log("it is id ",id)
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0); // New state for thumbnail carousel
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const BASE_IMAGE_URL = `${API_BASE_URL}/uploads/`;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product>(`${API_BASE_URL}/api/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch product.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const nextImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % product.images.length
      );
    }
  };

  const prevImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  const nextThumbnailSet = () => {
    if (product && thumbnailStartIndex + 4 < product.images.length) {
      setThumbnailStartIndex(prevIndex => prevIndex + 1);
    }
  };

  const prevThumbnailSet = () => {
    if (thumbnailStartIndex > 0) {
      setThumbnailStartIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    addToCart(product!._id, quantity);
    toast({
      title: "Added to cart",
      description: `${product!.name} has been added to your cart.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          <p className="font-medium">Error: {error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm text-muted-foreground">
        <button onClick={() => navigate("/")} className="hover:text-primary">
          Home
        </button>
        <span className="mx-2">/</span>
        <button onClick={() => navigate(`/category/${product.category}`)} className="hover:text-primary">
          {product.category}
        </button>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-square">
            <img
              src={BASE_IMAGE_URL + product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
            
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            
            {product.isPopular && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Popular
              </div>
            )}
            
            {product.isFeatured && (
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Featured
              </div>
            )}
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(thumbnailStartIndex, thumbnailStartIndex + 4).map((image, index) => (
                <button
                  key={thumbnailStartIndex + index}
                  onClick={() => setCurrentImageIndex(thumbnailStartIndex + index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    (thumbnailStartIndex + index) === currentImageIndex 
                      ? "border-primary ring-2 ring-primary/20" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={BASE_IMAGE_URL + image}
                    alt={`${product.name} - ${thumbnailStartIndex + index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            {product.images.length > 4 && (
              <>
                <button
                  onClick={prevThumbnailSet}
                  disabled={thumbnailStartIndex === 0}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextThumbnailSet}
                  disabled={thumbnailStartIndex + 4 >= product.images.length}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
              
              {product.inStock ? (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Out of Stock
                </span>
              )}
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-primary">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-2xl text-muted-foreground line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                  Save ৳{(product.originalPrice - product.price).toLocaleString()}
                </span>
              </>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 bg-white min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stockCount, q + 1))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                +
              </button>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.stockCount} available
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              size="lg" 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 py-3 text-lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="p-3"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 py-4 border-y">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span>Free shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span>30-day returns</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span>2-year warranty</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Specifications */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex border-b pb-3 last:border-b-0 last:pb-0">
                  <dt className="font-medium text-gray-700 min-w-[120px]">{key}:</dt>
                  <dd className="text-gray-600">{value}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="bg-white border rounded-xl p-6 text-center">
          <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
          <p className="text-muted-foreground mb-4">
            Be the first to review this product and help others make the right choice.
          </p>
          <Button>Write a Review</Button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;