import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          Auth App
        </Link>

        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;