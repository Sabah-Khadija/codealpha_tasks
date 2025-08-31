import { Routes, Route, Navigate } from "react-router-dom"; 
import Products from "./Products.jsx";
import ProductDetail from "./ProductDetail.jsx";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";
import { CartProvider } from "../../context/CartContext.jsx";
import AddProduct from "./AddProduct.jsx";
import TopStor from "./TopStor.jsx"; 
import Orders from "./Orders.jsx";

export default function Store() {
  return (
    <CartProvider>
      <TopStor />  
      <div className="pt-20"> 
        <Routes>
          <Route path="/" element={<Navigate to="products" replace />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />

        </Routes>
      </div>
    </CartProvider>
  );
}
