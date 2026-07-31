import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductsDetails from "../pages/ProductsDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";
import AdminLogin from "../admin/AdminLogin";
import Dashboard from "../admin/Dashboard";
import AddProduct from "../admin/AddProduct";
import EditProduct from "../admin/EditProduct";
import ViewProduct from "../admin/ViewProduct";
import ViewOrders from "../admin/ViewOrders";
import Customers from "../admin/Customers";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductsDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/products" element={<ViewProduct />} />
      <Route path="/admin/add-product" element={<AddProduct />} />


      <Route path="/admin/edit-product/:id" element={<EditProduct />} />
      <Route path="/admin/orders" element={<ViewOrders />} />
      <Route path="/admin/customers" element={<Customers />} />
          
    </Routes>
  );
}

export default AppRoutes;