import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import Input from 'costuminputg'
import { Link } from 'react-router-dom'
import { isValidEmail } from '../utils/helper'
import { forgetPassword } from '../utils/apiCall'

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handileSubmit = async(e) => {
        e.preventDefault()
        if (!email) {
            setError("Please fill all fields")
            return
        }
        if(!isValidEmail(email) ) {
            setError("Please enter a valid email")
            return
        }

        const response = await forgetPassword(email)
        if (!response) {
            setError("Something went wrong")
            return
        }
        setError(null)
        setSuccess("Reset link sent to your email")
    }

  return (
    <AuthLayout>
        <div className='w-full h-3/4 flex flex-col items-center justify-center'>
            <h3 
            className='text-xl font-semibold text-black'
            >
              Forget Password
            </h3>
            <p 
            className='text-sm text-gray-500 mt-2'
            >
              Please enter your email to reset your password.
            </p>
            <form 
            onSubmit={handileSubmit}
            className='w-full max-w-sm mt-4'
            >
                <div className='mb-4'>
                    <Input 
                    label={"Email"}
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    
                    />
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                {success && <p className='text-green-500'>{success}</p>}
                <button 
                type="submit" 
                className='bg-blue-500 text-white py-2 px-4 rounded'
                >
                  Send Reset Link
                </button>
            </form>
        </div>
        <div className='w-full h-1/4 flex items-center justify-center'>
            <p className='text-sm text-gray-500'>
                Remembered your password? 
                <Link to="/login" className='text-blue-500 ml-1'>Login</Link>
            </p>
        </div>      
    </AuthLayout>
  )
}

export default ForgetPassword
