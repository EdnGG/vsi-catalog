<template>
  <q-page class="full-height flex flex-center">
    <div
      class="flex flex-center column q-gutter-md cursor-pointer" 
      @click="goToCatalog">
      <div>
        <h4 class="text-h4 q-my-md ">VSI CATALOG</h4>
      </div>
      <div>
        <img
        alt="Valve Solutions Inc"
        src="~assets/vsi.png"
        style="width: 200px; height: 200px"
        />
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
      goToCatalog: () => {
        router.push({ name: "CatalogPage" });
      },
    };
  },
});
</script>
