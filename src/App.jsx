import { Routes, Route } from "react-router-dom";
import { useState } from "react";
// Navbar
import Nav from "./components/Nav";
// User Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Help from "./pages/Help";

import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import HomeLiving from "./pages/HomeLiving";
import Beauty from "./pages/Beauty";
import Genz from "./pages/GenZ";
import OrderSuccess from "./pages/OrderSuccess";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";

// Protected Route
import UserProtectedRoute from "./components/UserProtectedRoute";

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import ProtectedRoute from "./admin/ProtectedRoute";
import Dashboard from "./admin/Dashboard";
import ViewProduct from "./admin/ViewProduct";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ViewOrders from "./admin/ViewOrders";
function App() {
const [search, setSearch] = useState("");
return (
  <>
<Nav
    search={search}
    setSearch={setSearch}
      />

<Routes>
{/* Home */}
 <Route
      path="/"
      element={<Home />}
        />



  {/* Products */}

        <Route
          path="/products"
          element={
            <Products search={search} />
          }
        />



        <Route
          path="/products/category/:category"
          element={
            <Products search={search} />
          }
        />

             <Route
          path="/products/:id"
          element={<ProductsDetails />}
        />

         {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/contact"
          element={<Contact />}
        />


        <Route
          path="/help"
          element={<Help />}
        />
        {/* Category Pages */}

        <Route
          path="/mens"
          element={<Men />}
        />


        <Route
          path="/womens"
          element={<Women />}
        />


        <Route
          path="/kids"
          element={<Kids />}
        />


        <Route
          path="/home-living"
          element={<HomeLiving />}
        />


        <Route
          path="/beauty"
          element={<Beauty />}
        />


        <Route
          path="/genz"
          element={<Genz />}
        />





        {/* User Protected Routes */}


        <Route
          path="/cart"
          element={
            <UserProtectedRoute>
              <Cart />
            </UserProtectedRoute>
          }
        />



        <Route
          path="/wishlist"
          element={
            <UserProtectedRoute>
              <Wishlist />
            </UserProtectedRoute>
          }
        />



        <Route
          path="/checkout"
          element={
            <UserProtectedRoute>
              <Checkout />
            </UserProtectedRoute>
          }
        />



        <Route
          path="/orders"
          element={
            <UserProtectedRoute>
              <Orders />
            </UserProtectedRoute>
          }
        />

         <Route
          path="/ordersuccess"
          element={<OrderSuccess />}
        />
        {/* Admin */}

         <Route
          path="/admin"
          element={<AdminLogin />}
        />
       <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

          <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <ViewProduct />
            </ProtectedRoute>
          }
        />

          <Route
          path="/admin/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

         <Route
          path="/admin/edit-product/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <ViewOrders />
            </ProtectedRoute>
          }
        />
        <Route
            path="/forgot-password"
            element={<ForgotPassword />}
        />

       </Routes>
        </>

  )

}
export default App;



