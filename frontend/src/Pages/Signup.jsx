import React from 'react'
import SignUpForm from '../components/core/signupForm'



const Signup = () => {
  return (
    <div className='w-screen h-screen mt-10'>
    <div className='w-10/12 mx-auto flex items-center justify-center'>
    <SignUpForm btnText={"Sign up"}/>
    </div>
    </div>
  )
}

export default Signup
