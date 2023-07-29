export default {
  name: "catalog",
  component: () => import("../layouts/CatalogLayout.vue"),
  children: [
    {
      path: "",
      name: "IndexPage",
      component: () =>
        import(
          /* webpackChunkName: "catalog-index" */ "src/modules/catalog/pages/IndexPage.vue" 
        ),
    },
    // {
    //   path: "typography",
    //   name: "TypographyPage",
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "catalog-typography-page" */ "src/modules/catalog/pages/TypographyPage.vue"
    //     ),
    // },
    // {
    //   path: "flexbox",
    //   name: "FlexboxPage",
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "catalog-flexbox-page" */ "src/modules/catalog/pages/FlexboxPage.vue"
    //     ),
    // },
    // {
    //   path: "dialogs",
    //   name: "DialogsPage",
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "catalog-dialogs-page" */ "src/modules/catalog/pages/DialogsPage.vue"
    //     ),
    // },
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
      path: "catalog-page",
      name: "CatalogPage",
      component: () =>
        import(
          /* webpackChunkName: "vsi-catalog-page" */ "src/modules/catalog/pages/CatalogPage.vue"
        ),
    },
    {
      path: "catalog-page-waterworks",
      name: "CatalogPageWworks",
      component: () =>
        import(
          /* webpackChunkName: "waterworks-catalog-page" */ "src/modules/catalog/pages/CatalogPageWworks.vue"
        ),
    },
  ],
};
