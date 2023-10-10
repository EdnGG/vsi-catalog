import { useRouter } from 'vue-router'
import { computed } from "vue";
import { useStore } from "vuex";

// import { getRedirectResult } from "firebase/auth";
import { auth, provider } from "src/boot/firebase.js";


export const useAuth = () => {
  const store = useStore();
  const router = useRouter()

  const googleLogin = async () => {
    try {
      const user = auth.currentUser; 
      if (user) {
        const response = await store.dispatch("authModule/googleLogin", user);
        return response;
      } else {
        throw new Error("No hay un usuario autenticado.");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

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

  const createNewUser = async ({name, email, password}) => {
    try {
      const response = await store.dispatch("authModule/createNewUser", {
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

  const logout = () => {
    // Aquí ya no necesitas cerrar sesión nuevamente porque el usuario ya está autenticado
    // Simplemente guardamos el usuario en el state usando la mutation
    localStorage.removeItem("user");
    store.commit("authModule/logout");
    router.push({ name: "IndexPage" });
  }

  return {
    sideMenuOpen: computed({
      get() {
        return store.getters["catalogModule/sideMenuOpen"];
      },
      set(val) {
        return store.commit("catalogModule/toggleSideMenu");
      },
    }),
    
    // METHODS
    toogleLeftDrawer: () => store.commit("catalogModule/toggleSideMenu"),
    backToHome: () => router.push({ name: "IndexPage" }),
    login,
    googleLogin,
    register,
    createNewUser,
    logout,

    // GETTERS
    isAuthenticated: computed(() => store.getters["authModule/isAuthenticated"]),
  };
};
