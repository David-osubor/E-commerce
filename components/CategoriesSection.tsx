"use client"
import {
  ChevronLeft,
  ChevronRight,
  Monitor,
  Utensils,
  Smartphone,
  Book,
  Shirt,
  Plus,
} from "lucide-react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "Place Ads", icon: Plus, color: "bg-orange-500", textColor: "text-white" },
  { name: "Computers", icon: Monitor, color: "bg-white border-2 border-gray-200", textColor: "text-gray-700" },
  { name: "Food", icon: Utensils, color: "bg-white border-2 border-gray-200", textColor: "text-gray-700" },
  { name: "Phones", icon: Smartphone, color: "bg-blue-600", textColor: "text-white" },
  { name: "Books", icon: Book, color: "bg-white border-2 border-gray-200", textColor: "text-gray-700" },
  { name: "Clothes", icon: Shirt, color: "bg-white border-2 border-gray-200", textColor: "text-gray-700" },
]

export default function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="bg-gray-50 px-4 py-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-blue-600 rounded"></div>
            <span className="text-blue-600 font-medium">Categories</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2" onClick={() => scroll("left")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2" onClick={() => scroll("right")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse By Category</h2>

        {/* Categories Carousel */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <div
                key={index}
                className={`${category.color} ${category.textColor} min-w-[120px] snap-start p-6 rounded-lg flex flex-col items-center justify-center space-y-2 cursor-pointer hover:shadow-md transition-shadow`}
              >
                <IconComponent className="h-8 w-8" />
                <span className="text-sm font-medium text-center">{category.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
