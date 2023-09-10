import catalogGuard from "./catalog-guard"

export default {
  name: "catalog",
  component: () => import("../layouts/CatalogLayout.vue"),
  children: [
    {
      path: "new-assemblie",
      name: "NewAssembliePage",
      beforeEnter: catalogGuard,
      component: () =>
        import(
          /* webpackChunkName: "vsi-forms-page" */ "src/modules/catalog/pages/NewAssembliePage.vue"
        ),
    },
    {
      path: "waterworks-assembly",
      name: "NewWaterWorksAssembly",
      beforeEnter: catalogGuard,
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
