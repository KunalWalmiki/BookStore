import React from 'react'
import * as Icons from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { Link, useLocation, matchPath} from 'react-router-dom';

const SidebarLink = ({link, iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const routeMatch = (route) => {

        return matchPath({path:route}, location.pathname);

    }
     
  return (
            <Link
            to={link.path}
            className={`relative px-8 py-2 text-sm font-medium transition-all duration-200 hover:bg-yellow-800
            hover:scale-95
            ${routeMatch(link.path) ? "bg-yellow-800" : "bg-opacity-0"}`}
            >
                 {/* left yellow border */}
                <span
                className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
                ${routeMatch(link.path) ? "opacity-100" : "opacity-0"}
                `}></span> 

                 <div className='flex item-center gap-x-2'>
                        <Icon
                        className={`${routeMatch(link.path) ? "text-yellow-50" : "text-richblack-300"} text-lg`}
                        />
                        <span
                        className={`${routeMatch(link.path) ? "text-yellow-50" : "text-richblack-300"}
                        text-[1rem] leading-[1rem] font-inter font-medium`}
                        >{link.name}</span>
                </div>

            </Link>
          )
}

export default SidebarLink
