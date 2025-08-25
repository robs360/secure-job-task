import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cartItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  return (
    <header className="bg-card shadow-card border-b">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex items-center gap-4 mb-2 md:mb-0">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>01325151531</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>বাখরাবাদ বাজার, মুরাদনগর, কুমিল্লা</span>
              </div>
            </div>
            <div className="text-center">
              <span className="font-medium">Management: পপুলার ইলেকট্রনিকস | Powered by NEONECY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gradient">
            <Link to="/">SECURITY SOLUTION</Link>
          </h1>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <form onSubmit={handleSearch} className="w-full flex">
            <Input
              type="search"
              placeholder="Search for products..."
              className="rounded-r-none focus:ring-0 border-r-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="rounded-l-none">
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>

        {/* Header Icons & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground rounded-full h-4 w-4 text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>
          {isAuthenticated ? (
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search & Menu */}
      <div className={`container mx-auto px-4 pb-4 md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="w-full flex mb-4">
          <Input
            type="search"
            placeholder="Search for products..."
            className="rounded-r-none focus:ring-0 border-r-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="rounded-l-none">
            <Search className="h-5 w-5" />
          </Button>
        </form>

        {/* Mobile Menu */}
        <nav className="flex flex-col gap-4 border-t pt-4">
          <Link to="/" className="text-foreground hover:text-primary transition-smooth">Home</Link>
          <Link to="/products?category=cctv" className="text-foreground hover:text-primary transition-smooth">CCTV Products</Link>
          <Link to="/products?category=pos" className="text-foreground hover:text-primary transition-smooth">POS Software</Link>
          <Link to="/products?category=gps" className="text-foreground hover:text-primary transition-smooth">GPS Tracking</Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-smooth">About</Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-smooth">Contact</Link>
        </nav>
      </div>

      {/* Navigation Menu - Desktop */}
      <div className="hidden md:block bg-muted border-t">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center gap-8 py-3">
            <Link to="/" className="text-foreground hover:text-primary transition-smooth font-medium">
              Home
            </Link>
            <Link to="/products?category=cctv" className="text-foreground hover:text-primary transition-smooth font-medium">
              CCTV Products
            </Link>
            <Link to="/products?category=pos" className="text-foreground hover:text-primary transition-smooth font-medium">
              POS Software
            </Link>
            <Link to="/products?category=gps" className="text-foreground hover:text-primary transition-smooth font-medium">
              GPS Tracking
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-smooth font-medium">
              All Products
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-smooth font-medium">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-smooth font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;