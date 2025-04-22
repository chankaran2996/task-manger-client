import { LuClipboardCheck, LuLayoutDashboard, LuLogOut, LuSquarePlus, LuUser, LuUserPlus } from "react-icons/lu";



export const SIDE_MENU_DATA = [
    {
        id: 1,
        label: 'Dashboard',
        icon: LuLayoutDashboard ,
        path: '/admin/dashboard',
    },
    {
        id: 2,
        label: 'Manage Task',
        icon: LuClipboardCheck,
        path: '/admin/task',
    },
    {
        id: 3,
        label: 'Create Task',
        icon: LuSquarePlus ,
        path: '/admin/create-task',
    },
    {
        id: 4,
        label: 'Team Member',
        icon: LuUser,
        path: '/admin/user',
    },
    {
        id: 6,
        label:"Add Member",
        icon: LuUserPlus ,
        path: '/register',
        
    },
    {
        id: 5,
        label: 'Logout',
        icon: LuLogOut, 
        path: 'logout',
    }
];

export const USER_SIDE_MENU_DATA = [
    {
        id: 1,
        label: 'Dashboard',
        icon: LuLayoutDashboard,
        path: '/user/dashboard',
    },
    {
        id: 2,
        label: 'My Task',
        icon: LuClipboardCheck,
        path: '/user/tasks',
    },
    
    {
        id: 5,
        label: 'Logout',
        icon: LuLogOut,
        path: 'logout',
    }
]

export const USER_ROLE = [
    {
        label: 'Low',
        value: 'Low',
    },
    {
        label: 'Medium',
        value: 'Medium',
    },
    {
        label: 'High',
        value: 'High',
    },
]


export const TASK_STATUS = [
    {
        id: 1,
        label: 'Pending',
        value: 'pending',
    },
    {
        id: 2,
        label: 'In Progress',
        value: 'in-progress',
    },
    {
        id: 3,
        label: 'Completed',
        value: 'completed',
    }
]