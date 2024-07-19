import { setToken, setUser } from "../../slices/userSlice";
import { apiConnector } from "../apiConnector";
import { authEndPoint } from "../apis";
import toast from "react-hot-toast";

const {

    SIGNIN_API,
    SIGNUP_API,

} = authEndPoint

export const signup = async(formData, navigate) => {

    const toastId = toast.loading("Loading...!");

    try {

        const response = await apiConnector("POST", SIGNUP_API, formData);

        if(!response?.data?.success) {

            throw new Error(response?.data?.message);

        }

        toast.success("Account Created Successfuly");
        navigate("/signin");


    } catch(error) {

        console.log(error);
        toast.error(error?.response?.data?.message);

    }

    toast.dismiss(toastId);

}

export const login = (formData, navigate, dispatch) => {

    return async(dispatch) => {

        const toastId = toast.loading("Loading...!");
        try {

            const response = await apiConnector("POST", SIGNIN_API, formData);
    
            if(!response?.data?.success) {
    
                throw new Error(response?.data?.message);
    
            }

            navigate("/dashboard/my-profile");
            toast.success("Logged In Successfuly");
            console.log(response);
            localStorage.setItem('token', response?.data?.token);
            dispatch(setToken(response?.data?.token));
            dispatch(setUser(response?.data?.user));
            localStorage.setItem('user', JSON.stringify(response?.data?.user));
        
    
        } catch(error) {
    
            console.log(error);
            toast.error(error?.response?.data?.message);
    
        }

        
        toast.dismiss(toastId);
    }

}

export const logout = (navigate, dispatch) => {

    localStorage.setItem("token", null);
    localStorage.setItem("user", null);
    dispatch(setToken(null));
    dispatch(setUser(null));
    toast.success("Logged Out Successfuly");
    navigate("/signin");

}