import React from 'react'
import SigninForm from '../components/core/SigninForm'


const Signin = () => {

  return (
    <div className='w-screen h-full mt-20'>
        <div className='w-10/12 mx-auto flex items-center justify-center'>
        <SigninForm btnText={"Sign In"}/>
        </div>
    </div>
  )
}

export default Signin
