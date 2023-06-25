export default {
    name: 'catalog',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
        { path: '', name:'IndexPage', component: () => import('src/modules/catalog/pages/IndexPage.vue') },
        { path: 'typography', name:'TypographyPage', component: () => import('src/modules/catalog/pages/TypographyPage.vue') },
        { path: 'flexbox', name:'FlexboxPage', component: () => import('src/modules/catalog/pages/FlexboxPage.vue') },
        { path: 'dialogs', name:'DialogsPage', component: () => import('src/modules/catalog/pages/DialogsPage.vue') },
        { path: 'forms', name:'FormsPage', component: () => import('src/modules/catalog/pages/FormsPage.vue') }
      ]

}