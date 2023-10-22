<template>
  <q-page class="q-pa-md">
    <div class="container_search row q-pa-sm justify-center">
      <div class="col-12 col-md-4 col-sm-6">
        <!-- <h3 class="justify-center align-center text-h6 text-dark q-py-sm">Search by Assemblie Name or Category</h3> -->
        <q-toggle
          class="q-ma-md q-pa-md col-12 col-md-4 col-sm-6 justify-center align-center"
          v-model="showInput"
          color="primary"
          keep-color
          readonly
          size="lg"
          val="lg"
          checked-icon="check"
          unchecked-icon="clear"
          left-label
          label="Search by Assemblie Name or Category"
          />
        <q-input
          v-if="showInput"
          class="search-input"
          rounded
          outlined
          v-model="assemblyName"
          label="Search for Assemblie Name or Technical Name"
        />
        
        <q-select
          v-else
          v-model="selectedCategory"
          :options="categoryOptions"
          transition-show="flip-up"
          transition-hide="flip-down"
          label="Filter by Category"
          emit-value
          map-options
          outlined
          rounded
          class="q-mt-md"
        />
        
      </div>
    </div>

    <div class="list-catalog-container row justify-center">
      <div class="col-12 justify-center items-center text-center">
        <h1 class="text-h4 text-dark q-py-sm">VSI Assemblies</h1>
      </div>
      <!--  LOADING -->
      <LoadingSpinner v-if="isLoading" />
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

    <span class="flex row q-ma-md justify-center align-center"
      >{{ currentPage }} / {{ totalPages }}</span
    >

    <div class="flex row q-ma-md justify-center align-center">
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
    LoadingSpinner: defineAsyncComponent(() =>
      import("../components/LoadingSpinner.vue")
    ),
  },
  setup() {
    const router = useRouter();
    const { getAssemblyByName, loadAssembliesVsi } = useCatalog();

    const assemblyName = ref("");
    const isLoading = ref(true);
    const getPaginationLength = ref([]);

    const itemsPerPage = ref(7);
    const currentPage = ref(1);

    const categories = ref([]);
    const selectedCategory = ref("");

    const showInput = ref(true);

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

    const categoryOptions = computed(() => {
      return [
        { label: "All", value: "" },
        ...categories.value.map((category) => ({
          label: category,
          value: category,
        })),
      ];
    });

    const filteredAssemblies = computed(() => {
      let assemblies = getAssemblyByName(assemblyName.value);
      if (selectedCategory.value) {
        assemblies = assemblies.filter(
          (item) => item.category === selectedCategory.value
        );
      }
      return assemblies;
    });

    const totalPages = computed(() => {
      const totalItems = getPaginationLength.value?.length || 0;
      return Math.ceil(totalItems / itemsPerPage.value);
    });

    onMounted(async () => {
      const data = await loadAssembliesVsi();
      getPaginationLength.value = data || [];

      categories.value = [...new Set(data.map((item) => item.category))];

      isLoading.value = false;
    });

    return {
      currentPage,
      isLoading,
      assemblyName,
      getAssemblyByName,
      categoryOptions,
      selectedCategory,
      showInput,

      //COMPUTED
      totalPages,
      // categoryOptions =  computed

      // METHODS
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
