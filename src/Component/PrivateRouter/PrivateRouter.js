import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/Context";

export default function PrivateOutlet() {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
}
