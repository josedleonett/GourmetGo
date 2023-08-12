import { CgList } from "react-icons/cg"; 
import { MdLocalBar, MdMenuBook } from "react-icons/md"; 
import React, { useState } from "react";
import AdminDisplay from "../display/AdminDisplay";
import { RiRestaurant2Line } from "react-icons/ri";
import { BiDish } from "react-icons/bi";
import { GiPieSlice } from "react-icons/gi";
//import { useParams, useRouteMatch } from "react-router-dom";

const AdminContainer = () => {
  //const { path } = useRouteMatch();
  //const {"*"} = useParams();
  const [platesIsOpen, setPlatesIsOpen] = useState(true);
  const menuSelected = "admin"
  
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
          icon: <BiDish size="30" />,
        },
        {
          title: "Main course",
          url: "plates/mainCourse",
          icon: <RiRestaurant2Line size="30" />,
        },
        {
          title: "Dessert",
          url: "plates/dessert",
          icon: <GiPieSlice size="30" />,
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
  ];
  return <AdminDisplay sidebarMenu={sidebarMenu} menuSelected={menuSelected}/>;
};

export default AdminContainer;
