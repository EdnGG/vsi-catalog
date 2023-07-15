<template>
  <q-page>
    <div
      class="flex assembly-title row align-center justify-center text-center"
    >
      <h2 class="text-h4">ASSEMBLY</h2>
    </div>
    <div v-if="assemblie" class="flex row">
      <!--  -->
      <div class="assembly-container__description">
        <h5>Name: {{ assemblie.name }}</h5>
        <h5>Description: {{ assemblie.description }}</h5>
        <h5>Hardware: {{ assemblie.hardware }}</h5>
        <h5>Notes: {{ assemblie.notes }}</h5>
        <h5>Category: {{ assemblie.category }}</h5>
      </div>

      <!--  -->
      <div class="col-12 q-pa-md justify-center align-center">
        <p><strong>Media:</strong></p>

        <!-- Caroussel -->

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
          >
            <div
              v-if="
                mediaItem.endsWith('.jpg') ||
                mediaItem.endsWith('.jpeg') ||
                mediaItem.endsWith('.png')
              "
            >
              <img :src="mediaItem" alt="Media item" class="responsive-image" />
            </div>
            <div
              class="q-pa-md justify-center align-center q-gutter-md q-gutter-sm"
              v-else-if="
                mediaItem.endsWith('.mp4') || mediaItem.endsWith('.mov')
              "
            >
              <video controls :src="mediaItem">
                Your browser does not support the video tag.
              </video>
              <!--  -->
              <!-- <video controls autoplay>
                <source
                  :src="mediaItem"
                  :type="'video/' + getVideoFormat(mediaItem)"
                />
                Your browser does not support the video tag.
              </video> -->
              <!--  -->
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
              class="text-white rounded-borders"
              style="background: rgba(0, 0, 0, 0.3); padding: 4px 8px"
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
              class="q-gutter-xs"
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
          <!--  Controls  -->
        </q-carousel>
        <!-- End Caroussel -->

        <!-- <ul class="media-list">
          <li v-for="mediaItem in assemblie.media" :key="mediaItem">
            <div
              v-if="
                mediaItem.endsWith('.jpg') ||
                mediaItem.endsWith('.jpeg') ||
                mediaItem.endsWith('.png')
              "
            >
              <img :src="mediaItem" alt="Media item" class="media-item" />
            </div>
            <div
              v-else-if="
                mediaItem.endsWith('.mp4') || mediaItem.endsWith('.mov')
              "
            >
              <video controls class="media-item">
                <source :src="mediaItem" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div v-else>
              {{ mediaItem }}
            </div>
          </li>
        </ul> -->
      </div>
      <!--  -->
    </div>
    <div v-else>Loading...</div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, watchEffect } from "vue";

import { useCatalog } from "../composables/useCatalog";

export default defineComponent({
  name: "AssembliePage",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const slide = ref(1);
    const autoplay = ref(false);
    const assemblie = ref(null);
    const { getAssemblyById, loadAssembliesVsi } = useCatalog();

    const getVideoFormat = (mediaItem) => {
      if (mediaItem.endsWith(".mp4")) {
        return "mp4";
      } else if (mediaItem.endsWith(".mov")) {
        return "quicktime";
      }
      return "";
    };

    onMounted(async () => {
      // console.log(props.id);
      await loadAssembliesVsi();
      assemblie.value = await getAssemblyById(props.id);
      // console.log(assemblie.value);
    });

    return {
      assemblie,
      slide,
      autoplay,
      getVideoFormat,
    };
  },
});
</script>

<style scoped>
.responsive-image {
  max-width: 100%;
  height: auto;
}
.assembly-title {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.assembly-container__description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 1rem;
  padding: 1rem;
}
.media-list {
  list-style-type: none;
  padding: 0;
}

.media-item {
  max-width: 100%;
  height: auto;
}
</style>
