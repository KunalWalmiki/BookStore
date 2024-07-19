import React from 'react'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../services/operations/auth'


const Navbar = () => {
    
    const {token} = useSelector((state) => state.auth);
    console.log(token);
    const navigate = useNavigate();
    const disptach = useDispatch();

  return (
    <div className='w-screen h-[70px] bg-black text-white'>
        <div className='w-10/12 h-full mx-auto flex items-center justify-between'>
           <div>
            <h3
            className='text-3xl font-medium font-mono'
            >BookStore</h3>
           </div>

           <div className='flex items-center gap-x-4'>
            {
                !token ? (
                    <>
                    <Link to={"/signin"}>
                    <Button title={"Signin"}/>
                    </Link>
                    <Link to={"/signup"}>
                    <Button title={"Signup"}/>
                    </Link>
                    </>
                ) :
                (
                    <Button title={"Logout"} onclick={() => logout(navigate, disptach)}/>
                )
                 
                
            }
           </div>
        </div>
    </div>
  )
}

export default Navbar
