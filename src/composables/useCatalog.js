import { computed, ref } from "vue";
import { useStore } from "vuex";

export const useCatalog = () => {
  const store = useStore();

  return {
    sideMenuOpen: computed({ 
      get(){
        return store.getters["catalog/sideMenuOpen"]
      },
      set(val){
        return store.commit("catalog/toggleSideMenu")
      }
      }),
    toogleLeftDrawer: () => store.commit("catalog/toggleSideMenu"),
  };
};


// export default useCatalog;