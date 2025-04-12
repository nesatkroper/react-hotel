import Cookie from "js-cookie";

export const userInfo = Cookie.get("user-info")
  ? JSON.parse(Cookie.get("user-info"))
  : {};
