"use client"
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/firebase/crud";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";


export default function HomePage() {
  const [products, setProducts] = useState<DocumentData[]>([]);
  const [query, setQuery] = useState("")

  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(query.toLowerCase())
  })

  useEffect(() => {
    const fetchProducts = async() => {
      const data = await getProducts();
      setProducts(data as DocumentData[]);
    }
    fetchProducts()
  },[])

  return (
    <div className="min-h-screen bg-white">
      <HeroSection setQuery={setQuery} />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
