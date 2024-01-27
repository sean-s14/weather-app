import "./navigation.css";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navigation() {
  return (
    <nav className="h-20 px-10 flex items-center justify-between gap-10 sm:gap-20 nav-shadow text-neutral-900 dark:text-neutral-300">
      <h1 className="text-xl sm:text-4xl">Weather App</h1>
      <ul className="flex gap-4 sm:gap-10 text-xl sm:text-2xl">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
      <ModeToggle />
    </nav>
  );
}
