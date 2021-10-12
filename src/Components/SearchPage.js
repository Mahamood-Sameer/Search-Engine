import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { API_KEY, CX_KEY } from '../API_KEYS';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import logo from './GoogleLogo.png'
import './SearchPage.css'
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';
import Options from './Options';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ImageIcon from '@mui/icons-material/Image';
import BookIcon from '@mui/icons-material/Book';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './Responcive.css'


function SearchPage() {
    let { text } = useParams();
    const [searchTerm, setSearchTerm] = useState(text)
    const [Responce,setResponce]=useState(null)
    const history = useHistory()
    const SearchTheTerm = (e) => {
        e.preventDefault()
        if (searchTerm) {
            history.push(`/search/${searchTerm}`)
        }
    }

    console.log(Responce)


    useEffect(() => {
        const fetchText = async () => {
            fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX_KEY}&q=${text}`).then((data) => {
                return data.json()
            }).then((result) => {
                setResponce(result)
            })
        }

        fetchText()

    }, [text])


    return (
        <div className="searchpage">
            <div className="searchpage__header">
                <div className="searchpage__part1">
                    <Link to="/">
                        <img src={logo} alt="logo" className="searchpage__header__logo" />
                    </Link>
                    <form className="search__box" onSubmit={(e) => { SearchTheTerm(e) }}>
                        <SearchIcon />
                        <input type="text" value={searchTerm} placeholder="Search Google or type a URL" onChange={(e) => { setSearchTerm(e.target.value) }} />
                        <MicIcon />
                    </form>
                    <div className="searchpage__header__icons">
                        <SettingsIcon className="icons" />
                        <AppsIcon className="icons" />
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
                <p className="searchpage__time">About {Responce?.searchInformation.formattedTotalResults} results ({Responce?.searchInformation.formattedSearchTime} seconds)</p>
                {
                    Responce?.items.map(item => {
                        return (
                            <div className="serachpage__results">
                                <a href={item?.link} className="searchpage__result__link">{item?.displayLink}
                                <h2 className="searchpage__result__title">{item?.title}</h2>
                                </a>
                                <p className="searchpage__result__snippet">{item?.snippet}</p>
                            </div>
                        )

                    })
                }
            </div>
        </div>
    )
}


export default SearchPage
