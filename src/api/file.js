import axios from './http'

export default { uploadFile }

function uploadFile (formData) {
  return axios.post('/file/uploadFile', formData)
}
