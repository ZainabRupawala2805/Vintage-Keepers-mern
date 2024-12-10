import { useState, Fragment, useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Form from "../Search-Bar/Form";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../Context/ThemeContext";
import Control from "../Controls/Control";

const DrawerNav = () => {
  const { headerNavbarLinks } = useContext(ThemeContext);
  const [state, setState] = useState({ left: false });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const handleLinkClick = () => {
    setState({ left: false });
  };

  const handleFormSubmit = () => {
    setState({ left: false });
  };

  const list = (anchor) => (
    <Box sx={{ width: 250 }} role="presentation">
      {/* Close Button */}
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <CloseIcon onClick={toggleDrawer(anchor, false)} />
      </ListItem>
      <Divider />
      {/* Navigation Links */}
      <List>
        {headerNavbarLinks.map((head, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={handleLinkClick}>
              <ListItemText>
                <Link to={head.path}>{head.label}</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Control />
        </ListItem>
      </List>
      {/* Form Component */}
      <List>
        <ListItem>
          <div className="search__drawer">
            <Form onSubmit={handleFormSubmit} />
          </div>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Fragment>
      {["left"].map((anchor) => (
        <Fragment key={anchor}>
          {state.left ? (
            <MenuOpenIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" onClick={toggleDrawer(anchor, true)} />
          )}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default DrawerNav;
