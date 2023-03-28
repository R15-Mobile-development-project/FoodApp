import axios from "axios";
//import {API_URL} from "@env";
const API_URL="http://192.168.1.108:3000"
axios.defaults.baseURL = API_URL;

export default axios;