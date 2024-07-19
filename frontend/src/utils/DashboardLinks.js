import { ACCOUNT_TYPE } from "./contants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.AUTHOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Books",
    path: "/dashboard/my-books",
    type: ACCOUNT_TYPE.AUTHOR,
    icon: "VscBook",
  },
  {
    id: 4,
    name: "Add Books",
    path: "/dashboard/add-books",
    type: ACCOUNT_TYPE.AUTHOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Books",
    path: "/dashboard/available-books",
    type: ACCOUNT_TYPE.READER,
    icon: "VscBook",
  },
  {
    id: 6,
    name: "Top Rated",
    path: "/dashboard/top-rated",
    type: ACCOUNT_TYPE.READER,
    icon: "VscStarFull",
  },
  {
    id: 7,
    name: "Search Books",
    path: "/dashboard/search-books",
    type: ACCOUNT_TYPE.READER,
    icon: "VscSearch",
  },
  // {
  //   id: 6,
  //   name: "Purchase History",
  //   path: "/dashboard/purchase-history",
  //   type: ACCOUNT_TYPE.STUDENT,
  //   icon: "VscHistory",
  // },
//   {
//     id: 6,
//     name: "Cart",
//     path: "/dashboard/cart",
//     type: ACCOUNT_TYPE.STUDENT,
//     icon: "VscFolderOpened",
//   },
 
];
