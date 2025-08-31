import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../../../../constants/index.js";
import { Search, Heart, ShoppingBag } from "lucide-react";

const TopStor = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img className="w-12" src="/images/nike-tran.png" alt="logo" />
        </Link>

        {/* Liens de navigation */}
        <div className="flex-grow flex justify-center">
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  className="text-white font-medium hover:text-gray-500 transition-colors px-3 py-1"
                  href={`#${link.id}`}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Barre de recherche + icônes */}
        <div className="flex items-center gap-8">
          
          <div className="flex items-center gap-5">
            <div className="flex items-center bg-gray-900 px-5 py-2 rounded-full max-w-xs border border-white">
            <Search size={18} className="text-white mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-white placeholder-white w-full"
            />
          </div>
            <Heart className="cursor-pointer text-white hover:text-gray-500 w-6 h-6" />
            <Link to="/store/cart">
              <ShoppingBag className="cursor-pointer text-white hover:text-gray-500 w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopStor;