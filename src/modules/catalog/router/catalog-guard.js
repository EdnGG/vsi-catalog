const catalogGuard = (to, from, next) => {
   
    // Using local storage
    const userFromLocalStorage = localStorage.getItem('user');
    const isAuthenticated = userFromLocalStorage !== null;

    console.log("Guard is being called!");

    if (to.name === 'NewAssembliePage' || to.name === 'NewWaterWorksAssembly') {
        if (!isAuthenticated) {
            next({ name: 'IndexPage' });
        } else {
            next();
        }
    } else {
        next();
    }

}

export default catalogGuard;



