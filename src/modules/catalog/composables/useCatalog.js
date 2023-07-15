import { computed, ref } from "vue";
import { useStore } from "vuex";

export const useCatalog = () => {
  const store = useStore();

  const loadAssemblies = () => {
    store.dispatch("catalogModule/loadAssemblies");
  };

  const loadAssembliesVsi = () => {
    store.dispatch("catalogModule/loadAssembliesVsi");
  };

  const addAssemblyVsi = async (assembly) => {
    const resp = await store.dispatch("catalogModule/addAssemblyVsi", assembly);
    return resp;
  };


  const addAssemblyWaterWorks = async (assembly) => {
    const resp = await store.dispatch("catalogModule/addAssemblyWaterWorks", assembly);
    return resp;
  };

  const getAssemblyById = async (id) => {
    // console.log("Fetching assembly with ID:", id);

    const assembly = await store.getters["catalogModule/getAssemblyById"](id);
    // console.log("Assembly fetched:", assembly);
    return assembly;

  };
  
  return {
    getAssemblyById,
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
    addAssemblyWaterWorks,
    addAssemblyVsi,
    loadAssembliesVsi,
    loadAssemblies,
    getAssemblyByName: (query) => store.getters["catalogModule/getAssemblyByName"](query), // No computed
    toogleLeftDrawer: () => store.commit("catalogModule/toggleSideMenu"),
  };
};

