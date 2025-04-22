import React from 'react'
import AuthLayout from '../components/AuthLayout'

const SetPassword = () => {
  return (
    <AuthLayout>
        <div className='w-full h-3/4 flex flex-col items-center justify-center'>
            <h3 className='text-xl font-semibold text-black'>Set Password</h3>
            <p className='text-xs text-state-700 mt-[5px] mb-6'>
            Set a password for your account
            </p>
            <form className='w-full flex flex-col items-center justify-center gap-4'>
            <input type="password" placeholder="Password" className='w-full p-2 border border-gray-300 rounded' />
            <input type="password" placeholder="Confirm Password" className='w-full p-2 border border-gray-300 rounded' />
            <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded'>Set Password</button>
            </form>
        </div>
    </AuthLayout>
  )
}

export default SetPassword
