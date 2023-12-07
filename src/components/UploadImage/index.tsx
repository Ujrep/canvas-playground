import React from 'react'

interface UploadImageProps {
  setImageFile: Function
}

const UploadImage = ({ setImageFile }: UploadImageProps) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(event.target.files[0])
  }

  return (
    <section className="flex justify-center p-8">
      <label id="file-upload" className="px-4 py-2 cursor-pointer border border-primary rounded-lg">
        Upload Document
        <input id="file-upload" type="file" className="hidden" onChange={handleImageUpload} />
      </label>
    </section>
  )
}

export default UploadImage
