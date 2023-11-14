<template>
  <footer class="footer--container">
    <div>
      <p>Literature</p>
      <span><a :href="categories" target="_blank"> Go! </a></span>
    </div>
    <div>
      <p>Category</p>
      <span>{{ categories }}</span>
    </div>
    <div>Website</div>
  </footer>
</template>

<script>
import { defineComponent, ref, defineProps, computed } from "vue";

export default defineComponent({
  name: "AssembliePageFooter",
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const categoryList = ref({
      'BUTTERFLY VALVE':
        "https://valvesolutions.com/product-category/valves/butterfly-valves/",
      'V-BALL':
        "https://valvesolutions.com/product-category/valves/ball-valves/",
      'PNEUMATIC ACTUATOR': "https://valvesolutions.com/product-category/actuators/pneumatic-actuators/",
    });

    const categories = computed(() => {
      return categoryList.value[props.category];
    });
    return {
      categories,
    };
  },
});
</script>

<style scoped>
.footer--container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #0c0303;
  padding: 20px;
  text-align: center;
  height: 200px;
  width: 100%;
  color: aqua;
}
footer {
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