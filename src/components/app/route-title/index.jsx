import PropTypes from "prop-types";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const RouteTitle = () => {
  const location = useLocation();
  const [t] = useTranslation("admin");

  const titleMap = {
    "/": "",
    "/home": t("sidebar.home"),
    "/dashboard": t("sidebar.dash"),
    "/reservation": t("sidebar.reserve"),
    "/room": t("sidebar.room"),
    "/department": t("sidebar.dep"),
    "/position": t("sidebar.pos"),
    "/customer": t("sidebar.cus"),
    "/employee": t("sidebar.emp"),
    "/pos": t("sidebar.po"),
    "/product": t("sidebar.pro"),
    "/category": t("sidebar.pro-cate"),
    "/room-picture": t("sidebar.room-pic"),
    "/authentication": t("sidebar.auth"),
    "/auth": t("sidebar.login"),
    "/offline": t("sidebar.offline"),
  };

  useEffect(() => {
    const path = location.pathname;
    const title = titleMap[path] || t("app-name");
    document.title = `${title} | ${t("app-name")}`;
  }, [location.pathname, titleMap]);

  return null;
};

RouteTitle.propTypes = {
  titleMap: PropTypes.object,
};

export default RouteTitle;
