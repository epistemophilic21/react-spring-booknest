import { useContext, AuthContext, Navigate } from "../imports";

function ProtectedComponent({ children }) {
  const { token } = useContext(AuthContext);
  // const token = true; // * FOR DEVELOPMENT PURPOSE ONLY
  return token ? children : <Navigate to="/" />;
}

export default ProtectedComponent;
