import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../..//context/CartContext.jsx";

// Mapping des noms de couleurs vers des codes hexadécimaux
const colorMap = {
  noir: "#000000",
  blanc: "#FFFFFF",
  rouge: "#FF0000",
  bleu: "#0000FF",
  vert: "#00FF00",
  jaune: "#FFFF00",
  rose: "#FFC0CB",
  gris: "#808080",
  violet: "#800080",
  orange: "#FFA500",
  marron: "#A52A2A",
  beige: "#F5F5DC",
  // Ajouter d'autres couleurs au besoin
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // Initialiser les sélections par défaut
  useEffect(() => {
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    // Vérifier si une couleur est nécessaire mais non sélectionnée
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert("Veuillez sélectionner une couleur");
      return;
    }
    
    // Vérifier si une taille est nécessaire mais non sélectionnée
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Veuillez sélectionner une taille");
      return;
    }
    
    // Créer une copie du produit avec les sélections
    const productWithSelection = {
      ...product,
      selectedColor,
      selectedSize
    };
    
    addToCart(productWithSelection, 1);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white relative">
      {product.badge && (
        <span className="bg-red-500 text-white px-2 py-1 text-xs rounded absolute top-2 left-2">
          {product.badge}
        </span>
      )}
      
      <Link to={`/product/${product._id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-56 object-cover mb-3" 
        />
      </Link>
      
      <div className="text-xs text-gray-500 uppercase">{product.category}</div>
      <h3 className="text-lg font-semibold text-black">{product.name}</h3>
      
      <div className="flex items-center justify-between mt-2 text-black">
        <div>
          <div className="text-xl font-bold">{product.price.toFixed(2)} €</div>
          {product.oldPrice && (
            <div className="text-sm line-through text-gray-400">
              {product.oldPrice.toFixed(2)} €
            </div>
          )}
        </div>
        <div className="text-yellow-500">{product.rating} ★</div>
      </div>

      {/* Affichage et sélection des tailles */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mt-3 text-black">
          <div className="text-sm">Tailles :</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-1 border rounded text-sm min-w-[32px] text-center transition-colors ${
                  selectedSize === size 
                    ? "bg-violet-600 text-white border-violet-600" 
                    : "bg-white text-black border-gray-300 hover:border-violet-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Affichage et sélection des couleurs avec cercles */}
      {product.colors && product.colors.length > 0 && (
        <div className="mt-3 text-black">
          <div className="text-sm">Couleurs :</div>
          <div className="flex gap-2 mt-2">
            {product.colors.map((color, index) => {
              const hexColor = colorMap[color.toLowerCase()] || "#CCCCCC";
              return (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedColor === color 
                      ? "border-violet scale-110" 
                      : "border-gray-300 hover:border-violet-600"
                  }`}
                  style={{ backgroundColor: hexColor }}
                  title={color}
                />
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-3">
        <button 
          onClick={handleAddToCart} 
          className="w-full bg-black text-white py-2 rounded hover:bg-violet transition-colors cursor-pointer"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}