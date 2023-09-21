import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Collapse, ListSubheader, Stack } from "@mui/material";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { NavLink } from "react-router-dom";

const AdminPanelDrawerDisplay = ({sidebarMenuList}) => {

    const minDrawerWidth = "230px";
    const maxDrawerWidth = "360px";
  
  return (
    <Drawer
          variant="permanent"
          PaperProps={{
            style: {
              position: "inherit",
            },
          }}
        >
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItemText sx={{ textAlign: "center" }}>
                ADMIN PANEL
              </ListItemText>
            </List>
            <Divider />
            <List
              sx={{
                minWidth: minDrawerWidth,
                maxWidth: maxDrawerWidth,
                bgcolor: "background.paper",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  ADMIN PANEL
                </ListSubheader>
              }
            >
              {sidebarMenuList.map((menuItem, index) => (
                <Stack key={index}>
                  <ListItemButton
                    key={index}
                    to={menuItem.url || null}
                    LinkComponent={NavLink}
                    onClick={menuItem.children ? menuItem.onCLick : null}
                  >
                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                    <ListItemText primary={menuItem.title} />
                    {menuItem.children &&
                      (menuItem.isOpen ? <MdExpandLess /> : <MdExpandMore />)}
                  </ListItemButton>
                  {menuItem.children && (
                    <Collapse in={menuItem.isOpen} timeout="auto" unmountOnExit sx={{bgcolor:"background.paper"}}>
                      <List component="div" disablePadding>
                        {menuItem.children.map((childItem, childIndex) => (
                          <ListItemButton
                            key={childIndex}
                            to={childItem.url || null}
                            LinkComponent={NavLink}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon >{childItem.icon}</ListItemIcon>
                            <ListItemText primary={childItem.title} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </Stack>
              ))}
            </List>
          </Box>
        </Drawer>
  )
}

export default AdminPanelDrawerDisplay