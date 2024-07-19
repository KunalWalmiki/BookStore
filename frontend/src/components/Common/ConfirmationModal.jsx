import React from 'react'
import IconBtn from './IconBtn'
import * as Icons from 'react-icons/vsc';

const ConfirmationModal = ({ModalData}) => {

  const iconName = ModalData?.icon;
  
  console.log("iconName", iconName);
  
  const Icon = Icons[iconName]
 
  return (
    <div className={`fixed  inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white  bg-opacity-10 backdrop-blur-sm `}>
        
         <div className='flex flex-col gap-y-8 items-center w-11/12 max-w-[450px] rounded-lg border border-richblack-400 bg-slate-800 p-6 text-white'>
             <p
             className='text-richblack-200 text-[1.5rem] leading-[1.7rem] font-inter font-semibold '
             >{ModalData?.text1}</p>
             <p
             className='text-richblack-200 text-[1rem] leading-[1rem] font-inter font-medium'
             >{ModalData?.text2}</p>

             <div className='flex items-center gap-x-6'>
 
                    <button 
                    className='bg-yellow-50 text-black px-3 py-1 rounded trasition-all 
                    duration-200 hover:scale-95 font-semibold font-inter text-[1rem]'
                    onClick={ModalData?.btn1Handler}>
                      <div className='flex items-center gap-1'>
                          {iconName && <Icon/>}
                           {ModalData?.btn1Text}
                      </div>     
                     </button>

                   <button 
                   className='bg-richblack-900 text-richblack-100 px-5 py-1 rounded trasition-all 
                   duration-200 hover:scale-95 font-semibold font-inter text-[1rem] bg-yellow-600 text-black'
                   onClick={ModalData?.btn2Handler}>
                      {ModalData?.btn2Text}
                   </button>


                  
             </div>
             
         </div>
         
    </div>
  )
}

export default ConfirmationModal
