import { FaUserFriends } from "react-icons/fa"; 
import { CgList } from "react-icons/cg"; 
import { MdLocalBar, MdMenuBook } from "react-icons/md"; 
import { useState } from "react";
import AdminDisplay from "../display/AdminDisplay";
import { RiRestaurant2Line } from "react-icons/ri";
import { BiDish } from "react-icons/bi";
import { GiPieSlice } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { AiOutlineCheckCircle } from 'react-icons/ai';

const AdminContainer = () => {
  const mainUrl = useLocation();
  const [platesIsOpen, setPlatesIsOpen] = useState(true);
  const [menuSelected, setMenuSelected] = useState("admin");
  
  const sidebarMenu = [
    {
      title: "Bundles",
      url: "bundles",
      icon: <RiRestaurant2Line size="30" />,
    },

    {
      title: "Plates",
      icon: <MdMenuBook size="30" />,
      onCLick: () => setPlatesIsOpen(!platesIsOpen),
      isOpen: platesIsOpen,
      children: [
        {
          title: "Starter",
          url: "plates/starter",
          icon: <BiDish size="20" />,
        },
        {
          title: "Main course",
          url: "plates/mainCourse",
          icon: <RiRestaurant2Line size="20" />,
        },
        {
          title: "Dessert",
          url: "plates/dessert",
          icon: <GiPieSlice size="20" />,
        },
      ],
    },

    {
      title: "Drinks",
      url: "drinks",
      icon: <MdLocalBar size="30" />,
    },

    {
      title: "Categories",
      url: "categories",
      icon: <CgList size="30" />,
    },
    
    {
      title: "User",
      url: "user",
      icon: <FaUserFriends size="30" />,
    },
    // {
    //   title: "Characteristic",
    //   url: "characteristic",
    //   icon: <AiOutlineCheckCircle size="30" />,
    // },
  ];

  return <AdminDisplay sidebarMenu={sidebarMenu} menuSelected={menuSelected}/>;
};

export default AdminContainer;
