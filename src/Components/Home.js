import React, { useState } from "react";
import "./Home.css";
import AppsIcon from "@mui/icons-material/Apps";
import { Avatar } from "@mui/material";
import logo from "./GoogleLogo.png";
import { Button } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useHistory } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
// Dialouges---------------
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
// Options of dialouge box--------
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import EmailIcon from "@mui/icons-material/Email";
import RoomIcon from "@mui/icons-material/Room";
import GoogleIcon from "@mui/icons-material/Google";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VideocamIcon from "@mui/icons-material/Videocam";

function Home() {
  const [SearchText, setSearchText] = useState("");
  const history = useHistory();
  const Search = (e) => {
    e.preventDefault();
    if (SearchText) {
      history.push(`/search/${SearchText}`);
    }
  };

  // Dialouge box variables----------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="home">
      <div className="home__header">
        <p className="home__header__navopts">Gmail</p>
        <p className="home__header__navopts">Images</p>
        <Tooltip title="Google apps">
          <AppsIcon
            className="home__header__navopts apps"
            onClick={handleClick}
          />
        </Tooltip>
        <Avatar src="" className="home__header__navopts" />
      </div>
      <form
        className="home__body"
        onSubmit={(e) => {
          Search(e);
        }}
      >
        <img src={logo} alt="Logo" className="home__body__logo" />
        <div className="search__box">
          <SearchIcon />
          <input
            type="text"
            value={SearchText}
            placeholder="Search Google or type a URL"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <MicIcon />
        </div>
        <div className="home__body__buttons">
          <Button type="submit">Google Search</Button>
          <Button>I'am Feeling Lucky</Button>
        </div>
      </form>
      <div className="home__footer">
        <div className="home__footer__content">
          <CreateIcon className="home__footer__create__icon" />
          <p>Customize Chrome</p>
        </div>
      </div>

      {/* ---------Dialouge box--------- */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <GoogleIcon className="dialouge__opts" /> Search
        </MenuItem>
        <MenuItem>
          <a href="https://mahamood-sameer.github.io/Drive/" target="_blank" className="drive__link"><AddToDriveIcon className="dialouge__opts" /> Drive</a>
        </MenuItem>
        <MenuItem>
          <EmailIcon className="dialouge__opts" /> Gmail
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <RoomIcon />
          </ListItemIcon>
          Maps
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <YouTubeIcon />
          </ListItemIcon>
          Youtube
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <VideocamIcon />
          </ListItemIcon>
          Gmeet
        </MenuItem>
        <center>
        <Button className="more_from__google">More from Google</Button>
        </center>
      </Menu>
    </div>
  );
}

export default Home;
