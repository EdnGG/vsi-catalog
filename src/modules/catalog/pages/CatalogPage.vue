<template>
  <q-page class="q-pa-md">
    <div class="container_search row q-pa-sm justify-center">
      <div class="col-12 col-md-4 col-sm-6">
        <q-input
          class="search-input"
          rounded
          outlined
          v-model="assemblyName"
          label="Search for Assemblie, Category or Technical Name"
        />
      </div>
    </div>

    <div class="list-catalog-container row justify-center">
      <div class="col-12 justify-center items-center text-center">
        <h1 class="text-h4 text-dark q-py-sm">VSI Assemblies</h1>
      </div>

      <!--  ***************** -->

      <div v-if="isLoading" class="row justify-center align-center">
        <div class="col-3 alert-info text-center mt-5">
          Please wait...
          <h3 class="mt-2">
            <i class="las la-spinner"></i>
          </h3>
        </div>
      </div>

      <!-- *****************-->
      <div
        class="container-listcatalog col-12 justify-center items-center text-center"
      >
      <!-- v-for="assemblie in filteredAssemblies" -->
        <ListCatalog
          class="container-listcatalog__item"
          v-for="assemblie in paginatedAssemblies"
          :key="assemblie.id"
          v-bind="assemblie"
          @click="getAssembliePage(assemblie.id)"
        />
      </div>
    </div>
    
    <span class="flex row q-ma-md justify-center align-center">{{ currentPage }} / {{ totalPages }}</span>
    <div>

    </div>
    <div class="flex row  q-ma-md justify-center align-center">

      <q-btn
        class="q-ma-md"
        color="primary"
        label="Previous"
        @click="previousPage"
        :disabled="currentPage === 1"
      />
      <q-btn
        class="q-ma-md"
        color="primary"
        label="Next"
        @click="nextPage"
        :disabled="currentPage === totalPages"
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
    ListCatalog: defineAsyncComponent(() =>
      import("../components/ListCatalog.vue")
    ),
  },
  setup() {
    const router = useRouter();
    const {
      getAssemblyByName,
      loadAssembliesVsi,
    } = useCatalog();

    const assemblyName = ref("");
    const isLoading = ref(true);
    const getPaginationLength = ref([]);

    const itemsPerPage = ref(7); 
    const currentPage = ref(1);

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const paginatedAssemblies = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredAssemblies.value.slice(start, end);
    });

    const filteredAssemblies = computed(() =>
      getAssemblyByName(assemblyName.value)
    );

    const totalPages = computed(() => {
      const totalItems = getPaginationLength.value?.length || 0;
      return Math.ceil(totalItems / itemsPerPage.value);
    });

    onMounted( async () => {
      const data = await loadAssembliesVsi();
      // console.log('data: ',  data)
      getPaginationLength.value = data || [];
      isLoading.value = false;
    });

    return {
      currentPage,
      isLoading,
      assemblyName,
      getAssemblyByName,

      // METHODS
      totalPages,
      paginatedAssemblies,
      previousPage,
      nextPage,
      getAssembliePage: (assemblie) => {
        router.push({
          name: "AssembliePage",
          params: { id: assemblie },
        });
      },
    };
  },
});
</script>

<style scoped>
.alert-info {
  height: auto;
  width: auto;
  padding: 200px;
  margin: 100px 0;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}
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

/* MEDIA QUERIES */
/* TABLET  */
@media (min-width: 768px) and (max-width: 1024px) {
  .list-catalog-container {
    width: 100%;
  }
  .container-listcatalog {
    width: 100%;
  }
  .container-listcatalog__item {
    width: 100%;
  }
}

/* Media Query para Móviles */
@media (max-width: 767px) {
}
</style>
