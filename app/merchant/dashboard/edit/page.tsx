import MerchantRegistrationForm from "@/components/merchant/MerchantRegistrationForm";

export default function MerchantEditPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MerchantRegistrationForm isEditMode={true} />
    </div>
  );
}
