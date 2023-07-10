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
    const { loadAssembliesVsi } = useCatalog();  
    onMounted(async () => {
      // Hacer algo después de que se monte el componente, si es necesario
      await loadAssembliesVsi()
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
