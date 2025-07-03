"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock product data with merchant details
const productData = {
  id: "1",
  name: "Apple iPhone 7 64 GB Gray",
  price: "₦20,000",
  negotiable: true,
  images: [
    "/prod1.png",
    "/prod2.png",
    "/prod3.png",
    "/prod4.png",
    "/prod5.png",
  ],
  specifications: {
    brand: "Apple",
    model: "iPhone 7",
    color: "Gray",
    condition: "Fairly Used",
    secondCondition: "No faults",
    internalStorage: "64GB",
    cardSlot: "No",
    batteryHealth: "80%",
  },
  description:
    "iPhone in good working condition with a fully functional Face ID, ensuring seamless unlocking and authentication. The screen and back are intact with no cracks, providing a clean and presentable look. Battery health is at 71%, which may require charging more frequently but does not affect the phone's overall performance. All essential features, including the camera, speakers, buttons, and connectivity functions, work perfectly without any issues. Ideal for daily use or as a backup device.",
  merchant: {
    id: "merchant123",
    name: "Tech Gadgets Store",
    rating: 4.5,
    reviews: 42,
    phone: "+2349025777310", // WhatsApp-enabled phone number
    location: "Lagos, Nigeria",
    joined: "Member since 2022",
    image: "/merchant-placeholder.jpg",
  },
};

const relatedProducts = [
  {
    id: "2",
    name: "iPhone 8 Plus",
    description:
      "Buy quality iPhone at used iPhone Store High end mobile and phones comes with original boxes",
    image: "/prod3.png",
  },
  {
    id: "3",
    name: "iPhone 8 Plus",
    description:
      "Buy quality iPhone at used iPhone Store High end mobile and phones comes with original boxes",
    image: "/prod3.png",
  },
  {
    id: "4",
    name: "iPhone 8 Plus",
    description:
      "Buy quality iPhone at used iPhone Store High end mobile and phones comes with original boxes",
    image: "/prod3.png",
  },
];

interface ProductDetailPageProps {
  productId: string;
}

export default function ProductDetailPage({
  productId,
}: ProductDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleWhatsAppClick = () => {
    // Create WhatsApp message with product details
    const message = `Hello ${
      productData.merchant.name
    },\n\nI'm interested in your product:\n\n*${productData.name}*\nPrice: ${
      productData.price
    }\n\n${productData.description.substring(
      0,
      100
    )}...\n\nCould you provide more details?`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with the merchant's number and pre-filled message
    window.open(
      `https://wa.me/${productData.merchant.phone}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div>
          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-1 p-4">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden h-[300px]">
                <Image
                  src={
                    productData.images[selectedImageIndex] || "/placeholder.svg"
                  }
                  alt={productData.name}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {productData.images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-blue-500"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${productData.name} view ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Price and Negotiable Badge */}
              <div className="flex items-center space-x-4">
                <h1 className="text-4xl font-bold text-blue-600">
                  {productData.price}
                </h1>
                {productData.negotiable && (
                  <Badge
                    variant="secondary"
                    className="bg-gray-200 text-gray-700 px-3 py-1"
                  >
                    Negotiable
                  </Badge>
                )}
              </div>

              {/* Merchant Information */}
              <div className="border-t border-b border-gray-200 py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center uppercase">
                    {productData.merchant.name.slice(0,2)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {productData.merchant.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(productData.merchant.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({productData.merchant.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {productData.merchant.location} •{" "}
                      {productData.merchant.joined}
                    </p>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-900">Brand:</span>
                  <span className="text-gray-700">
                    {productData.specifications.brand}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-900">Model:</span>
                  <span className="text-gray-700">
                    {productData.specifications.model}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-900">Color:</span>
                  <span className="text-gray-700">
                    {productData.specifications.color}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-900">Condition:</span>
                  <span className="text-gray-700">
                    {productData.specifications.condition}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-900">
                    Second Condition:
                  </span>
                  <span className="text-gray-700">
                    {productData.specifications.secondCondition}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-900">
                    Internal Storage:
                  </span>
                  <span className="text-gray-700">
                    {productData.specifications.internalStorage}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-900">Card Slot:</span>
                  <span className="text-gray-700">
                    {productData.specifications.cardSlot}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-900">
                    Battery Health:
                  </span>
                  <span className="text-gray-700">
                    {productData.specifications.batteryHealth}
                  </span>
                </div>
              </div>

              {/* WhatsApp Button */}
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-medium rounded-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          {/* Product Description and Disclaimer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 p-5">
            {/* Product Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {productData.name}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {productData.description}
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Disclaimer</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                DigiMart acts as a platform connecting buyers with merchants. We
                do not handle transactions, shipping, or product fulfillment.
                Please verify all details with the merchant before making any
                payments. Exercise due diligence when conducting business
                transactions.
              </p>
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
