const authGuard = (to, from, next) => {
  // Using local storage
  const userFromLocalStorage = localStorage.getItem("user");
  const isAuthenticated = userFromLocalStorage !== null;

  if (isAuthenticated) {
    next();
  } else {
    next({ name: "IndexPage" });
  }

};

export default authGuard;
