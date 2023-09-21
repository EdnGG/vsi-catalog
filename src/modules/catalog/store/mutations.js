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

export const setAssembliesVsi = (state, assemblies) => {
    state.assemblies = assemblies
}

export const setAssembliesWworks = (state, assemblies) => {
    state.assembliesWaterWorks = assemblies
}

export const setAssemblies = (state, assemblies) => {
    state.assemblies = assemblies
}

export const updateAssemblyVsi = (state, assembly) => {
    const index = state.assemblies.findIndex((a) => a.id === assembly.id);
    state.assemblies[index] = assembly;
}

export const setSearchResults = (state, results) => {
    state.asemblies = results;
  }

