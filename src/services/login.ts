import axiosInstance from './axios';


const login = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/login', { email, password });
        const { token } = response.data; // Assuming the response contains an auth token
        sessionStorage.setItem('authToken',token);
        return response;
    } catch (error) {
        console.error('Login error:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export default login;
