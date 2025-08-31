import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    colors: "",
    sizes: "",
    badge: "",
    rating: "",
    image: "",
    description: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Préparer les données avec validation
    const dataToSend = {
      ...form,
      price: form.price,
      oldPrice: form.oldPrice || null,
      rating: form.rating || null,
      colors: form.colors.split(",").map(c => c.trim()).filter(Boolean),
      sizes: form.sizes.split(",").map(s => s.trim()).filter(Boolean)
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products", 
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
          validateStatus: status => status < 500
        }
      );

      if (res.status === 201) {
        alert("Produit créé avec succès !");
        navigate("/store/products");
      } else if (res.data.message) {
        setError(res.data.message);
      } else {
        setError("Erreur inconnue lors de la création");
      }
    } catch (err) {
      console.error("Erreur complète:", err);
      setError(err.response?.data?.message || "Erreur de connexion au serveur");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 mt-7">Ajouter un produit</h2>
      
      {error && <div className="text-red-500 mb-4 p-3 bg-red-100 rounded-lg">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nom *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Catégorie</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Prix *</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Ancien Prix</label>
          <input
            type="number"
            step="0.01"
            name="oldPrice"
            value={form.oldPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">
            Couleurs (séparées par des virgules)
          </label>
          <input
            name="colors"
            value={form.colors}
            onChange={handleChange}
            placeholder="ex: Rouge, Bleu, Vert"
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">
            Tailles (séparées par des virgules)
          </label>
          <input
            name="sizes"
            value={form.sizes}
            onChange={handleChange}
            placeholder="ex: 38, 39, 40"
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Badge</label>
          <input
            name="badge"
            value={form.badge}
            onChange={handleChange}
            placeholder="ex: PROMO"
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Note (0-5)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">URL de l'image</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Créer le produit
        </button>
      </form>
    </div>
  );
}