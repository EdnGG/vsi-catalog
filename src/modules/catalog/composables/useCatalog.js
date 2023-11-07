import { computed } from "vue";
import { useStore } from "vuex";

export const useCatalog = () => {
  const store = useStore(); 

  const loadAssembliesVsi = async () => {
    const resp = await store.dispatch("catalogModule/loadAssembliesVsi");
    return resp;
  };

  const loadAssembliesWworks = async () => {
    const resp = store.dispatch("catalogModule/loadAssembliesWworks");
    return resp;
  };

  const addAssemblyVsi = async (assembly) => {
    const resp = await store.dispatch("catalogModule/addAssemblyVsi", assembly);
    return resp;
  };

  const addAssemblyWaterWorks = async (assembly) => {
    const resp = await store.dispatch("catalogModule/addAssemblyWaterWorks", assembly);
    return resp;
  };

  const getWworksAssemblyById = async (id) => {
    const assembly = await store.getters["catalogModule/getWworksAssemblyById"](id);
    return assembly;
  };

  const getAssemblyById = async (id) => {
    const assembly = await store.getters["catalogModule/getAssemblyById"](id);
    return assembly;
  };

  const updateAssemblyVsi = async (assembly) => {
    console.log('assembly', assembly)
    const resp = await store.dispatch("catalogModule/updateAssemblyVsi", assembly);
    return resp;
  }

  const updateAssemblyVsiSteps = async (id, newSteps) => {
    console.log('id', id)
    console.log('newSteps', newSteps)
    const resp = await store.dispatch("catalogModule/updateAssemblyVsiSteps", {id, newSteps});
    return resp;
  }

  const updateAssemblyMediaSteps = async (id, newSteps) => {
    const resp = await store.dispatch("catalogModule/updateAssemblyMediaSteps", {id, newSteps});
    return resp;
  }

  return {
    getAssemblyById,
    getWworksAssemblyById,

    //  COMPUTED
    sideMenuOpen: computed({
      get() {
        return store.getters["catalogModule/sideMenuOpen"];
      },
      set(val) {
        return store.commit("catalogModule/toggleSideMenu");
      },
    }),
  
    // METHODS
    updateAssemblyVsiSteps,
    updateAssemblyMediaSteps,
    addAssemblyWaterWorks,
    addAssemblyVsi,
    loadAssembliesVsi,
    loadAssembliesWworks,
    updateAssemblyVsi,
    toogleLeftDrawer: () => store.commit("catalogModule/toggleSideMenu"),

    // GETTERS
    getAssemblyByName: (query) => store.getters["catalogModule/getAssemblyByName"](query), // No computed
    getWworksAssemblyByName: (query) => store.getters["catalogModule/getWworksAssemblyByName"](query), // No computed
    getAssembliesVsiByCategory: (query) => store.getters["catalogModule/getAssemblyVsiByCategory"](query), // No computed
  };
};

