import { redirect } from "react-router-dom";

export const requireAuth = async () => {
  const isAuth = localStorage.getItem("isAuth");
  const isLoggedIn = isAuth === "true";  

  if (!isLoggedIn) {
    throw redirect("/login?message=You must login first");
  }

  return isLoggedIn;
};
