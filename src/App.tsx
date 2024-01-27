import { ThemeProvider } from "./components/theme-provider";
import Navigation from "@/components/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navigation />
      <div className="p-10 flex items-center justify-center">
        <div className="flex items-center min-w-[80%] w-96 relative h-10 sm:h-14 ">
          <label
            htmlFor="search-location"
            className="h-full flex items-center justify-center absolute w-10 sm:w-14"
            // What aria attributes would you add here?
            aria-label="Search for a location"
          >
            <Search className="w-[60%] h-[60%]" />
          </label>
          <Input
            id="search-location"
            className="h-full pl-10 sm:pl-14 text-xl sm:text-2xl border-neutral-900/30 dark:border-neutral-100/30"
            placeholder="Enter location, e.g. London"
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
