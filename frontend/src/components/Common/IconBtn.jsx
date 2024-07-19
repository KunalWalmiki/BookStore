import React from 'react'
import * as Icons from "react-icons/lu";

const IconBtn = ({
    text,
    children,
    onclick,
    disabled,
    outline = false,
    customClasses,
    type,
    icon,
    flexDirection,
    gap,
}) => {

   const Icon = Icons[icon];

  return (
            <button
            disabled={disabled}
            onClick={onclick}
            type={type}
            className={`${customClasses} px-3 py-1 rounded trasition-all duration-200 hover:scale-95 font-semibold font-inter text-[1rem]`}
            >
                    {
                        children ? (
                            <>
                            <div className={`flex ${flexDirection} items-center ${gap ? `${gap}` : "gap-2"}`} >
                             <span>
                                {text}
                             </span>

                            <span>
                                {
                                    icon &&
                                    <Icon className="text-lg"/>
                                }   
                             </span>

                            <span>
                             {children}
                             </span>
                             
                            </div>
                            
                             
                            </>
                        )
                        : (
                            <span>{text}</span>
                            )
                    }

            </button>
  )
}

export default IconBtn
