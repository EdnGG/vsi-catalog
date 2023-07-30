<template>
  <q-page>
    <div v-if="assemblie" class="main-container flex row">
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
          </div>
        </div>
      </div>
      <!-- Ends descriptions -->

      <div class="container-media col-12 q-pa-md">
        <!-- <span>Media:</span> -->
        <!-- Caroussel -->
        <div class="carousel-container">
          <q-carousel
            animated
            v-model="slide"
            infinite
            :autoplay="autoplay"
            ref="carousel"
            transition-prev="slide-right"
            transition-next="slide-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
          >
            <q-carousel-slide
              v-for="(mediaItem, index) in assemblie.media"
              :key="index"
              :name="index"
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
                <video controls :src="mediaItem" autoplay>
                  Your browser does not support the video tag.
                </video>
              </div>
              <div v-else>
                {{ mediaItem }}
              </div>
            </q-carousel-slide>

            <!--  Controls  -->
            <template v-slot:control>
              <q-carousel-control
                position="top-right"
                :offset="[18, 18]"
                class="container-controls__autoplay text-white rounded-borders"
                style="padding: 4px 8px"
              >
                <q-toggle
                  dense
                  dark
                  color="orange"
                  v-model="autoplay"
                  label="Auto Play"
                />
              </q-carousel-control>

              <q-carousel-control
                position="bottom-right"
                :offset="[18, 18]"
                class="q-gutter-xs container-controls__arrows"
              >
                <q-btn
                  push
                  round
                  dense
                  color="orange"
                  text-color="black"
                  icon="arrow_left"
                  @click="$refs.carousel.previous()"
                />
                <q-btn
                  push
                  round
                  dense
                  color="orange"
                  text-color="black"
                  icon="arrow_right"
                  @click="$refs.carousel.next()"
                />
              </q-carousel-control>
            </template>
            <!--  End Controls  -->
          </q-carousel>
        </div>
        <!-- End Caroussel -->
      </div>
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
import { defineComponent, ref, onMounted } from "vue";
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
    const slide = ref(1);
    const autoplay = ref(false);
    const assemblie = ref(null);
    const {  getWworksAssemblyById,  loadAssembliesWworks } = useCatalog();

    const loadWworksAssemblies = async () => {
      await loadAssembliesWworks();
      return (assemblie.value = await getWworksAssemblyById(props.id));
    };

    // const loadAssemblies = async () => {
    //   await loadAssembliesVsi();
    //   return (assemblie.value = await getAssemblyById(props.id));
    // };

    // loadAssemblies();
    loadWworksAssemblies()

    onMounted(async () => {
      // await loadAssemblies();
      await loadWworksAssemblies()
    });

    return {
      assemblie,
      slide,
      autoplay,

      // METHODS
      goBack: () => {
        router.push({ name: "CatalogPageWworks" });
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

.fa-sync {
  font-size: 2rem;
}
.carousel-container {
  height: 70vh;
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
}
.responsive-image__img {
  width: 100%;
  max-height: 100vh;
  /* O 'cover', dependiendo de lo que necesites */
  object-fit: cover;
}
.responsive-image {
  max-width: 30vw;
  height: 50%;
}
.responsive-video {
  max-width: 30vw;
  height: 50%;
}
.assembly-container__description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 3rem;
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

/* Media Query */
@media (max-width: 1024px) {
  .main-container {
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
    max-width: 70vw;
    max-height: 60%;
  }
}

/* Ends Media Query */
</style>
