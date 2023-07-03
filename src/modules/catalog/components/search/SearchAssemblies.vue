<template>
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
</template>

<script>
import { useStore} from "vuex";
import { defineComponent, ref, watch } from "vue";
import { useCatalog } from "../../composables/useCatalog";

export default defineComponent({
  name: "SearchAssemblies",
  setup( _, {emit}) {
    const store = useStore();
    const { searchAssembly, debouncedSearch, immediateSearch } = useCatalog();

    const assemblyName = ref("");

    watch(assemblyName, async (newAssemblyName) => {
      if (newAssemblyName) {
        // await immediateSearch(newAssemblyName);
        console.log('immediateSearch', newAssemblyName)
        await debouncedSearch(newAssemblyName)
        emit('update')
          // store.dispatch("catalogModule/setSearchResults", results);
          // console.log('Results :', results);
        
      } else {
        // // Almacena un array vacío en el store cuando la búsqueda está vacía
        console.log('immediateSearch else')

        store.dispatch("catalogModule/setSearchResults", []);
        // Almacena un array vacío en el store cuando la búsqueda está vacía
        // debouncedSearch(""); // Esto debería ser manejado dentro de debouncedSearch
      }
    });

    return {
      assemblyName,
      searchAssembly,
    };
  },
});
</script>

<style scoped>
.container_search {
  padding-bottom: 70px;
  /* width: 100%;
  height: 100%; */
  /* border: 1px solid red; */
}
</style>
