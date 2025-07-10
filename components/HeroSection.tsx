import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroSection({ setQuery }: { setQuery: (query: string) => void; 

}) {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">
          Buy and Sell with People Near You
        </h1>
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-8">
          All in One Place
        </h2>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full pl-4 pr-12 py-3 rounded-full border-0 text-gray-700 placeholder:text-gray-500 bg-white h-10"
          />
          <Button
            size="sm"
            className="absolute right-0 top-0 bottom-0 bg-gray-800 hover:bg-gray-700 rounded-r-full px-10 h-10"
          >
            <Search className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
}
