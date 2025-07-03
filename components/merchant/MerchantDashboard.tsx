"use client";

import { useState, useEffect } from "react";
import { LogOut, Plus, Edit, Trash2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AddProductDialog from "./AddProductDialog";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Iphone 7 64gb",
    image: "/prod1.png",
    category: "Application",
    createdAt: "2 days ago",
  },
  {
    id: 2,
    name: "Samsung A50",
    image: "/prod2.png",
    category: "Application",
    createdAt: "1 hour ago",
  },
  {
    id: 3,
    name: "Iphone 7 64gb",
    image: "/prod3.png",
    category: "Application",
    createdAt: "30 mins ago",
  },
  {
    id: 4,
    name: "Iphone 7 64gb",
    image: "/prod1.png",
    category: "Application",
    createdAt: "32 mins ago",
  },
  {
    id: 5,
    name: "Itel A3",
    image: "/prod4.png",
    category: "Application",
    createdAt: "15 mins ago",
  },
  {
    id: 6,
    name: "Iphone 7 64gb",
    image: "/prod3.png",
    category: "Application",
    createdAt: "1 min ago",
  },
];

const categories = ["All", "Application", "Utensils", "Food stuff"];

export default function MerchantDashboard() {
  // const { user } = useAuth()
  // const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState(mockProducts);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleEditProduct = (productId: number) => {
    // Handle edit functionality
    console.log("Edit product:", productId);
  };

  const handleAddProduct = (productData: any) => {
    const newProduct = {
      id: Date.now(),
      name: productData.name,
      image: "/prod1.png",
      category: productData.category,
      createdAt: "Just now",
    };
    setProducts([newProduct, ...products]);
    setIsAddProductOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <h1 className="text-xl font-bold text-gray-900">Merchant Dashboard</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Sidebar - Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white p-6">
          <div className="flex justify-end mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Profile */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <span className="text-lg font-medium text-gray-900">Username</span>
          </div>

          {/* Logout Button */}
          <div className="mt-auto">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg">
              <LogOut className="w-4 h-4 mr-2" />
              LOG OUT
            </Button>
          </div>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 lg:w-80 bg-white p-6 flex-col">
        <div className="mb-8">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">
            Merchant
            <br />
            Dashboard
          </h1>

          {/* User Profile */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <span className="text-lg font-medium text-gray-900">Username</span>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-auto">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg">
            <LogOut className="w-4 h-4 mr-2" />
            LOG OUT
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
              Product Categories
            </h2>

            {/* Category Filters - Scrollable on mobile */}
            <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-4 md:px-6 py-2 rounded-full ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setIsAddProductOpen(true)}
            className="md:w-auto w-full bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-3 rounded-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span>Post Product</span>
          </Button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <p className="text-gray-500 text-lg">No Product available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg p-3 md:p-5 shadow-sm border border-gray-200"
              >
                <div className="flex items-start space-x-3 md:space-x-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm mb-3 md:mb-4">
                      {product.createdAt}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 md:space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 p-0"
                      >
                        <Trash2 className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        <span className="text-xs md:text-sm">Delete</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProduct(product.id)}
                        className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 p-0"
                      >
                        <Edit className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        <span className="text-xs md:text-sm">Edit</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product Dialog */}
      <AddProductDialog
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        onSubmit={handleAddProduct}
      />
    </div>
  );
}
