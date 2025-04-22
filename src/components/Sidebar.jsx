import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, USER_SIDE_MENU_DATA } from '../utils/data';


const Sidebar = ({activeMenu}) => {
    const { user, handleLogout} = useContext(UserContext);

    const [sideMenuData, setSideMenuData] = useState([]);

    const navigate = useNavigate();


    const handleClick = (path) => {
        console.log(path)
        if (path == 'logout') {
            handleLogoutClick();
        } else {
            navigate(path);
        }
    }

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/login');
    }


    useEffect(() => {
        if (user){
            setSideMenuData( 
                user.role === 'admin' ? 
                SIDE_MENU_DATA : 
                USER_SIDE_MENU_DATA
            );
        }
    }, [user]); 
    
  return (
    <div 
    className='w-64 h-[calc(100vh-61px)] bg-white border-r
     border-gray-200/50 sticky top-[61px] z-20'>
        <div 
        className='flex flex-col items-center justify-center mb-7 pt-5' >
            <div className='relative'
            >
                {
                user?.profileImage ? 
                (
                <img 
                    src={user.profileImage} 
                    alt="profile" 
                    className='w-20 h-20 bg-slate-400 rounded-full' 
                    />
                ):
                (
                    <div className='w-20 h-20 bg-slate-400 rounded-full' />
                
                )
                    
                }
            </div>
            {
                user?.role === 'admin' &&
                (
                    <div 
                    className='text-[10px] font-medium text-white 
                    bg-primary px-3 py-0.5 rounded mt-1 '>
                        Admin
                    </div>
                )
            }
            <h5 className='text-gray-950 font-medium leading-6 mt-3'>
                {user?.username || ""}
            </h5>

            <p className='text-[12px] text-gray-500' >
                {user?.email || ""}
            </p>

            {
                sideMenuData.map((item, index) => (
                    <button
                    key={`menu_${index}`}
                    className={
                        `w-full flex items-center gap-4 text-[15px]
                        ${activeMenu === item.label ? 
                        'text-blue-500 bg-linear-to-r from-blue-50/40 to-blue-100/50' : 
                        ''}
                        py-3 px-4 nb-6 cursor-pointer
                        `}
                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className='text-xl'/>
                        {item.label}
                        
                    </button>
                ))
            }
        </div>      
    </div>
  )
}

export default Sidebar
