<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-positive">
        <q-btn
          round
          icon="las la-ellipsis-v"
          aria-label="Menu"
          @click="toogleLeftDrawer"
        />

        <q-toolbar-title>
          <router-link to="/" class="text-primary">
            <q-avatar square size="xl" class="q-mr-sm">
              <img
                src="https://azoteacantina.com/wp-content/uploads/2025/09/azotealogotemp.webp"
                alt="La Bonanza LLC Logo"
              />
            </q-avatar>
            <!-- <span class="text-weight-medium">Quasar ddsfdssdCatalog</span> -->
          </router-link>
          <!-- <span>INTERACTIVE MENU</span> -->
        </q-toolbar-title>

        <div v-if="isAuthenticated" class="container-logout" @click="onLogout">
          <q-icon name="las la-door-open" />
          <q-toolbar-title> LOGOUT </q-toolbar-title>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="sideMenuOpen" show-if-above bordered class="bg-positive">
      <q-list v-if="isAuthenticated" class="bg-positive">
        <q-item-label header> LA BONANZA LLC. </q-item-label>

        <EssentialLink v-for="link in regularLinks" :key="link.title" v-bind="link" />
      </q-list>
      <!--  -->

      <q-list v-else class="bg-positive">
        <q-item-label header> LA BONANZA LLC. </q-item-label>

        <EssentialLink
          v-for="link in regularLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <!--  -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";
import { useCatalog } from "../composables/useCatalog";
import { useAuth } from "../../auth/composables/useAuth";
import { useQuasar } from "quasar";

import links from "../router/links";

export default defineComponent({
  name: "CatalogLayout",

  components: {
    EssentialLink: defineAsyncComponent(() =>
      import("components/EssentialLink.vue")
    ),
  },

  setup(props) {
    const { isAuthenticated, logout } = useAuth();
    const catalog = useCatalog();
    const $q = useQuasar();
    const { sideMenuOpen, toogleLeftDrawer } = catalog;

    const regularLinks = ref([
      {
        title: "Azotea Cantina",
        caption: "Menu",
        icon: "las la-list-ul",
        link: "CatalogPage",
      },
      {
        title: "Tacos & Tequilas",
        caption: "Menu",
        icon: "las la-list-ul",
        link: "CatalogPageWworks",
      },
    ]);

    const onLogout = () => {
      console.log("logout");
      $q.notify({
        color: "primary",
        textColor: "white",
        icon: "info",
        message: "Logout Succesfully",
      });
      logout();
    };

    return {
      regularLinks,
      links,
      sideMenuOpen,
      toogleLeftDrawer,
      isAuthenticated,
      onLogout,
    };
  },
});
</script>

<style scoped>
.container-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: 0;
  padding: 0 10px;
  border-radius: 5px;
  background-color: rgba(210, 200, 194, 0.568);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>
