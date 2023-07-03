// export function someMutation (/* state */) {
// }


export function toggleSideMenu ( state ) {
    state.isSideMenuOpen = !state.isSideMenuOpen
}

export const setAssemblies = (state, assemblies) => {
    state.assemblies = assemblies
}

export const setSearchResults = (state, results) => {
    state.asemblies = results;
  }

