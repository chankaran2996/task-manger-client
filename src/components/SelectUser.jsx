import React, { use, useEffect, useState } from 'react'
import { getUsers } from '../utils/apiCall';
import { LuUsers } from 'react-icons/lu';
import Model from './Model';

const SelectUser = ({selectedUsers, setSelectedUsers}) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

    const getAllUsers = async () => {
        try{
            const responce = await getUsers();
            if(responce){
                setAllUsers(responce);
            }
        }catch(error){
            console.log(error)
        }
    }

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) => 
            prev.includes(userId) ? 
            prev.filter(id => id !== userId) : 
            [...prev, userId]
        );
    }

    const selectedUserAvatars = allUsers
        .filter(user => selectedUsers.includes(user._id))
        .map(user => user.profileImageUrl)

    useEffect(() => {
        getAllUsers();
    }, [])

    useEffect(() => {
        if(selectedUsers.length === 0){
            setTempSelectedUsers([]);
        }
    }, [selectedUsers])

  return (
    <div className='space-y-4 mt-2'>
      {
        selectedUserAvatars.length === 0 && (
            <button 
            className='flex items-center justify-center gap-3 
            text-[12px] font-medium text-gray-700 hover:text-primary 
            bg-gray-50 hover:bg-blue-50 px-4 py-1.5 rounded-lg border 
            border-gray-200/50 cursor-pointer' 
            onClick={() => setIsModalOpen(true)}
            >
                <LuUsers className='' /> Add Member
            </button>
        )
      }

      {
        selectedUserAvatars.length > 0 && (
            <div className='flex items-center gap-3'>
                {selectedUserAvatars.map((avatar, index) => (
                    <img 
                    key={index} 
                    src={avatar} 
                    alt={`User ${index + 1}`} 
                    className='w-10 h-10 rounded-full' 
                    />
                ))}
                <button 
                className='flex items-center justify-center gap-3 text-[12px] 
                font-medium text-gray-700 hover:text-primary bg-gray-50 
                hover:bg-blue-50 px-4 py-1.5 rounded-lg border 
                border-gray-200/50 cursor-pointer' 
                onClick={() => setIsModalOpen(true)}
                >
                    <LuUsers className='' /> Add Member
                </button>
            </div>
        )
      }

      <Model 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Select Users"
      >
        <div className='space-y-4 h-[60vh] overflow-y-auto'>
            {allUsers.map((user) => (
                <div key={user._id} 
                className='flex items-center gap-3 p-4 border-b border-grey-200'>
                    <img 
                    src={user.profileImageUrl} 
                    alt={user.username[0]} 
                    className='w-10 h-10 rounded-full' 
                    />

                    <div className='flex-1'>
                        <p className='font-medium text-gray-800 dark:text-white'>
                            {user.username}
                        </p>
                        <p className='text-[13px] text-gray-500'>
                            {user.email}
                        </p>

                        
                    </div>
                    <input
                            type="checkbox" 
                            checked={tempSelectedUsers.includes(user._id)} 
                            onChange={() => toggleUserSelection(user._id)} 
                            className='w-4 h-4 text-primary border-gray-300 rounded-sm focus:ring-blue-500 '
                        />
                </div>
            ))}
        </div>

        <div className='flex justify-end gap-4 pt-4'>
            <button 
            className='flex items-center justify-center gap-3 text-[12px] font-medium 
            text-gray-700 hover:text-primary bg-gray-50 hover:bg-blue-50 px-4 
            py-1.5 rounded-lg border border-gray-200/50 cursor-pointer'
            onClick={() => {

                setIsModalOpen(false);
            }}>
                Cancel
            </button>

            <button 
            className='flex items-center gap-3 text-[12px] font-medium 
            text-white bg-primary hover:bg-blue-50 px-4 py-1.5 rounded-lg 
            border border-primary cursor-pointer'
            onClick={() => {
                setSelectedUsers(tempSelectedUsers);
                setIsModalOpen(false);
            }}>
                Save
            </button>
        </div>
      </Model>
    </div>
  )
}

export default SelectUser
