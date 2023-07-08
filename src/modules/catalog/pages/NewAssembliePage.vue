<template>
  <q-page class="q-ma-md">
    <div class="row q-ma-md justify-center items-center">
      <div class="justify-center text-center items-center q-ma-md col-12">
        <span class="justify-center items-center text-h3 q-pa-md"
          >New Assembly</span
        >
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
            <h4>
              <!-- <span class="text-h5">Add Media</span> -->
              <button @click="openUploadWidget">Upload Media</button>
            </h4>
            <!-- <q-uploader
              :url="cloudinaryUrl"
              :files="files"
              @add="onFilesAdded"
              @remove="onFileRemoved"
              label="Upload video/image"
              bordered
              multiple
              auto-upload
              batch
              max-total-size="10000000"
              style="max-width: 2000px"
            /> -->
          </div>
        </div>

        <div class="q-pt-lg">
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
    <!-- </div> -->
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

import uploadFiles from "../helpers/uploadFiles";
import { useCatalog } from "../composables/useCatalog";

export default defineComponent({
  name: "NewAssembliePage",
  setup() {
    const files = ref([]);
    const uploadPreset = "catalog-vsi";
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dxzbc2qed/upload?upload_preset=${uploadPreset}`;

    const { addAssemblyVsi } = useCatalog();

    const widget = window.cloudinary.createUploadWidget({
      cloudName: "dxzbc2qed",
      uploadPreset: "catalog-vsi",
      sources: ["local", "url", "camera", "image_search"],
      multiple: true,
      maxFileSize: 10000000,
      maxImageFileSize: 10000000,
      maxVideoFileSize: 10000000,
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
    }, (error, results)=> {
      if (!error && results && results.event === "success") {
        console.log("Done! Here is the image info: ", results.info);
      }
    })

    const openUploadWidget = () => {
      widget.open()
      // uploadFiles(files, uploadPreset, cloudinaryUrl);
    };

    // =============================

    // const onFilesAdded = async (addedFiles) => {
    //   try {
    //     for (let i = 0; i < addedFiles.files.length; i++) {
    //       const file = addedFiles.files[i];
    //       console.log("File name:", file.name);
    //       console.log("File size:", file.size);
    //       console.log("File type:", file.type);

    //       const formData = new FormData();
    //       formData.append("file", file);
    //       formData.append("upload_preset", uploadPreset);

    //       const response = await axios.post(cloudinaryUrl, formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       });

    //       const mediaUrl = response.data.secure_url;
    //       console.log("Media URL:", mediaUrl);
    //       files.value.push(mediaUrl);
    //     }
    //   } catch (error) {
    //     console.error("Failed to upload files:", error);
    //   }
    // };

   
    // const onFileRemoved = (removedFile) => {
    //   // Remover el archivo del array de files
    //   console.log("removedFile: ", removedFile);
    //   const index = files.value.indexOf(removedFile);
    //   if (index !== -1) {
    //     files.value.splice(index, 1);
    //   }
    // };

    // ===========================

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
      console.log("Files: ", files.value);

      // let media = [];
      // if (files.value.length > 0) {
      //   try {
      //     media = await uploadFiles(files.value);
      //     assembly.value.media = media;
      //   } catch (error) {
      //     console.error("Failed to upload files:", error);
      //     // Manejo del error
      //     throw new Error("Failed to upload files");
      //   }
      // }

      await addAssemblyVsi(assembly.value);

      // files.value = [];
    };

    return {
      openUploadWidget,
      cloudinaryUrl,
      uploadPreset,
      files,
      // onFilesAdded,
      // onFileRemoved,
      assembly,
      onSubmit,
      onReset,
    };
  },
});
</script>

<style scoped></style>
