import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CodeContext = createContext();

const CodeProvider = ({ children }) => {
  const [code, setCode_] = useState(Cookies.get("code") || "");

  const setCode = (newCode) => {
    setCode_(newCode);
  };

  useEffect(() => {
    if (code) {
      Cookies.set("code", code);
    } else {
      Cookies.remove("code");
    }
  }, [code]);

  const contextValue = useMemo(
    () => ({
      code,
      setCode,
    }),
    [code]
  );

  return (
    <CodeContext.Provider value={contextValue}>{children}</CodeContext.Provider>
  );
};

export const useCode = () => {
  return useContext(CodeContext);
};

CodeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

export default CodeProvider;
