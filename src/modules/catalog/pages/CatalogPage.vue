<template>
  <q-page class="q-pa-md">
    <div class="container_search row q-pa-sm justify-center">
      <div class="col-12 col-md-4 col-sm-6">
        <!-- <h3 class="justify-center align-center text-h6 text-dark q-py-sm">Search by Assemblie Name or Category</h3> -->
        <q-toggle
          v-model="showInput"
          color="grey-9"
          rounded
          size="lg"
          checked-icon="check"
          unchecked-icon="clear"
          left-label
          label="Search by Category"
          class="search-input"
        />
        <q-input
          v-if="showInput"
          class="search-field q-mt-md"
          rounded
          outlined
          v-model="assemblyName"
          label="Search by Plate Name"
        />

        <q-select
          id="category-select"
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
          class="search-select q-mt-md"
          popup-content-class="category-popup bg-white text-dark"
        />
      </div>
    </div>

    <div class="list-catalog-container row justify-center">
      <div class="col-12 justify-center items-center text-center">
        <!-- need to get the text bellow bold -->
        <h1 class="text-h4 text-dark q-py-sm">Azotea Cantina</h1>
      </div>
      <!--  LOADING -->
      <LoadingSpinner v-if="isLoading" />
      <div
        class="container-listcatalog col-12 justify-center items-center text-center"
      >
        <!-- v-for="assemblie in filteredAssemblies" -->
        <ListCatalog
          v-for="assemblie in paginatedAssemblies"
          class="container-listcatalog__item"
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
        class="q-ma-md bg-positive"
        label="Previous"
        @click="previousPage"
        :disabled="currentPage === 1"
      />
      <q-btn
        class="q-ma-md bg-positive"
        label="Next"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      />
    </div>
    <div class="flex row q-ma-md justify-center align-center">
      <q-btn
        @click="backToHome"
        class="button_upload bg-positive"
        label="Back to Home"
        type="button"
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
  watch,
} from "vue";
import { useRouter } from "vue-router";

import { useAuth } from "../../auth/composables/useAuth";
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
    const { backToHome } = useAuth();

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
      let assemblies = getAssemblyByName(assemblyName.value); //getAssemblyByName devuelve un array de objetos, no un solo objeto, este viene de useCatalog.js
      // console.log("azotea plates", assemblies);
      // console.log("azotea category selected", selectedCategory);
      // console.log("azotea category selected.value", selectedCategory.value);
      if (selectedCategory.value) {
        assemblies = assemblies.filter(
          (item) => item.category === selectedCategory.value
        );
      }
      // console.log("despes de filtrar por categoria en azotea", assemblies);
      return assemblies;
      // return getAssemblyByName(assemblyName.value);
    });

    // const totalPages = computed(() => {
    //   const totalItems = getPaginationLength.value?.length || 0;
    //   return Math.ceil(totalItems / itemsPerPage.value);
    // });
    const totalPages = computed(() => {
      return Math.ceil(filteredAssemblies.value.length / itemsPerPage.value);
    });

    watch([assemblyName, selectedCategory], () => {
      currentPage.value = 1;
    });

    const paginatedAssemblies = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredAssemblies.value.slice(start, end);
    });

    onMounted(async () => {
      const data = await loadAssembliesVsi();
      getPaginationLength.value = data || [];

      categories.value = [...new Set(data.map((item) => item.category))];
      // console.log(" on mounted  azotea categories.value: ", categories.value);

      isLoading.value = false;
    });

    return {
      backToHome,
      currentPage,
      isLoading,
      assemblyName,
      getAssemblyByName,
      categoryOptions,
      selectedCategory,
      showInput,

      //COMPUTED
      totalPages,
      paginatedAssemblies,
      filteredAssemblies,
      // categoryOptions =  computed

      // METHODS

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
/* TEXTO DEL Q-TOGGLE */
.search-toggle :deep(.q-toggle__label) {
  color: #111 !important;
}

/* FONDO DEL INPUT Y SELECT */
.search-field :deep(.q-field__control),
.search-select :deep(.q-field__control) {
  background: #ffffff;
  color: #111111;
}

/* TEXTO INTERNO DEL INPUT Y SELECT */
.search-field :deep(.q-field__native),
.search-field :deep(.q-field__input),
.search-select :deep(.q-field__native),
.search-select :deep(.q-field__input) {
  color: #111111 !important;
}

/* LABEL DEL INPUT Y SELECT */
.search-field :deep(.q-field__label),
.search-select :deep(.q-field__label) {
  color: #333 !important;
}

/* TEXTO SELECCIONADO DEL Q-SELECT */
.search-select :deep(.q-field__native span),
.search-select :deep(.q-field__input span) {
  color: #111 !important;
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

/* background cuando está apagado */
.dark-toggle :deep(.q-toggle__track) {
  background: #444 !important;
  opacity: 1 !important;
}

/* background cuando está encendido */
.dark-toggle :deep(.q-toggle__inner--truthy .q-toggle__track) {
  background: #1b5e20 !important;
  opacity: 1 !important;
}

/*.dark-toggle :deep(.q-toggle__track) {
  opacity: 0.7 !important;
}
*/

/*.dark-toggle :deep(.q-toggle__thumb:after) {
  background: #222 !important;
}
*/
/* MEDIA QUERIES */
/* TABLET  */
@media (min-width: 768px) and (max-width: 1024px) {
  .my-black-toggle :deep(.q-toggle__label) {
    color: black !important;
  }
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
  .my-black-toggle :deep(.q-toggle__label) {
    color: black !important;
  }
}
</style>

<style>
.category-popup .q-item,
.category-popup .q-item__label,
.category-popup .q-item__section {
  color: #111111 !important;
  background: #ffffff !important;
}

.category-popup .q-item--active {
  color: #111111 !important;
  background: #f2f2f2 !important;
}

.category-popup .q-item:hover {
  background: #f5f5f5 !important;
}
</style>
