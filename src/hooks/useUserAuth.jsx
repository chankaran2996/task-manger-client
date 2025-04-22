import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const useUserAuth = () => {
  const { user, loading, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login");
    } else if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  }, [user, loading,handleLogout, navigate]);

  return { user, loading ,handleLogout };
}