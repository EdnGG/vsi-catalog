<template>
  <div v-if="isLoading" class="row justify-content-md-center">
    <div class="col-3 alert-info text-center mt-5">
      Please wait...
      <h3 class="mt-2">
        <i class="las la-spinner"></i>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
 

<style scoped>
.alert-info {
  padding: 20px;
  margin: 10px 0;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}

.fa-sync {
  font-size: 2rem;
}
</style>