import axios from "axios";

const instance = axios.create({
    baseURL: "", //there would be base url for axios
});

export default instance;
