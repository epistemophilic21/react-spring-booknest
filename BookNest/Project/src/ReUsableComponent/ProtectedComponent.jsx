import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedComponent({ children }) {
  const { token } = useContext(AuthContext);
  // const token = true; // * FOR DEVELOPMENT PURPOSE ONLY
  return token ? children : <Navigate to="/" />;
}

export default ProtectedComponent;
