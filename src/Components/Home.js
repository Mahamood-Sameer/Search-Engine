import React, { useState } from 'react'
import './Home.css'
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';
import logo from './GoogleLogo.png'
import { Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { useHistory } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';

function Home() {
    const [SearchText, setSearchText] = useState("")
    const history = useHistory()
    const Search = (e) => {
        e.preventDefault();
        if (SearchText) {
            history.push(`/search/${SearchText}`)
        }
    }
    return (
        <div className="home">
            <div className="home__header">
                <p className="home__header__navopts">Gmail</p>
                <p className="home__header__navopts">Images</p>
                <AppsIcon className="home__header__navopts" />
                <Avatar src="" className="home__header__navopts" />
            </div>
            <form className="home__body" onSubmit={(e) => { Search(e) }}>
                <img src={logo} alt="Logo" className="home__body__logo" />
                <div className="search__box">
                    <SearchIcon />
                    <input type="text" value={SearchText} placeholder="Search Google or type a URL" onChange={(e) => { setSearchText(e.target.value) }} />
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
        </div>
    )
}

export default Home
