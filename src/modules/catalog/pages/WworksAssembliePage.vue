<template>
  <q-page>
    <div v-if="assemblie" class="responsive-main-container flex row">
      <div class="container-media col-4 q-pa-md" style="height:1500px; overflow-y: auto;">
        <div
          v-for="(mediaItem, index) in assemblie.media"
          :key="index"
          @click="selectedMedia = mediaItem; playVideo()"
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
            v-else-if="mediaItem.endsWith('.mp4') || mediaItem.endsWith('.mov')"
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

<!-- Segunda columna  -->

      <div class="middle-container col-4 q-pa-md">
        <div
          v-if="
            selectedMedia.endsWith('.jpg') ||
            selectedMedia.endsWith('.jpeg') ||
            selectedMedia.endsWith('.png')
          "
        >
          <img class="single-img" :src="selectedMedia" alt="content" />
        </div>
        <div
          v-else-if="
            selectedMedia.endsWith('.mp4') || selectedMedia.endsWith('.mov')
          "
        >
          <video controls class="single-video" 
            :src="selectedMedia"
            ref="videoElement"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <!-- descriptions -->
      <div class="assembly-container__description col-4 q-pa-md">
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
      <!-- End descriptions -->

      <!-- Button Back -->
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

    <!-- Loading -->
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
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

import { useCatalog } from "../composables/useCatalog";

export default defineComponent({
  name: "AssembliePage",
  props: {
    id: {
      type: String,
      required: true,
    },
    // assemblie: {
    //   type: Object,
    //   required: true,
    // },
  },
  setup(props) {
    const router = useRouter();
    const { getWworksAssemblyById, loadAssembliesWworks } = useCatalog();
    const slide = ref(1);

    const autoplay = ref(false);

    const assemblie = ref(null);
    const selectedMedia = ref(assemblie.value ? assemblie.value.media[0] : "");
    const videoElementRef = ref(null);


    const playVideo = async () => {
      await nextTick();  // nextTick es similar al usado en Vue 2 pero ahora es una función asíncrona.

      // if (videoElementRef.value) {
      //   videoElementRef.value.play();
      // }
      const videoElement = document.querySelector(".middle-container video");
      if (videoElement) {
        videoElement.play();
      }
    };

    const loadWworksAssemblies = async () => {
      await loadAssembliesWworks();
      return (assemblie.value = await getWworksAssemblyById(props.id));
    };

    loadWworksAssemblies();

    onMounted(async () => {
      await loadWworksAssemblies();
    });

    return {
      assemblie,
      slide,
      autoplay,
      selectedMedia,
      playVideo,
      videoElementRef,
      // METHODS
      goBack: () => {
        router.push({ name: "CatalogPageWworks" });
      },
    };
  },
});
</script>

<style scoped>
.slider-media {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
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

.fa-sync {
  font-size: 2rem;
}
.carousel-container {
  height: 80vh;
  position: relative; /* Asegura que los controles se posicionan respecto a este contenedor */
}
.carousel-container .q-carousel {
  height: 100%;
}
.container-controls__autoplay {
  /* Cambia este valor para mover los controles hacia arriba o hacia abajo */
  /* bottom: 0%;  */
  /* Cambia este valor para mover los controles hacia la izquierda o hacia la derecha */
  left: 0%;
  /* Cambia este valor para modificar el ancho de los controles */
  width: 100%;
  padding: auto;
  /* Cambia este valor para modificar el alto de los controles */
  height: 10%;
  /* Permite posicionar los controles respecto a su contenedor */
  display: flex;
  justify-content: center;
  align-items: center;
}

.single-img {
  width: 100%; /* Utiliza todo el ancho disponible de la columna */
  height: auto; /* Este cambio mantiene el aspecto original de la imagen */
  max-height: 60vh; /* Ajusta el alto máximo de la imagen */
  object-fit: cover; /* Ajusta la imagen dentro del contenedor */
}

.single-video {
  width: 100%; /* Utiliza todo el ancho disponible de la columna */
  height: auto; /* Este cambio mantiene el aspecto original de la imagen */
  max-height: 60vh; /* Ajusta el alto máximo de la imagen */
  object-fit: cover; /* Ajusta la imagen dentro del contenedor */
}

.middle-container {
  /* display: flex; */
  padding-top: 200px;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
}
.container-controls__arrows {
  left: 0%;
  width: 100%;
  padding: auto;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-media {
  /* implementar una barr adesplazadora verticalmente */
  overflow-y: auto;
  /* Cambia este valor para modificar el ancho de los controles */
  width: 50%;
  /* Cambia este valor para modificar el alto de los controles */
  height: 50%;
  /* Permite posicionar los controles respecto a su contenedor */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.responsive-image__img {
  width: 100%;
  height: auto; /* Este cambio mantiene el aspecto original de la imagen */
  max-height: 60vh;
  object-fit: cover; /* Ajusta la imagen dentro del contenedor */
}
.responsive-image {
  max-width: 10vw;
  max-height: 30%;
}
.responsive-video {
  max-width: 10vw;
  position: relative;
  height: auto;
  /* Aspect ratio 16:9 */
  /* padding-top: 56.25%; */
  overflow: hidden;
}

.responsive-video video {
  width: 100%;
  max-height: 30vh; /* Ajusta el alto máximo del vídeo */
  object-fit: cover; /* Ajusta el vídeo dentro del contenedor */
}
.assembly-container__description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-height: 100%; /* Limit the maximum height of the container */
  overflow-y: auto; /* Enable vertical scrolling when content exceeds the height */
}

.assembly-card {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  width: 50%;
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
  margin: 0;
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
.container-media,
.middle-container,
.assembly-container__description {
  flex: 1; /* Esto hace que todas las columnas tengan el mismo tamaño */
  max-width: 33.333%; /* 100% / 3 = 33.333% */
  overflow: hidden; /* Esto oculta cualquier contenido que exceda el límite de la columna */
}
/* Media Query */
@media (max-width: 1024px) {
  .responsive-main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .assembly-container__description {
    padding: 1rem;
    margin-right: 1rem;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 100%;
    height: 100%;
  }
  .assembly-card {
    padding: 30px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    width: 90vw;
    box-sizing: border-box;

    /* max-width: 500px; */
  }
  .assembly-card .assembly-category {
    margin: 0;
    margin-bottom: 20px;
    /* max-width: 100%; */
    font-size: 0.7rem;
    color: #666;
  }
  .assembly-card h3 {
    margin: 0;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    color: #333;
  }
  .assembly-info-block {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .responsive-image__img {
    width: 100%;
    max-height: 100vh;
    height: 100vh;
    object-fit: cover;
  }
  .container-controls__arrows {
    position: absolute;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .responsive-image {
    max-width: 100vw;
    max-height: 100vh;
  }
  .responsive-video {
    max-width: 20vw;
    max-height: 20%;
  }
}

/* Ends Media Query */
</style>
