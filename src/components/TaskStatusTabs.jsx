import React from 'react'

const TaskStatusTabs = ({tab, filterStatus, setFilterStatus}) => {
    // setAllTasks(allTasks.filter((task) => task.status === filterStatus));
  return (
    <div className=''>
        <div className=''>
            {tab?.map((item) => (
                <button
                key={item.name}
                className={`relative px-3 md:px-4 py-2 text-sm font-medium
                    ${
                    filterStatus === item.name ? 
                    "text-primary " : 
                    "text-slate-500 hover:text-gray-700"
                    } cursuror-pointer`}
                onClick={() => setFilterStatus(item.name)}
                >
                    <div className=''>
                        <span className='text-xs'>{item.name}</span>
                        <span className={`text-xs ml-2 px-2 py-0.5 rounded-full
                            ${filterStatus === item.name ? 
                            "bg-primary text-white" : 
                            "bg-gray-200/70 text-gray-600"
                            }`}>
                            {item.count}

                        </span>
                    </div>
                    {filterStatus === item.name && (
                        <div className='absolute bottom-0 left-0 w-full h-0.5 bg-primary'></div>
                    )}
                </button>
            ))}
        </div>
      
    </div>
  )
}

export default TaskStatusTabs
