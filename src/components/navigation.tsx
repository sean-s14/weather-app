import "./navigation.css";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navigation() {
  return (
    <nav className="h-14 px-10 flex items-center justify-between gap-10 sm:gap-20 nav-shadow text-neutral-900 dark:text-neutral-300">
      <h1 className="text-2xl">Weather App</h1>
      <ModeToggle />
    </nav>
  );
}
