<template>
  <q-page class="full-height flex flex-center">
    <div class="flex row">
      <div
        class="vsi-container flex flex-center column q-gutter-md cursor-pointer"
        @click="goToVsiCatalog"
      >

        <div class="flex row q-ma-md justify-center align-center bg-positive">
          <img
            alt="Azotea Cantina"
            src="~assets/azotealogotemp.png"
            style="width: 300px; height: 300px"

          />
        </div>
      </div>
      <br />
      <!-- PENDING -->
      <div
        class="waterworks-container flex flex-center column q-gutter-md cursor-pointer"
        @click="goToWaterWorksCatalog"
      >
        <div class="flex row q-ma-sm justify-center align-center bg-positive">
          <img
            alt="Tacos y Tequilas"
            src="~assets/tacos-tequilas.png"
            style="width: 300px; height: 300px"
          />
        </div>
      </div>
      <!-- PENDING -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const router = useRouter();
    return {
      goToVsiCatalog: () => {
        router.push({ name: "CatalogPage" });
      },
      goToWaterWorksCatalog: () => {
        router.push({ name: "CatalogPageWworks" });
      },
    };
  },
});
</script>
<style scoped>
.vsi-container {
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.waterworks-container {
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 600px) {
  .vsi-container {
    width: 100%;
  }
  .waterworks-container {
    width: 100%;
  }
}
</style>
