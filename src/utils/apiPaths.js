const Base_URL = 'http://localhost:8000/'

export const API_Paths = {
    AUTH: {
        LOGIN: `${Base_URL}api/login/`,
        REGISTER: `${Base_URL}auth/register/`,
        FORGOT_PASSWORD: `${Base_URL}auth/forgot-password/`,
        RESET_PASSWORD: `${Base_URL}auth/reset-password/`,
    },
    USER: {
        PROFILE: `${Base_URL}api/profile/`,
        UPDATE_PROFILE: `${Base_URL}user/update-profile/`,
        CHANGE_PASSWORD: `${Base_URL}user/change-password/`,
    },
    TASKS:{
        CREATE_TASK: `${Base_URL}api/task`,
        GET_TASKS: `${Base_URL}api/task`,
        GET_TASK_DETAILS: `${Base_URL}api/`,
        UPDATE_TASK: `${Base_URL}user/update-task/`,
        DELETE_TASK: `${Base_URL}user/delete-task/`,
        GET_DASHBOARD_DATA: `${Base_URL}api/task/dashboard-data`,
        GET_USER_DASHBOARD_DATA: `${Base_URL}user/dashboard/`,
    },
    ADMIN: {
        ADD_USER: `${Base_URL}api/user/addMember`,
        GET_USERS: `${Base_URL}api/user/`,
        GET_USER_DETAILS: `${Base_URL}api/user-details/`,
        UPDATE_USER: `${Base_URL}api/update-user/`,
        DELETE_USER: `${Base_URL}api/delete-user/`,
        GET_TASKS: `${Base_URL}api/get-tasks/`,
        GET_TASK_DETAILS: `${Base_URL}api/task-details/`,
        UPDATE_TASK: `${Base_URL}api/update-task/`,
        DELETE_TASK: `${Base_URL}api/delete-task/`,
    },
    UPDATE_IMG:{
        UPLOAD:`${Base_URL}api/upload-img`
    }
    
}