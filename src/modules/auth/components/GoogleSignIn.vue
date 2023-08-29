<template>
  <q-btn @click="signInWithGoogle">Google</q-btn>
</template>

<script>

import { useRouter } from "vue-router";
import { auth, provider } from "src/boot/firebase.js";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useAuth } from "../composables/useAuth";

export default {
  name: "GoogleSignIn",
  setup() {
    const authentication = useAuth();
    const router = useRouter();

    const { googleLogin } = authentication;

    const signInWithGoogle = async () => {
      try {
        await signInWithRedirect(auth, provider);
      } catch (error) {
        console.error("Error al iniciar sesión con Google:", error.message);
      }
    };

    // Se ejecutará automáticamente cuando el componente se monte.
    getRedirectResult(auth)
      .then((result) => {
        const user = result.user;
        if (user) {
          // guardamos en local storage
          localStorage.setItem('user', JSON.stringify(user)) 

          // guardamos en vuex
          googleLogin(user);
          router.push({ name: "CatalogPage" });
        }
      })
      .catch((error) => {
        console.error("Error al obtener el resultado de la redirección:", error.message);
      });

    return { signInWithGoogle };
  },
};

</script>
