<template>
  <div class="row justify-center align-center">
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
};
</script>
 

<style scoped>
.alert-info {
  height: auto;
  width: auto;
  padding: 200px;
  margin: 100px 0;
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