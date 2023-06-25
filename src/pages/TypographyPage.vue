<template>
  <q-page class="flex column q-pa-md">
    <span class="text-h1">Lorem ipsum dolor sit amet consectetur adipisicing</span>
    <span class="text-h2">Lorem ipsum dolor sit amet consectetur adipisicing</span>
    <span class="text-h3">Lorem ipsum dolor sit amet consectetur adipisicing</span>
    <span class="text-h4">Lorem ipsum dolor sit amet consectetur adipisicing</span>
    <span class="text-h5">Lorem ipsum dolor sit amet consectetur adipisicing</span>
    <span class="text-h6">Lorem ipsum dolor sit amet consectetur adipisicing</span>


    <span class="text-subtitle1">Lorem ipsum dolor sit amet consectetur adipisicing</span>
    <span class="text-subtitle2">Lorem ipsum dolor sit amet consectetur adipisicing</span>

    <q-separator />

    <p class="text-body1">Lorem ipsum dolor sit</p>
    <p class="text-body2">Lorem ipsum dolor sit</p>

    <q-separator />
    <q-btn
        color="primary"
        @click="toogleLeftDrawer"
        :label="sideMenuOpen ? 'Closed' : 'Open'"
        :icon="sideMenuOpen ? 'las la-door-closed' : 'las la-folder-open'" 
    >
      
    </q-btn>


  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useCatalog } from "src/composables/useCatalog";
export default defineComponent({
  name: "TypographyPage",
  setup () {
    const { sideMenuOpen, toogleLeftDrawer } = useCatalog();

    return {
        sideMenuOpen, 
        toogleLeftDrawer
    };
  }
});
</script>

<style></style>
