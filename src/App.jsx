import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './routes/PrivateRoute'
import AdminDashboard from './pages/AdminDashboard'
import ManageTask from './pages/ManageTask'
import CreateTask from './pages/CreateTask'
import ManageUser from './pages/ManageUser'
import UserDashboard from './pages/UserDashboard'
import MyTask from './pages/MyTask'
import ViewTaskDetalis from './pages/ViewTaskDetalis'
import { ContextProvider } from './context/UserContext'
import { UserContext } from './context/UserContext'

const App = () => {
  return (
    <ContextProvider>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          {/* Admin route */}
          <Route element={<PrivateRoute allowRoles={["admin"]} />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/task' element={<ManageTask />} />
            <Route path='/admin/create-task' element={<CreateTask />} />
            <Route path='/admin/user' element={<ManageUser />} />
          </Route>
          {/* user route */}
          <Route element={<PrivateRoute allowRoles={["admin"]} />}>
            <Route path='/user/dashboard' element={<UserDashboard />} />
            <Route path='/user/tasks' element={<MyTask />} />
            <Route path='/user/task-detials/:id' element={<ViewTaskDetalis />} />
            {/* <Route path='/admin/user' element={<ManageUser />} /> */}
          </Route>

          <Route path='/' element={<Root />} />
        </Routes>
      </BrowserRouter>
    </div>
    </ContextProvider>
  )
}

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <Outlet />;
  }

  if(!user) {
    return <Navigate to='/login' />;
  }

  return user.role === 'admin' ? <Navigate to='/admin/dashboard' /> : <Navigate to='/user/dashboard' />;
}
