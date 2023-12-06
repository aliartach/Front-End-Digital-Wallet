import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProtectedRoute = ({ allowedRoles }) => {
  let decodedToken = {};
  const token = localStorage.getItem("token");
  if (token) {
    decodedToken = jwtDecode(token);
  }

  const hasRole = allowedRoles.includes(decodedToken.role);

  if (!token) {
    toast.error("Please Login First!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return <Navigate to="/Registerpage" replace />;
  } else if (!hasRole) {
    toast.error("Please Login with the right Role!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return <Navigate to="/Registerpage" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
