<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted, provide } from 'vue'
import { auth, db } from './boot/firebase'

export default defineComponent({
  name: 'App',
  setup() {
    onMounted(() => {
      // Hacer algo después de que se monte el componente, si es necesario
    })

    // Proporcionar las instancias de autenticación y firestore a través de Provide/Inject
    provide('$auth', auth)
    provide('$db', db)

    return {
      
    }
  }
})
</script>
