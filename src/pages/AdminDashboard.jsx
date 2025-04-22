import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../hooks/useUserAuth'
import js from '@eslint/js';
import { UserContext } from '../context/UserContext';
import DashBoardLayout from '../components/DashBoardLayout';
import { useNavigate } from 'react-router-dom';
import { getDashboardData } from '../utils/apiCall';
import moment from 'moment';
import InfoCard from '../components/InfoCard';
import { IoMdCard } from 'react-icons/io';
import { addThousandSeparator } from '../utils/helper';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../components/TaskListTable';
import CustomPieChart from '../components/CustomPieChart';
import CustomBarChart from '../components/CustomBarChart';

const AdminDashboard = () => {
  useUserAuth();

   const { user } = useContext(UserContext);
    // console.log(user)
   const navigate = useNavigate();

   const [DashboardData, setDashboardData] = useState(null);
   const [pieChartData, setPieChartData] = useState([]);
   const [barChartData, setBarChartData] = useState([]);

   const COLORS = ['#8051FF', '#00B8DB', '#7BCE00'];


   const preparePieChartData = (data) => {
    const taskDistribution = data?.charts?.taskDistributionButton || null;
    const taskProirityLevels = data?.charts?.taskPrioritiesLevel || null;

    const taskDistributionData = [
      { name: 'Created', value: taskDistribution?.created || 0 },
      { name: 'In Progress', value: taskDistribution?.Inprogress || 0 },
      { name: 'Completed', value: taskDistribution?.complected || 0 },
    ];

    setPieChartData(taskDistributionData);

    const taskPriorityData = [
      { name: 'High', value: taskProirityLevels?.High || 0 },
      { name: 'Medium', value: taskProirityLevels?.Medium || 0 },
      { name: 'Low', value: taskProirityLevels?.Low || 0 },
    ];

    setBarChartData(taskPriorityData);

   }

   const getDashboar = async () => {
    try {
      const response = await getDashboardData();
      // console.log(response)
      // const data = await response.json();
      // console.log(data)
      if(response){
        preparePieChartData(response);
        setDashboardData(response);

      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }
  

  const onSeeMore = () => {
    navigate('/admin/task')
  }


  useEffect(() => {
    getDashboar()
    return () =>{}
  },[]  );

  // if(!user) {
  //   return <div>Loading....</div>;
  // }
  return (
    <DashBoardLayout activeMenu={"Dashboard"}>
      <div className='bg-white p-6 rounded-2xl shadow-md border border-black my-5'>
        <div>
          <div className='col-span-3'>
            <h2 className='text-xl '>
              Hi Welcome {user?.username}
            </h2>
            <p className='text-xs text-gray-400'>
              {
                moment().format('dd Do MM YYYY')
              }
            </p>
          </div>
        </div>
        
        <div 
        className='grid grid-cols-2 sm:grid-cols-2 
        md:grid-cols-4 md:gap-6 gap-3 mt-5'>
          <InfoCard 
            label='Total Users'
            value={
              addThousandSeparator(
                DashboardData?.charts?.taskDistributionButton?.All || 0 
              )
            }
            color='bg-primary'
          />

          <InfoCard 
            label='Created Tasks'
            value={
              addThousandSeparator(
                DashboardData?.charts?.taskDistributionButton?.created || 0 
              )
            }
            color='bg-violet-500'
          />

          <InfoCard 
            label='In progress Tasks'
            value={
              addThousandSeparator(
                DashboardData?.charts?.taskDistributionButton?.Inprogress || 0 
              )
            }
            color='bg-cyan-500'
          />

          <InfoCard 
            label='complected Tasks'
            value={
              addThousandSeparator(
                DashboardData?.charts?.taskDistributionButton?.complected || 0 
              )
            }
            color='bg-lime-500'
          />
        </div>
      </div>
      
      <div 
      className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>

        <div>
          <div 
          className='bg-white p-6 rounded-2xl 
          shadow-md border border-gray-200/50'>
            <div className='flex items-center justify-between'>
              <h5 className='font-medium'>Task Distribution</h5>
            </div>

            <CustomPieChart 
            pieChartData={pieChartData}
            // label="Total Balance"
            colors={COLORS}
            />
          </div>
        </div>

        <div>
          <div 
          className='bg-white p-6 rounded-2xl 
          shadow-md border border-gray-200/50'>
            <div className='flex items-center justify-between'>
              <h5 className='font-medium'>Task Pirotity Lavels</h5>
            </div>

            <CustomBarChart 
            barChartData={barChartData}
            />
          </div>
        </div>

        <div className='md:col-spam-2'>
            <div className=''>
              <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Resnt Tasks</h5>

                <button 
                className='flex items-center justify-center gap-3 text-[12px] 
                font-medium text-gray-700 hover:text-primary bg-gray-50 
                hover:bg-blue-50 px-4 py-1.5 rounded-lg border 
                border-gray-200/50 cursor-pointer'
                onClick={onSeeMore}
                >
                  See All <LuArrowRight className='text-base' />
                </button>
              </div>

              <TaskListTable tableData={DashboardData?.recentTasks || []} />
            </div>
        </div>
      </div>
    </DashBoardLayout>
  )
}

export default AdminDashboard
