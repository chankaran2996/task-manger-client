import React from 'react'
import { useUserAuth } from '../hooks/useUserAuth'
import DashBoardLayout from '../components/DashBoardLayout';

const UserDashboard = () => {
  useUserAuth();
  return (
    <DashBoardLayout activeMenu={"Dashboard"}>
      UserDashboard
    </DashBoardLayout>
  )
}

export default UserDashboard
