<template>
  <q-page class="q-ma-md">
    <span class="text-h3"> Forms Page </span>
    <q-separator></q-separator>
    <div class="row justify-center">
      <!-- <div class="col-6 "> -->
        
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-xs col-xs-12 col-sm-12 col-md-6 q-pt-xl">
              <q-input
                filled
                v-model="email"
                label="Email"
                type="email"
                hint="type an email"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                type="password"
                v-model="password"
                label="Password"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                type="password"
                v-model="repeatPassword"
                label="Repeat Password"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <!-- <q-toggle
                v-model="accept"
                label="I accept the license and terms"
              /> -->


              <div>
                <q-btn unelevated label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
       
      <!-- </div> -->
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style></style>
