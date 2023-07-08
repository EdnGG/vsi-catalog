// import axios from "axios";

// const uploadFiles = async (files) => {
//   if (!files || files.length === 0) {
//     return [];
//   }

//   try {
//     const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dxzbc2qed/upload'
//     const uploadPreset = "catalog-vsi";
//     const uploadedFiles = [];


//     for (let i = 0; i < files.length; i++) {
//       const formData = new FormData();
//       formData.append("file", files[i]);
//       formData.append("upload_preset", uploadPreset);

//       const response = await axios.post(cloudinaryUrl, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       uploadedFiles.push(response.data.secure_url);
//     }
    
    
//     return uploadedFiles;

    
    
//     // const formData = new FormData();
//     // formData.append("upload_preset", "catalog-vsi");
//     // for (let i = 0; i < files.length; i++) {
//     //   formData.append("file", files[i]);
//     // }
    
//     // const { data } = await axios.post(cloudUrl, formData, {
//     //   headers: {
//     //     "Content-Type": "multipart/form-data", // Establece el encabezado correcto
//     //   },
//     // });
//     // console.log(data);
//     // return data.secure_url;

   
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to upload files to Cloudinary.");

//   }
// };

// export default uploadFiles;




import axios from "axios";

const uploadFiles = async (files) => {
  if (!files || files.length === 0) {
    return [];
  }

  try {
    const promises = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "catalog-vsi");

      const cloudinaryUrl =
        "https://api.cloudinary.com/v1_1/dxzbc2qed/upload";

      return axios.post(cloudinaryUrl, formData).then((response) => {
        return response.data.secure_url;
      });
    });

    const mediaUrls = await Promise.all(promises);
    return mediaUrls;
  } catch (error) {
    console.error("Failed to upload files:", error);
    throw new Error("Failed to upload files");
  }
};

export default uploadFiles;
