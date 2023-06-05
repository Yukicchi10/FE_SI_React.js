import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiMahasiswaProfil from "../../../lib/api/mahasiswa/profil";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import { Navbar } from "react-bootstrap";
import LogoSI from "../../../Img/LogoSI.png";

function TopNavigation() {
  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    await apiMahasiswaProfil.info().then((res) => setUser(res.data.data));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    fetchData();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="top-navigation">
      {/* <h5 className="title-text"></h5> */}
      <Navbar.Brand href="/" className="title-image">
        <img fluid src={LogoSI} width="200px" height="auto"/>
      </Navbar.Brand>
      <div className="mr-4">
        {user.nama}
        <IconButton onClick={handleClick} color="white">
          <FaUserCircle size="25" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/profil");
            }}
          >
            Profil
          </MenuItem>
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default TopNavigation;
