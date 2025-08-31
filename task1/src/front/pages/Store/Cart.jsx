import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price * item.qty),
    0
  );
  
  const shipping = subtotal >= 100 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleQuantityChange = (id, newQty) => {
    if (newQty > 0) {
      updateQuantity(id, newQty);
    } else {
      // Si la quantité devient 0, supprimer l'article
      removeFromCart(id);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Votre panier est vide");
      return;
    }
    
    navigate("/store/checkout");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-black">Votre Panier</h1>
        
        <div className="mb-6 text-white text-lg">
          {cartItems.reduce((total, item) => total + item.qty, 0)} article(s)
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Liste des articles */}
          <div className="lg:w-2/3">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-black mb-4">Votre panier est vide</p>
                <Link 
                  to="/store" 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Continuer vos achats
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                    {/* Image du produit */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain rounded"
                      />
                    </div>
                    
                    {/* Détails du produit */}
                    <div className="flex-1 ml-6">
                      <h2 className="font-semibold text-lg text-black mb-1">{item.name}</h2>
                      <div className="text-gray-600 mb-2">
                        <p>Couleur: {item.colors?.[0] || "Non spécifié"} • Taille: {item.sizes?.[0] || "Non spécifié"}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-lg text-black">{item.price.toFixed(2)} €</p>
                        
                        <div className="flex items-center">
                          {/* Contrôle de quantité */}
                          <div className="flex items-center border rounded-lg mr-4">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.qty - 1)}
                              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l text-black"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 text-black">{item.qty}</span>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.qty + 1)}
                              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r text-black"
                            >
                              +
                            </button>
                          </div>
                          
                          {/* Bouton de suppression */}
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-500 hover:text-red-700 text-xl"
                            title="Supprimer l'article"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Résumé de la commande */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4 text-black">Résumé de la commande</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-black">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                
                <div className="flex justify-between text-black">
                  <span>Livraison</span>
                  <span>{shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} €`}</span>
                </div>
                
                {subtotal < 100 && (
                  <p className="text-sm text-green-600">
                    ✔ Livraison gratuite à partir de 100€
                  </p>
                )}
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg text-black">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className={`w-full py-3 rounded-lg font-semibold transition mb-4 ${
                  cartItems.length > 0 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Passer la commande
              </button>
              
              <Link 
                to="/store" 
                className="block w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition text-center"
              >
                Continuer vos achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}