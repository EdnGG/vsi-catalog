<template>
  <div clas="main-container">
    <!-- {{ media[0].src }} -->
    <q-list 
    class="container-qlist"
    >
      <q-item>
        <q-item-section class="q-item-section-img">
          <div class="container-img">

            <q-spinner-pie v-if="!isImageLoaded" color="primary" size="4em" />
            <img 
              :src="media[0].src" 
              :alt="media[0].name" 
              @load="isImageLoaded = true"
            />
            <!-- <img 
              :src="media[0].src" 
              :alt="media[0].name" 
              @load="onImageLoad"
              :class="{'loading': !isImageLoaded}"
            /> -->
          </div>
        </q-item-section>
        <q-item-section class="container-description">
          <q-item-label
            style="
              font-weight: bolder;
              font-size: 1.6em;
              line-height: 1.2em;
              margin-bottom: 1em;
            "
            >{{ name }}</q-item-label
          >
          <q-item-label caption lines="2">{{ description }}</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
    <q-separator 
      class="q-separator-custom" 
      spaced inset 
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "ListCatalog",
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    media: {
      type: Array,
      default: () => [],
    },

    image: {
      type: String,
      default: "",
    },
    description: String,
    category: String,
    hardware: String,
  },
  setup() {
    const isImageLoaded = ref(false)
    
    const onImageLoad = () => {
      isImageLoaded.value = true
    }
    return {
      isImageLoaded,
      onImageLoad
    };
  },
});
</script>

<style scoped>

.loading {
  opacity: 0.7;               /* Hace la imagen semi-transparente */
  filter: grayscale(100%);    /* Convierte la imagen a escala de grises */
}

.q-separator-custom{

  margin: 0;
  padding: 0;

}
.main-container {
  max-width: 100%;
  max-height: 800px;
}

.container-qlist {
  height: 250px;
  max-width: 80vw;
  margin: 0 auto;
  padding: 1rem 0;
  align-items: center;
  justify-content: center;
}

.q-item-section-img {
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 160px;
  overflow: hidden;
  margin-right: 10px;
  background-size: cover;
}

.container-img {
  width: 50%;
  height: 100%;
  margin-left: 200px;
}

.container-description {
  width: 50%;
  height: 100%;
  margin-right: 200px;
}

.q-item-section-img > div > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.q-item-section-img > div > img:hover {
  transform: scale(1.1);
  transition: transform 0.5s ease;
}

/* TABLET AND MOBILE  */
@media (max-width: 1024px) {
  .container-qlist {
    height: auto; /* Para permitir que el contenedor crezca con su contenido */
    max-width: 100vw;
    padding: 1rem 0; /* Espacio en la parte superior e inferior para mejor visualización */
  }

  .q-item-section-img,
  .container-img,
  .container-description {
    width: 100%;
    height: auto; /* Cambio para permitir que se ajuste al contenido */
    margin: 0;
  }

  .q-item-section-img {
    margin-bottom: 1rem; /* Espacio entre la imagen y la descripción */
  }

  .q-item-section-img > div > img {
    height: auto; /* Permitir que la imagen mantenga su proporción original */
  }
}

/* Ajuste específico para breakpoint 1016x948 */
@media (min-width: 768px) and (max-width: 1016px) {
  .container-img img {
    max-width: 80%; /* Ajusta según lo que necesites, esto reduce la imagen al 80% de su contenedor */
    margin: 0 auto; /* Centrar la imagen */
  }

  .q-item-section-img,
  .container-description {
    padding: 1rem; /* Espacio alrededor para que no se vea tan apretado */
  }
}

/* EXTRA MOBILE OPTIMIZATIONS */
@media (max-width: 600px) {
  q-item-label {
    font-size: 1.2em;
  }
}
</style>

