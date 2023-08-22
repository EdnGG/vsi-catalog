<template>
  <q-page>
    <div v-if="assemblie" class="responsive-main-container flex row">
      <div class="container-media col-2 q-pa-md">
        <div
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
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
import InnerImageZoom from 'vue-inner-image-zoom';

import { defineComponent, ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

import { useCatalog } from "../composables/useCatalog";

export default defineComponent({
  name: "AssembliePage",
  components: {
    'inner-image-zoom' : InnerImageZoom,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
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
      await nextTick(); 
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
  overflow: hidden;  
  
  width: 100%; 
  /* transition: transform 0.3s, filter 0.3s;  */

  display: inline-block; /* Esto asegura que el overflow hidden funcione correctamente */
/*  */
  max-width: 100%; /* Utiliza todo el ancho disponible de la columna */
  /* Este cambio mantiene el aspecto original de la imagen */
  max-height: 100%;
  object-fit: cover; /* Ajusta la imagen dentro del contenedor */
}

.single-img:hover  {
  /* Efecto de zoom al pasar el cursor */
    /* transform: scale(1.5);  */
    z-index: 1;
    /* filter: brightness(50%); */
}

.single-video {
  max-width: 100%; /* Utiliza todo el ancho disponible de la columna */
  max-height: 90%; /* Este cambio mantiene el aspecto original de la imagen */
  /* Ajusta el alto máximo de la imagen */
  /* max-height: 60vh;  */
  object-fit: cover; /* Ajusta la imagen dentro del contenedor */
}

.middle-container {
  /* display: flex; */
  padding-top: 150px;
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
  margin-top: 60px;
  margin-left: 60px;
  /* implementar una barr adesplazadora verticalmente */
  overflow-y: auto;
  /* Cambia este valor para modificar el ancho de los controles */
  width: 100%;
  /* Cambia este valor para modificar el alto de los controles */
  height: 100%;
  /* Permite posicionar los controles respecto a su contenedor */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
}
.responsive-image {
  width: 100%;
  height: 100%;
  overflow: hidden; /* Asegúrate de que la imagen no se desborde del contenedor */
  position: relative; /* Esto es necesario para el siguiente paso */
}
.responsive-image__img {
  max-width: 40%;
  max-height: 40%; 
  /* Coloca la imagen por encima del video */
  
  /* Este cambio mantiene el aspecto original de la imagen */
  /* max-height: 60vh; */
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
.container-media {
  flex: 0 0 20%; /* Esto establece un tamaño fijo del 20% para la columna 1, sin crecer ni encogerse */
  overflow: hidden;
}
.middle-container,
.assembly-container__description {
  /* hacer que la columna 1 sea mas pequena y la columna 2 y 3 tengan el mismo tamano */
  /* flex: 1 0 0; */
  flex: 1;
  /* Esto hace que todas las columnas tengan el mismo tamaño */
  /* 100% / 3 = 33.333% */
  /* max-width: 33.333%;  */
  max-width: 40%;
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
    width: 100%;
    height: 100%;
  }
  .assembly-card {
    margin-left: 10px;
    margin-right: 20px;
    padding: 30px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    width: 100vw;
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
