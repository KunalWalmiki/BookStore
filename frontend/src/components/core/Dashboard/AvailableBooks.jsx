import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllBooks } from '../../../services/operations/readersBook';

const AvailableBooks = () => {

    const { token } = useSelector((state) => state.auth);
    const [availableBooks, setAvailableBooks] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {

    const getAvailableBooks = async () => {

      try {

        const response = await getAllBooks(token);

        console.log("response ->", response);
        if (response) setAvailableBooks(response);

      } catch (error) {
        console.log("Unable to fetch Enrolled Course");
      }

    };

    getAvailableBooks();

  }, []);

  console.log(availableBooks);

  return (
    <div className="w-screen min-h-[calc(100vh-3.5rem)]">
      {/*route*/}
      <div className="mt-10 md:-mt-5">
        <p className="text-[1rem] leading-[2rem] font-inter font-medium text-richblack-300">
          {`Home`} <span className="text-richblack-500">/</span> {`Dashboard`}{" "}
          <span className="text-richblack-500">/</span>{" "}
          <span className="text-black">{`Available Books`}</span>
        </p>
      </div>

      <p className="font-inter font-semibold text-[1.5rem] leading-[2rem] text-richblack-5 mt-5">
        Availabe Books
      </p>
      {!availableBooks ? (
        <div
          className="md:min-h-[calc(100vh-56px)] md:max-w-[calc(100wh-223px)]
                    flex items-center justify-center"
        >
          <Spinner />
        </div>
      ) : !availableBooks.length ? (
        <div className="h-[300px] md:w-[900px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-y-5">
          <p
          className="text-xl text-center lg:text-2xl font-inter font-medium text-richblack-100"
          >No Books Available</p>
          </div>
         

          </div>
      ) : (
        <div className="md:px-5 py-10 md:max-w-[900px] grid">
          <div className="flex gap-5 text-richblack-5 py-2 px-5 justify-between items-center bg-richblack-700 rounded">
            <p
            className="font-inter text-sm md:text-[1rem] leading-[1.5rem] font-medium"
            >Book Name</p>

            <div className="flex items-center gap-x-12 md:gap-x-28">
              <p
              className="font-inter text-sm md:text-[1rem] leading-[1.5rem] font-medium"
              >Author</p>

              <p
              className="font-inter  text-sm md:text-[1rem] leading-[1.5rem] font-medium"
              >Price</p>

<p
              className="font-inter  text-sm md:text-[1rem] leading-[1.5rem] font-medium"
              >Rating</p>
            </div>
          </div>

          {/* book Cards */}
          <div className="border-[1px] border-richblack-500">
            {availableBooks.map((book, index) => {
              return (
                <div key={index} className="flex items-center justify-between py-2 px-3 border-b-[1px]
                border-richblack-500 cursor-pointer">
                  <div 
                //   onClick={() => {
                //     navigate(
                //       `/view-course/${course?._id}/section/${course.courseContent[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                //     )
                //   }}
                  
                  className="flex flex-col  items-start md:flex-row md:items-center justify-center ">
                    <img 
                     src={book.cover}
                     alt={`${book.title}`} 
                     height={200}
                     width={200}
                     className="rounded min-h-[70px] md:min-h-[100px] shadow-sm shadow-richblack-900"
                     />
                    <div className="px-2 md:max-w-[400px]">
                      <p
                      className="text-[1rem] leading-[2rem] font-inter text-richblack-5"
                      >{book.title}</p>
                      <p
                      className="text-sm font-inter text-richblack-100"
                      >{book.description}</p>
                    </div>
                  </div>

                  <div className="flex px-5 gap-x-5 md:gap-x-24">
                    <div
                    className="text-sm font-inter text-richblack-100"
                    >{book.author.firstName} {book.author.lastName}</div>

                    <div>
                      <p
                      className="text-sm font-inter text-richblack-100"
                      > {book.price} Rs</p>
                    </div>

                    <div>
                      <p
                      className="text-sm font-inter text-richblack-100"
                      > {book?.ratingAndReview?.rating || 0}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
       )} 
      
    </div>
  )
}

export default AvailableBooks
