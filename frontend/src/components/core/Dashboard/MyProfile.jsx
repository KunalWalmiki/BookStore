import React from 'react'
import { useSelector } from 'react-redux'

const MyProfile = () => {

    const {user} = useSelector((state) => state.auth);
    console.log(user);
  return ( 
    <div className='w-screen h-full'>
        <p
        className='text-xl font-medium'
        >
           Hello! welcome to Your Profile {user.firstName} {user.lastName}
        </p>
    </div>
  )
}

export default MyProfile
