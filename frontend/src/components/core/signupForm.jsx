import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ACCOUNT_TYPE } from "../../utils/contants";
import Tab from "./Tab";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/operations/auth";


const SignUpForm = ({ btnText }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.AUTHOR);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

    const signupData = {
      ...formData,
      accountType,
    }

    if(signupData) {

        signup(signupData, navigate)
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });


  }

  const tabData = [
    {
        id : 1,
        name : "Author",
        type : ACCOUNT_TYPE.AUTHOR,
    },
    {
        id : 2,
        name : "Reader",
        type : ACCOUNT_TYPE.READER,
    }
  ]

  return (
    <div>
         <p
            className="text-4xl font-medium font-mono text-center mb-3"
            >
                Sign up
            </p>
         {/* tab */}
       <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

      <form onSubmit={submitHandler}>
        <div className="mb-10 md:mb-0 mt-5">
           
          <div className="flex md:flex-row gap-4 md:items-center">
            {/* firstname field */}
            <label htmlFor="first Name" className="text-richblack-5">
              First Name<sup className="text-[#b91c1c]">*</sup>
              <br></br>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="Enter First Name"
                onChange={changeHandler}
                className="w-full text-white mt-1 bg-slate-800 py-2 px-4 rounded-md border-[1px]
border-slate-400"
              />
            </label>

            {/* lastName field */}
            <label htmlFor="last Name" className="text-richblack-5">
              Last Name<sup className="text-[#b91c1c]">*</sup>
              <br></br>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Enter Last Name"
                onChange={changeHandler}
                className="w-full  text-white mt-1 bg-slate-800 py-2 px-4 rounded-md border-[1px]
border-slate-400"
              />
            </label>
          </div>

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
          <div className="flex mt-2 gap-4 ">
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
  );
};

export default SignUpForm;
