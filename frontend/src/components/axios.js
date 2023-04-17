import axios from "axios";
import {API_URL} from "@env";

axios.defaults.baseURL = API_URL;

export default axios;
