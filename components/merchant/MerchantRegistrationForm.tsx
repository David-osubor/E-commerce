"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";
import { addNewMerchant } from "@/lib/firebase/crud";
import { useRouter } from "next/navigation";

const businessCategories = [
  "EDUCATION AND STATIONERY",
  "REAL ESTATE AND HOUSING",
  "SPORTS AND OUTDOOR",
  "TECHNOLOGY SERVICES",
  "FASHION AND ACCESSORIES",
  "ELECTRONICS AND GADGETS",
];

export default function MerchantRegistrationForm() {
  const { user, loading } = useAuth();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    primaryPhone: "",
    whatsappNo: "",
    brandName: "",
    address: "OOU Ibogun",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user?.uid) {
      router.push('/');
      return;
    } else if(user?.uid){
      router.push('/merchant/dashboard');      
    }
  },[])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (error) setError(null);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    }
    // Clear errors when user changes categories
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (selectedCategories.length === 0) {
      setError("Please select at least one business category");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addNewMerchant(user?.uid!, {
        ...formData,
        categories: selectedCategories,
      });
      setSuccess(true);
      router.push("/merchant/dashboard");
    } catch (err) {
      if (
        err instanceof Error &&
        err.message === "User already has a merchant store."
      ) {
        router.push("/merchant/dashboard");
      }
      console.error("Failed to create merchant:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create merchant account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Join DigiMart as a Merchant
          </h1>
          <p className="text-white/90 text-lg">
            Start selling your products to millions of customers today
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm p-8"
          >
            {/* Show success message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
                Merchant account created successfully!
              </div>
            )}

            {/* Show error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
                {error}
              </div>
            )}

            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Basic Information
              </h2>

              <div className="space-y-6">
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="primaryPhone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Primary Phone
                    </Label>
                    <Input
                      id="primaryPhone"
                      type="tel"
                      value={formData.primaryPhone}
                      onChange={(e) =>
                        handleInputChange("primaryPhone", e.target.value)
                      }
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="whatsappNo"
                      className="text-sm font-medium text-gray-700"
                    >
                      WhatsApp Phone
                    </Label>
                    <Input
                      id="whatsappNo"
                      type="tel"
                      value={formData.whatsappNo}
                      onChange={(e) =>
                        handleInputChange("whatsappNo", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="brandName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Brand Name
                  </Label>
                  <Input
                    id="brandName"
                    type="text"
                    value={formData.brandName}
                    onChange={(e) =>
                      handleInputChange("brandName", e.target.value)
                    }
                    className="mt-1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Business Information
              </h2>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-4 block">
                  Business Categories (Select at least one)
                </Label>
                <div className="border border-gray-200 rounded-md p-4 max-h-48 overflow-y-auto">
                  <div className="space-y-3">
                    {businessCategories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) =>
                            handleCategoryChange(category, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={category}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Addresses */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Basic Addresses
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium text-gray-700"
                    >
                      Address
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700"
                    >
                      City
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="state"
                      className="text-sm font-medium text-gray-700"
                    >
                      State
                    </Label>
                    <Input
                      id="state"
                      type="text"
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="postalCode"
                      className="text-sm font-medium text-gray-700"
                    >
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleInputChange("postalCode", e.target.value)
                      }
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="country"
                      className="text-sm font-medium text-gray-700"
                    >
                      Country
                    </Label>
                    <Input
                      id="country"
                      type="text"
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Create Merchant Account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
