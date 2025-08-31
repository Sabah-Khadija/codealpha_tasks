import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/store/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // filtres locaux
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [category, color]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const params = {};
      if (category) params.category = category;
      if (color) params.color = color;
      const res = await axios.get("http://localhost:5000/api/products", { params });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-6 p-6 mt-15">
      {/* Sidebar filtres (exemple minimal) */}
      <aside className="w-64">
        <h4 className="font-semibold mb-2">Filtres</h4>
        <div>
          <label>Catégorie</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2 rounded">
            <option className="text-black" value="">Toutes</option>
            <option className="text-black" value="Lifestyle">Lifestyle</option>
            <option className="text-black" value="Running">Running</option>
            <option className="text-black"  value="Basketball">Basketball</option>
          </select>
        </div>
        <div className="mt-4">
          <label>Couleur</label>
          <select value={color} onChange={e => setColor(e.target.value)} className="w-full border p-2 rounded">
            <option className="text-black" value="">Toutes</option>
            <option className="text-black" value="Blanc">Blanc</option>
            <option className="text-black" value="Noir">Noir</option>
            <option className="text-black" value="Bleu">Bleu</option>
          </select>
        </div>
      </aside>

      {/* Products grid */}
      <main className="flex-1">
        <h2 className="text-2xl font-bold mb-4">{products.length} produits</h2>
        {loading ? <p>Chargement...</p> :
          <div className="grid grid-cols-3 gap-6">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        }
      </main>
    </div>
  );
}
