export default async function uploader(file, progress, error, options) {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const result = await this.$axios.post(options.uploadUrl, formData)
    progress(100) // (native fetch doesn’t support progress updates)
    return await Promise.resolve(result.data)
  } catch (err) {
    error('Unable to upload file')
  }
}
