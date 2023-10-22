<template>
    <draggable v-bind="$attrs">
      <slot></slot>
    </draggable>
  </template>
  
  <script>
import { VueDraggableNext } from "vue-draggable-next";
  
  export default {
    name: 'DraggableWrapper',
    components: {
        draggable: VueDraggableNext,
    },
    inheritAttrs: false,
  }
  </script>
  
  <style scoped>
  /* Si necesitas estilos específicos para este componente, puedes añadirlos aquí */
  </style>
  