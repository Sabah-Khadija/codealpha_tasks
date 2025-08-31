import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        // Sélectionner les valeurs par défaut
        if (res.data.colors && res.data.colors.length > 0) {
          setSelectedColor(res.data.colors[0]);
        }
        if (res.data.sizes && res.data.sizes.length > 0) {
          setSelectedSize(res.data.sizes[0]);
        }
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Ajouter les sélections au produit
    const productToAdd = {
      ...product,
      id: product._id,
      selectedColor,
      selectedSize
    };
    
    addToCart(productToAdd, 1);
    
    // Afficher la notification
    setShowNotification(true);
    
    // Cacher la notification après 3 secondes
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  if (!product) return <p className="text-center text-white">Chargement...</p>;

  return (
    <div className="relative">
      {/* Notification d'ajout au panier améliorée */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Produit ajouté au panier !</p>
              <p className="text-sm">{product.name}</p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="ml-4 text-white hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col lg:flex-row gap-8">
        {/* Image produit */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full lg:w-1/3 object-cover rounded-lg shadow-md"
        />

        {/* Infos produit */}
        <div className="flex-1">
          <h1 className="text-2xl text-black font-bold">{product.name}</h1>
          <div className="text-black">{product.category}</div>

          <div className="mt-4 text-black">{product.description}</div>

          <div className="mt-4 text-2xl font-bold text-black">
            {product.price} €
          </div>

          {/* Sélecteurs de couleur et taille */}
          <div className="mt-6 space-y-4">
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block mb-2 font-medium text-black">Couleur</label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded border transition-all ${
                        selectedColor === color 
                          ? "bg-black text-white border-black" 
                          : "bg-gray-100 text-black border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block mb-2 font-medium text-black">Taille</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center rounded border transition-all ${
                        selectedSize === size 
                          ? "bg-black text-white border-black" 
                          : "bg-gray-100 text-black border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition w-full lg:w-auto transform hover:scale-105 active:scale-95"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>

      {/* Styles pour l'animation de la notification */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}