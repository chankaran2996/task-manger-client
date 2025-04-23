import React, {useEffect, useState} from 'react'
import DashBoardLayout from '../components/DashBoardLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { LuTrash2 } from "react-icons/lu";
import SelectUser from '../components/SelectUser';
import TodoListInput from '../components/TodoListInput';
import { createingTask, deleteTaskById, getTaskById, updateTaskById } from '../utils/apiCall';
import moment from 'moment';

const CreateTask = () => {

  const location = useLocation();
  const taskId = location.state || "";
  const navigate = useNavigate();
  // console.log(taskId==true)

  const [taskData, setTaskData] = useState({
    title: "",
    description:  "",
    priority: "Low",
    status: "Created",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: []
  });
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [error, setError] = useState(null);
  const [wt,setWt] = useState(false);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const clearTaskData = () => {
    setTaskData({
      title: "",
      description:  "",
      priority: "Low",
      status: "Created",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: []
    });
  }

  const handleSubmit = async () => {
    setError(null);

    if(!taskData.title ) {
      setError("Tittle is required");
      return;
    }

    if(!taskData.description){
      setError("Description is required");
      return;
    }
    if(!taskData.dueDate){
      setError("Due date is required");
      return;
    }
    if(taskData.assignedTo.length === 0){
      setError("Assign to is required");
      return;
    }

    if(taskData.todoChecklist.length === 0){
      setError("Checklist is required");
      return;
    }
    if(taskId){
      await updateTask();
      return
    }
    await createTask();
    return;
  };



  const createTask = async () => {
    try {
      const response = await createingTask(taskData);
      // console.log(response)
      if (response) {
        setLoading(false);
        clearTaskData();
        navigate("/admin/task", { state: "Task Created Successfully" });
      } else {
        setLoading(false);
        setError("Failed to create task. Please try again.");
      }
    } catch (error) {
      
    }
  };

  const updateTask = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateTaskById( taskId.taskId , taskData);
      if (response) {
        setLoading(false);
        clearTaskData();
        navigate("/admin/task", { state: "Task Updated Successfully" });
      } else {
        setLoading(false);
        setError("Failed to update task. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError("Failed to update task. Please try again.");
    }
  };
  // console.log(taskId.taskId)
  const getTaskDetailsById = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTaskById(taskId.taskId);
      console.log("Task details:", response);
      if (response) {
        setCurrentTask(response.task);
        setTaskData({
          title: response.task.title,
          description: response.task.description,
          priority: response.task.priority,
          status: response.task.status,
          dueDate: response.task.dueDate?
          moment(response.task.dueDate).format("YYYY-MM-DD") : null,
          assignedTo: response.task.assignedTo,
          todoChecklist: response.task.todoCheckList,
          attachments: response.task.attachments,
        });
        setLoading(false);  
      }
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch task details. Please try again.");
    }
  };

  const deleteTask = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteTaskById(taskId.taskId);
      if (response) {
        setLoading(false);
        clearTaskData();
        navigate("/admin/task", { state: "Task Deleted Successfully" });
      } else {
        setLoading(false);
        setError("Failed to delete task. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError("Failed to delete task. Please try again.");
    }
  };


  useEffect(() => {
    if (taskId) {
      setLoading(true);
      getTaskDetailsById();
    }
  }
  , [taskId]);

  return (
    <DashBoardLayout activeMenu={"Create Task"}>
      <div className='mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
          <div 
          className='bg-white p-6 rounded-lg shadow-md shadow-gray-100 
          border border-gray-200/50 col-span-3'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-medium text-black'>
                {/* {
                  console.log(taskId)
                } */}
                {taskId  ? "Update Task" : "Create Task"}
              </h3>

              {taskId && (
                
                  <button 
                  onClick={deleteTask} 
                  className='flex items-center justify-center gap-1.5 text-[13px]
                  font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border
                  border-rose-100 hover:bg-rose-300 cursor-pointer'
                  >
                    <LuTrash2 className='text-base' />Delete
                  </button>
                
              )}
            </div>

            <div className='mt-4'>
              <label className='text-xs font-medium text-slate-600'>
                Task Title
              </label>
              <input 
                type="text" 
                name="title" 
                value={taskData.title} 
                onChange={handleValueChange} 
                className='w-full text-sm text-black bg-white rounded-md 
                px-2.5 py-3 mt-2 placeholder:text-gray-500 border 
                border-slate-100 outline-none'
                placeholder='Task Title'
              />
            </div>

            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'>
                Task Description
              </label>
              <textarea 
                name="description" 
                value={taskData.description} 
                onChange={handleValueChange} 
                className='w-full text-sm text-black bg-white rounded-md 
                px-2.5 py-3 mt-2 placeholder:text-gray-500 border 
                border-slate-100 outline-none'
                placeholder='Task Description'
              />
            </div>

            <div className='grid grid-col-12 gap-4 mt-2'>
              <div className='col-span-6 md:col-span-4'>
                <label className='text-xs font-medium text-slate-600'>
                  Task Priority
                </label>
                <select 
                  name="priority" 
                  value={taskData.priority} 
                  onChange={handleValueChange} 
                  className='w-full text-sm text-black bg-white rounded-md 
                  px-2.5 py-3 mt-2 placeholder:text-gray-500 border 
                  border-slate-100 outline-none'
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className='col-span-6 md:col-span-4'>
              <label className='text-xs font-medium text-slate-600'>
                Task Due Date
              </label>
              <input 
                type="date" 
                name="dueDate" 
                value={taskData.dueDate} 
                onChange={handleValueChange} 
                className='w-full text-sm text-black bg-white rounded-md 
                px-2.5 py-3 mt-2 placeholder:text-gray-500 border 
                border-slate-100 outline-none'
              />
            </div>

            <div className='col-span-12 md:col-span-3'>
              <label className='text-xs font-medium text-slate-600'>
                Assign To
              </label>
              <SelectUser
                selectedUsers={taskData.assignedTo} 
                setSelectedUsers={(users) => setTaskData({ ...taskData, assignedTo: users })}
                />
            </div>

            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'>
                Task Checklist
              </label>
              <TodoListInput 
                todoList={taskData.todoChecklist} 
                setTodoList={(list) => setTaskData({ ...taskData, todoChecklist: list })}
              />
            </div>
{/* 
            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'>
                Attachments
              </label>
              <input 
                type="file" 
                name="attachments" 
                onChange={async(e) => 
                  setTaskData({ 
                    ...taskData, 
                    attachments: [...taskData.attachments, e.target.files[0]] 
                  })} 
                className='w-full text-sm text-black bg-white rounded-md 
                px-2.5 py-3 mt-2 placeholder:text-gray-500 border 
                border-slate-100 outline-none'
              />
            </div> */}
            {
              error && (
                <p className='text-red-500 font-medium text-xs mt-5'>{error}</p>
              )
            }
            <div className='flex justify-end mt-7'>
              <button
              className='w-full flex items-center justify-center gap-1.5 
              text-xs font-medium md:text-sm font-medium text-primary 
              whitespace-nowap bg-blue-50 border border-blue-100 
              rounded-lg px-4 py-2 cursor-pointer'
              onClick={handleSubmit}
              disabled={loading}
              >
                {taskId ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashBoardLayout>
  )
}

export default CreateTask
