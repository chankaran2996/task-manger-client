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
    
}