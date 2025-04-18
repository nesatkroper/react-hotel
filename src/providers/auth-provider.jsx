import axios from "axios";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(Cookies.get("token"));
  const [warning, setWarning] = useState(false);

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const checkTokenExpiration = (token) => {
    if (!token) return; // Skip if token is not available

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiresAt = payload.exp * 1000;
      const now = Date.now();
      const oneHour = 60 * 60 * 1000;

      if (expiresAt - now < oneHour && !warning) {
        alert(
          "Your session will expire in less than 1 hour. Please save your work and refresh the page to renew your session."
        );
        setWarning(true);
      }

      if (now > expiresAt) {
        console.warn("Token expired, reloading page...");
        setToken(null);
        window.location.reload();
      }
    } catch (e) {
      console.error("Error checking token expiration:", e);
    }
  };

  useEffect(() => {
    const expirationCheckInterval = setInterval(() => {
      checkTokenExpiration(token);
    }, 1000);

    return () => clearInterval(expirationCheckInterval);
  }, [token, warning]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      Cookies.set("token", token, { expires: 0.4, path: "/" });
      checkTokenExpiration(token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      Cookies.remove("token");
      Cookies.remove("auth_id");
      Cookies.remove("role");
      Cookies.remove("employee");
      Cookies.remove("user-info");
    }

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.warn("Token expired, logging out...");
          setToken(null);
          window.location.reload(true);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      isTokenValid: !!token,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

export default AuthProvider;
