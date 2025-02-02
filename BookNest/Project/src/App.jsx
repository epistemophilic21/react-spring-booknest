import Register from "./RegisterComponent/Register";
import Login from "./LoginComponent/Login";
import Home from "./HomeComponent/Home";
import Description from "./DescriptionComponent/Description";
import Cart from "./CartComponent/Cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./ReUsableComponent/ProtectedComponent";
import OrderComponent from "./CartComponent/OrderComponent";
import UserProfile from "./Profile/UserProfile";
import LocationNotFound from "./CartComponent/LocationNotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-info/:bookId"
              element={
                <ProtectedRoute>
                  <Description />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  {" "}
                  <OrderComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/location"
              element={
                <ProtectedRoute>
                  <LocationNotFound />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
