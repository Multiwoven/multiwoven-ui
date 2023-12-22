import axiosInstance from './axios';

const login = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/login', { email, password });
        const token:string = response.data;
        return token;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export default login;
