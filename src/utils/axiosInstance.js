// Axios instance to handle dealing with backend requests
import axios from 'axios';

import {handleApiError} from './apiErrorHandler'

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

        return Promise.reject(handleApiError(error));
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle response errors
        const errorMessage = handleApiError(error);
        return Promise.reject(new Error(errorMessage));
    }
);

export default instance;
