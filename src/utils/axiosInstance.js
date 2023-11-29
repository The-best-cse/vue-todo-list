// Axios instance to handle dealing with backend requests
import axios from 'axios';

const instance = axios.create({
    // using Todo API provided by DummyJSON
    baseURL: 'https://dummyjson.com', // Set your base URL
    timeout: 5000, // Set a timeout for requests (in milliseconds)
});

// Interceptors for request and response
instance.interceptors.request.use(
    (config) => config,
    (error) => {
        // Handle request errors
        console.error('Error during request:', error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle response errors
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        return Promise.reject(new Error(errorMessage));
    }
);

export default instance;
