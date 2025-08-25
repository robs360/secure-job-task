// Product data structure and mock data
export interface Product {
  id: string;
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

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  categoryId: string;
}

// Categories and Subcategories
export const categories: Category[] = [
  {
    id: "cctv",
    name: "CCTV পণ্যসমূহ",
    nameEn: "CCTV Products",
    description: "Advanced security surveillance systems",
    image: "/demo-images/category-cctv.jpg",
    subcategories: [
      {
        id: "wifi-camera",
        name: "WiFi ক্যামেরা",
        nameEn: "WiFi Camera",
        description: "Wireless security cameras with WiFi connectivity",
        categoryId: "cctv"
      },
      {
        id: "4g-camera",
        name: "4G ক্যামেরা",
        nameEn: "4G Camera",
        description: "4G enabled cameras for remote locations",
        categoryId: "cctv"
      },
      {
        id: "analog-camera",
        name: "অ্যানালগ ক্যামেরা",
        nameEn: "Analog Camera",
        description: "Traditional analog CCTV cameras",
        categoryId: "cctv"
      },
      {
        id: "network-camera",
        name: "নেটওয়ার্ক ক্যামেরা",
        nameEn: "Network Camera",
        description: "Network-based IP surveillance cameras",
        categoryId: "cctv"
      },
      {
        id: "ip-camera",
        name: "IP ক্যামেরা",
        nameEn: "IP Camera",
        description: "High-definition IP security cameras",
        categoryId: "cctv"
      }
    ]
  },
  {
    id: "pos",
    name: "POS সফটওয়্যার",
    nameEn: "POS Software",
    description: "Complete business management solutions",
    image: "/demo-images/category-pos.jpg",
    subcategories: [
      {
        id: "electronics-shop",
        name: "ইলেকট্রনিকস দোকান ব্যবস্থাপনা",
        nameEn: "Electronic Shop Management",
        description: "Complete electronics retail management software",
        categoryId: "pos"
      },
      {
        id: "restaurant",
        name: "রেস্তোরাঁ ব্যবস্থাপনা",
        nameEn: "Restaurant Management",
        description: "Full-featured restaurant management system",
        categoryId: "pos"
      },
      {
        id: "pharmacy",
        name: "ফার্মেসি ব্যবস্থাপনা",
        nameEn: "Pharmacy Management",
        description: "Specialized pharmacy management software",
        categoryId: "pos"
      }
    ]
  },
  {
    id: "gps",
    name: "GPS ট্র্যাকিং",
    nameEn: "GPS Tracking",
    description: "Real-time location monitoring solutions",
    image: "/demo-images/category-gps.jpg",
    subcategories: [
      {
        id: "car-tracking",
        name: "গাড়ি Live Tracking",
        nameEn: "Vehicle Live Tracking",
        description: "Real-time vehicle tracking systems",
        categoryId: "gps"
      },
      {
        id: "cng-tracking",
        name: "Auto CNG Live Tracking",
        nameEn: "Auto CNG Live Tracking",
        description: "CNG auto rickshaw tracking solutions",
        categoryId: "gps"
      },
      {
        id: "bike-tracking",
        name: "বাইক Live Tracking",
        nameEn: "Bike Live Tracking",
        description: "Motorcycle and bike tracking systems",
        categoryId: "gps"
      }
    ]
  }
];

// Mock Products Data
export const products: Product[] = [
  // CCTV Products
  {
    id: "p001",
    name: "Hikvision WiFi Camera DS-2CV2041G2-IDW 4MP",
    description: "4MP WiFi security camera with advanced night vision and mobile app control",
    price: 8500,
    originalPrice: 9500,
    images: ["https://5.imimg.com/data5/SELLER/Default/2024/7/435243081/RW/FB/WR/4592030/hikvision-cctv-camera-500x500.png", "https://static.vecteezy.com/system/resources/thumbnails/022/994/003/small_2x/professional-home-cctv-and-video-security-cameras-generative-ai-photo.jpg", "https://www.bdstall.com/asset/product-image/giant_187107.jpg"],
    category: "cctv",
    subcategory: "wifi-camera",
    brand: "HIKVISION",
    rating: 4.8,
    reviews: 42,
    inStock: true,
    stockCount: 25,
    features: ["4MP Resolution", "WiFi Connectivity", "Night Vision", "Mobile App", "Two-way Audio"],
    specifications: {
      "Resolution": "4MP (2560×1440)",
      "Lens": "2.8mm Fixed",
      "Night Vision": "Up to 10m",
      "Storage": "MicroSD up to 256GB",
      "Power": "DC 12V"
    },
    isPopular: true,
    isFeatured: true
  },
  {
    id: "p002",
    name: "TP-Link Tapo C310 4G Camera Solar Powered",
    description: "Solar powered 4G security camera for remote locations",
    price: 12000,
    originalPrice: 13500,
    images: ["https://5.imimg.com/data5/SELLER/Default/2024/7/435243081/RW/FB/WR/4592030/hikvision-cctv-camera-500x500.png", "https://static.vecteezy.com/system/resources/thumbnails/022/994/003/small_2x/professional-home-cctv-and-video-security-cameras-generative-ai-photo.jpg", "https://www.bdstall.com/asset/product-image/giant_187107.jpg"],
    category: "cctv",
    subcategory: "4g-camera",
    brand: "TP-LINK",
    rating: 4.6,
    reviews: 28,
    inStock: true,
    stockCount: 15,
    features: ["4G Connectivity", "Solar Power", "Weatherproof", "Cloud Storage", "Motion Detection"],
    specifications: {
      "Resolution": "2MP (1920×1080)",
      "Connectivity": "4G LTE",
      "Power": "Solar Panel + Battery",
      "Storage": "Cloud + MicroSD",
      "Weather Rating": "IP65"
    },
    isPopular: false,
    isFeatured: true
  },
  {
    id: "p003",
    name: "IMOU Bullet 2E 4MP IP Camera",
    description: "High-definition IP camera with AI human detection",
    price: 11500,
    originalPrice: 13000,
    images: ["https://5.imimg.com/data5/SELLER/Default/2024/7/435243081/RW/FB/WR/4592030/hikvision-cctv-camera-500x500.png", "https://static.vecteezy.com/system/resources/thumbnails/022/994/003/small_2x/professional-home-cctv-and-video-security-cameras-generative-ai-photo.jpg", "https://www.bdstall.com/asset/product-image/giant_187107.jpg"],
    category: "cctv",
    subcategory: "ip-camera",
    brand: "IMOU",
    rating: 4.5,
    reviews: 39,
    inStock: true,
    stockCount: 30,
    features: ["4MP Ultra HD", "AI Detection", "Two-way Audio", "Cloud Recording", "Night Vision"],
    specifications: {
      "Resolution": "4MP (2560×1440)",
      "Lens": "2.8mm Fixed",
      "AI Features": "Human Detection",
      "Night Vision": "Up to 30m",
      "Storage": "Cloud + NVR"
    },
    isPopular: true,
    isFeatured: false
  },

  // POS Software
  {
    id: "p004",
    name: "Restaurant POS Management Pro",
    description: "Complete restaurant management software with kitchen display and inventory control",
    price: 25000,
    originalPrice: 30000,
    images: ["https://5.imimg.com/data5/SELLER/Default/2024/7/435243081/RW/FB/WR/4592030/hikvision-cctv-camera-500x500.png", "https://static.vecteezy.com/system/resources/thumbnails/022/994/003/small_2x/professional-home-cctv-and-video-security-cameras-generative-ai-photo.jpg", "https://www.bdstall.com/asset/product-image/giant_187107.jpg"],
    category: "pos",
    subcategory: "restaurant",
    brand: "NEONECY",
    rating: 4.9,
    reviews: 67,
    inStock: true,
    stockCount: 100,
    features: ["Multi-table Management", "Kitchen Display", "Inventory Control", "Reports", "Staff Management"],
    specifications: {
      "Platform": "Windows/Android",
      "Database": "MySQL",
      "Users": "Unlimited",
      "Support": "1 Year Free",
      "Updates": "Lifetime"
    },
    isPopular: true,
    isFeatured: true
  },
  {
    id: "p005",
    name: "Pharmacy Management Software Advanced",
    description: "Specialized pharmacy management with drug database and prescription handling",
    price: 18000,
    originalPrice: 22000,
    images: ["https://5.imimg.com/data5/SELLER/Default/2024/7/435243081/RW/FB/WR/4592030/hikvision-cctv-camera-500x500.png", "https://static.vecteezy.com/system/resources/thumbnails/022/994/003/small_2x/professional-home-cctv-and-video-security-cameras-generative-ai-photo.jpg", "https://www.bdstall.com/asset/product-image/giant_187107.jpg"],
    category: "pos",
    subcategory: "pharmacy",
    brand: "NEONECY",
    rating: 4.8,
    reviews: 53,
    inStock: true,
    stockCount: 50,
    features: ["Drug Database", "Prescription Management", "Billing System", "Stock Control", "Expiry Alerts"],
    specifications: {
      "Platform": "Windows",
      "Database": "SQL Server",
      "Drug Database": "10,000+ Medicines",
      "Barcode": "Supported",
      "Printer": "Thermal + A4"
    },
    isPopular: true,
    isFeatured: true
  },

  // GPS Tracking
  {
    id: "p006",
    name: "Vehicle GPS Tracker Advanced GT06N",
    description: "Real-time GPS tracking device for cars and vehicles",
    price: 6500,
    originalPrice: 7500,
    images: ["https://5.imimg.com/data5/SELLER/Default/2024/7/435243081/RW/FB/WR/4592030/hikvision-cctv-camera-500x500.png", "https://static.vecteezy.com/system/resources/thumbnails/022/994/003/small_2x/professional-home-cctv-and-video-security-cameras-generative-ai-photo.jpg", "https://www.bdstall.com/asset/product-image/giant_187107.jpg"],
    category: "gps",
    subcategory: "car-tracking",
    brand: "STAREX",
    rating: 4.7,
    reviews: 35,
    inStock: true,
    stockCount: 40,
    features: ["Real-time Tracking", "Geofencing", "Speed Alerts", "Mobile App", "Engine Cut-off"],
    specifications: {
      "GPS Accuracy": "5-10 meters",
      "Network": "2G/3G/4G",
      "Battery": "Internal + Vehicle Power",
      "Tracking": "Every 10 seconds",
      "Platform": "Web + Mobile App"
    },
    isPopular: false,
    isFeatured: true
  }
];

// Brands
export const brands = [
  "HIKVISION", "TP-LINK", "IMOU", "JOVISION", "DAHUA", 
  "UNV", "TOSHIBA", "ONV", "SAMSUNG", "ORASIX", 
  "STAREX", "DELL", "MSI", "NEONECY"
];

// Helper functions
export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category === categoryId);
};

export const getProductsBySubcategory = (subcategoryId: string) => {
  return products.filter(product => product.subcategory === subcategoryId);
};

export const searchProducts = (query: string) => {
  return products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.brand.toLowerCase().includes(query.toLowerCase()) ||
    product.features.some(feature => feature.toLowerCase().includes(query.toLowerCase()))
  );
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getCategoryById = (id: string) => {
  return categories.find(category => category.id === id);
};

export const getSubcategoryById = (id: string) => {
  for (const category of categories) {
    const subcategory = category.subcategories.find(sub => sub.id === id);
    if (subcategory) return subcategory;
  }
  return null;
};
