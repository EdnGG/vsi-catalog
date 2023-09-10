// import store from '../../../store'


const catalogGuard = async (to, from, next) => {
    // console.log('user: ', store.state);
    // const isAuthenticated = store.state.authModule.user !== null;
    // const isAuthenticated = store.state.authModule.user !== null;


    // Using local storage
    const userFromLocalStorage = localStorage.getItem('user');
    const isAuthenticated = userFromLocalStorage !== null;


    // if (!store || !store.state) {
    //     console.error("Store is not initialized!");
    //     next();
    //     return;
    // }


    console.log("Guard is being called!");

    if (to.name === 'NewAssembliePage' || to.name === 'NewWaterWorksAssembly') {
        if (!isAuthenticated) {
            next({ name: 'LoginPage' });
        } else {
            next();
        }
    } else {
        next();
    }

}


export default catalogGuard;



// // Asegúrate de tener esta importación al inicio de tu archivo catalogGuard.js
// import store from '../../../store';

// const catalogGuard = async (to, from, next) => {
//    // Verificar si el store y su estado están definidos
//    while (!store || !store.state) {
//        // Esperar 50ms y volver a comprobar
//        await new Promise(resolve => setTimeout(resolve, 50));
//    }

//    console.log("Guard is being called!");

//    // Obtener el estado de autenticación desde el módulo de autenticación
//    const isAuthenticated = store.state.authModule.isAuthenticated;

//    // Si el usuario no está autenticado, redirigir a la página de login
//    if (!isAuthenticated) {
//        next({ name: 'LoginPage' });
//    } else {
//        // Si el usuario está autenticado, permitir el acceso a la ruta
//        next();
//    }
// }

// export default catalogGuard;

