import React, { useContext, useState } from 'react'
import AuthLayout from '../components/AuthLayout'
// import Input from '../components/Input';
import Input from 'costuminputg'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { isValidEmail } from '../utils/helper';
import { login } from '../utils/apiCall';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email and password`
    if(!isValidEmail(email)) {
      setError('Please enter valid email address');
      return;
    }

    if(!password) {
      setError('Please enter your password');
      return;
    }

    setError(null);

    const response = await login(email, password);

    if(response.error) {
      setError(response.error);
      return;
    }
    // console.log(response.token);

    // Handle successful login
    const { token, role } = response;

    if(token) {
      localStorage.setItem('token', token);
      updateUser(response);
    }
    if(role === 'admin') {
      navigate('/admin/dashboard');
    }else{
      navigate('/user/dashboard');
    }
    
  }

  return (
    <AuthLayout>
      <div 
      className='w-full h-3/4 flex flex-col items-center justify-center'>
        <h3 
        className='text-xl font-semibold text-black' 
        >Welcome back</h3>
        <p className='text-xs text-state-700 mt-[5px] nb-6'>please enter your detials to login</p>
      

      <form
        className='w-full flex flex-col items-center justify-center gap-4'
        onSubmit={handleSubmit} >
        <Input 
          type='email' 
          label='Email address'
          placeholder='Email address' 
          className='w-[80%] h-10 border border-gray-300 rounded-md px-4'
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          />

        <Input
          type='password' 
          label='Password'
          placeholder='Password' 
          className='w-[80%] h-10 border border-gray-300 rounded-md px-4'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <p className='text-xs text-state-700 mt-[5px]'>Forgot password? <Link to='/forgot-password' className='text-blue-500'>Reset</Link></p>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <button 
          type='submit' 
          className='w-[38%] h-8 bg-blue-500 text-white rounded-md hover:bg-blue-600'  
          >Login</button>

        {/* <p className='text-xs text-state-700 mt-[5px]'>Don't have an account? <Link to='/register' className='text-blue-500'>Register</Link></p> */}
        </form>

      </div>
    </AuthLayout>
  )
}

export default Login
