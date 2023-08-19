<template>
  <q-page class="q-ma-sm">
    <div class="row justify-center items-center">
      <div class="justify-center text-center items-center col-12">
        <h2 class="text-h4 text-dark q-py-sm">SIGNUP</h2>
      </div>
    </div>
    <q-separator></q-separator>
    <div class="row justify-center">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-xs col-xs-12 col-sm-12 col-md-6 q-pt-xl q-pb-xl"
      >
        <q-input
          v-model="user.name"
          filled
          label="Name"
          type="text"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please provide a Name']"
        />

        <q-input
          v-model="user.email"
          filled
          label="Email"
          type="email"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please provide an Email',
          ]"
        />

        <q-input
          v-model="user.password"
          filled
          label="Password"
          type="password"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please provide a Password',
          ]"
        />

        <div class="q-pt-lg text-center">
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
    </div>
    <div class="q-pa-md">
      <div class="row justify-center">
        <q-btn
          @click="backToHome"
          class="button_upload"
          label="Back to Home"
          type="button"
          color="primary"
        />
        <google-sign-in />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineAsyncComponent ,defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
// import { useQuasar } from "quasar";

import { useAuth } from "../composables/useAuth";

export default defineComponent({
  name: "LoginPage",
  components:{
    GoogleSignIn: defineAsyncComponent(() =>
      import("../components/GoogleSignIn.vue")
    ),
  },
  setup() {
    const router = useRouter();
    const { register, backToHome } = useAuth();
    // const $q = useQuasar();
    // const { login } = useAuth();
    // const isAlertShown = ref(false);

    // const alert = () => {
    //   $q.dialog({
    //     title: "Media Uploaded Successfully",
    //     ok: "OK",
    //     color: "primary",
    //   })
    //     .onOk(() => {
    //       console.log("OK");
    //     })
    //     .onCancel(() => {
    //       console.log("Cancel");
    //     })
    //     .onDismiss(() => {
    //       console.log("Dismiss");
    //     });
    // };

    const user = ref({
      name: "",
      email: "",
      password: "",
    });
    const onReset = () => {
      user.value = {
        name: "",
        email: "",
        password: "",
      };
    };

    const onSubmit = async () => {
      console.log("Signup");
      await register(user.value);
      router.push({ name: "CatalogPage" });
      onReset();
    };

    return {
      user,

      // METHODS
      onReset,
      onSubmit,
      backToHome,
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