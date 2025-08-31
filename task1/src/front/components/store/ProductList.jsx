import React from "react";
import { useNavigate } from "react-router-dom";
import products from "../../pages/Store/Products.jsx"; 

const ProductList = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {/* Badge */}
          {product.badge && (
            <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">
              {product.badge}
            </span>
          )}

          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover my-2"
          />

          {/* Infos */}
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>

          {/* Prix */}
          <div className="mt-1">
            <span className="text-lg font-bold">{product.price} €</span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through ml-2">
                {product.oldPrice} €
              </span>
            )}
          </div>

          {/* Bouton */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert("Ajouté au panier !");
            }}
            className="mt-3 bg-black text-white py-1 px-4 rounded hover:bg-gray-800"
          >
            Ajouter au panier
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
