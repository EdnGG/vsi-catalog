<template>
  <q-page class="q-pa-md">
    <!-- <search-assemblies></search-assemblies> -->
    <!-- <search-assemblies
      @update="updateAssemblies"
      >
    </search-assemblies> -->
    <div class="container_search row q-pa-md justify-center">
      <div class="col-12 col-md-4 col-sm-6 q-ma-md">
        <q-input
          rounded
          outlined
          v-model="assemblyName"
          label="Search for Assemblie"
        />
      </div>
    </div>

    <h1 class="text-h4">Catalog</h1>
    <div class="list-catalog-container row justify-center">
      <ListCatalog
        v-for="assemblie in filteredAssemblies"
        :key="assemblie.id"
        v-bind="assemblie"
        @click="getAssembliePage(assemblie.id)"
      />
    </div>
  </q-page>
</template>

<script>
import {
  defineAsyncComponent,
  defineComponent,
  onMounted,
  ref,
  computed,
} from "vue";
import { useRouter } from "vue-router";
import { useCatalog } from "../composables/useCatalog";

export default defineComponent({
  name: "CatalogPage",
  components: {
    // SearchAssemblies: defineAsyncComponent(() => import('../components/search/SearchAssemblies.vue')),
    ListCatalog: defineAsyncComponent(() =>
      import("../components/ListCatalog.vue")
    ),
  },
  setup() {
    const assemblyName = ref("");
    const router = useRouter();

    const { loadAssemblies, getAssemblies, getAssemblyByName, loadAssembliesVsi } = useCatalog();

    onMounted(() => {
      // loadAssemblies();
      loadAssembliesVsi()
    });

    const filteredAssemblies = computed(() =>
      getAssemblyByName(assemblyName.value)
    );

    return {
      // loadAssembliesVsi,
      assemblyName,
      getAssemblyByName,
      loadAssemblies,
      getAssemblies,

      // METHODS
      filteredAssemblies,
      getAssembliePage: (id) => {
        router.push({ name: "AssembliePage", params: { id: id } });
      },
    };
  },
});
</script>

<style scoped>
.list-catalog-container {
  width: 100%vw;
  height: 100%vh;
}
</style>
