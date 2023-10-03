<template>
  <q-page>
    <footer class="footer">Footer</footer>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AssembliePageFooter",
});
</script>

<style scoped>
.footer {
  background-color: #0c0303;
  padding: 20px;
  text-align: center;
  height: 50vh;
  width: 100%;
  color: aqua;
}
</style>