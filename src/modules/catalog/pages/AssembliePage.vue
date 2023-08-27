<template>
  <q-page>
    <div v-if="assemblie" class="responsive-main-container flex row">
      <!-- CONTAINER MEDIA -->

      <div class="container-media col-2 q-pa-md">
        <div class="subcontainer-media">
          <div
            class="container-media__item"
            v-for="(mediaItem, index) in assemblie.media"
            :key="index"
            @click="
              selectedMedia = mediaItem;
              playVideo();
            "
            :media="mediaItem"
          >
            <div
              class="responsive-image q-pa-md justify-center align-center q-gutter-md q-gutter-sm"
              v-if="
                mediaItem.endsWith('.jpg') ||
                mediaItem.endsWith('.jpeg') ||
                mediaItem.endsWith('.png')
              "
            >
              <img
                :src="mediaItem"
                alt="Media item"
                class="responsive-image__img"
              />
            </div>
            <div
              class="responsive-video q-pa-md justify-center align-center q-gutter-md q-gutter-sm"
              v-else-if="
                mediaItem.endsWith('.mp4') || mediaItem.endsWith('.mov')
              "
            >
              <video :src="mediaItem">
                Your browser does not support the video tag.
              </video>
            </div>
            <div v-else>
              {{ mediaItem }}
            </div>
          </div>
        </div>
        <!--  -->
      </div>

      <!--  -->

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
            class="single-img"
            :src="selectedMedia"
            :zoom-scale="0.9"
            :zoom-speed="0.1"
            :move-speed="0.1"
            :transition-duration="0.3"
            :min-height="500"
            :min-width="500"
            :zoom-out-scale="3"
            :drag-scroll="true"
            :zoom-position="top"
          >
            <!-- <img class="single-img" :src="selectedMedia" alt="content" /> -->
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

      <!--  -->

      <!-- descriptions -->
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
            <div class="assembly-info">
              <strong>Notes:</strong>
              <p>{{ assemblie.notes }}</p>
            </div>
            <div class="assembly-info">
              <strong>Assembled By:</strong>
              <p>{{ assemblie.technical_name || "EDEN G" }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Ends descriptions -->

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
    </div>

    <!-- LOADING -->
    <div v-else class="row justify-center align-center">
      <div class="col-3 alert-info text-center mt-5">
        Please wait...
        <h3 class="mt-2">
          <i class="las la-spinner"></i>
        </h3>
      </div>
    </div>
  </q-page>
</template>

<script>
import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";
import InnerImageZoom from "vue-inner-image-zoom";

import { defineComponent, ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

import { useCatalog } from "../composables/useCatalog";

export default defineComponent({
  name: "AssembliePage",
  components: {
    "inner-image-zoom": InnerImageZoom,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const { getAssemblyById, loadAssembliesVsi } = useCatalog();

    // const slide = ref(1);
    // const autoplay = ref(false);

    const assemblie = ref(null);
    const selectedMedia = ref(assemblie.value ? assemblie.value.media[0] : "");
    const videoElementRef = ref(null);

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

    loadAssemblies();

    onMounted(async () => {
      await loadAssemblies();
    });

    return {
      assemblie,
      selectedMedia,
      videoElementRef,
      playVideo,
      // slide,
      // autoplay,

      // METHODS
      goBack: () => {
        router.push({ name: "CatalogPage" });
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

.single-img {
  overflow: hidden;
  width: 100%;
  display: inline-block; /* Esto asegura que el overflow hidden funcione correctamente */
  max-width: 100%; /* Utiliza todo el ancho disponible de la columna */
  max-height: 100%;
  object-fit: cover; /* Ajusta la imagen dentro del contenedor */
}

.single-video {
  max-width: 100%; /* Utiliza todo el ancho disponible de la columna */
  max-height: 90%; /* Este cambio mantiene el aspecto original de la imagen */
  object-fit: cover; /* Ajusta la imagen dentro del contenedor */
}

.middle-container {
  padding-top: 150px;
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
.responsive-video {
  transition: transform 0.3s; /* Transición suave al hacer zoom */
  display: block; /* Remueve espacios no deseados debajo de la imagen */

  width: 100%;
  height: 100%;
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
  overflow-y: auto; /* Enable vertical scrolling when content exceeds the height */
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
  max-width: 100%;
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
.assembly-info-block {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
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
  font-size: 0.9rem;
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
    width: 60%;
    height: 60%;
    margin-top: 0px;
    margin-left: 0px;
  }
  .responsive-video video {
    max-width: 60vw;
    max-height: 60vh;
    overflow: hidden;
    /* Asegúrate de que la imagen no se desborde del contenedor */
    position: relative;
    /* Esto es necesario para el siguiente paso */
  }
  .responsive-image {
    flex-shrink: 0; /* Asegúrate de que los elementos no se reduzcan */

    display: flex;
    flex-direction: row;
    width: 60%;
    height: 60%;
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
    padding: 0px;
  }
  .responsive-image__img {
    max-width: 40vw;
    max-height: 40vh;
    overflow: hidden;
    /* Asegúrate de que la imagen no se desborde del contenedor */
    position: relative;
    /* Esto es necesario para el siguiente paso */
  }
  .container-media {
    margin-top: 0px;
    margin-left: 0px;
    display: flex;
    flex-direction: row;
    /* Cambia a 'column' para mostrar los elementos en filas */
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .subcontainer-media {
    max-width: 100%;
    max-height: 100vh;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    /* Cambia a 'column' para mostrar los elementos en filas */
    /* flex-wrap:nowrap; */
  }
  .container-media__item {
    max-width: 50%;
    max-height: 100%;
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
    max-width: 100%; /* Ocupar todo el ancho en tablet */
    margin: 0; /* Eliminar cualquier margen que pudieran tener */
  }
}

/* Media Query para Móviles */
@media (max-width: 767px) {
  .responsive-video {
    flex-shrink: 0; /* Asegúrate de que los elementos no se reduzcan */
    display: flex;
    flex-direction: row;
    width: 60%;
    height: 60%;
    margin-top: 0px;
    margin-left: 0px;
  }
  .responsive-video video {
    max-width: 60vw;
    max-height: 60vh; 
    overflow: hidden;
    /* Asegúrate de que la imagen no se desborde del contenedor */
    position: relative;
    /* Esto es necesario para el siguiente paso */
  }
  .responsive-image {
    flex-shrink: 0; /* Asegúrate de que los elementos no se reduzcan */

    display: flex;
    flex-direction: row;
    width: 60%;
    height: 60%;
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
    padding: 0px;
  }
  .responsive-image__img {
    max-width: 40vw;
    max-height: 40vh;
    overflow: hidden;
    /* Asegúrate de que la imagen no se desborde del contenedor */
    position: relative;
    /* Esto es necesario para el siguiente paso */
  }
  .container-media {
    margin-top: 0px;
    margin-left: 0px;
    display: flex;
    flex-direction: row;
    /* Cambia a 'column' para mostrar los elementos en filas */
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .subcontainer-media {
    max-width: 100%;
    max-height: 100vh;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    /* Cambia a 'column' para mostrar los elementos en filas */
    /* flex-wrap:nowrap; */
  }
  .container-media__item {
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
    max-width: 100%; /* Ocupar todo el ancho en móviles */
    margin: 0; /* Eliminar cualquier margen que pudieran tener */
  }
  /* Otras adaptaciones específicas para móviles */
}
/* Ends Media Query */
</style>