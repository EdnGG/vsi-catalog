import store from '../store/index.js'


console.log(store);  // Deberías ver la instancia de tu Vuex store.
console.log(store.getters['auth/isAuthenticated']);  // Deberías ver el valor del getter.



const authGuard = (to, from, next) => {
    console.log("Guard is being called!");

    const isAuthenticated = store.getters['auth/isAuthenticated']
    console.log('isAuthenticated : ', isAuthenticated)
    if (!isAuthenticated) {
        next({ name: 'login' })
    } else {
        next()
    }
}

export default authGuard


// export default (to, from, next) => {
//     console.log("Guard is being called!");

//     const isAuthenticated = store.getters['auth/isAuthenticated']
//     console.log('isAuthenticated : ', isAuthenticated)
//     if (to.name === 'NewAssembliePage' || to.name === 'NewWaterWorksAssembly') {
//         if (!isAuthenticated) {
//             next({ name: 'login' })
//         } else {
//             next()
//         }
//     } else {
//         next()
//     }
// }

