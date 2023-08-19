<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted, onUnmounted, provide, ref } from 'vue'
import { auth, db } from './boot/firebase'

import { useCatalog } from "./modules/catalog/composables/useCatalog";

export default defineComponent({
  name: 'App',
  setup() {

    const user = ref(null);

    const { loadAssembliesVsi, loadAssembliesWworks } = useCatalog();    


    const onAuthStateChanged = (currentUser) => {
      user.value = currentUser;
    };


    // Cargar los datos de la base de datos

    // loadAssembliesVsi();

    onMounted(async () => {
      // Hacer algo después de que se monte el componente, si es necesario
      try{
        auth.onAuthStateChanged(onAuthStateChanged);
        await loadAssembliesWworks()
        await loadAssembliesVsi()

      } catch (error) {
        console.log(error)
      }
    })

    onUnmounted(() => {
      // Remueve el listener cuando el componente es destruido
      auth.onAuthStateChanged(() => {});
    });

    // Proporcionar las instancias de autenticación y firestore a través de Provide/Inject
    provide('$auth', auth)
    provide('$db', db)

    return {
      // Propiedades que se pueden usar en el template

      user
    }
  }
})
</script>
