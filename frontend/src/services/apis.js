const BASE_URL = import.meta.env.VITE_APP_BASE_URL;


export const authEndPoint = {
    SIGNUP_API : BASE_URL + "/auth/signup",
    SIGNIN_API : BASE_URL + "/auth/signin",
}

export const ReadersBookEndPoint = {
    GET_ALL_BOOKS_API : BASE_URL + "/book/getAllBooks",
    GET_TOP_RATED_BOOKS_API : BASE_URL + "/book/topRated",
    GET_BOOKS_BY_AUTHOR_API : BASE_URL + "/book/getAuthorBooks",
    GET_BOOKS_BY_GENRE_API : BASE_URL + "/book/getBooksByGenre",
    GET_BOOK_BY_TITLE_API : BASE_URL + "/book/getBooksByTitle",
    GET_FILTER_BOOKS_API : BASE_URL + "/book/getFilterBooks",
    GET_BOOK_DETAILS_API : BASE_URL + "/book/getBookDetails",
}