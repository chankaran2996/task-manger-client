import React, { useContext } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { UserContext } from '../context/UserContext'

const DashBoardLayout = ({children, activeMenu}) => {
    
   

    const { user , loading } = useContext(UserContext);

    if (loading) return null;
    

  return (
    <div className=''>
      
      <Navbar activeMenu={activeMenu}/>

      {user && (
        <div className='flex'>
          <div className='hidden md:block'>
        <Sidebar activeMenu={activeMenu}/>
        </div>
        <div className='w-full h-screen overflow-y-auto bg-gray-100'>
          <div className='grow mx-5'>
            {children}
          </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default DashBoardLayout
