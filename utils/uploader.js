import { compress } from 'image-conversion'

export default async function uploader(theFiles) {
  try {
    const files = []
    // console.log(theFiles)

    const compressedFiles = []
    console.log('compressing')
    for (let i = 0; i < theFiles.length; i++) {
      const file = theFiles[i]
      console.log('Before ', file.size)
      await compress(file, 0.55).then((result) => {
        if (!(result instanceof Blob)) {
          compressedFiles.push(result)
        } else {
          compressedFiles.push(
            new File([result], file.name, {
              type: file.type,
              endings: file.endings,
            })
          )
        }
      })
    }

    console.log('uploading ', compressedFiles)
    for (let i = 0; i < compressedFiles.length; i++) {
      const file = compressedFiles[i]

      /* Make sure file exists */
      if (!file) return

      /* create a reader */
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(f)
        })

      /* Read data */
      const data = await readData(file)

      /* upload the converted data */
      const res = await this.$cloudinary.upload(
        data,
        {
          api_key: this.$config.apiKey,
          upload_preset: 'zcoyesqo',
          folder: 'fci',
        },
        (result, error) => console.log(result, error)
      )
      files.push(res.secure_url)
    }
    console.log('uploaded ', files)
    return files
  } catch (err) {
    console.log(err)
  }
}
