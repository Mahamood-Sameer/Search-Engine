import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_KEY, CX_KEY } from "../API_KEYS";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import logo from "./GoogleLogo.png";
import "./SearchPage.css";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import { Avatar } from "@mui/material";
import Options from "./Options";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ImageIcon from "@mui/icons-material/Image";
import BookIcon from "@mui/icons-material/Book";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Responcive.css";
// Dialouges---------------
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
// Options of dialouge box--------
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import EmailIcon from "@mui/icons-material/Email";
import RoomIcon from "@mui/icons-material/Room";
import GoogleIcon from "@mui/icons-material/Google";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VideocamIcon from "@mui/icons-material/Videocam";

function SearchPage() {
  let { text } = useParams();
  const [searchTerm, setSearchTerm] = useState(text);
  const [Responce, setResponce] = useState(null);
  const history = useHistory();
  const SearchTheTerm = (e) => {
    e.preventDefault();
    if (searchTerm) {
      history.push(`/search/${searchTerm}`);
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

  useEffect(() => {
    const fetchText = async () => {
      fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX_KEY}&q=${text}`
      )
        .then((data) => {
          return data.json();
        })
        .then((result) => {
          setResponce(result);
        });
    };

    fetchText();
  }, [text]);

  return (
    <div className="searchpage">
      <div className="searchpage__header">
        <div className="searchpage__part1">
          <Link to="/">
            <img src={logo} alt="logo" className="searchpage__header__logo" />
          </Link>
          <form
            className="search__box"
            onSubmit={(e) => {
              SearchTheTerm(e);
            }}
          >
            <SearchIcon />
            <input
              type="text"
              value={searchTerm}
              placeholder="Search Google or type a URL"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <MicIcon />
          </form>
          <div className="searchpage__header__icons">
            <SettingsIcon className="icons" />
            <Tooltip title="Google apps">
              <AppsIcon className="icons apps" onClick={handleClick} />
            </Tooltip>
            <Avatar src="" className="icons" />
          </div>
        </div>

        <div className="serachpage__header__options">
          <Options Icon={SearchIcon} title="All" underline={true} />
          <Options Icon={CreditCardIcon} title="News" />
          <Options Icon={ImageIcon} title="Images" />
          <Options Icon={LocalOfferIcon} title="Shopping" />
          <Options Icon={BookIcon} title="Books" />
          <Options Icon={MoreVertIcon} title="More" />
        </div>
      </div>

      <div className="searchpage__body">
        <p className="searchpage__time">
          About {Responce?.searchInformation.formattedTotalResults} results (
          {Responce?.searchInformation.formattedSearchTime} seconds)
        </p>
        {Responce?.items.map((item) => {
          return (
            <div className="serachpage__results">
              <a href={item?.link} className="searchpage__result__link">
                {item?.displayLink}
                <h2 className="searchpage__result__title">{item?.title}</h2>
              </a>
              <p className="searchpage__result__snippet">{item?.snippet}</p>
            </div>
          );
        })}
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
        <a
          href="https://mahamood-sameer.github.io/Drive/"
          target="_blank"
          rel="noreferrer"
          className="drive__link"
        >
          <MenuItem>
            <AddToDriveIcon className="dialouge__opts" /> Drive
          </MenuItem>
        </a>
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

export default SearchPage;
