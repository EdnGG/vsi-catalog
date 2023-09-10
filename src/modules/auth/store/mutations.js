// export const someMutation  = (/* state */) => {
// }


export function toggleSideMenu ( state ) {
    state.isSideMenuOpen = !state.isSideMenuOpen
}

export const login = ( state, user) => {
    state.user = user
    state.isLoggedIn = true
}

export const setUser = ( state, user) => {
    state.user = user
}

export const logout = ( state ) => {
    state.user = null
    state.isUserLoggedIn = false
}


