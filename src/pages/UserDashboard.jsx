import React from 'react'
import { useUserAuth } from '../hooks/useUserAuth'
import DashBoardLayout from '../components/DashBoardLayout';

const UserDashboard = () => {
  useUserAuth();
  return (
    <DashBoardLayout>
      UserDashboard
    </DashBoardLayout>
  )
}

export default UserDashboard
