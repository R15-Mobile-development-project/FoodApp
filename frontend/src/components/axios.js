// Import the axios library for making HTTP requests
import axios from "axios";

// Import the API_URL constant from the environment configuration
import {API_URL} from "@env";

// Configure axios to use the API_URL as the base URL for all requests
axios.defaults.baseURL = API_URL;

// Export axios as the default export for this module
export default axios;
