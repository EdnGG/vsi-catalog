<template>
  <div clas="main-container">
    <q-list 
    class="container-qlist"
    >
      <q-item>
        <q-item-section class="q-item-section-img">
          <div class="container-img">
            <img :src="media[0]" :alt="media[0].name" />
          </div>
        </q-item-section>
        <q-item-section class="container-description">
          <q-item-label
            style="
              font-weight: bolder;
              font-size: 1.6em;
              line-height: 1.2em;
              margin-bottom: 1em;
            "
            >{{ name }}</q-item-label
          >
          <q-item-label caption lines="2">{{ description }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced inset />
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "CatalogCard",
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    media: {
      type: Array,
      default: () => [],
    },

    image: {
      type: String,
      default: "",
    },
    description: String,
    // price: Number,
    category: String,
    hardware: String,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.main-container {
  max-width: 100%;
  max-height: 800px;
}

.container-qlist{
  height: 250px; 
  max-width: 80vw;
  margin: 0 auto;
  align-items: center;
  justify-content: center;

}
.q-item-section-img {
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 160px;
  overflow: hidden;
  margin-right: 10px;
  /* margin-left: 40px; */
  /* border: 1px solid red; */
  background-size: cover;
}
.container-img {
  width: 50%;
  height: 100%;
  margin-left: 200px;
}
.container-description {
  width: 50%;
  height: 100%;
  margin-right: 200px;
}

.q-item-section-img > div > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.q-item-section-img > div > img:hover {
  transform: scale(1.1);
  transition: transform 0.5s ease;
}

/* TABLET  */
@media (min-width: 768px) and (max-width: 1024px) {
 
  .container-qlist{
  height: 250px; 
  max-width: 100vw
}
  .q-item-section-img {
    width: 100%;
    height: 100%;
    margin-right: 0px;
    margin-left: 0px;
  }
  .container-img {
    max-width: 100%;
    max-height: 100%;
    margin-left: 0px;
  }
  .container-description {
    width: 100%;
    height: 100%;
    margin-right: 0px;
  }
}




/* MOBILE  */
@media screen and (max-width: 600px) {
  .container-qlist{
  height: 250px; 
  max-width: 100vw
}
  .q-item-section-img {
    width: 100%;
    height: 100%;
    margin-right: 0px;
    margin-left: 0px;
  }
  .container-img {
    width: 100%;
    height: 100%;
    margin-left: 0px;
  }
  .container-description {
    width: 100%;
    height: 100%;
    margin-right: 0px;
  }
}
</style>
