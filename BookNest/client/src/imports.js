import './index.css';

//* COMPONENTS
export { default as NavigationBar } from "./NavBarComponent/NavigationBar";
export { default as OrderComponent } from "./CartComponent/OrderComponent";
export { default as LocationNotFound } from "./CartComponent/LocationNotFound";
export { default as PaymentComponent } from "./CartComponent/PaymentComponent";
export { default as ButtonComponent } from "./Profile/ButtonComponent";
export { default as GenderComponent } from "./Profile/GenderComponent";
export { default as AddressComponent } from "./Profile/AddressComponent";
export { default as MobileComponent } from "./Profile/MobileComponent";
export { default as Register } from "./RegisterComponent/Register";
export { default as Login } from "./LoginComponent/Login";
export { default as Home } from "./HomeComponent/Home";
export { default as Description } from "./DescriptionComponent/Description";
export { default as Cart } from "./CartComponent/Cart";
export { default as ProtectedRoute } from "./ReUsableComponent/ProtectedComponent";
export { default as UserProfile } from "./Profile/UserProfile";
export { default as SearchBar} from "./HomeComponent/SearchComponent";

// * FIELDS
export { loginFields } from "./ReUsableComponent/InputFields";
export { registerFields } from "./ReUsableComponent/InputFields";
export { useBooks } from "./ReUsableComponent/UseEffectBooks";
export { useBookDetail } from "./ReUsableComponent/UseEffectBooks";
export { useUpdateClient } from "./ReUsableComponent/UseEffectBooks";

// * CONTEXT
export { AuthContext } from "./Context/AuthContext";
export { CartContext } from "./Context/CartContext";
export { CartProvider } from "./Context/CartContext";
export { AuthProvider } from "./Context/AuthContext";

// * REACT BUILT-IN
export { useContext, useState, useEffect, createContext } from "react";
export {
  useNavigate,
  useParams,
  Link,
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
export { jwtDecode } from "jwt-decode";

// * SCHEMA / FORMIK
export { LoginSchema } from "./Schema/Schema";
export { RegisterSchema } from "./Schema/Schema";
export { useFormik } from "formik";

// * API's
export { postLoginClient } from "./API/ClientAPI";
export { postRegisterClient } from "./API/ClientAPI";
export { getCustomAPI } from "./API/AuthAPICall";
export { postCustomAPI } from "./API/AuthAPICall";
export { getClientProfile } from "./API/AuthAPICall";

// * ICONS
export { PiWarningCircleDuotone } from "react-icons/pi";
export { TbArrowBackUpDouble } from "react-icons/tb";
export { BiSolidCartAdd } from "react-icons/bi";
export { MdVerified } from "react-icons/md";
export { RiDeleteBin6Fill } from "react-icons/ri";
export { MdWrongLocation } from "react-icons/md";
export { RiShieldUserFill } from "react-icons/ri";
export { FaPowerOff } from "react-icons/fa6";
export { FaSearch } from "react-icons/fa";

