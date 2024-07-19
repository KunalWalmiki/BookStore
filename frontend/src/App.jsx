import './App.css'
import Navbar from './components/Common/Navbar'
import { Routes, Route } from 'react-router-dom'
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import PrivateRoute from './components/core/PrivateRoute';
import { useSelector } from 'react-redux';
import MyProfile from './components/core/Dashboard/MyProfile';
import Dashboard from './Pages/Dashboard';
import { ACCOUNT_TYPE } from './utils/contants';
import AvailableBooks from './components/core/Dashboard/AvailableBooks';
import TopRatedbooks from './components/core/Dashboard/TopRatedbooks';
import SearchBooks from './components/core/Dashboard/SearchBooks';

function App() {

  const {user} = useSelector((state) => state.auth);

  return (
    <>
         <div className="w-screen min-h-screen flex flex-col bg-richblack-900 font-inter">
             <Navbar/>
             <Routes>
                  <Route path='/signin' element={<Signin/>}/>
                  <Route path='/signup' element={<Signup/>}/>
                  <Route element={
                    <PrivateRoute>
                      <Dashboard/>
                    </PrivateRoute> 
                  }>
                      <Route path="/dashboard/my-profile" element={<MyProfile/>}/>

                      {
                         user?.accountType === ACCOUNT_TYPE.AUTHOR && (
                             <>
                                {/* <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                                <Route path="/dashboard/cart" element={<Cart/>}/> */}
                             </>
                         )
                      }
                      
                      {
                         user?.accountType === ACCOUNT_TYPE.READER && (
                             <>
                                                      <Route path="/dashboard/available-books" element={<AvailableBooks/>}/>
                                                      <Route path="/dashboard/top-rated" element={<TopRatedbooks/>}/>
                                                      <Route path="/dashboard/search-books" element={<SearchBooks/>}/>
                             </>
                         )
                      }
                    </Route>
             </Routes>
          </div>
    </>
  )
}

export default App
