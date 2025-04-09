import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here, e.g., API call
    // If there's an error, set the error state
    // setError('Invalid email or password');
  }

  return (
    <AuthLayout>
      <div 
      className='w-full h-3/4 flex flex-col items-center justify-center'>
        <h3 
        className='text-xl font-semibold text-black' 
        >Welcome back</h3>
        <p className='text-xs text-state-700 mt-[5px] nb-6'>please enter your detials to login</p>
      </div>
    </AuthLayout>
  )
}

export default Login
