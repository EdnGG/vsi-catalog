<template>
  <footer class="footer">FOOTER</footer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AssembliePageFooter",
});
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0c0303;
  padding: 20px;
  text-align: center;
  height: 200px;
  width: 100%;
  color: aqua;
}
</style>