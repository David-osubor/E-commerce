"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DocumentData } from "firebase/firestore";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getProducts } from "@/lib/firebase/crud";

dayjs.extend(relativeTime);


interface ProductDetailPageProps {
  product: DocumentData;
}

export default function ProductDetailPage({
  product,
}: ProductDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<DocumentData[]>([])

   useEffect(() => {
     const fetchProducts = async () => {
       const data = await getProducts();
       if(data !== undefined ){
        const rProducts = data.filter((p) => p.category === product.category);
        if(rProducts){
          setRelatedProducts(rProducts);
        }
       
       }
       
     };
     fetchProducts();
   }, [product.category]);

  const handleWhatsAppClick = () => {
    // Create WhatsApp message with product details
    const message = `Hello ${
      product.brandName
    },\n\nI'm interested in your product:\n\n*${product.name}*\nPrice: ${
      product.price
    }\n\n${product.description.substring(
      0,
      100
    )}...\n\nCould you provide more details?`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with the merchant's number and pre-filled message
    window.open(
      `https://wa.me/${product.merchantNo}?text=${encodedMessage}`,
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
                    product.imageUrls[selectedImageIndex] || "/placeholder.svg"
                  }
                  alt={product.name}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail imageUrls */}
              <div className="grid grid-cols-4 gap-2">
                {Array.isArray(product.imageUrls) &&
                  product.imageUrls.slice(0, 4).map((image, index) => (
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
                        alt={`${product.name} view ${index + 1}`}
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
                  ₦ {product.price}
                </h1>
                {product.negotiable && (
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
                    {product.brandName.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {product.brandName}
                    </h3>
                    {/* <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(5)
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
                      <span className="text-sm text-gray-600">(4 reviews)</span>
                    </div> */}
                    <p className="text-sm text-gray-600 mt-1">
                      OOU Ibogun • {dayjs(product.lastUpdated).fromNow()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-900">Condition:</span>
                  <span className="capitalize text-gray-700">
                    {product.condition}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-900">Category:</span>
                  <span className="text-gray-700">{product.category}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-900">Negotiable:</span>
                  <span className="uppercase text-gray-700">
                    {product.negotiable}
                  </span>
                </div>
                <p className="mt-5 text-gray-700 leading-relaxed">
                  {product.specifications}
                </p>
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
                {product.name}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
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
              {relatedProducts &&
                relatedProducts
                  .filter((rproduct) => rproduct.id !== product.id)
                  .map((rproduct) => (
                    <Link
                      key={rproduct.id}
                      href={`/product/${rproduct.id}`}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-square bg-gray-100">
                        <Image
                          src={rproduct.imageUrls[0]}
                          alt={rproduct.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {rproduct.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {rproduct.description}
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
