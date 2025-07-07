import CategoriesSection from "@/components/CategoriesSection";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/firebase/crud";


export default async function HomePage() {
  const products = await getProducts();
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />      
      <ProductGrid products={products || []} />
    </div>
  )
}
