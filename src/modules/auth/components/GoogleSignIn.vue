<template>
  <q-btn @click="signInWithGoogle">Google</q-btn>
</template>
  
  <script>
//   import { ref } from 'vue';
import { useRouter } from "vue-router";
import { auth, provider } from "src/boot/firebase.js";
import { signInWithPopup } from 'firebase/auth'; // Importa la función aquí


export default {
  name: "GoogleSignIn",
  setup() {
    const router = useRouter();
    const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, provider);
        router.push({ name: "CatalogPage" });
        // Puedes redirigir al usuario o hacer otras acciones aquí
      } catch (error) {
        console.error("Error al iniciar sesión con Google:", error.message);
      }
    };

    return { signInWithGoogle };
  },
};
</script>
  