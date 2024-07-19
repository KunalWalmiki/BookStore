import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { login } from '../../services/operations/auth';

const SigninForm = ({btnText}) => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      }

    function submitHandler(event) {
        event.preventDefault();
    
        // console.log("form Data->", formData);
    
        const signinData = {
          ...formData,
        }

        if(signinData) {

            dispatch(login(signinData, navigate, dispatch));
            
        }
    
        setFormData({
          email: "",
          password: "",
        });
    
    
      }

  return (
    <div>
          <p
            className="text-4xl font-medium font-mono text-center mb-3"
            >
                Login
            </p>
       <form onSubmit={submitHandler}>
       <div className="mb-10 md:mb-0 mt-5 w-[400px]">
       <div className="mt-3">
            <label htmlFor="email" className="text-richblack-5">
              Email Address<sup className="text-[#b91c1c]">*</sup>
              <br></br>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter Email"
                onChange={changeHandler}
                className="w-full text-white mt-1 bg-slate-800 py-2 px-4 rounded-md border-[1px]
border-slate-400"
              />
            </label>
        </div>

          {/* password feild */}
          <div className="flex mt-4 gap-4 ">
            <label htmlFor="password" className="text-richblack-5 relative w-full">
              Password<sup className="text-[#b91c1c]">*</sup>
              <br></br>
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                value={formData.password}
                placeholder="Enter Password"
                onChange={changeHandler}
                className="w-full mt-1 bg-slate-800 py-2 px-4 rounded-md border-[1px]
   border-slate-700 text-white"
              />
              <span
                className="absolute right-2 top-10 text-lg text-slate-100"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </label>

          </div>

          {/* button */}
          <div className="flex mt-5">
            <button className="bg-yellow-400 font-medium text-xl text-black py-2 px-5 w-full rounded-md transition-all duration-200 hover:bg-yellow-500">
              {btnText}
            </button>
         </div>
         </div>
       </form>
    </div>
  )
}

export default SigninForm
