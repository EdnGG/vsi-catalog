<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted, provide, ref } from 'vue'
import { auth, db } from './boot/firebase'

// import { onAuthStateChanged } from 'firebase/auth';

// Importar la tienda Vuex
import { useStore } from 'vuex';
import { useCatalog } from "./modules/catalog/composables/useCatalog";

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const user = ref(null);

    const { loadAssembliesVsi, loadAssembliesWworks } = useCatalog();


    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      store.commit('authModule/setUser', user);
      user.value = user;
    }

    // Actualización del manejador para Firebase v9
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   user.value = currentUser;
    // });


    // Cargar los datos de la base de datos
    onMounted(async () => {
      // Hacer algo después de que se monte el componente, si es necesario
      try {
        await loadAssembliesWworks()
        await loadAssembliesVsi()
      } catch (error) {
        console.log(error)
      }
    })

    // Asumiendo que todavía quieres escuchar los cambios de autenticación, lo mantengo
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   user.value = currentUser;
      // Aquí también podrías querer guardar el 'currentUser' en Vuex si cambia.
    //   store.commit('authModule/setUser', currentUser);
    // });

    // Desvincula el observador cuando el componente se destruye
    // onUnmounted(() => {
    //   unsubscribe();
    // });

    // Proporcionar las instancias de autenticación y firestore a través de Provide/Inject
    provide('$auth', auth)
    provide('$db', db)

    return {
      user
    }
  }
})
</script>
