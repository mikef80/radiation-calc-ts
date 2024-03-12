import { redirect } from "react-router-dom";

export const requireAuth = async (request: Request) => {
  const pathname = new URL(request.url).pathname;

  const isAuth = localStorage.getItem("isAuth");
  const isLoggedIn = isAuth === "true";

  if (!isLoggedIn) {
    throw redirect(`/login?message=You must log in first.&redirectTo=${pathname}`);
  }

  return isLoggedIn;
};
