import { Box } from "@mui/material";
import AdminPanelDrawerContainer from "../../components/container/AdminPanelDrawerContainer";
import AdminPanelMainContainer from "../../components/container/AdminPanelMainContainer";

const AdminDisplay = ({sidebarMenu}) => {



  return (
    <>
      <Box sx={{ display: "flex" }}>

        <AdminPanelDrawerContainer sidebarMenuList={sidebarMenu}/>

        <AdminPanelMainContainer/>

        
      </Box>
    </>
  );
};

export default AdminDisplay;
