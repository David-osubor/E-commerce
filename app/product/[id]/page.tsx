import ProductDetailPage from "@/components/product/ProductDetailPage";
import { getProductById } from "@/lib/firebase/crud";


export default async function ProductPage({ params }: {params: Promise<{ id: string }>}) {
  const paramData = await params
  
  const productData = await getProductById(paramData.id)
  if (!productData) {
    return <div className="text-center py-20">Product not found!</div>;
  }

  return <ProductDetailPage product={productData} />;
}
