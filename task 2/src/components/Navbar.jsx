// components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 flex items-center justify-between w-full h-[15vh] px-[3vw] mix-blend-difference z-[9999]">
      <div className="lft-nav text-[1.5vw] h-[6vh] overflow-hidden cursor-pointer">
        <h1 className="text-white transition-all duration-1000 ease-custom">Brandbeet</h1>
        <h1 className="text-white transition-all duration-1000 ease-custom">Brandbeet</h1>
      </div>
      <div className="rght-nav text-[0.8vw] h-[3vh] overflow-hidden cursor-pointer">
        <h2 className="text-white transition-all duration-1000 ease-custom">contact@gravitycoding.com</h2>
        <h2 className="text-white transition-all duration-1000 ease-custom">contact@gravitycoding.com</h2>
      </div>
    </nav>
  );
};

export default Navbar;