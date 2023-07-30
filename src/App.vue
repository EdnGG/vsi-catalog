<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted, provide } from 'vue'
import { auth, db } from './boot/firebase'

import { useCatalog } from "./modules/catalog/composables/useCatalog";

export default defineComponent({
  name: 'App',
  setup() {
    const { loadAssembliesVsi, loadAssembliesWworks } = useCatalog();    

    // Cargar los datos de la base de datos

    // loadAssembliesVsi();

    onMounted(async () => {
      // Hacer algo después de que se monte el componente, si es necesario
      try{
        await loadAssembliesWworks()
        await loadAssembliesVsi()

      } catch (error) {
        console.log(error)
      }
    })

    // Proporcionar las instancias de autenticación y firestore a través de Provide/Inject
    provide('$auth', auth)
    provide('$db', db)

    return {
      // Propiedades que se pueden usar en el template

      
    }
  }
})
</script>
