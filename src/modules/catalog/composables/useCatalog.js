import { computed, ref } from "vue";
import { useStore } from "vuex";

export const useCatalog = () => {
  const store = useStore();

  // let debounceTimeout = null;

  const loadAssemblies = () => {
    store.dispatch("catalogModule/loadAssemblies");
  };


  // ===================

  // const debouncedSearch = (query) => {
  //   console.log('debounce, query', query)
  //   // Cancela el timeout anterior si el usuario sigue escribiendo
  //   // if (debounceTimeout) {
  //   //   clearTimeout(debounceTimeout);
  //   // }
  //   // Inicia un nuevo timeout
  //   debounceTimeout = setTimeout(async () => {
  //     // Llama a la función de búsqueda en el store
  //     const results = await store.dispatch("catalogModule/searchAssembly", query);
  //     console.log('results', results)
  //     // Llama a la acción que actualiza el estado de Vuex con los resultados
  //   await store.dispatch("catalogModule/setSearchResults", results);
    
  
  // }, 300); // Espera 300ms después de que el usuario haya dejado de escribir
  // };

  // ===================

  const debouncedSearch = (query) => {
    return new Promise(resolve => {
      setTimeout(async () => {
        const results = await store.dispatch("catalogModule/searchAssembly", query);
        store.dispatch("catalogModule/setSearchResults", results);
        resolve();
      }, 300);
    });
  };

  
  return {
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
    debouncedSearch,
    loadAssemblies,
    getAssemblyByName: (query) => store.getters["catalogModule/getAssemblyByName"](query), // No computed
    toogleLeftDrawer: () => store.commit("catalogModule/toggleSideMenu"),
  };
};

