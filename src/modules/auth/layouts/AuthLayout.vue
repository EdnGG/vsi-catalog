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
          <router-link
            to="/"
            class="text-primary"
          >
            <q-avatar
              square
              size="xl"
              class="q-mr-sm"
            >
              <img
                src="https://lh6.googleusercontent.com/-abnSC9wsKEs/AAAAAAAAAAI/AAAAAAAAAAA/ESxpoblFfb0/s66-p-k-no-ns-nd/photo.jpg"
                alt="Quasar Logo"
              />
            </q-avatar>
            <!-- <span class="text-weight-medium">Quasar ddsfdssdCatalog</span> -->
          </router-link>
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
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
import { defineComponent, defineAsyncComponent } from 'vue'
import { useAuth } from '../composables/useAuth'
import links from '../router/links'

export default defineComponent({
  name: 'AuthLayout',

  components: {
    EssentialLink: defineAsyncComponent(() => import('components/EssentialLink.vue'))
  },

  setup ( props ) {
    const auth = useAuth()
    const { sideMenuOpen, toogleLeftDrawer } = auth

    return {
      links,   
      sideMenuOpen, 
      toogleLeftDrawer,
     
     
    }
  }
})
</script>
