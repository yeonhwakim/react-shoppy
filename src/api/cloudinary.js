import axios from "axios";

export function createImageUrl({ file }) {
  // unsigned preset => setting 에서 확인 가능
  // 이미지 url 생성 => cloudinary
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

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
