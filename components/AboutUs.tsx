import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const missionItems = [
  {
    title: "Support Local Businesses",
    description:
      "Empower Nigerian vendors with an accessible, tech-driven platform",
    icon: "1",
  },
  {
    title: "Enhance Convenience",
    description:
      "Enable customers to discover and purchase quality products easily",
    icon: "2",
  },
  {
    title: "Ensure Security",
    description:
      "Implement advanced measures to protect users and transactions",
    icon: "3",
  },
];

const offerItems = [
  {
    number: "1",
    title: "Diverse Marketplace",
    description:
      "Empower Nigerian vendors with an accessible, tech-driven platform",
  },
  {
    number: "2",
    title: "User-Centric Experience",
    description:
      "Intuitive navigation, smart search filters, and personalized recommendations",
  },
  {
    number: "3",
    title: "Reliable Payment & Delivery",
    description: "Secure payment options and trusted logistics partnerships",
  },
  {
    number: "4",
    title: "Community Engagement",
    description: "Connect, review, and build trust within the marketplace",
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            About DigiMart
          </h1>
          <p className="text-white/90 text-lg">
            Your trusted Local Marketplace, Just a Click Away
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-orange-500 mb-8">
            Who We Are
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            DigiMart is a digital marketplace built with one goal in mind — to
            simplify how people buy, sell, and trade within their local
            communities. Whether you're a student looking for a fairly used
            phone, a parent finding home essentials, or a small business owner
            trying to reach nearby customers, DigiMart is here to connect you
            with people who need what you have.
          </p>
        </div>
      </section>

      {/* Vision and Mission Cards */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Our Vision */}
            <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <ArrowRight className="text-blue-500 mr-3" size={20} />
                <h3 className="text-xl font-semibold text-blue-600">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                A world where anyone, anywhere, can trade what they have for
                what they need, starting from their street, school, or city.
              </p>
            </div>

            {/* Our Mission */}
            <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <ArrowRight className="text-blue-500 mr-3" size={20} />
                <h3 className="text-xl font-semibold text-blue-600">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To empower communities by making buying and selling easier,
                faster, and safer through the power of local connections and
                technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-12">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offerItems.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-500">
                    {item.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-blue-600 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Community Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Join the DigiMart Community
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Whether you're a small business looking to scale or a shopper
              seeking authentic Nigerian products, DigiMarkets is your
              destination for growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-medium">
                Start Selling
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-medium bg-transparent"
              >
                Start Shopping
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
