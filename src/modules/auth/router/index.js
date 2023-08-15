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
   
    {
      path: "new-assemblie",
      name: "NewAssembliePage",
      component: () =>
        import(
          /* webpackChunkName: "vsi-forms-page" */ "src/modules/catalog/pages/NewAssembliePage.vue"
        ),
    },
    {
      path: "waterworks-assembly",
      name: "NewWaterWorksAssembly",
      component: () =>
        import(
          /* webpackChunkName: "waterworks-forms-page" */ "src/modules/catalog/pages/NewWaterWorksAssembly.vue"
        ),
    },
    {
      path: ":id",
      name: "AssembliePage",
      component: () =>
        import(
          /* webpackChunkName: "assembly-description-page" */ "src/modules/catalog/pages/AssembliePage.vue"
        ),
      props: (route) => {
        return {
          id: route.params.id,
          assemblie: route.params.assemblie,
        };
      },
    },
    {
      path: ":id",
      name: "WworksAssembliePage",
      component: () =>
        import(
          /* webpackChunkName: "Wworks-assembly-description-page" */ "src/modules/catalog/pages/WworksAssembliePage.vue"
        ),
      props: (route) => {
        return {
          id: route.params.id,
          assemblie: route.params.assemblie,
        };
      },
    },
    
  ],
};
