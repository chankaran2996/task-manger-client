import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import Input from 'costuminputg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setpassword } from '../utils/apiCall'

const SetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)

  
  const navigate = useNavigate()

  const {token} = useParams()

  console.log(token)

  // const param = window.location.pathname.split("/").pop()

  const handileSubmit = async(e) => {

    e.preventDefault()
    if (!password || !confirmPassword) {
      setError("Please fill all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match")
      return
    }

    const response = await setpassword(token, password);
    if (response.error) {
      setError(response.error)
      return
    }
    setError(null)
    navigate("/login")

  }
  return (
    <AuthLayout>
        <div className='w-full h-3/4 flex flex-col items-center justify-center'>
            <h3 
            className='text-xl font-semibold text-black'
            >
              Set Password
            </h3>
            <p 
            className='text-sm text-gray-500 mt-2'
            >
              Please set a password for your account.
            </p>
            <form 
            onSubmit={handileSubmit}
            className='w-full max-w-sm mt-4'
            >
                <div className='mb-4'>
                    
                    <Input 
                    label="password"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
                    />
                </div>
                <div className='mb-4'>
                    
                    <Input 
                    label="confirm password"
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
                    />
                </div>
                <button 
                type="submit" 
                className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200'
                >
                  Set Password
                </button>
                {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            </form>
        </div>
    </AuthLayout>
  )
}

export default SetPassword
