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
          <router-link to="/" class="text-primary">
            <q-avatar square size="xl" class="q-mr-sm">
              <img
                src="https://lh6.googleusercontent.com/-abnSC9wsKEs/AAAAAAAAAAI/AAAAAAAAAAA/ESxpoblFfb0/s66-p-k-no-ns-nd/photo.jpg"
                alt="Quasar Logo"
              />
            </q-avatar>
            <!-- <span class="text-weight-medium">Quasar ddsfdssdCatalog</span> -->
          </router-link>
        </q-toolbar-title>
        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <div v-if="isAuthenticated" class="container-logout" @click="logout">
          <q-icon name="las la-door-open" />
          <q-toolbar-title> EXIT </q-toolbar-title>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="sideMenuOpen" show-if-above bordered>
      <q-list v-if="isAuthenticated">
        <q-item-label header> VALVE SOLUTIONS INC. </q-item-label>

        <EssentialLink v-for="link in links" :key="link.title" v-bind="link" />
      </q-list>

      <q-list v-else>
        <q-item-label header> VALVE SOLUTIONS INC. </q-item-label>

        <EssentialLink
          v-for="link in customLinks"
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
import { defineComponent, defineAsyncComponent, ref } from "vue";
import { useAuth } from "../composables/useAuth";
import links from "../router/links";

export default defineComponent({
  name: "AuthLayout",

  components: {
    EssentialLink: defineAsyncComponent(() =>
      import("components/EssentialLink.vue")
    ),
  },

  setup(props) {
    const auth = useAuth();
    const { sideMenuOpen, toogleLeftDrawer, isAuthenticated, logout } = auth;

    const customLinks = ref([
      {
        title: "LOGIN",
        caption: "Add VSI Assembly",
        icon: "las la-cogs",
        link: "LoginPage",
      },
      // Queda pendiente de implementar el Signup
      // {
      //   title: "SIGNUP",
      //   caption: "Add Waterworks Assembly",
      //   icon: "las la-cogs",
      //   link: "SignupPage",
      // },
    ]);

    return {
      links,
      sideMenuOpen,
      toogleLeftDrawer,
      customLinks,
      isAuthenticated,
      logout,
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
  background-color: rgba(183, 183, 194, 0.568);
  color: whitesmoke;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>
