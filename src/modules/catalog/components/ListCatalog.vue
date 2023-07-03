<template>
  <div style="max-width: 100%; max-height: 800px">
    <q-list style="height: 250px; max-width: 100vw">
      <q-item>
        <q-item-section 
          class="q-item-section-img"
        >
          <div style="width: 60%;">
            <img :src="image" />
          </div>
        </q-item-section>
        <q-item-section style="width: 100%;">
          <q-item-label 
            style="font-weight: bolder;
            font-size: 1.6em;
            line-height: 1.2em;
            margin-bottom: 1em;"
          >{{name}}</q-item-label>
          <q-item-label caption lines="2"
            >{{ description }}</q-item-label
          >
        </q-item-section>

        <!-- <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section> -->
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
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
    description: String,
    price: Number,
    category: String,
    hardware: Object,
  },
  setup() {
    return {
      
    };
  },
});
</script>

<style scoped>
.q-item-section-img {
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 160px;
  overflow: hidden;
  margin-right: 10px;
  /* margin-left: 40px; */
  /* border: 1px solid red; */
  background-size: cover;
}
.q-item-section-img > div {
  width: 100%;
  height: 100%;
}
.q-item-section-img > div > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* .card-size {
  height: 100%;
  width: 100%;
  max-width: 300px;
  max-height: 300px;
  min-width: 300px;
  min-height: 300px;
  margin: 0 auto;
  padding: 0;
  border-radius: 0;
  box-shadow: 0 0 17px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
} */
</style>
