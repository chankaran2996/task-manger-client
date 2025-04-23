import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { Link } from 'react-router-dom'
import { isValidEmail } from '../utils/helper'
import ProfilePhotoSelector from '../components/ProfilePhotoSelector'
import Input from 'costuminputg'
import DashBoardLayout from '../components/DashBoardLayout'
import { addUser } from '../utils/apiCall'

const Register = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const [adminInviteToken, setAdminInviteToken] = useState('')

  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault()
    console.log('submit')
    // Validate username
    if (!username) {
      setError('Please enter a username')
      return
    }

    // Validate email address
    if (!isValidEmail(email)) {
      setError('Please enter valid email address')
      return
    }

    

    const response = await addUser(username, email, profilePic, adminInviteToken)
    if (response.error) {
      setError(response.error)
      return
    }
    

    setLoading(false)
    setError(null)
    setSuccess('User added successfully')

 
  }
  return (
    <DashBoardLayout activeMenu={'Add Member'}>
      <div 
      className='w-full h-3/4 flex flex-col items-center justify-center'
      >
        <h3 
        className='text-xl font-semibold text-black'
        >
          Create an account
        </h3>
        <p 
        className='text-xs text-state-700 mt-[5px] nb-6'
        >
          Join us today by entering your details to register
        </p>

        <form 
        className='w-full flex flex-col items-center justify-center gap-4'
        onSubmit={handleSubmit}
        > 

          <ProfilePhotoSelector profilePic={profilePic} setProfilePic={setProfilePic} />
          <Input
            label='Username'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label='Email address'
            type='email'
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
          label='Admin Invite Number'
          type='text'
          placeholder='Admin Invite Number'
          value={adminInviteToken}
          onChange={(e) => setAdminInviteToken(e.target.value)}
          />
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          {success && <p className='text-green-500 text-sm'>{success}</p>}
          <button 
          className='w-[26%] h-8 bg-blue-500 text-white rounded-md hover:bg-blue-600' 
          type='submit' 
          disabled={loading}>
            {loading ? 'Loading..' : 'Send Invite'}
          </button>
        </form>
      </div>
      
    </DashBoardLayout>
  )
}

export default Register
