import { useState, useEffect, useContext, createContext } from "react";
import getAuth from "../util/authHeader";

// Create auth context
const AuthContext = createContext(null);

const UserRoles = ["SuperAdmin", "admin", "farmWorker", "poultrySpecialist"];

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    id: 0,
    role: "",
    token: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFarmWorker, setIsFarmWorker] = useState(false);
  const [isPoultrySpecialist, setIsPoultrySpecialist] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const loggedInUser = await getAuth();

    if (loggedInUser && loggedInUser.token) {
      setIsLoggedIn(true);
      setUserData(loggedInUser);

      // Set role states based on the user's role
      const userRole = loggedInUser.role;
      setIsSuperAdmin(userRole === UserRoles[0]);
      setIsAdmin(userRole === UserRoles[1]);
      setIsFarmWorker(userRole === UserRoles[2]);
      setIsPoultrySpecialist(userRole === UserRoles[3]);
    }
  };

  const values = {
    userData,
    setUserData,
    isLoggedIn,
    isSuperAdmin,
    isAdmin,
    isFarmWorker,
    isPoultrySpecialist,
    fetchData
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

// useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export user roles for use in other components if needed
export { UserRoles };