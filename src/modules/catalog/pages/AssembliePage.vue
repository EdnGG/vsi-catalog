<template>
  <q-page>
    <div v-if="assemblie" class="responsive-main-container flex row">
      <!-- CONTAINER MEDIA -->
      <div class="container-media col-2 q-pa-md">
        <div class="subcontainer-media">
          <draggable
            class="draggable--steps__container"
            v-model="mediaList"
            @end="updateMediaSteps()"
          >
            <div
              class="container-media__item"
              v-for="(mediaItem, index) in assemblie.media"
              :key="index"
              @click="
                selectedMedia = mediaItem.src;
                playVideo();
              "
              :media="mediaItem"
            >
            <q-spinner-pie v-if="!isMediaLoaded" color="primary" size="4em" />
              <div 
                class="responsive-image q-pa-md justify-center align-center q-gutter-md q-gutter-sm"
                v-if="
                  mediaItem.src.endsWith('.jpg') ||
                  mediaItem.src.endsWith('.jpeg') ||
                  mediaItem.src.endsWith('.png')
                "
              >
                <img
                  :src="mediaItem.src"
                  alt="Media item"
                  class="responsive-image__img"
                />
                <q-tooltip>{{ mediaItem.caption }}</q-tooltip>
              </div>
              <div
                class="responsive-video q-pa-md justify-center align-center q-gutter-md q-gutter-sm"
                v-else-if="
                  mediaItem.src.endsWith('.mp4') ||
                  mediaItem.src.endsWith('.mov')
                "
              >
                <video :src="mediaItem.src">
                  Your browser does not support the video tag.
                </video>
                <q-tooltip>{{ mediaItem.caption }}</q-tooltip>
              </div>
            </div>
          </draggable>
        </div>
      </div>
      <!-- MIDDLE CONTAINER -->
      <div class="middle-container col-6 q-pa-md">
        <div
          v-if="
            selectedMedia.endsWith('.jpg') ||
            selectedMedia.endsWith('.jpeg') ||
            selectedMedia.endsWith('.png')
          "
        >
          <inner-image-zoom
            v-if="selectedMedia"
            class="single-img"
            :src="selectedMedia"
            :zoom-scale="0.9"
            :zoom-speed="0.1"
            :move-speed="0.1"
            :transition-duration="0.3"
            :min-height="300"
            :min-width="300"
            :zoom-out-scale="3"
            :drag-scroll="true"
          >
          </inner-image-zoom>
        </div>
        <div
          v-else-if="
            selectedMedia.endsWith('.mp4') || selectedMedia.endsWith('.mov')
          "
        >
          <video
            controls
            class="single-video"
            :src="selectedMedia"
            ref="videoElement"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <!-- DESCRIPTION SECCION -->
      <div class="assembly-container__description">
        <div class="assembly-card">
          <h3>{{ assemblie.name }}</h3>
          <p class="assembly-category">{{ assemblie.category }}</p>
          <div class="assembly-info-block">
            <div class="assembly-info">
              <strong>Description:</strong>
              <p>{{ assemblie.description }}</p>
            </div>
            <div class="assembly-info">
              <strong>Hardware:</strong>
              <p>{{ assemblie.hardware }}</p>
            </div>
            <div v-if="isAuthenticated" class="assembly-info">
              <strong>Notes:</strong>
              <p>{{ assemblie.notes }}</p>
            </div>
            <p class="q-ma-lg"><strong>Steps:</strong></p>
            <div class="card--steps__container">
              <draggable
                v-model="list"
                :disabled="!sorting"
                @end="updateSteps()"
              >
                <div
                  v-for="(step, index) in list"
                  :key="index"
                  class="flex items-center active-draggable-item"
                >
                  <q-icon name="drag_indicator" class="q-mr-sm" />
                  {{ step }}
                </div>
              </draggable>
             
            </div>
            <template v-if="isAuthenticated">
              <q-btn
                class="card--steps__button"
                v-if="isAuthenticated"
                @click="toggleSorting"
              >
                {{ sorting ? "Stop Sorting" : "Start Sorting" }}</q-btn
              >
            </template>

            <div class="assembly-info">
              <strong>Assembled By:</strong>
              <p>{{ assemblie.technical_name || "EDEN G" }}</p>
            </div>
            <q-btn v-if="isAuthenticated" @click="editAssembly">
              <q-icon name="edit" /> EDIT
            </q-btn>
          </div>
        </div>
      </div>
      <!-- ENDS DESCRIPTION SECTION -->
      <!-- MODAL EDIT -->
      <q-dialog class="q-dialog-custom" v-model="showEditDialog" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Edit Assembly</div>
          </q-card-section>

          <q-card-section>
            <q-input
              class="q-ma-sm"
              v-model="editableAssembly.name"
              label="Name"
              filled
              type="text"
            />
            <q-input
              class="q-ma-sm"
              v-model="editableAssembly.category"
              label="Category"
              filled
              type="text"
            />
            <q-input
              class="q-ma-sm"
              v-model="editableAssembly.description"
              label="Descripción"
              filled
              type="textarea"
            />
            <q-input
              class="q-ma-sm"
              v-model="editableAssembly.hardware"
              label="Hardware"
              filled
              type="textarea"
            />
            <q-input
              class="q-ma-sm"
              v-model="editableAssembly.notes"
              label="Notes"
              filled
              type="textarea"
            />
            <!--   MODAL  SECCION MEDIA -->
            <div>
              <div
                class="modal-container-media__item"
                v-for="(mediaItem, index) in editableAssembly.media"
                :key="index"
                :media="mediaItem.src"
              >
                <div
                  class="modal-responsive-image q-pa-md justify-center align-center q-gutter-md q-gutter-sm"
                  v-if="
                    typeof mediaItem.src === 'string' &&
                    (mediaItem.src.endsWith('.jpg') ||
                      mediaItem.src.endsWith('.jpeg') ||
                      mediaItem.src.endsWith('.png'))
                  "
                >
                  <img
                    :src="mediaItem.src"
                    :alt="mediaItem.src"
                    class="modal-responsive__img"
                  />
                  <div>
                    <q-input
                      v-model="mediaItem.caption"
                      label="Add Description"
                      filled
                      type="text"
                    />
                  </div>
                </div>
                <div
                  class="modal-responsive__video q-pa-md justify-center align-center q-gutter-md q-gutter-sm"
                  v-else-if="
                    typeof mediaItem.src === 'string' &&
                    (mediaItem.src.endsWith('.mp4') ||
                      mediaItem.src.endsWith('.mov'))
                  "
                >
                  <video :src="mediaItem.src">
                    Your browser does not support the video tag.
                  </video>
                  <div>
                    <q-input
                      v-model="mediaItem.caption"
                      label="Add Description"
                      filled
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- ENDS MODAL SECCION MEDIA  -->
            <div
              class="q-ma-sm q-mb-lg"
              v-for="(step, index) in editableAssembly.steps"
              :key="index"
            >
              <q-input
                v-model="editableAssembly.steps[index]"
                :label="'Step ' + (index + 1)"
                filled
                type="text"
              />
            </div>
            <q-btn
              class="q-mt-lg q-mb-lg"
              label="Add Step"
              color="primary"
              @click="addStep"
            />
            <q-input
              class="q-mt-lg q-mb-lg"
              v-model="editableAssembly.technical_name"
              label="Assembled by"
              filled
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              label="Cancel"
              color="primary"
              flat
              @click="showEditDialog = false"
            />
            <q-btn label="Save" color="primary" @click="updateAssemblie" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- ENDS MODAL EDIT  -->
      <div class="col-12 q-px-xl q-mb-xl flex justify-center align-center">
        <q-btn
          size="lg"
          color="primary"
          class="q-mb-xl q-ma-md text-white"
          @click="goBack"
        >
          Back
        </q-btn>
        
      </div>
      <div class="">
          <ChatBotVsi />
        </div>
    </div>
    <LoadingSpinner v-else />
    <div class="foote-container">
      <AssembliePageFooter :category="category" />
    </div>
  </q-page>
</template>

<script>
import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";
import InnerImageZoom from "vue-inner-image-zoom";
import { VueDraggableNext } from "vue-draggable-next";

import {
  defineComponent,
  defineAsyncComponent,
  ref,
  computed,
  onMounted,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

import { useCatalog } from "../composables/useCatalog";
import { useAuth } from "src/modules/auth/composables/useAuth";

export default defineComponent({
  name: "AssembliePage",
  components: {
    "inner-image-zoom": InnerImageZoom,
    draggable: VueDraggableNext,
    AssembliePageFooter: defineAsyncComponent(()=> import("../components/AssembliePageFooter.vue")),
    LoadingSpinner: defineAsyncComponent(() =>
      import("src/modules/catalog/components/LoadingSpinner.vue")
    ),
    ChatBotVsi: defineAsyncComponent(()=> import("src/modules/catalog/components/ChatBotVsi.vue")),
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const $q = useQuasar();

    const { isAuthenticated } = useAuth();
    const {
      getAssemblyById,
      loadAssembliesVsi,
      updateAssemblyVsi,
      updateAssemblyVsiSteps,
      updateAssemblyMediaSteps,
    } = useCatalog();

    const assemblie = ref(null);
    const selectedMedia = ref(assemblie.value ? assemblie.value.media.src : "");
    const videoElementRef = ref(null);
    const showEditDialog = ref(false);
    const list = ref([]);
    const mediaList = ref([]);
    const sorting = ref(false);
    const isMediaLoaded = ref(false)
    const category = ref()
    // const categoryList = ref([{
    //   butterflyValves: "https://valvesolutions.com/product-category/valves/butterfly-valves/",
    //   vBallValves: "https://valvesolutions.com/product-category/valves/butterfly-valves/"
    // }])

    const editableAssembly = ref({
      id: "",
      name: "",
      category: "",
      description: "",
      hardware: "",
      notes: "",
      media:
        assemblie.value?.media.map((mediaItem) => ({
          src: mediaItem,
          caption: "",
        })) || [],
      steps: assemblie.value?.steps || [],
      technical_name: "",
    });

    const playVideo = async () => {
      await nextTick();
      const videoElement = document.querySelector(".middle-container video");
      if (videoElement) {
        videoElement.play();
      }
    };
    const loadAssemblies = async () => {
      await loadAssembliesVsi();
      return (assemblie.value = await getAssemblyById(props.id));
    };

    onMounted(async () => {
      await loadAssemblies();
      assemblie.value.media ? isMediaLoaded.value = true : isMediaLoaded.value = false;
      
      if (
        assemblie.value &&
        assemblie.value.media &&
        assemblie.value.media.length > 0
      ) {
        // Buscar el primer objeto cuya propiedad src termina en .jpg, .jpeg o .png
        const defaultImage = assemblie.value.media.find(
          (item) =>
            typeof item.src === "string" &&
            (item.src.endsWith(".jpg") ||
              item.src.endsWith(".jpeg") ||
              item.src.endsWith(".png"))
        );
        selectedMedia.value = defaultImage
          ? defaultImage.src
          : assemblie.value.media[0].src;
      } else {
        $q.notify({
          type: "negative",
          message: "Error: Media is undefined or empty",
        });
      }
      // Cargar los Steps y Media en  el list
      list.value = assemblie.value.steps;
      mediaList.value = assemblie.value.media;
      category.value = assemblie.value.category
    });
    const editAssembly = () => {
      if (assemblie.value) {
        editableAssembly.value.id = props.id;
        editableAssembly.value.name = assemblie.value.name;
        editableAssembly.value.category = assemblie.value.category;
        editableAssembly.value.description = assemblie.value.description;
        editableAssembly.value.hardware = assemblie.value.hardware;
        editableAssembly.value.notes = assemblie.value.notes;
        editableAssembly.value.media = [...assemblie.value.media]; // Usamos spread para copiar el array
        editableAssembly.value.steps = [...assemblie.value.steps]; // Usamos spread para copiar el array
        editableAssembly.value.technical_name = assemblie.value.technical_name;
        showEditDialog.value = true;
      }
    };
    const updateAssemblie = async () => {
      try {
        // assemblie.value.steps = list.value;
        // Object.assign(assemblie.value, editableAssembly.value);
        await updateAssemblyVsi(editableAssembly.value);
        await loadAssemblies();
        showEditDialog.value = false;
        $q.notify({
          color: "primary",
          textColor: "white",
          icon: "las la-check-circle",
          message: "Assembly updated successfully",
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    const updateSteps = async () => {
      const newList = list.value.slice();
      try {
        await updateAssemblyVsiSteps(props.id, newList);
        await loadAssemblies();
        $q.notify({
          type: "positive",
          message: "Steps updated successfully!",
        });
      } catch (error) {
        console.error("Error updating Steps:", error);
        $q.notify({
          type: "negative",
          message: "Error updating Steps",
        });
      }
    };

    const updateMediaSteps = async ($event, sorting) => {
      const newList = mediaList.value.slice();
      try {
        await updateAssemblyMediaSteps(props.id, newList);
        await loadAssemblies();
        $q.notify({
          type: "positive",
          message: "Media updated successfully!",
        });
      } catch (error) {
        console.error("Error updating Media:", error);
        $q.notify({
          type: "negative",
          message: "Error updating Media",
        });
      }
    };

    const toggleSorting = () => {
      sorting.value = !sorting.value;
    };

    return {
      // category,
      isMediaLoaded,
      sorting,
      toggleSorting,
      list,
      mediaList,
      assemblie,
      selectedMedia,
      videoElementRef,
      playVideo,
      updateSteps,
      updateMediaSteps,
      editAssembly,
      editableAssembly,
      updateAssemblie,
      showEditDialog,
      updateAssemblyVsiSteps,
      //COMPUTED
      category: computed(() => {
        return assemblie.value?.category;
      }),
      
      // GETTERS
      isAuthenticated,
      // INLINE METHODS
      goBack: () => {
        router.push({ name: "CatalogPage" });
      },
      addStep: () => {
        editableAssembly.value.steps.push("");
      },
    };
  },
});
</script>

<style scoped>
.footer-container {
  max-height: 10%;
  width: 100%;
  color: aqua;
}
.active-draggable-item {
  cursor: pointer !important;
  border-radius: 5px;
  border: 5px; /* Color de borde azul */
  background-color: #b2c2ce !important; /* Color de fondo azul claro */
  transition: all 0.5s ease-in-out !important; /* Transición suave */
  padding: 10px; /* Espaciado interno */
  margin: 10px 0; /* Espaciado externo */
}
.q-dialog-custom {
  max-width: 100%;
  height: 100vh;
}
.q-card {
  width: 100%;
}
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
.single-img {
  overflow: hidden;
  width: 100%;
  display: inline-block; /* Esto asegura que el overflow hidden funcione correctamente */
  max-width: 100%; /* Utiliza todo el ancho disponible de la columna */
  height: 50%;
  object-fit: cover; /* Ajusta la imagen dentro del contenedor */
}
.single-video {
  max-width: 100%; /* Utiliza todo el ancho disponible de la columna */
  max-height: 90%; /* Este cambio mantiene el aspecto original de la imagen */
  object-fit: cover; /* Ajusta la imagen dentro del contenedor */
}
.middle-container {
  padding-top: 66px;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
}
.container-media {
  margin-top: 60px;
  margin-left: 60px;
  flex: 0 0 15%;
  /* overflow: hidden; */
  overflow-y: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
}
.subcontainer-media {
  /* necesito darle un tamano definido y agregarle un scroll */
  max-width: 100vw;
  max-height: 85vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
/* .container-media__item{
  overflow-y: scroll;
  margin-bottom: 20px;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
} */
.responsive-image {
  width: 100%;
  height: 100%;
  overflow: hidden; /* Asegúrate de que la imagen no se desborde del contenedor */
  position: relative; /* Esto es necesario para el siguiente paso */
}
.responsive-image__img {
  max-width: 40%;
  max-height: 40%;
  object-fit: cover; /* Ajusta la imagen dentro del contenedor */
}
.modal-responsive__img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.responsive-video {
  transition: transform 0.3s; /* Transición suave al hacer zoom */
  display: block; /* Remueve espacios no deseados debajo de la imagen */
  width: 100%;
  height: 100%;
}
.modal-responsive__video video {
  max-width: 95%;
  max-height: 100%;
  object-fit: cover;
}
.responsive-image:hover .responsive-image__img {
  transform: scale(1.5); /* Escala la imagen 1.5 veces su tamaño original */
}
.responsive-video video {
  max-width: 40%;
  max-height: 40%; /* Ajusta el alto máximo del vídeo */
  object-fit: cover; /* Ajusta el vídeo dentro del contenedor */
}
.assembly-container__description {
  display: flex;
  margin-top: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%; /* Limit the maximum height of the container */
  overflow-y: scroll; /* Enable vertical scrolling when content exceeds the height */
}
.assembly-card {
  padding: 20px;
  margin-right: 25px;
  margin-left: 25px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  width: 100%;
  height: 70vh;
  overflow-y: scroll;
}
.assembly-card h3 {
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
}

.assembly-card .assembly-category {
  /* margin: 0; */
  margin-bottom: 20px;
  font-size: 1rem;
  color: #666;
}

.draggable--steps__container {
  padding: 0px !important;
  margin: 0px !important;
}

.card--steps__container {
  max-height: 70vh; /* Dejarlo asi para que respete tamano de steps-contenedor*/
  padding: 0px !important;
  margin: 0px !important;
  overflow-y: auto;
}
.card--steps__button {
  height: 100%;
  padding: 0px !important;
  margin: 0px !important;
}
.assembly-info-block {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  /* height: 100hv;  */
}
.assembly-info {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 5px;
  background-color: #f5f5f5;
}
.assembly-info p {
  margin: 0;
  margin-bottom: 10px;
  font-size: 0.7rem;
  color: #333;
}
.assembly-info p strong {
  color: #666;
}

/* Establece un tamaño fijo para las columnas */
.middle-container,
.assembly-container__description {
  flex: 1;
  max-width: 40%;
  overflow: hidden;
}
/* Media Query */

/* Media Query para Tablets */
@media (min-width: 768px) and (max-width: 1024px) {
  .responsive-video {
    flex-shrink: 0; /* Asegúrate de que los elementos no se reduzcan */
    display: flex;
    flex-direction: row;
    width: 90%;
    height: 90%;
    margin: 10px;
  }
  .responsive-video video {
    max-width: 50vw;
    max-height: 40vh;
    overflow: hidden;
    /* Asegúrate de que la imagen no se desborde del contenedor */
    position: relative;
    /* Esto es necesario para el siguiente paso */
  }
  .modal-responsive__video video {
    object-fit: cover;
    width: 100%;
    height: 40%;
    margin: 10px;
    padding: 10px;
  }
  .responsive-image {
    flex-shrink: 0; /* Asegúrate de que los elementos no se reduzcan */
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    margin-bottom:0;
    padding-left: 10px;
    padding-right: 10px;
  }
  .modal-responsive-image {
    flex-shrink: 0; /* Asegúrate de que los elementos no se reduzcan */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 90%;
    height: 40%;
    margin: 10px;
    padding: 10px;
  }
  .responsive-image__img {
    max-width: 40vw;
    max-height: 40vh;
    overflow: hidden;
    /* padding: 0; */
    /* margin: 0; */
    /* Asegúrate de que la imagen no se desborde del contenedor */
    position: relative;
  }
  .modal-responsive__img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  .container-media {
    margin-left: 0px;
    padding: 0px;
    /* margin: 30px; */
    display: flex;
    flex-direction: column;
    /* Cambia a 'column' para mostrar los elementos en filas */
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .subcontainer-media {
    max-width: 100%;
    max-height: 100vh;
    padding: 0 !important;
    margin: 0 !important;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;    /* Cambia a 'column' para mostrar los elementos en filas */
    /* flex-wrap:nowrap; */
  }
  .draggable--steps__container {
    /* width: 100%; */
    height: 100%;
    padding: 0;
    margin-top: 100px !important;
    margin-bottom: 100px !important;
    display: flex;
    flex-direction: row;
    /* overflow-x: scroll; */
    /* overflow-y: scroll; */
    /* height: 80%; */
  }
  .container-media__item {
    /* max-width: 100% !important;  */
    /* max-height: 100vh !important; */
    padding: 0px !important;
    margin: 0px !important;
  }
  .middle-container {
    padding-top: 0px;
  }
  .responsive-main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .container-media,
  .middle-container,
  .assembly-container__description {
    flex: 1;
    /* Ocupar todo el ancho en tablet */
    max-width: 90%;
    /* Eliminar cualquier margen que pudieran tener */
    margin: 0;
  }
  .assembly-card {
    max-width: 100%;
    max-height: 100%;
  }
}
/* Media Query para Móviles */
@media (max-width: 767px) {
  .responsive-video {
    flex-shrink: 0; /* Asegúrate de que los elementos no se reduzcan */
    display: flex;
    flex-direction: row;
    width: 90%;
    height: 90%;
    margin: 10px;
  }
  .responsive-video video {
    max-width: 50vw;
    max-height: 40vh;
    overflow: hidden;
    /* Asegúrate de que la imagen no se desborde del contenedor */
    position: relative;
    /* Esto es necesario para el siguiente paso */
  }
  .modal-responsive__video video {
    /* max-width: 95%;
    max-height: 100%;  */
    object-fit: cover;
    width: 100%;
    height: 40%;
    margin: 10px;
    padding: 10px;
  }
  .responsive-image {
    flex-shrink: 0; /* Asegúrate de que los elementos no se reduzcan */
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    margin-bottom:0;
    padding-left: 10px;
    padding-right: 10px;
  }
  .modal-responsive-image {
    flex-shrink: 0; /* Asegúrate de que los elementos no se reduzcan */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 90%;
    height: 40%;
    margin: 10px;
    padding: 10px;
  }
  .responsive-image__img {
    max-width: 40vw;
    max-height: 40vh;
    overflow: hidden;
    /* Asegúrate de que la imagen no se desborde del contenedor */
    position: relative;
    /* Esto es necesario para el siguiente paso */
  }
  .modal-responsive__img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  .container-media {
    /* box-sizing: border-box; */
    margin-left: 0px;
    padding: 0px;
    /* margin: 30px; */
    display: flex;
    flex-direction: column;
    /* Cambia a 'column' para mostrar los elementos en filas */
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;

  }
  .subcontainer-media {
    max-width: 100%;
    max-height: 100vh;
    padding: 0 !important;
    margin: 0 !important;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
    /* overflow-y: hidden; */
    /* Cambia a 'column' para mostrar los elementos en filas */
    /* flex-wrap:nowrap; */
  }
  .draggable--steps__container {
    height: 100%;
    padding: 0;
    margin-top: 70px !important;
    margin-bottom: 70px !important;
    display: flex;
    flex-direction: row;
    /* overflow-x: scroll; */
    /* overflow-y: scroll; */
    /* height: 80%; */
  }
  .container-media__item {
    max-width: 100% !important;
    max-height: 80vh !important;
    /* padding: 0px !important;
    margin: 0px !important; */
    /* overflow-x: scroll; */
  }
  .modal-container-media__item {
    max-width: 100%;
    max-height: 100vh;
    padding: 0px;
    margin: 0px;
  }
  .middle-container {
    padding-top: 0px;
  }
  .responsive-main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .container-media,
  .middle-container,
  .assembly-container__description {
    flex: 1;
    /* Ocupar todo el ancho en móviles */
    max-width: 90%;
    /* Eliminar cualquier margen que pudieran tener */
    margin: 0;
  }

  .assembly-card {
    max-width: 100%;
    max-height: 100%;
  }
}
/* Ends Media Query */
</style>