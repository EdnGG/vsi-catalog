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
    return state.assemblies.filter((assembly) =>
      assembly.name.toLowerCase().includes(assemblyName.toLowerCase())
    );
  };
  // getWworksAssemblyByName
  export const getWworksAssemblyByName =
  (state) =>
  (assemblyName = "") => {
    if (assemblyName.length === 0) {
      return state.assembliesWaterWorks;
    }
    return state.assembliesWaterWorks.filter((assembly) =>
      assembly.name.toLowerCase().includes(assemblyName.toLowerCase())
    );
  };

export const getAssemblyById = (state) => (id) => {
  return state.assemblies.find( assembly => assembly.id === id);
};

export const getWworksAssemblyById = (state) => (id) => {
  return state.assembliesWaterWorks.find( assembly => assembly.id === id);
};