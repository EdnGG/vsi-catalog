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

        <q-toolbar-title> ASSEMBLY CATALOG </q-toolbar-title>

        <div v-if="isAuthenticated" class="container-logout">
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
          v-for="link in regularLinks"
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
import { useCatalog } from "src/composables/useCatalog";
import { useAuth } from "src/modules/auth/composables/useAuth";
import links from "src/router/links";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink: defineAsyncComponent(() =>
      import("components/EssentialLink.vue")
    ),
  },

  setup() {
    const { isAuthenticated } = useAuth();
    const catalog = useCatalog();
    const { sideMenuOpen, toogleLeftDrawer } = catalog;

    const regularLinks = ref([
      {
        title: "ASSEMBLIES",
        caption: "Assemblies Page",
        icon: "las la-hippo",
        link: "IndexPage",
      },
      {
        title: "LOGIN",
        caption: "Login Page",
        icon: "las la-hippo",
        link: "LoginPage",
      },
      {
        title: "SIGN UP",
        caption: "Signup Page",
        icon: "las la-hippo",
        link: "SignupPage",
      },
    ]);

    return {
      regularLinks,
      links,
      sideMenuOpen,
      toogleLeftDrawer,
      isAuthenticated,
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
