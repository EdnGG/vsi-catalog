import catalogRouter from "src/modules/catalog/router/index.js"
import authRouter from "src/modules/auth/router/index.js"


const routes = [
   {
    path: "/auth",
    ...authRouter,
    // requiresAuth: true,
  },
  {
    path: "/catalog",
    ...catalogRouter,
    // requiresAuth: true,
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

// routes.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.

//     if (!localStorage.getItem('token')) {

//       next({
//         path: '/auth/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // make sure to always call next()!
//   }
// })



export default routes
