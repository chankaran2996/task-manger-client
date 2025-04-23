import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../utils/apiCall'
import Input from 'costuminputg'



const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const navigate = useNavigate()

    const {token} = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!password || !confirmPassword) {
            setError("Please fill all fields")
            return
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        const response = await resetPassword(token, password)
        if (!response) {
            setError("Something went wrong")
            return
        }
        setError(null)
        setSuccess("Password reset successfully")
        navigate('/login')
    }

  return (
    <AuthLayout>
        <div className='w-full h-3/4 flex flex-col items-center justify-center'>
            <h3 
            className='text-xl font-semibold text-black'
            >
              Reset Password
            </h3>
            <p 
            className='text-sm text-gray-500 mt-2'
            >
              Please enter your new password.
            </p>
            <form 
            onSubmit={handleSubmit}
            className='w-full max-w-sm mt-4'
            >
                <div className='mb-4'>
                    <Input 
                    label={"New Password"}
                    type="password" 
                    placeholder="New Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    
                    />
                </div>
                <div className='mb-4'>
                    <Input 
                    label={"Confirm Password"}
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    
                    />
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                {success && <p className='text-green-500'>{success}</p>}
                <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded'>Reset Password</button>
            </form>
        </div>
    </AuthLayout>
  )
}

export default ResetPassword
