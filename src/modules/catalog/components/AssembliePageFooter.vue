<template>
  <footer>
    <div class="container">
      <div>
        <p><strong>Category</strong></p>
        <span
          ><a :href="categories" target="_blank"> {{ category }}</a></span
        >
      </div>
      <div class="vertical-separator"></div>
      <div
        class=""
      >
        <p><strong>Website</strong></p>
        <span
          ><a :href="website" target="_blank">
            <img :src="logo" alt="La Bonanza LLC" style="width: 150px; height: 50px" /> </a
        ></span>
      </div>
    </div>
    <div class="horizontal-separator"></div>
    <div class="subcontainer">
      <!-- <h3> new category {{ categoriesVsi }}</h3> -->
      <div>
        <p><strong>1025 Alpharetta St, Suite 1600 Roswell, GA 30075</strong></p>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, ref, defineProps, computed, onMounted } from "vue";
import getCategoriesVsi from "src/modules/catalog/utils/categoriesVsi.js";

export default defineComponent({
  name: "AssembliePageFooter",
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const categoriesVsi = ref([]);
    const logo = ref(require("../../../assets/azotealogotemp.png"));
    const website = ref("https://azoteacantina.com/");

    onMounted(() => {
      categoriesVsi.value = getCategoriesVsi;
    });

    const categories = computed(() => {
      return categoriesVsi.value[props.category];
    });
    return {
      categories,
      website,
      logo,
      categoriesVsi,
    };
  },
});
</script>

<style scoped>
footer {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  background-color: #2a0404;
  padding: 20px;
  text-align: center;
  height: 250px;
  width: 100vw;
  color: aqua;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #0c0303;
  /* padding: 80px; */
  text-align: center;
  height: 100px;
  width: 100%;
  color: aqua;
}
.subcontainer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #0c0303;
  /* padding: 20px; */
  text-align: center;
  height: 100px;
  width: 100%;
  color: aqua;
}
.vertical-separator {
  border-left: 1px solid aqua;
  height: 100%;
  margin: 0 20px;
}
.horizontal-separator {
  border-top: 1px solid aqua;
  /* height: 100%; */
  margin: 0 20px;
}

/* Estilos para dispositivos móviles */
@media (max-width: 767px) {
  .container div {
    margin-bottom: 20px;
    /* padding-bottom: 20px; */
  }
  .subcontainer div {
    flex-direction: column;
    height: auto;
    padding: 0;
  }
  .vertical-separator {
    display: none; /* O ajusta según tus necesidades */
  }
  .small-logo {
    width: 1%;
    height: auto;
  }
}

/* Estilos para tabletas */
@media (min-width: 768px) and (max-width: 1023px) {
  .small-logo {
    width: 1%;
    height: auto;
  }
  .container div {
    margin-bottom: 20px;
  }
  .subcontainer div {
    flex-direction: column;
    height: auto;
    padding: 0;
  }
  .vertical-separator {
    display: none; /* O ajusta según tus necesidades */
  }
}
</style>
