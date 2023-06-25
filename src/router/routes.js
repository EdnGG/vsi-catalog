import catalogRouter from "src/modules/catalog/router/index.js"


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:'IndexPage', component: () => import('pages/IndexPage.vue') },
      { path: 'typography', name:'TypographyPage', component: () => import('pages/TypographyPage.vue') },
      { path: 'flexbox', name:'FlexboxPage', component: () => import('pages/FlexboxPage.vue') },
      { path: 'dialogs', name:'DialogsPage', component: () => import('pages/DialogsPage.vue') },
      { path: 'forms', name:'FormsPage', component: () => import('pages/FormsPage.vue') }
    ]
  },
  {
    path: "/catalog",
    ...catalogRouter
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
