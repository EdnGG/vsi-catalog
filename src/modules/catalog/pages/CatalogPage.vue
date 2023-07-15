<template>
  <q-page class="q-pa-md">
    <div class="container_search row q-pa-sm justify-center">
      <div class="col-12 col-md-4 col-sm-6">
        <q-input
          class="search-input"
          rounded
          outlined
          v-model="assemblyName"
          label="Search for Assemblie"
        />
      </div>
    </div>

    <div class="list-catalog-container row justify-center">
      <div class="col-12 justify-center items-center text-center">
        <h1 class="text-h4 text-dark q-py-sm">VSI Assemblies</h1>
      </div>
      <div class="col-12 justify-center items-center text-center">

        <ListCatalog
        v-for="assemblie in filteredAssemblies"
        :key="assemblie.id"
        v-bind="assemblie"
        @click="getAssembliePage(assemblie)"
        />
      </div>
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
    ListCatalog: defineAsyncComponent(() =>
      import("../components/ListCatalog.vue")
    ),
  },
  setup() {
    const assemblyName = ref("");
    const router = useRouter();

    const {
      loadAssemblies,
      getAssemblies,
      getAssemblyByName,
      loadAssembliesVsi,
    } = useCatalog();

    onMounted(() => {
      // loadAssemblies();
      loadAssembliesVsi();
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
      getAssembliePage: (assemblie) => {
        console.log(assemblie);
        console.log(assemblie.id);
        router.push({
          name: "AssembliePage",
          params: { id: assemblie.id, assemblie: assemblie },
        });
      },
    };
  },
});
</script>

<style scoped>
.search-input{
  width: 100%;
  border-radius: 4px;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
  padding: 12px;
  font-size: 20px;


}
.text-dark {
  color: #444;
  font-weight: 300;
}
.list-catalog-container {
  align-items: center;
  justify-content: center;
  max-width: 100%;
  cursor: pointer;
  width: 60%vw;
  height: 100%vh;
}
</style>
