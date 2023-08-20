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
          <h1 class="text-h4 text-dark q-py-sm">Water Works Assemblies</h1>
        </div>
  
        <!--  ***************** -->
  
        <!-- <div v-if="isLoading" class="row justify-center align-center">
          <div class="col-3  text-center q-mt-md">
            Please wait...
            <h3 class="mt-2">
              <i class="fa fa-spin fa-sync"></i>
            </h3>
          </div>
        </div> -->
  
        <!-- *****************-->
        <div class="col-12 justify-center items-center text-center">
          <ListCatalog
            v-for="assemblie in filteredAssemblies"
            :key="assemblie.id"
            v-bind="assemblie"
            @click="getAssembliePage(assemblie.id)" 
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
    name: "CatalogPageWworks",
    components: {
      ListCatalog: defineAsyncComponent(() =>
        import("../components/ListCatalog.vue")
      ),
      // LoadingSpinner: defineAsyncComponent(() => import("../components/LoadingSpinner.vue")),
    },
    setup() {
      const assemblyName = ref("");
      const router = useRouter();
  
      const isLoading = ref(true);
  
      const {
        loadAssemblies,
        getAssemblies,
        getWworksAssemblyByName,
        loadAssembliesWworks,
      } = useCatalog();
  
      onMounted(async () => {
        isLoading.value = true;
        console.log(isLoading.value)
        await loadAssembliesWworks();
        isLoading.value = false;
        console.log(isLoading.value)
      });
  
      const filteredAssemblies = computed(() =>
        getWworksAssemblyByName(assemblyName.value)
      );
  
      return {
        isLoading,
        assemblyName,
        getWworksAssemblyByName,
        loadAssemblies,
        getAssemblies,
  
        // METHODS
        filteredAssemblies,
        getAssembliePage: (assemblie) => {
          // console.log(assemblie);
          // console.log(assemblie.id);
          router.push({
            name: "WworksAssembliePage", 
            params: { id: assemblie },
          });
        },
      };
    },
  });
  </script>
  
  <style scoped>
  .search-input {
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
  