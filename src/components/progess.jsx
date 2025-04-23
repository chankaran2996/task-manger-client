import React from 'react'

const progess = ({progress, status}) => {

    const getColour = () =>{
        switch(status){
            case "In Progress":
                return "text-cyan-500 bg-cayan-100 border border-cyan-500/10";
            case "Completed":
                return "text-indigo-500 bg-indigo-100 border border-indigo-500/10";
            default:
                return "text-violet-500 bg-violet-100 border border-violet-500/10";
        }
    }
  return (
    <div className='w-full bg-gray-200 rounded-full h-1.5 ' >
        <div className={`${getColour()} h-1.5 rounded-full text-center 
        text-xs font-medium `} style={{width: `${progress}%`}}>

        </div>
      
    </div>
  )
}

export default progess
