import axios from 'axios';

const instance = axios.create({
    // using Todo API provided by DummyJSON
    baseURL: 'https://dummyjson.com', // Set your base URL
});

export default instance;
