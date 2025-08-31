import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();


// CREATE
router.post('/', async (req, res) => {
  try {
    // Convertir les types pour correspondre au schéma
    const productData = {
      ...req.body,
      price: parseFloat(req.body.price),
      oldPrice: req.body.oldPrice ? parseFloat(req.body.oldPrice) : null,
      rating: req.body.rating ? parseFloat(req.body.rating) : null,
      sizes: req.body.sizes ? req.body.sizes.map(Number).filter(n => !isNaN(n)) : []
    };

    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    // Améliorer les messages d'erreur
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;