export const handleApiError = (error) => {
    if (error.response) {
        const { status, data } = error.response;
        console.error(`Server responded with an error status: ${status}`);
        console.error('Error data:', data);

        // Handle specific error scenarios
        if (status === 401) {
            console.error('Unauthorized error:', data);
            // Handle 401 Unauthorized (e.g., redirect to login)
        }
        
        return error.response?.data?.message || 'An unexpected error occurred'

    } else if (error.request) {
        console.error('No response received from the server:', error.request);
    } else {
        console.error('Error setting up the request:', error.message);
    }

    return error;
};
