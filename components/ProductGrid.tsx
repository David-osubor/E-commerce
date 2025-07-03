import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Apple iPhone 7 64 GB Gray",
    price: "₦20,000",
    image: "/prod1.png",
    verified: true,
    description:
      "Face ID works perfect, crack on the screen and back, battery health is 78%. Works perfectly and it's...",
  },
  {
    id: 2,
    name: "Apple iPhone 7 64 GB Gray",
    price: "₦20,000",
    image: "/prod2.png",
    verified: true,
    description:
      "Face ID works perfect, crack on the screen and back, battery health is 78%. Works perfectly and it's...",
  },
  {
    id: 3,
    name: "Apple iPhone 7 64 GB Gray",
    price: "₦20,000",
    image: "/prod3.png",
    verified: true,
    description:
      "Face ID works perfect, crack on the screen and back, battery health is 78%. Works perfectly and it's...",
  },
  {
    id: 4,
    name: "Apple iPhone 7 64 GB Gray",
    price: "₦20,000",
    image: "/prod4.png",
    verified: true,
    description:
      "Face ID works perfect, crack on the screen and back, battery health is 78%. Works perfectly and it's...",
  },
]

// Duplicate products to create multiple rows as shown in the image
const allProducts = [...products, ...products, ...products]

export default function ProductGrid() {
  return (
    <section className="bg-gray-50 px-4 py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {allProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="aspect-square relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price}
                  </span>
                  {product.verified && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-green-600">Verified</span>
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {product.description}
                </p>
                <Link href={`/product/${product.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
