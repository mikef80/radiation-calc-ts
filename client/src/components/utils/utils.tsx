import { redirect } from "react-router-dom";

export const requireAuth = async () => {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    throw redirect("/login?message=You must login first");
  }

  return isLoggedIn;
};
