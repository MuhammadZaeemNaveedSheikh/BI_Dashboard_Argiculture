import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  MapPin as MapIcon,
  Mail as MailIcon,
  LogOut as LogOutIcon, 
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/image.jpg',
  jobTitle: 'zaeemnaveed5@gmail.com',
  name: 'Zaeem Naveed'
};

const items = [
  {
    href: '/app/FarmerQueries',
    icon: BarChartIcon,
    title: 'Posts'
  },
  {
    href: '/registerlogin',
    icon: LogOutIcon ,
    title:"Log out"
  }

];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={"https://localhost:3000/backend/"+JSON.parse(localStorage.getItem("userinfo")).picture}
          to="/app/account"
        />
        
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {JSON.parse(localStorage.getItem("userinfo")).displayName}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {JSON.parse(localStorage.getItem("userinfo")).email}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              onClick={(e)=>{
                if (item.title==="Log out"){
                  localStorage.clear()
                }
              }}
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      
    </Box>
    
  );
  console.log(typeof(JSON.parse(localStorage.getItem("userinfo")).picture))
  console.log("data","https://localhost:3000/backend/"+JSON.parse(localStorage.getItem("userinfo")).picture)
  
 
    

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
