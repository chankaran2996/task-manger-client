import React from 'react'
import sdimg from '../assets/sdimg.jpg'

const AuthLayout = ({ children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12' >
            <h2 className='text-lg font-medium text-black'>Task Manger</h2>
            {children}
        </div>

        <div 
        className='w-1/2 hidden md:flex wd-[40vw] h-screen items-center 
        justify-center bg-blue-50 bg-center'>
            <img src={sdimg} className=' lg:w[90%] object-contain'/>
        </div>
      
    </div>
  )
}

export default AuthLayout
