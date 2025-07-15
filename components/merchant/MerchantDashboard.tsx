"use client";

import { useState, useEffect } from "react";
import { LogOut, Plus, Edit, Trash2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AddProductDialog from "./AddProductDialog";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { addNewProduct, deleteProduct, getMerchantByUserId, getMerchantProducts, updateProduct } from "@/lib/firebase/crud";
import { DocumentData } from "firebase/firestore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";



const categories = ["All", "Application", "Utensils", "Food stuff"];

export default function MerchantDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [merchant, setMerchant] = useState<DocumentData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<DocumentData[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [productToEdit, setProductToEdit] = useState<DocumentData | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    
    const fetchMerchantData = async () => {
      if (!user?.uid) {
        if(!loading)  router.push('/');
        return;
      }

      setIsLoading(true);
      try {
        const response = await getMerchantByUserId(user.uid);
        if (response) {
          setMerchant({...response.data, id: response.id});
          const merchantProducts = await getMerchantProducts(response.id);
          setProducts(merchantProducts || []);
        } else {
          console.error("No merchant data available");
        }

      } catch (error) {
        console.error("Failed to fetch merchant:", error);
        // Handle error (e.g., show toast notification)
      } finally {
        setIsLoading(false);
      }
    };

    fetchMerchantData();
  }, [loading, user?.uid]); // Only re-run if user.uid changes

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleDeleteProduct = async (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId));
    // TODO: Add actual delete from Firestore
    await deleteProduct(productId);
  };

  const handleSaveProduct = async (productData: {
    id?: string;
    name: string;
    price: string;
    description: string;
    specification: string;
    condition: string;
    category: string;
    negotiable: string;
    images: File[];
    existingImages?: string[];
    merchantId?: string;
    merchantName?: string;
    merchantWhatsapp?: string;
  }) => {
    if (!merchant) {
      console.error("No merchant data available");
      return;
    }

    try {
      if (productData.id) {
        // Editing existing product
        const updatedProduct = await updateProduct(
          productData.id,
          {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            specification: productData.specification,
            condition: productData.condition,
            category: productData.category,
            negotiable: productData.negotiable,
            images: productData.images,
            // Keep existing merchant info
            merchantId: merchant.id,
            merchantName: merchant.brandName,
            merchantWhatsapp: merchant.whatsappNo,
          },
          productData.existingImages // Pass existing images to handle deletions
        );

        if (updatedProduct) {
          setProducts(
            products.map((p) => (p.id === productData.id ? updatedProduct : p))
          );
          setIsAddProductOpen(false);
        }
      } else {
        // Adding new product
        const response = await addNewProduct(
          productData.name,
          productData.price,
          productData.description,
          productData.specification,
          productData.condition,
          productData.category,
          productData.negotiable,
          productData.images,
          merchant.id,
          merchant.brandName,
          merchant.whatsappNo
        );

        if (response) {
          const newProduct = { ...response.data, id: response.productId };
          setProducts([newProduct, ...products]);
          setIsAddProductOpen(false);
        }
      }
    } catch (error) {
      console.error("Failed to save product:", error);
      // Handle error (e.g., show toast notification)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <h1 className="text-lg font-bold text-gray-900">Merchant Dashboard</h1>
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
            <Avatar className="w-12 h-12">
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>
                {(merchant?.brandName || "Merchant").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium text-gray-900 capitalize">
              {merchant?.brandName || "Merchant"}
            </span>
          </div>

          {/* Logout Button */}
          <div className="mt-auto flex justify-center">
            <Button
              onClick={logout}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              LOG OUT
            </Button>
          </div>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-60 lg:w-64 bg-white p-6 flex-col">
        <div className="mb-8">
          <h1 className="text-lg lg:text-xl text-center font-bold text-gray-900 mb-6 lg:mb-8">
            Merchant
            <br />
            Dashboard
          </h1>

          {/* User Profile */}
          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-12 h-12">
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>
                {(merchant?.brandName || "Merchant").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium text-gray-900 capitalize">
              {merchant?.brandName || "Merchant"}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-auto">
          <Button
            onClick={logout}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
          >
            <LogOut className="w-4 h-4 mr-2" />
            LOG OUT
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col mb-6 md:mb-8 gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
              Product Categories
            </h2>
            <Button
              onClick={() => {
                setProductToEdit(null);
                setIsAddProductOpen(true);
              }}
              className="md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-3 rounded-lg"
              disabled={isLoading}
            >
              <Plus className="w-4 h-4 mr-2" />
              <span>Post Product</span>
            </Button>
          </div>
          {/* Category Filters */}
          <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12 md:py-16">
            <p className="text-gray-500 text-lg">Loading...</p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && filteredProducts.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <p className="text-gray-500 text-lg">No Product available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg p-3 md:p-5 shadow-sm border border-gray-200"
              >
                <div className="flex items-start space-x-3 md:space-x-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product.imageUrls[0] || "/placeholder.svg"}
                      alt={product.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      priority={false}
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
                        onClick={() => {
                          setProductToEdit(product);
                          setIsAddProductOpen(true);
                        }}
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
        product={productToEdit as DocumentData}
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        onSubmit={handleSaveProduct}
      />
    </div>
  );
}
