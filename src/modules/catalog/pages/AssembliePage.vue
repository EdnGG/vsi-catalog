<template>
  <q-page>
    <h2 class="text-h4">Assemblie Page</h2>
    <div v-if="assemblie">
      <p><strong>ID:</strong> {{ id }}</p>
      <p><strong>Name:</strong> {{ assemblie.name }}</p>
      <p><strong>Description:</strong> {{ assemblie.description }}</p>
      <p><strong>Hardware:</strong> {{ assemblie.hardware }}</p>
      <p><strong>Notes:</strong> {{ assemblie.notes }}</p>
      <p><strong>Category:</strong> {{ assemblie.category }}</p>
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
            <div v-else-if="mediaItem.endsWith('.mp4')">
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
.media-list {
  list-style-type: none;
  padding: 0;
}

.media-item {
  max-width: 100%;
  height: auto;
}
</style>
