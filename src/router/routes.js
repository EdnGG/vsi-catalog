import catalogRouter from "src/modules/catalog/router/index.js"
import authRouter from "src/modules/auth/router/index.js"


const routes = [
   {
    path: "/auth",
    ...authRouter
  },
  {
    path: "/catalog",
    ...catalogRouter
  },
 
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:'IndexPage', component: () => import(/* webpackChunkName: "index-page" */'pages/IndexPage.vue') },
     
    ] 
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
