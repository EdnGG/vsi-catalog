import { computed, ref } from "vue";
import { useStore } from "vuex";

export const useCatalog = () => {
  const store = useStore();

  // const loadAssemblies = () => {
  //   store.dispatch("catalogModule/loadAssemblies");  
  // };

  // const loadAssemblyVsiByTechnical = (technical) => {
  //   store.dispatch("catalogModule/loadAssemblyVsiByTechnical", technical);
  // }

  // const loadAssemblyWwByTechnical = (technical) => {
  //   store.dispatch("catalogModule/loadAssemblyWwByTechnical", technical);
  // }

  // const loadAssembliesVsiByCategory = (category) => {
  //   store.dispatch("catalogModule/loadAssemblyVsiByCategory", category);
  // }

  // const loadAssembliesWwByCategory = (category) => {
  //   store.dispatch("catalogModule/loadAssemblyWwByCategory", category);
  // }

  const loadAssembliesVsi = () => {
    store.dispatch("catalogModule/loadAssembliesVsi");
  };

  const loadAssembliesWworks = () => {
    store.dispatch("catalogModule/loadAssembliesWworks");
  };

  const addAssemblyVsi = async (assembly) => {
    const resp = await store.dispatch("catalogModule/addAssemblyVsi", assembly);
    return resp;
  };


  const addAssemblyWaterWorks = async (assembly) => {
    const resp = await store.dispatch("catalogModule/addAssemblyWaterWorks", assembly);
    return resp;
  };

  // getWworksAssemblyById

  const getWworksAssemblyById = async (id) => {
    const assembly = await store.getters["catalogModule/getWworksAssemblyById"](id);
    return assembly;
  };

  const getAssemblyById = async (id) => {
    const assembly = await store.getters["catalogModule/getAssemblyById"](id);
    return assembly;
  };
  
  return {
    getAssemblyById,
    getWworksAssemblyById,
    // loadAssembliesVsiByCategory,
    // loadAssembliesWwByCategory,
    // loadAssemblyVsiByTechnical,
    // loadAssemblyWwByTechnical,
    getAssemblies: computed(() => store.getters["catalogModule/getAssemblies"]),
    sideMenuOpen: computed({
      get() {
        return store.getters["catalogModule/sideMenuOpen"];
      },
      set(val) {
        return store.commit("catalogModule/toggleSideMenu");
      },
    }),
  
    // METHODS
    // loadAssemblies,
    addAssemblyWaterWorks,
    addAssemblyVsi,
    loadAssembliesVsi,
    loadAssembliesWworks,
    toogleLeftDrawer: () => store.commit("catalogModule/toggleSideMenu"),

    // GETTERS
    getAssemblyByName: (query) => store.getters["catalogModule/getAssemblyByName"](query), // No computed
    getWworksAssemblyByName: (query) => store.getters["catalogModule/getWworksAssemblyByName"](query), // No computed
    getAssembliesVsiByCategory: (query) => store.getters["catalogModule/getAssemblyVsiByCategory"](query), // No computed
  };
};

