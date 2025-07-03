import CategoriesSection from "@/components/CategoriesSection";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CategoriesSection />
      <ProductGrid />
    </div>
  )
}
