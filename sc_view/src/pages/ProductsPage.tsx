import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Search, Grid, List, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";

const BASE_IMAGE_URL = "http://localhost:5000/uploads/";

interface ProductCardProps {
  product: any; 
  viewMode?: "grid" | "list";
}




const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get("subcategory") || "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
        const uniqueCategories = [...new Set(data.map(p => p.category))];
        const uniqueBrands = [...new Set(data.map(p => p.brand))];
        setCategories(uniqueCategories.map(c => ({ id: c, nameEn: c })));
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery.trim()) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (selectedSubcategory) result = result.filter(p => p.subcategory === selectedSubcategory);
    if (selectedBrands.length) result = result.filter(p => selectedBrands.includes(p.brand));
    if (priceRange.min) result = result.filter(p => p.price >= parseInt(priceRange.min));
    if (priceRange.max) result = result.filter(p => p.price <= parseInt(priceRange.max));
    if (inStockOnly) result = result.filter(p => p.stock > 0);

    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case "name": result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedSubcategory, selectedBrands, priceRange, sortBy, inStockOnly, products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    query ? params.set("search", query) : params.delete("search");
    setSearchParams(params);
  };

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    setSelectedSubcategory("");
    const params = new URLSearchParams(searchParams);
    id ? params.set("category", id) : params.delete("category");
    params.delete("subcategory");
    setSearchParams(params);
  };

  const handleSubcategoryChange = (id: string) => {
    setSelectedSubcategory(id);
    const params = new URLSearchParams(searchParams);
    id ? params.set("subcategory", id) : params.delete("subcategory");
    setSearchParams(params);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedBrands([]);
    setPriceRange({ min: "", max: "" });
    setInStockOnly(false);
    setSortBy("featured");
    setSearchParams({});
  };

  const getCurrentCategory = () => categories.find(c => c.id === selectedCategory);
  const getAvailableSubcategories = () => getCurrentCategory()?.subcategories || [];

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="all-categories" checked={!selectedCategory} onCheckedChange={() => handleCategoryChange("")} />
            <Label htmlFor="all-categories">All Categories</Label>
          </div>
          {categories.map(c => (
            <div key={c.id} className="flex items-center space-x-2">
              <Checkbox id={c.id} checked={selectedCategory === c.id} onCheckedChange={() => handleCategoryChange(c.id)} />
              <Label htmlFor={c.id}>{c.nameEn}</Label>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory && getAvailableSubcategories().length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Subcategories</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="all-subcategories" checked={!selectedSubcategory} onCheckedChange={() => handleSubcategoryChange("")} />
              <Label htmlFor="all-subcategories">All Subcategories</Label>
            </div>
            {getAvailableSubcategories().map(sub => (
              <div key={sub.id} className="flex items-center space-x-2">
                <Checkbox id={sub.id} checked={selectedSubcategory === sub.id} onCheckedChange={() => handleSubcategoryChange(sub.id)} />
                <Label htmlFor={sub.id}>{sub.nameEn}</Label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-3">Brands</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map(b => (
            <div key={b} className="flex items-center space-x-2">
              <Checkbox id={b} checked={selectedBrands.includes(b)} onCheckedChange={() => toggleBrand(b)} />
              <Label htmlFor={b}>{b}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range (৳)</h3>
        <div className="flex gap-2">
          <Input type="number" placeholder="Min" value={priceRange.min} onChange={e => setPriceRange(prev => ({ ...prev, min: e.target.value }))} />
          <Input type="number" placeholder="Max" value={priceRange.max} onChange={e => setPriceRange(prev => ({ ...prev, max: e.target.value }))} />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={checked => setInStockOnly(checked === true)} />
        <Label htmlFor="in-stock">In Stock Only</Label>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        <X className="mr-2 h-4 w-4" />
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-4">Products</h1>
          <div className="relative max-w-2xl mb-6">
            <Input type="search" placeholder="Search products, brands, features..." value={searchQuery} onChange={e => handleSearch(e.target.value)} className="pl-10 h-12 rounded-full border-2 border-primary/20 focus:border-primary" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="p-6 sticky top-4">
              <FilterSidebar />
            </Card>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                    <div className="mt-6"><FilterSidebar /></div>
                  </SheetContent>
                </Sheet>
                <span className="text-muted-foreground">{filteredProducts.length} products found</span>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48"><SelectValue placeholder="Sort by" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}><Grid className="h-4 w-4" /></Button>
                  <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}><List className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product._id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;