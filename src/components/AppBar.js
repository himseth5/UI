import * as React from "react";
import { useNavigate } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import exlLogo from '../assets/EXL_logo.png'
import '../../src/components/Header/header.css'

// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";



export const AppBar = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <img className='brand-logo' src={exlLogo} alt='exl' />
      <h3 className='project-title'>Clinician-CoPilot</h3>
      <div className="profile-icon-container">
        <CgProfile className='profile-icon' />
      </div>
    </div>

    // <MuiAppBar position="static" >
    //   <Container maxWidth="xl" className="header-main-container">
    //     <Toolbar disableGutters>
    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="div"
    //         sx={{ mr: 2, display: { xs: "none", md: "flex", justifyContent: "space-between" } }}
    //       >
    //         {/* React Router Auth */}
    //       </Typography>

    //       {/*  <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
    //         <IconButton
    //           size="large"
    //           aria-label="account of current user"
    //           aria-controls="menu-appbar"
    //           aria-haspopup="true"

    //           color="inherit"
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //       </Box> */}
    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="div"
    //         sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
    //       >
    //         React Router Auth
    //       </Typography>

    //     </Toolbar>
    //   </Container>
    // </MuiAppBar>
  );
};
