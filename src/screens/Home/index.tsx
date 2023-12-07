import { useState } from 'react'

import Header from 'src/components/Header'
import UploadImage from 'src/components/UploadImage'
import Canvas from 'src/components/Canvas'

const Home = () => {
  const [imageFile, setImageFile] = useState<File>()
  const [pickColor, setPickColor] = useState<boolean>(false)
  const [selectedColor, setSelectedColor] = useState<string>()

  return (
    <div className="w-2/3 mx-auto h-2/3">
      <Header selectedColor={selectedColor} togglePickColor={() => setPickColor(!pickColor)} />

      {!imageFile ? (
        <UploadImage setImageFile={setImageFile} />
      ) : (
        <Canvas
          image={imageFile}
          pickColor={pickColor}
          removeImage={() => setImageFile(null)}
          setSelectedColor={setSelectedColor}
        />
      )}
    </div>
  )
}

export default Home
