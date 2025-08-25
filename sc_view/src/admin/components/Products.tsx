import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaMinus, FaChevronDown, FaChevronRight, FaTimes } from "react-icons/fa";
import Section from "./Section";
import TextField from "./TextField";
import SelectField from "./SelectField";
import NumberField from "./NumberField";


const Products = ({
  prodSearch,
  setProdSearch,
  editingProductId,
  prodForm,
  setProdForm,
  handleSaveProduct,
  categories,
  brands,
  productRows,
  handleEditProduct,
  handleDeleteProduct,
  onImagesChange,
  productImages,
}) => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [newComponent, setNewComponent] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState("");

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    const currentImages = productImages ? Array.from(productImages) : [];
    const remainingSlots = 3 - currentImages.length;
    const newImages = files.slice(0, remainingSlots);
    
    if (newImages.length > 0) {
      const updatedImages = [...currentImages, ...newImages];
      const dt = new DataTransfer();
      updatedImages.forEach(file => dt.items.add(file));
      onImagesChange({ target: { files: dt.files } });
    }
    
    e.target.value = '';
  };

  const handleImageRemove = (indexToRemove) => {
    if (productImages) {
      const currentImages = Array.from(productImages);
      const updatedImages = currentImages.filter((_, index) => index !== indexToRemove);
      const dt = new DataTransfer();
      updatedImages.forEach(file => dt.items.add(file));
      onImagesChange({ target: { files: dt.files } });
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setProdForm({
        ...prodForm,
        features: [...(prodForm.features || []), newFeature.trim()]
      });
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...(prodForm.features || [])];
    updatedFeatures.splice(index, 1);
    setProdForm({ ...prodForm, features: updatedFeatures });
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setProdForm({
        ...prodForm,
        benefits: [...(prodForm.benefits || []), newBenefit.trim()]
      });
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (index) => {
    const updatedBenefits = [...(prodForm.benefits || [])];
    updatedBenefits.splice(index, 1);
    setProdForm({ ...prodForm, benefits: updatedBenefits });
  };

  const handleAddComponent = () => {
    if (newComponent.trim()) {
      setProdForm({
        ...prodForm,
        components: [...(prodForm.components || []), newComponent.trim()]
      });
      setNewComponent("");
    }
  };

  const handleRemoveComponent = (index) => {
    const updatedComponents = [...(prodForm.components || [])];
    updatedComponents.splice(index, 1);
    setProdForm({ ...prodForm, components: updatedComponents });
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      console.log("Adding new category:", newCategory.trim());
      setNewCategory("");
    }
  };

  const handleAddSubcategory = () => {
    if (newSubcategory.trim() && selectedCategoryForSub) {
      console.log(`Adding new subcategory ${newSubcategory.trim()} to ${selectedCategoryForSub}`);
      setNewSubcategory("");
    }
  };

  const currentImageCount = productImages ? productImages.length : 0;
  const canAddMoreImages = currentImageCount < 3;

  return (
    <Section
      title="Products"
      actions={
        <>
          <input
            type="text"
            placeholder="Search..."
            className="border px-2 py-1 rounded"
            value={prodSearch}
            onChange={(e) => setProdSearch(e.target.value)}
          />
          <button
            onClick={handleSaveProduct}
            className="btn bg-green-500 text-white px-3 py-1 rounded"
          >
            {editingProductId ? "Update" : "Add"} Product
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TextField
          label="Name"
          value={prodForm.name}
          onChange={(v) => setProdForm({ ...prodForm, name: v })}
        />
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={prodForm.description}
            onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
            className="w-full border rounded p-2 h-32"
            placeholder="Enter product description..."
          />
        </div>
        
        <SelectField
          label="Category"
          value={prodForm.category}
          options={categories}
          onChange={(v) => setProdForm({ ...prodForm, category: v })}
        />
        
        <SelectField
          label="Subcategory"
          value={prodForm.subcategory}
          options={[]} // This would be populated based on selected category
          onChange={(v) => setProdForm({ ...prodForm, subcategory: v })}
        />
        
        <SelectField
          label="Brand"
          value={prodForm.brand}
          options={brands}
          onChange={(v) => setProdForm({ ...prodForm, brand: v })}
        />
        
        <NumberField
          label="Price"
          value={prodForm.price}
          onChange={(v) => setProdForm({ ...prodForm, price: v })}
        />
        
        <NumberField
          label="Stock"
          value={prodForm.stock}
          onChange={(v) => setProdForm({ ...prodForm, stock: v })}
        />
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Product Images ({currentImageCount}/3)
          </label>
          
          {canAddMoreImages && (
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageAdd}
              className="w-full border rounded p-2 mb-2"
            />
          )}
          
          {!canAddMoreImages && (
            <p className="text-sm text-gray-500 mb-2">
              Maximum 3 images reached. Remove an image to add a new one.
            </p>
          )}
          
          <div className="mt-2 flex gap-2 flex-wrap">
            {productImages && Array.from(productImages).map((image, index) => (
              <div key={index} className="relative group">
                <img 
                  src={URL.createObjectURL(image)} 
                  alt={`preview ${index}`} 
                  className="w-20 h-20 object-cover rounded border" 
                />
                <button
                  onClick={() => handleImageRemove(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  <FaTimes />
                </button>
              </div>
            ))}            
          </div>
        </div>
      </div>

      {/* Expandable Features Section */}
      <div className="mb-4 border rounded">
        <div 
          className="p-3 bg-gray-100 flex justify-between items-center cursor-pointer"
          onClick={() => setShowFeatures(!showFeatures)}
        >
          <h3 className="font-medium">Product Details & Features</h3>
          {showFeatures ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        
        {showFeatures && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Features */}
            <div className="border rounded p-3">
              <h4 className="font-medium mb-2">Features</h4>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature"
                  className="flex-grow border rounded-l p-1"
                />
                <button 
                  onClick={handleAddFeature}
                  className="bg-blue-500 text-white px-2 rounded-r"
                >
                  <FaPlus />
                </button>
              </div>
              <ul className="mt-2">
                {(prodForm.features || []).map((feature, index) => (
                  <li key={index} className="flex justify-between items-center py-1 border-b">
                    <span>{feature}</span>
                    <button 
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-500"
                    >
                      <FaMinus />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Benefits */}
            <div className="border rounded p-3">
              <h4 className="font-medium mb-2">Benefits</h4>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Add a benefit"
                  className="flex-grow border rounded-l p-1"
                />
                <button 
                  onClick={handleAddBenefit}
                  className="bg-blue-500 text-white px-2 rounded-r"
                >
                  <FaPlus />
                </button>
              </div>
              <ul className="mt-2">
                {(prodForm.benefits || []).map((benefit, index) => (
                  <li key={index} className="flex justify-between items-center py-1 border-b">
                    <span>{benefit}</span>
                    <button 
                      onClick={() => handleRemoveBenefit(index)}
                      className="text-red-500"
                    >
                      <FaMinus />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Components */}
            <div className="border rounded p-3">
              <h4 className="font-medium mb-2">Components</h4>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={newComponent}
                  onChange={(e) => setNewComponent(e.target.value)}
                  placeholder="Add a component"
                  className="flex-grow border rounded-l p-1"
                />
                <button 
                  onClick={handleAddComponent}
                  className="bg-blue-500 text-white px-2 rounded-r"
                >
                  <FaPlus />
                </button>
              </div>
              <ul className="mt-2">
                {(prodForm.components || []).map((component, index) => (
                  <li key={index} className="flex justify-between items-center py-1 border-b">
                    <span>{component}</span>
                    <button 
                      onClick={() => handleRemoveComponent(index)}
                      className="text-red-500"
                    >
                      <FaMinus />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Expandable Category Management */}
      <div className="mb-4 border rounded">
        <div 
          className="p-3 bg-gray-100 flex justify-between items-center cursor-pointer"
          onClick={() => setShowCategories(!showCategories)}
        >
          <h3 className="font-medium">Category Management</h3>
          {showCategories ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        
        {showCategories && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Add Category */}
            <div className="border rounded p-3">
              <h4 className="font-medium mb-2">Add New Category</h4>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Category name"
                  className="flex-grow border rounded-l p-1"
                />
                <button 
                  onClick={handleAddCategory}
                  className="bg-blue-500 text-white px-2 rounded-r"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            
            {/* Add Subcategory */}
            <div className="border rounded p-3">
              <h4 className="font-medium mb-2">Add New Subcategory</h4>
              <div className="mb-2">
                <select
                  value={selectedCategoryForSub}
                  onChange={(e) => setSelectedCategoryForSub(e.target.value)}
                  className="w-full border rounded p-1 mb-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="flex">
                  <input
                    type="text"
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                    placeholder="Subcategory name"
                    className="flex-grow border rounded-l p-1"
                  />
                  <button 
                    onClick={handleAddSubcategory}
                    className="bg-blue-500 text-white px-2 rounded-r"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Subcategory</th>
            <th className="border px-2 py-1">Brand</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Stock</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productRows.map((p, i) => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{i + 1}</td>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1">{p.category}</td>
              <td className="border px-2 py-1">{p.subcategory || "-"}</td>
              <td className="border px-2 py-1">{p.brand}</td>
              <td className="border px-2 py-1">{p.price}</td>
              <td className="border px-2 py-1">{p.stock}</td>
              <td className="border px-2 py-1 flex gap-1">
                <button
                  onClick={() => handleEditProduct(p)}
                  className="text-blue-500"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteProduct(p.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
};

export default Products;