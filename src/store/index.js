import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import catalog from './catalog'
import catalogModule from '../modules/catalog/store/index.js'
import authModule from '../modules/auth/store/index.js'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      catalog,
      catalogModule,
      authModule
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})