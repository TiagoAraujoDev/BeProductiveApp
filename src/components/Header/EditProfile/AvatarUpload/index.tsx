import React, { useContext, useState } from 'react'
import { Camera } from 'phosphor-react'

import { SessionContext } from '../../../../contexts/SessionContext'

import imagePlaceholder from '../../../../assets/placeholder.png'

interface AvatarUploadProps {
  handleChanges: () => void
}

export const AvatarUpload = ({ handleChanges }: AvatarUploadProps) => {
  const { avatarUpload, user } = useContext(SessionContext)

  const avatarUrl = user?.avatar || imagePlaceholder
  const [avatar, setAvatar] = useState<string>('')

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files![0]
      if (file) {
        avatarUpload(file)
      }
      const imagePreview = URL.createObjectURL(file)
      setAvatar(imagePreview)

      handleChanges()
    }
  }
  return (
    <>
      {avatar ? (
        <img src={avatar} alt="Profile avatar" />
      ) : (
        <img src={avatarUrl} alt="Profile avatar" />
      )}
      <label htmlFor="avatar">
        <Camera size={16} />
        <input
          type="file"
          name="avatar"
          id="avatar"
          onChange={handleAvatarUpload}
        />
      </label>
    </>
  )
}
