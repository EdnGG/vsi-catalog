// export function someMutation (/* state */) {
// }
export const addAssemblyVsi = (state, assembly) => {
    state.assemblies.push(assembly)
}

export const addAssemblyWaterWorks = (state, assembly) => {
    state.assembliesWaterWorks.push(assembly)
}

export function toggleSideMenu ( state ) {
    state.isSideMenuOpen = !state.isSideMenuOpen
}

// export const setAssembliesVsiByCategory = (state, category) => {
//     state.assembliesVsiByCategoty = category
// }

export const setAssembliesVsi = (state, assemblies) => {
    state.assemblies = assemblies
}

export const setAssembliesWworks = (state, assemblies) => {
    state.assembliesWaterWorks = assemblies
}

export const setAssemblies = (state, assemblies) => {
    state.assemblies = assemblies
}

export const setSearchResults = (state, results) => {
    state.asemblies = results;
  }

