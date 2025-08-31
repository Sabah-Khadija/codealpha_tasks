import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    // Récupérer les commandes depuis le localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-black">Mes commandes</h1>
          <p className="text-black mb-6">Vous n'avez pas encore passé de commande.</p>
          <Link 
            to="/store" 
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition inline-block"
          >
            Découvrir nos produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-black">Mes commandes</h1>
      
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => toggleOrderDetails(order.id)}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div>
                <h2 className="font-bold text-lg text-black">Commande #{order.id}</h2>
                <p className="text-black">
                  Passée le {new Date(order.date).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-black">{order.total} €</p>
                <p className="text-black">
                  {order.items.reduce((total, item) => total + item.qty, 0)} articles
                </p>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 ml-4 transition-transform ${
                  expandedOrderId === order.id ? "rotate-180" : ""
                }`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {expandedOrderId === order.id && (
              <div className="border-t p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-medium text-black mb-2">Adresse de livraison</h3>
                    <p className="text-black">{order.shippingAddress}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-black mb-2">Méthode de paiement</h3>
                    <p className="text-black">{order.paymentMethod}</p>
                  </div>
                </div>
                
                <h3 className="font-medium text-black mb-4">Articles</h3>
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={`${order.id}-${item.id}`} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium text-black">{item.name}</h4>
                        <p className="text-sm text-black">
                          {item.selectedColor || item.colors?.[0] || "Blanc"} • 
                          {item.selectedSize || item.sizes?.[0] || "Taille unique"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-black">{item.price.toFixed(2)} € × {item.qty}</p>
                        <p className="font-medium text-black">
                          {(item.price * item.qty).toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between text-black">
                    <span>Sous-total</span>
                    <span>{order.subtotal} €</span>
                  </div>
                  <div className="flex justify-between text-black">
                    <span>Livraison</span>
                    <span>{order.shipping} €</span>
                  </div>
                  <div className="flex justify-between text-black">
                    <span>TVA</span>
                    <span>{order.tax} €</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2 text-black">
                    <span>Total</span>
                    <span>{order.total} €</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}