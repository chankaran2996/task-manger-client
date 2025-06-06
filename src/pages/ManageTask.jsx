import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../components/DashBoardLayout'
import { useNavigate } from 'react-router-dom';
import { getTaskS } from '../utils/apiCall';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '../components/TaskStatusTabs';
import TaskCard from '../components/TaskCard';

const ManageTask = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tab, setTab] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const responce= await getTaskS();
      if (responce) {
        console.log("All tasks:", responce);
        setAllTasks(responce?.tasks?.length > 0 ? responce.tasks: []);

        const StatusSummary = responce.statusSummary || {};
        console.log("Status summary:", StatusSummary);

        const statusArray = [
          { name: "All", count: responce.tasks.length },
          { name: "Created", count: StatusSummary.createdTask || 0 },
          { name: "In Progress", count: StatusSummary.inProgressTask || 0 },
          { name: "Completed", count: StatusSummary.completedTask || 0 },
        ];

        setTab(statusArray);
        setFilterStatus("All");
      } else {
        console.log("Error fetching tasks:", responce.message);
      }
    } catch (error) {
      
    }
  }

  const handileDownReport = () => {}

  const handleTabClick = (status) => {
    setFilterStatus(status);
    setAllTasks(allTasks.filter((task) => task.status === status));
  }

  const handileClick = (taskdata) => {
    navigate("/admin/create-task", { state: {taskId: taskdata._id }});
  }
 
  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <DashBoardLayout activeMenu={"Manage Task"}>
      <div className='my-5'>
        <div className='flex flex-col md:flex-row justify-between md:items-center'>
          <div className='flex items-center justify-between gap-3'>
            <h2 className='text-xl md:text-xl font-medium'> My Task</h2>

            <button
            className='flex w-full lg:hidden flex items-center justify-center gap-1.5 
            text-xs font-medium md:text-sm font-medium text-primary 
            whitespace-nowap bg-blue-50 border border-blue-100 rounded-lg px-4 
            py-2 cursor-pointer'
            onClick={handileDownReport}
            >
              <LuFileSpreadsheet />
              Download Report
            </button>
          </div>

          {
            allTasks?.length > 0 && (
              <div className='flex items-center gap-3'>
                <TaskStatusTabs
                tab={tab}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                // allTasks={allTasks}
                // setAllTasks={setAllTasks}
                />

            <button
            className='hidden lg:flex items-center justify-center gap-1.5 
            text-xs font-medium md:text-sm font-medium text-primary 
            whitespace-nowap bg-blue-50 border border-blue-100 rounded-lg px-4 
            py-2 cursor-pointer'
            onClick={handileDownReport}
            >
              <LuFileSpreadsheet />
              Download Report
            </button>
              </div>
            )
          }
        </div>

        <div className='mt-5'>
          {
            allTasks?.map((task ) => (
              <TaskCard
                key={task._id}
                task={task.title}
                description={task.description}
                priority={task.priority}
                createdAt={task.createdAt}
                status={task.status}
                progress={task.progress}
                dueDate={task.dueDate}
                assingedTo={task.assignedTo}
                complectedCount={task.completedCount || 0}
                todoCheckList={task.todoCheckList || 0}
                handleClick={() => handileClick(task)}

                />
            )
          )
          }
        </div>
      </div>
    </DashBoardLayout>
  )
}

export default ManageTask
