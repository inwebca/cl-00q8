import Box from "@mui/material/Box";
import { ReactNode, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

const drawerWidth = 240;

type NavItem = {
  label: string;
  link: string;
};

const LoggedLayout = ({ children }: { children: ReactNode }) => {
  const { role, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    if (role != null) {
      if (role == "admin") {
        setNavItems([{ label: "admin", link: "/admin" }]);
      } else {
        setNavItems([
          { label: "dashboard", link: "/dashboard" },
          { label: "feedback", link: "/feedback" },
        ]);
      }
    }
  }, [role]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        APP
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              color="inherit"
              component={Link}
              to={item.link}
              sx={{ textTransform: "uppercase" }}
            >
              {item.label}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button onClick={signOut} color="inherit">
        Sign out
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{ color: "#fff" }}
                component={Link}
                to={item.link}
              >
                {item.label}
              </Button>
            ))}
            <Button onClick={signOut} color="inherit">
              Sign out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3, width: "100%" }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default LoggedLayout;
