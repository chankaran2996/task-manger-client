import React, { useRef, useState } from 'react'
import { LuUser , LuTrash , LuUpload } from "react-icons/lu";

const ProfilePhotoSelector = ({ profilePic , setProfilePic}) => {

    const inputRef = useRef(null)
    const [previewUrl , setPreviewUrl] = useState(null)


    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProfilePic(file)

            const perview = URL.createObjectURL(file)

            setPreviewUrl(perview)
               
            
        }
    }

    const handleRemoveImage = () => {
        setProfilePic(null)
        setPreviewUrl(null)
    }

    const handleClick = () => {
        inputRef.current.click()
    }


    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const file = e.dataTransfer.files[0]
        if (file) {
            setProfilePic(file)

            const preview = URL.createObjectURL(file)
            setPreviewUrl(preview)
        }
    }

  return (
    <div className="flex flex-col items-center justify-center w-full h-1/2 gap-4">
      <h3 className="text-xl font-semibold text-black">Profile Photo</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={inputRef}
        className="hidden"/>
        {
            !profilePic ? (
                <div className="w-32 h-32 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100" onClick={handleClick} onDragOver={handleDragOver} onDrop={handleDrop}>
                    <LuUpload className="text-gray-500 text-3xl" />
                </div>
            ) : (
                <div className="relative w-32 h-32 rounded-full overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-100" onClick={handleClick} onDragOver={handleDragOver} onDrop={handleDrop}>
                    <img src={previewUrl || URL.createObjectURL(profilePic)} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    <button type="button" className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full" onClick={handleRemoveImage}>
                        <LuTrash className="text-lg" />
                    </button>
                </div>
            )
        }
    </div>
  )
}

export default ProfilePhotoSelector
