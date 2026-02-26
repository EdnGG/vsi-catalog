export const widget = (callback) => window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
        sources: ["local", "url", "camera", "image_search"],
        multiple: true,
        maxFileSize: 100000000000,
        maxImageFileSize: 100000000000,
        maxVideoFileSize: 100000000000,
        maxVideoDuration: 120,
        resourceType: "auto",
        clientAllowedFormats: ["png", "gif", "jpeg", "jpg", "mp4", "mov"],
        maxFiles: 40,
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

      (error, result) => {
        callback?.(error, result)
      }

    );

export default widget;
