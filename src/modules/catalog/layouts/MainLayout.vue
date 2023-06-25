<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="las la-ellipsis-v"
          aria-label="Menu"
          @click="toogleLeftDrawer"
        />

        <q-toolbar-title>
          CATALOG
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="sideMenuOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          VALVE SOLUTIONS INC.
        </q-item-label>

        <EssentialLink
          v-for="link in links"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, defineAsyncComponent, computed } from 'vue'
import { useCatalog } from 'src/composables/useCatalog'
import links from 'src/router/links'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink: defineAsyncComponent(() => import('components/EssentialLink.vue'))
  },

  setup ( props ) {
    const catalog = useCatalog()
    const {sideMenuOpen , toogleLeftDrawer} = catalog

    return {
      links,   
      sideMenuOpen, 
      toogleLeftDrawer,    
     
    }
  }
})
</script>
