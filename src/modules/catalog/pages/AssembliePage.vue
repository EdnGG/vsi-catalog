<template>
  <q-page>
    <div class="flex assembly-title row align-center justify-center text-center">
      
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
      <div>
        <p><strong>Media:</strong></p>
        <ul class="media-list">
          <li v-for="mediaItem in assemblie.media" :key="mediaItem">
            <!-- Check the extension of the mediaItem -->
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
        </ul>
      </div>
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
    const assemblie = ref(null);
    const { getAssemblyById, loadAssembliesVsi } = useCatalog();

    onMounted(async () => {
      console.log(props.id);
      await loadAssembliesVsi();
      assemblie.value = await getAssemblyById(props.id);
      console.log(assemblie.value);
    });

    return {
      assemblie,
    };
  },
});
</script>


<style scoped>

.assembly-title{
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

.assembly-container__description{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;;
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
