<template>
  <q-page class="q-ma-sm">
    <div class="row  justify-center items-center">
      <div class="justify-center text-center items-center col-12">
        <h2 class="text-h4 text-dark q-py-sm">Add New Assembly</h2>
      </div>
    </div>
    <q-separator></q-separator>
    <div class="row justify-center">
      <!-- <div class=""> -->
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-xs col-xs-12 col-sm-12 col-md-6 q-pt-xl"
      >
        <q-input
          filled
          v-model="assembly.name"
          label="Assembly name"
          type="text"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something ',
          ]"
        />

        <q-input
          filled
          autogrow
          v-model="assembly.description"
          label="Description"
          type="text"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something ',
          ]"
        />

        <q-input
          filled
          v-model="assembly.category"
          label="Category"
          type="text"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something ',
          ]"
        />

        <q-input
          filled
          autogrow
          v-model="assembly.hardware"
          label="Add Hardware"
          type="text"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something ',
          ]"
        />

        <q-input
          filled
          autogrow
          v-model="assembly.notes"
          label="Add Notes"
          type="text"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something ',
          ]"
        />

        <div class="q-pa-md">
          <div class="row justify-center">
            <q-btn
              class="button_upload"
              label="Upload Media"
              type="button"
              @click="openUploadWidget"
              color="primary"
            />
          </div>
        </div>

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
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

import { useCatalog } from "../composables/useCatalog";

export default defineComponent({
  name: "NewAssembliePage",
  setup() {
    const assemblyMedia = ref([]);
    const $q = useQuasar();
    const { addAssemblyVsi } = useCatalog();

    const alert = () => {
      $q.dialog({
        title: "Media Uploaded Successfully",
        ok: "OK",
        color: "primary",
      })
        .onOk(() => {
          console.log("OK");
        })
        .onCancel(() => {
          console.log("Cancel");
        })
        .onDismiss(() => {
          console.log("Dismiss");
        });
    };

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dxzbc2qed",
        uploadPreset: "catalog-vsi",
        sources: ["local", "url", "camera", "image_search"],
        multiple: true,
        maxFileSize: 10000000000,
        maxImageFileSize: 10000000000,
        maxVideoFileSize: 10000000000,
        maxVideoDuration: 120,
        resourceType: "auto",
        clientAllowedFormats: ["png", "gif", "jpeg", "jpg", "mp4", "mov"],
        maxFiles: 10,
        showAdvancedOptions: true,
        cropping: false,
        showSkipCropButton: false,
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#90A0B3",
            tabIcon: "#0078FF",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#0078FF",
            action: "#FF620C",
            inactiveTabIcon: "#0E2F5A",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#E4EBF1",
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true,
            },
          },
        },
      },
      (error, results) => {
        if (!error && results && results.event === "success") {
          const secureUrl = results.info.secure_url;
          assemblyMedia.value.push(secureUrl); // Agregar el secure_url a assemblyMedia
          alert();
        }
      }
    );

    const openUploadWidget = () => {
      widget.open();
    };

    const assembly = ref({
      name: "",
      description: "",
      category: "",
      hardware: "",
      notes: "",
      media: [],
    });
    const onReset = () => {
      assembly.value = {
        name: "",
        description: "",
        category: "",
        hardware: "",
        notes: "",
      };
    };

    const onSubmit = async () => {
      console.log("Submitted!", assembly.value);
      assembly.value.media = assemblyMedia.value;
      await addAssemblyVsi(assembly.value);
      onReset();
    };

    return {
      assemblyMedia,
      openUploadWidget,
      assembly,
      onSubmit,
      onReset,
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
