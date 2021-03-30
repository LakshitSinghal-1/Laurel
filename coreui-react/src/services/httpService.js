import axios from "axios";
import {toast} from "react-toastify";

axios.interceptors.response.use(null,error =>{
    const expectedError= 
        error.response &&
        error.response.status >= 400 &&
        error.response.status <500;
    const expectedSuccess=
        axios.response &&
        axios.response.status >= 200 &&
        axios.response.status <299;
    console.log(expectedSuccess,error.response,error,axios.response);
    if (!expectedError) {
        console.log("Logging Error");
        console.log(error);
        toast.error("An unexpected error occured");
    }
    // if (expectedError) {
    //     console.log(response);
    //     toast.error("Error")
    // }

    // if (expectedSuccess) {
    //     toast.success("Success");
    // }
    console.log(axios.response);
    return Promise.reject(error);
});

export default {
    get:axios.get,
    post:axios.post,
    put:axios.put,
    delete:axios.delete
}