import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../Common/ConfirmationModal";
import { sidebarLinks } from "../../../utils/DashboardLinks";
import { logout } from "../../../services/operations/auth";

const Sidebar = () => {

  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {user} = useSelector((state) => state.auth);
  return (
    <div
      className="hidden md:flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 
    min-h-[calc(100vh-3.5rem)] bg--800 py-10"
    >
      {/* sidebar navigation links  */}
      <div className="flex flex-col gap-y-4">
        {sidebarLinks.map((link) => {
          if (user && link.type && user.accountType !== link.type) return null;

          return <SidebarLink key={link.id} link={link} iconName={link.icon} />;
        })}
      </div>

      {/* bottom border */}
      <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

      {/* setting / logout button */}
      <div className="flex flex-col gap-y-4">
        {/* <SidebarLink
          link={{ name: "Settings", path: "/dashboard/settings" }}
          iconName={"VscSettingsGear"}
        /> */}

        <button
          className="text-[1rem] leading-[1rem] font-inter font-medium text-richblack-300 py-2 px-8
transition-all duration-200 hover:bg-yellow-800 hover:scale-95"
          onClick={() =>
            setConfirmationModal({
              text1: "Are You Sure ?",
              text2: "You Will Be logged Out From Your Account",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
              customClasses: "top-[10%] left-[43%]",
              icon: "VscSignOut",
            })
          }
        >
          <div className="flex gap-2 items-center">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>
      {confirmationModal && <ConfirmationModal ModalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
