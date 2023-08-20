<template>
    <q-page class="q-ma-sm">
      <div class="row justify-center items-center">
        <div class="justify-center text-center items-center col-12">
          <h2 class="text-h4 text-dark q-py-sm">Add WaterWorks Assembly</h2>
        </div>
      </div>
      <q-separator></q-separator>

      <FormData :isVSI="false" />
 
    </q-page>
  </template>
  
  <script>
  import { defineComponent, defineAsyncComponent } from "vue";
  
  
  export default defineComponent({
    name: "NewWaterWorksAssembly",
    components: {
        FormData: defineAsyncComponent( () => import("../components/FormData.vue") )
    },
    setup() {
    
      return {
  
        // METHODS
      };
    },
  });
  </script>
  
  <style scoped>
  .text-dark {
    color: #444;
    font-weight: 300;
  }
  .button-upload {
    background-color: #0078ff;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  </style>
  