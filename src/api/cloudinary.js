import axios from "axios";

export function createImageUrl({ formData }) {
  return axios
    .post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    )
    .then(function (response) {
      return response.data.url;
    })
    .catch(function (error) {
      console.log(error);
    });
}
