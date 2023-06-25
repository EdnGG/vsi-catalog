import { computed, ref } from "vue";
import { useStore } from "vuex";

export const useCatalog = () => {
  const store = useStore();

  return {
    sideMenuOpen: computed({ 
      get(){
        return store.getters["sideMenuOpen"]
      },
      set(val){
        return store.commit("toggleSideMenu")
      }
      }),
    toogleLeftDrawer: () => store.commit("toggleSideMenu"),
  };
};


// export default useCatalog;