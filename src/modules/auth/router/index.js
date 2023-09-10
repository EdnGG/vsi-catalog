// import  authGuard  from "./auth-guard";

export default {
  name: "auth",
  component: () => import("../layouts/AuthLayout.vue"),
  children: [
    {
      path: "login",
      name: "LoginPage",
      component: () =>
        import(
          /* webpackChunkName: "auth-index" */ "src/modules/auth/pages/LoginPage.vue" 
        ),
    },
    {
      path: "signup",
      name: "SignupPage",
      component: () =>
        import(
          /* webpackChunkName: "auth-index" */ "src/modules/auth/pages/SignupPage.vue" 
        ),
    },
  ],
};
