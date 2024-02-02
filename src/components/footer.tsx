export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto h-10 w-full flex items-center justify-center border-t">
      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm">
        <p>&copy; {year} - All Rights Reserved</p>
      </div>
    </footer>
  );
}
