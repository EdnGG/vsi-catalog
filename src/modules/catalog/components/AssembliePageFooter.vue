<template>
  <footer>
    <div class="container">
      <div>
        <p>Category</p>
        <span
          ><a :href="categories" target="_blank"> {{ category }}</a></span
        >
      </div>
      <div class="vertical-separator"></div>
      <div>
        <p>Website</p>
        <span
          ><a :href="website" target="_blank">
            <img :src="logo" alt="Valve Solutions Inc" /></a
        ></span>
      </div>
    </div>
    <div class="horizontal-separator"></div>
    <div class="subcontainer">
      <!-- <h3> new category {{ categoriesVsi }}</h3> -->
      <div>
        <p>
        1205 Alpha Drive Alpharetta, GA 30004 770-740-0800
        sales@valvesolutions.com
      </p>
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
    const logo = ref(
      "https://valvesolutions.com/wp-content/uploads/2020/12/Valve-Solutions-Logo-1-150x72-1.png"
    );
    const website = ref("https://valvesolutions.com/");

    onMounted(() => {
      categoriesVsi.value = getCategoriesVsi;
    });

    const categories = computed(() => {
      return categoriesVsi.value[props.category]
    });
    return {
      categories,
      website,
      logo,
      categoriesVsi
    };
  },
});
</script>

<style scoped>
footer {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  background-color: #0c0303;
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
.vertical-separator{
  border-left: 1px solid aqua;
  height: 100%;
  margin: 0 20px;
}
.horizontal-separator{
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
}

/* Estilos para tabletas */
@media (min-width: 768px) and (max-width: 1023px) {
 
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