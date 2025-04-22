import React, { useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi';
import { HiMiniPlus } from 'react-icons/hi2';

const TodoListInput = ({todoList, setTodoList}) => {

    const [options, setOptions] = useState("");

    const handleAddOption = () => {
        setTodoList([...todoList, options.trim()]);
        setOptions("");
    }

    const handleDeleteOption = (index) => {
        const newOptions = [...todoList];
        newOptions.splice(index, 1);
        setTodoList(newOptions);
    }
  return (
    <div >
      {
        todoList.map((option, index) => (
            <div 
            key={index} 
            className='flex justify-between bg-gray-50 border-gray-100 px-3 
            py-2  rounded-md mb-3 mt-2'>
                <p className='text-xs text-black'>
                    <spam className='text-xs text-gray-400 font-semibold mr-2'>
                        {index < 9? `0${index + 1}` : index + 1}
                    </spam>
                    {option}
                </p>
                <button 
                onClick={() => handleDeleteOption(index)} 
                className=' cursor-pointer text-red-500'
                >
                    <HiOutlineTrash className='text-lg' />
                </button>
            </div>
        ))
      }

      <div className='flex item-center gap-5 mt-4'>
        <input 
        type="text" 
        value={options} 
        onChange={(e) => setOptions(e.target.value)} 
        placeholder='Add a new option' 
        className='w-full text-[13px] text-black bg-white rounded-md
        outline-none bg-white border border-gray-100 px-3 py-2 '
        />

        <button 
        onClick={handleAddOption} 
        className='bg-blue-500 text-white rounded-lg px-4 py-2 mt-2'>
            <HiMiniPlus className='text-lg' />
        </button>
      </div>
    </div>
  )
}

export default TodoListInput
