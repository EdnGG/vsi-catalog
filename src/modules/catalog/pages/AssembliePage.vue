<template>
  <h1>Show assemblie by id</h1>
</template>

<script>
import { defineComponent} from "vue"
export default defineComponent( {
    name: "AssembliePage",
    props: {
    id: {
      type: String,
      required: true,
    },
  },
    setup() {
        return {

        }
    }

})
</script>

<style scoped>

</style>