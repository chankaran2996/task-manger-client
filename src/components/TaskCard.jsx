import React from 'react'
import Progess from './progess'
import { LuPaperclip } from 'react-icons/lu';
import moment from 'moment';

const TaskCard = ({
    key, 
    task, 
    description, 
    priority, 
    createdAt,
    status,
    progress,
    dueDate,
    assingedTo,
    complectedCount,
    todoCheckList,
    handleClick
}) => {

    const getStatusColor = () => {
        switch (status) {
            case 'completed':
                return 'text-lime-500 bg-lime-100 border border-line-500/20';
            case 'in-progress':
                return 'text-cyan-500 bg-cyan-100 border border-cyan-500/20';
            default:
                return 'text-violet-500 bg-violet-100 border border-violet-500/20';
        }
    };

    const getPriorityColor = () => {
        // console.log(priority)
        switch (priority) {
            case 'Low':
                return 'text-emerald-500 bg-emerald-100 border border-emerald-500/10';
            case 'Medium':
                return 'text-amber-500 bg-amber-100 border border-amber-500/20';
            case 'High':
                return 'text-rose-500 bg-rose-100 border border-rose-500/20';
            default:
                return 'text-rose-500 bg-rose-100 border border-rose-500/20';
        }
    }
  return (
    <div 
    className='bg-white rounded-xl py-4 shadow-md shadow-gray-100 border 
    border-gray-200/50 cursur-pointer'
    onClick={handleClick}>
      <div className='flex items-end gap-3 px-4'>
        <div 
        className={`text-[11px] font-medium ${getStatusColor()} px-4 py-0.5
        rounded`} >
            {status}
        </div>
        <div className={`text-[11px] font-medium ${getPriorityColor()} px-4 py-0.5
        rounded`} >
            {priority}  

        </div>
      </div>

      <div 
      className={`px-4 border-l-[3px] ${
        status === "In Progress" ? "border-cyan-500" :
        status === "Completed" ? "border-indigo-500" :
        "border-violet-500"
      }`}>
        <p className='text-sm fount-medium text-gray-800 m-t line-clamp-2'>
            {task}
        </p>

        <p className='text-xs text-gray-500 mt-1.5 line-clamp-2 leading-[18px]'>
            {description}
        </p>

        <p className='text-[13px] text-gray-700 fount-medium mt-2 mb-2 leading-[18px]'>
            Task Done:
            <span className='font-semibold text-gray-700'>
                {complectedCount} / {todoCheckList.length}
            </span>
        </p>

        <Progess
            progress={progress}
            status={status} 
        />

      </div>

      <div className='px-4'>
        <div className='flex items-center justify-between my-1'>
            <div>
                <label className='text-xs text-gray-500'>
                    Created At:
                </label>

                <p className='text-[13px] fount-medium text-gray-900'>
                    {moment(createdAt).format('Do MMM YYYY')}
                </p>
            </div>
            <div className=''>
                <label className='text-xs text-gray-500'>
                    Due Date:
                </label>

                <p className='text-[13px] fount-medium text-gray-900'>
                    {moment(dueDate).format('Do MMM YYYY')}
                </p>
            </div>

            <div className='flex items-center gap-1'>
                {/* <LuPaperclip className='text-gray-500' /> */}
                <p className='text-xs text-gray-500'>
                    {assingedTo.length} Assigned
                </p>
            </div>
        </div>

      </div>
    </div>
  )
}

export default TaskCard
