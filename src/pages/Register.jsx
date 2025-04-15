import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { Link } from 'react-router-dom'
import { isValidEmail } from '../utils/helper'
import ProfilePhotoSelector from '../components/ProfilePhotoSelector'
import Input from 'costuminputg'

const Register = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const [adminInviteToken, setAdminInviteToken] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

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

    // Validate password
    if (!password) {
      setError('Please enter a password')
      return
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    // Simulate API call for registration
    setTimeout(() => {
      setLoading(false)
      setSuccess('Registration successful!')
      setProfilePic(null)
      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }, 2000)
  }
  return (
    <AuthLayout>
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
            label= 'Password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label='Confirm Password'
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          {success && <p className='text-green-500 text-sm'>{success}</p>}
          <button 
          className='w-[38%] h-8 bg-blue-500 text-white rounded-md hover:bg-blue-600' 
          type='submit' 
          disabled={loading}>
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>
      <div className='flex relative items-center  justify-center mt-16'>
        <p className='text-sm relative text-gray-500'>Already have an account?</p>
        <Link to='/login' className='text-sm text-blue-500 ml-2'>
          Login
        </Link>
      </div>
    </AuthLayout>
  )
}

export default Register
