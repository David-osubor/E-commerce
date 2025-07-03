import ProductDetailPage from "@/components/product/ProductDetailPage";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductDetailPage productId={params.id} />;
}
