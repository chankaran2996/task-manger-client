import React from 'react'

const TaskStatusTabs = ({tab, filterStatus, setFilterStatus}) => {
  return (
    <div className=''>
        <div className=''>
            {tab?.map((item) => (
                <button
                key={tab.label}
                className='relative px-3 md:px-4 py-2 text-sm font-medium'
                ></button>
            ))}
        </div>
      
    </div>
  )
}

export default TaskStatusTabs
