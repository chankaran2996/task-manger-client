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