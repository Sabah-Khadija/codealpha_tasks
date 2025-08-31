import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

// Créer un produit
export const createProduct = (product) => axios.post(API_URL, product);

// Lire tous les produits
export const getProducts = () => axios.get(API_URL);

// Mettre à jour un produit
export const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product);

// Supprimer un produit
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);