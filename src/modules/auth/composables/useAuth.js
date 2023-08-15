import { computed, ref } from "vue";
import { useStore } from "vuex";

export const useAuth = () => {
  const store = useStore();

  const login = async ({email, password}) => {
    try {
      const response = await store.dispatch("authModule/login", {
        email,
        password,
      });
      return response;
    } catch (error) {
      console.log(error.message)
      return error;
    }
  };

  const register = async ({name, email, password}) => {
    try {
      console.log('args : ', name, email, password )
      const response = await store.dispatch("authModule/register", {
        name,
        email,
        password,
      });
      return response;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  };

  return {
    sideMenuOpen: computed({
      get() {
        return store.getters["catalogModule/sideMenuOpen"];
      },
      set(val) {
        return store.commit("catalogModule/toggleSideMenu");
      },
    }),
    toogleLeftDrawer: () => store.commit("catalogModule/toggleSideMenu"),

    // METHODS
    login,
    register,
    // GETTERS
  };
};
