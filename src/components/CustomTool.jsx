import React from 'react'

const CustomTool = ({active, payload}) => {

  
    if(active && payload && payload.length > 0) {
        return(
            <div 
            className='bg-white rounded-lg shadow-md border 
            border-gray-300'>
                <p 
                className='text-xs font-semibold text-purple-800 mb-1'> 
                {payload[0].name}
                </p>
                <p className='text-sm text-gray-600'>
                    count: <span className='text-sm  font-medium text-gray-900'>{payload[0].value}</span>
                </p>
            </div>
        )
    }
  return null
}

export default CustomTool
