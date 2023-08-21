<template>
  <q-page class="full-height flex flex-center">
    <div class="flex row">
    <div
      class="vsi-container flex flex-center column q-gutter-md cursor-pointer" 
      @click="goToVsiCatalog">
      <!-- <div>
        <h4 class="text-h4 q-my-md ">VALVE SOLUTIONS </h4>
      </div> -->
      <div>
        <img
        alt="Valve Solutions Inc"
        src="~assets/vsi.png"
        style="width: 200px; height: 200px"
        />
      </div>
    </div>
    <br>
    <div
      class="waterworks-container flex flex-center column q-gutter-md cursor-pointer" 
      @click="goToWaterWorksCatalog">
      <!-- <div>
        <h4 class="text-h4 q-my-md ">WATERWORKS</h4>
      </div> -->
      <div>
        <img
        alt="Valve Solutions Inc"
        src="~assets/waterworks.png"
        style="width: 200px; height: 200px"
        />
      </div>
    </div>
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
.vsi-container{
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.waterworks-container{
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

@media screen and (max-width: 600px) {
  .vsi-container{
    width: 100%;
  }
  .waterworks-container{
    width: 100%;
  }
  
}
</style>
