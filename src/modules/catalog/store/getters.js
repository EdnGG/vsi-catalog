// export function someGetter (/* state */) {
// }

export const sideMenuOpen = (state) => {
  return state.isSideMenuOpen;
};

export const getAssemblies = (state) => {
  return state.assemblies;
};
// loadAssembly
export const getAssemblyByName =
  (state) =>
  (assemblyName = "") => {
    if (assemblyName.length === 0) {
      return state.assemblies;
    }
    // if (!assemblyName) {
    //     return state.assemblies;
    // }
    return state.assemblies.filter((assembly) =>
      assembly.name.toLowerCase().includes(assemblyName.toLowerCase())
    );
  };

export const getAssemblyById = (state) => (id) => {
  console.log('getter: ' , state.assemblies)
  return state.assemblies.find( assembly => assembly.id === id);
};
