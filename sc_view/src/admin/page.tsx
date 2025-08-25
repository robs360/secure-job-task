import React, { useEffect, useMemo, useState } from "react";
import "../admin/style.css";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Brands from "./components/Brands";
import Users from "./components/Users";
import Orders from "./components/Orders";
import { toast } from "@/components/ui/sonner";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");

  // -------------------------
  // Seed / State
  // -------------------------
  const [categories, setCategories] = useState([
    "CCTV Products",
    "POS Software",
    "GPS Tracking",
  ]);
  const [brands, setBrands] = useState(["Hikvision", "Dahua", "ZKTeco"]);
  
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [users, setUsers] = useState([
    { id: 1, name: "Ankon", email: "ankon@example.com", role: "Admin" },
    { id: 2, name: "John Doe", email: "john@example.com", role: "Customer" },
  ]);
  const [orders, setOrders] = useState([
    {
      id: 1,
      productId: 1,
      userId: 2,
      qty: 1,
      status: "Way to Pickup",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      productId: 2,
      userId: 2,
      qty: 3,
      status: "Ready to Deliver",
      createdAt: new Date().toISOString(),
    },
  ]);

  // -------------------------
  // Form states
  // -------------------------
  const emptyProduct = {
    id: 0,
    name: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
    description: "",
    features: [],
    benefits: [],
    components: [],
  };
  const [prodForm, setProdForm] = useState(emptyProduct);
  const [editingProductId, setEditingProductId] = useState(null);
  const [prodSearch, setProdSearch] = useState("");

  const [catInput, setCatInput] = useState("");
  const [brandInput, setBrandInput] = useState("");

  const emptyUser = { id: 0, name: "", email: "", role: "Customer" };
  const [userForm, setUserForm] = useState(emptyUser);
  const [editingUserId, setEditingUserId] = useState(null);

  const [orderFilters, setOrderFilters] = useState({
    status: "",
    userId: "",
  });

  const ORDER_STATUSES = [
    "Way to Pickup",
    "At Warehouse",
    "Ready to Deliver",
    "Delivered",
  ];

  // -------------------------
  // Helpers
  // -------------------------
  

  const productRows = useMemo(() => {
    const needle = prodSearch.toLowerCase().trim();
    return products.filter((p) => {
      if (!needle) return true;
      return (
        p.name.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle) ||
        p.brand.toLowerCase().includes(needle)
      );
    });
  }, [products, prodSearch]);

  const userById = (id) => users.find((u) => u.id === id);
  const productById = (id) => products.find((p) => p._id === id);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const byStatus = orderFilters.status
        ? o.status === orderFilters.status
        : true;
      const byUser = orderFilters.userId
        ? String(o.userId) === orderFilters.userId
        : true;
      return byStatus && byUser;
    });
  }, [orders, orderFilters]);

  // -------------------------
  // Products: CRUD
  // -------------------------
  const handleSaveProduct = async () => {
    const formData = new FormData();
    Object.keys(prodForm).forEach(key => {
      if (key === 'features' || key === 'benefits' || key === 'components') {
        formData.append(key, JSON.stringify(prodForm[key]));
      } else {
        formData.append(key, prodForm[key]);
      }
    });

    for (let i = 0; i < productImages.length; i++) {
      formData.append("images", productImages[i]);
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setProdForm(emptyProduct);
        setProductImages([]);
        fetchProducts(); // Refresh products list
        toast.success("Product has been added sir.");
      } else {
        console.error("Failed to save product");
        toast.error("Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Error saving product");
    }
  };


  const handleEditProduct = (p) => {
    setProdForm({ ...p, price: String(p.price), stock: String(p.stock) }); // convert numbers to string for input
    setEditingProductId(p._id);
    setActive("products");
  };

  const handleDeleteProduct = (id) => {
    // To be implemented: API call to delete product
    console.log("Delete product with id:", id);
  };

  const handleImagesChange = (e) => {
    if (e.target.files) {
      setProductImages(Array.from(e.target.files).slice(0, 3));
    }
  };

  // -------------------------
  // Categories / Brands
  // -------------------------
  const addCategory = () => {
    const v = catInput.trim();
    if (!v) return;
    if (!categories.includes(v)) setCategories((prev) => [...prev, v]);
    setCatInput("");
  };
  const deleteCategory = (name) => {
    setCategories((prev) => prev.filter((c) => c !== name));
  };

  const addBrand = () => {
    const v = brandInput.trim();
    if (!v) return;
    if (!brands.includes(v)) setBrands((prev) => [...prev, v]);
    setBrandInput("");
  };
  const deleteBrand = (name) => {
    setBrands((prev) => prev.filter((b) => b !== name));
  };

  // -------------------------
  // Users: CRUD
  // -------------------------
  const saveUser = () => {
    const clean = {
      ...userForm,
      id: editingUserId || nextId(),
    };
    if (!clean.name || !clean.email) return;

    if (editingUserId) {
      setUsers((prev) => prev.map((u) => (u.id === clean.id ? clean : u)));
    } else {
      setUsers((prev) => [...prev, clean]);
    }
    setUserForm(emptyUser);
    setEditingUserId(null);
  };

  const editUser = (u) => {
    setUserForm(u);
    setEditingUserId(u.id);
    setActive("users");
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (editingUserId === id) {
      setUserForm(emptyUser);
      setEditingUserId(null);
    }
  };

  // -------------------------
  // Orders
  // -------------------------
  const updateOrderStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const addOrder = () => {
    if (!products[0] || !users[0]) return;
    setOrders((prev) => [
      ...prev,
      {
        id: nextId(),
        productId: products[0]._id,
        userId: users[0].id,
        qty: 1,
        status: "Way to Pickup",
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return (
          <Dashboard
            products={products}
            users={users}
            orders={orders}
            addOrder={addOrder}
          />
        );
      case "products":
        return (
          <Products
            prodSearch={prodSearch}
            setProdSearch={setProdSearch}
            handleSaveProduct={handleSaveProduct}
            editingProductId={editingProductId}
            prodForm={prodForm}
            setProdForm={setProdForm}
            categories={categories}
            brands={brands}
            productRows={productRows}
            handleEditProduct={handleEditProduct}
            handleDeleteProduct={handleDeleteProduct}
            onImagesChange={handleImagesChange}
            productImages={productImages}
          />
        );
      case "categories":
        return (
          <Categories
            catInput={catInput}
            setCatInput={setCatInput}
            addCategory={addCategory}
            categories={categories}
            deleteCategory={deleteCategory}
          />
        );
      case "brands":
        return (
          <Brands
            brandInput={brandInput}
            setBrandInput={setBrandInput}
            addBrand={addBrand}
            brands={brands}
            deleteBrand={deleteBrand}
          />
        );
      case "users":
        return (
          <Users
            saveUser={saveUser}
            editingUserId={editingUserId}
            userForm={userForm}
            setUserForm={setUserForm}
            users={users}
            editUser={editUser}
            deleteUser={deleteUser}
          />
        );
      case "orders":
        return (
          <Orders
            orderFilters={orderFilters}
            setOrderFilters={setOrderFilters}
            ORDER_STATUSES={ORDER_STATUSES}
            users={users}
            filteredOrders={filteredOrders}
            userById={userById}
            productById={productById}
            updateOrderStatus={updateOrderStatus}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout active={active} setActive={setActive}>
      {renderContent()}
    </Layout>
  );
}