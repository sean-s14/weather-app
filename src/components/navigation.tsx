export default function Navigation() {
  return (
    <nav className="h-20 px-10 flex items-center gap-20 nav-shadow">
      <h1 className="text-4xl">Weather App</h1>
      <ul className="flex gap-4 text-xl">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}
