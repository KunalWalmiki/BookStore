import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { ReadersBookEndPoint } from "../apis";

const {
    GET_ALL_BOOKS_API,
    GET_TOP_RATED_BOOKS_API,
    GET_BOOK_BY_TITLE_API
} = ReadersBookEndPoint

export const getAllBooks = async() => {

    const toastId = toast.loading("Loading...!");
    let result = [];
    try {

        const response = await apiConnector("GET", GET_ALL_BOOKS_API, null, {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
        });

        if(!response?.data?.success) {

            throw new Error(response?.data?.message);

        }

        result = response?.data?.books;
        toast.success(response?.data?.message);

    } catch(error) {

        console.log(error);
        toast.error(error?.response?.data?.message);

    }

    toast.dismiss(toastId);
    return result;

}

export const getTopRatedBooks = async() => {

    const toastId = toast.loading("Loading...!");
    let result = [];
    try {

        const response = await apiConnector("GET", GET_TOP_RATED_BOOKS_API, null, {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
        });

        if(!response?.data?.success) {

            throw new Error(response?.data?.message);

        }

        result = response?.data?.topRatedBooks;
        toast.success(response?.data?.message);

    } catch(error) {

        console.log(error);
        toast.error(error?.response?.data?.message);

    }

    toast.dismiss(toastId);
    return result;

}

export const searchBookByTitle = async(value) => {

    const toastId = toast.loading("Loading...!");
    let result = [];
    try {

        const response = await apiConnector("GET", GET_BOOK_BY_TITLE_API +"?title="+value, null, {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
        });

        if(!response?.data?.success) {

            throw new Error(response?.data?.message);

        }

        result = response?.data?.books;
        toast.success(response?.data?.message);

    } catch(error) {

        console.log(error);
        toast.error(error?.response?.data?.message);

    }

    toast.dismiss(toastId);
    return result;

}
