import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "France",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    saveInfo: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Calcul des totaux
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price * item.qty),
    0
  );
  const shipping = subtotal >= 100 ? 0 : 5.99;
  const tax = subtotal * 0.2; // 20% de TVA
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation de traitement du paiement
    setTimeout(() => {
      // Créer les détails de la commande
      const newOrder = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        items: cartItems,
        shippingAddress: `${formData.address}, ${formData.zip} ${formData.city}, ${formData.country}`,
        paymentMethod: "Carte de crédit",
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
      };
      
      setOrderDetails(newOrder);
      setOrderSuccess(true);
      setIsSubmitting(false);
      clearCart();
      
      // Sauvegarder la commande dans localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));
    }, 2000);
  };

  if (orderSuccess && orderDetails) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center bg-black">
        <div className="rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-green-500 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-white">Commande confirmée !</h1>
          <p className="text-white mb-2">Merci pour votre commande.</p>
          <p className="text-white mb-8">
            Votre numéro de commande est <span className="font-semibold text-white">{orderDetails.id}</span>
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
            <h2 className="text-xl font-semibold mb-4 text-black">Récapitulatif de la commande</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-black font-medium">Date</h3>
                <p className="text-black">{new Date(orderDetails.date).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-black font-medium">Total</h3>
                <p className="font-bold text-black">{orderDetails.total} €</p>
              </div>
              <div>
                <h3 className="text-black font-medium">Méthode de paiement</h3>
                <p className="text-black">{orderDetails.paymentMethod}</p>
              </div>
              <div>
                <h3 className="text-black font-medium">Adresse de livraison</h3>
                <p className="text-black">{orderDetails.shippingAddress}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-2 text-black">Articles commandés</h3>
              <ul className="space-y-2">
                {orderDetails.items.map(item => (
                  <li key={item.id} className="flex justify-between text-black">
                    <span>{item.name} × {item.qty}</span>
                    <span>{(item.price * item.qty).toFixed(2)} €</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/store")}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Continuer vos achats
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="bg-white border border-black text-black px-6 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              Voir mes commandes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl bg-white">
      <h1 className="text-3xl font-bold mb-6 text-black">Finaliser votre commande</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Formulaire */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-black">Informations de livraison</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-black">Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black">Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-black bg-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-black">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-black bg-white"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-black">Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg text-black bg-white"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-black">Ville</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black">Code postal</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black">Pays</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-black bg-white"
                  >
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Luxembourg">Luxembourg</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                  className="h-4 w-4 text-black rounded"
                />
                <label className="ml-2 text-sm text-black">
                  Enregistrer ces informations pour la prochaine fois
                </label>
              </div>
              
              <h2 className="text-xl font-bold mb-4 text-black">Informations de paiement</h2>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-black">Numéro de carte</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3 border rounded-lg text-black bg-white"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-black">Date d'expiration</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    required
                    placeholder="MM/AA"
                    className="w-full p-3 border rounded-lg text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black">CVC</label>
                  <input
                    type="text"
                    name="cardCVC"
                    value={formData.cardCVC}
                    onChange={handleChange}
                    required
                    placeholder="123"
                    className="w-full p-3 border rounded-lg text-black bg-white"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className={`w-full py-4 rounded-lg text-white font-bold ${
                  isSubmitting || cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                {isSubmitting ? "Traitement en cours..." : `Payer ${total.toFixed(2)} €`}
              </button>
            </form>
          </div>
          
          <div className="text-center text-sm text-black">
            <p>Vos données de paiement sont sécurisées et cryptées.</p>
            <div className="flex justify-center gap-4 mt-2">
              <div className="h-8 w-12 bg-gray-200 rounded"></div>
              <div className="h-8 w-12 bg-gray-200 rounded"></div>
              <div className="h-8 w-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Récapitulatif */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-black">Votre commande</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-black">{item.name}</h3>
                    <p className="text-sm text-black">
                      {item.selectedColor || item.colors?.[0] || "Blanc"} • {item.selectedSize || item.sizes?.[0] || 42}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-black">{item.price.toFixed(2)} €</p>
                    <p className="text-sm text-black">Qté: {item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 text-black">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>{shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} €`}</span>
              </div>
              
              <div className="flex justify-between">
                <span>TVA (20%)</span>
                <span>{tax.toFixed(2)} €</span>
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}