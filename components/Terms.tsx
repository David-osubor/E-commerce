import { AlertCircle } from "lucide-react";

const termsSection = [
  "Account Registration",
  "Marketplace Transactions",
  "Prohibited Activities",
  "Market Terms & Commission",
  "Payment, Refunds & Dispute Resolution",
];

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-16">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Terms & Conditions
          </h1>
          <p className="text-white/90 text-lg leading-relaxed">
            These Terms and Conditions govern your access and use of our
            platform. By signing up and transacting on DigiMarkets, you agree to
            comply with the following policies.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          {/* Important Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
            <div className="flex items-start space-x-3">
              <AlertCircle
                className="text-blue-600 mt-1 flex-shrink-0"
                size={20}
              />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Important Notice
                </h3>
                <p className="text-gray-700">
                  By using DigiMart, you automatically agree to these terms.
                  Please read them carefully.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8 mb-12">
            {termsSection.map((section, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {section}
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Amendments & Compliance */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Amendments & Compliance
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  DigiMart reserves the right to update these terms to reflect
                  operational improvements or regulatory changes.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  Continued use of the platform after modifications signifies
                  acceptance of the updated policies.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-100 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed">
              For inquiries, reach out to our support team at{" "}
              <a
                href="mailto:DigiMart@gmail.com"
                className="text-blue-600 hover:underline"
              >
                DigiMart@gmail.com
              </a>{" "}
              or use the chat messenger for quick responses.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
