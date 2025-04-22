import { API_Paths } from "./apiPaths";

export const login = async (email, password) => {
    try {
        const response = await fetch(API_Paths.AUTH.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        });
    
        if (!response.status === 200) {
        throw new Error('Login failed');
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export const getDashboardData = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await fetch(API_Paths.TASKS.GET_DASHBOARD_DATA, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const addUser = async (username, email, profilePic, adminInviteToken) => {
    console.log(username, email, profilePic, adminInviteToken)
    try {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            throw new Error('No token found');
        }
        const response = await fetch(API_Paths.ADMIN.ADD_USER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({username, email, profilePic, adminInviteToken}),
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const getUsers = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await fetch(API_Paths.ADMIN.GET_USERS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const uploadIng = async (img) => {
    try {
        const response = await fetch(API_Paths.UPDATE_IMG.UPLOAD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: img }), // Assuming the backend accepts a JSON object with the image
        });

        if (!response) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(response) // Parse the JSON response
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const createingTask = async (taskData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await fetch(API_Paths.TASKS.CREATE_TASK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) {
            throw new Error('Failed to create task');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const getTaskS = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await fetch(API_Paths.TASKS.GET_TASKS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const getTaskById = async (taskId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await fetch(`${API_Paths.TASKS.GET_TASK_DETAILS}/${taskId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch task details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const updateTaskById = async (taskId, taskData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await fetch(`${API_Paths.TASKS.UPDATE_TASK}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}