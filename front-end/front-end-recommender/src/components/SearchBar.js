import React, { useState, useEffect } from 'react'
import '../styles/SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import Fade from '@mui/material/Fade';

function SearchBar({ placeholder, data, getSearchResults }) {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [searchBarHeight, setSearchBarHeight] = useState("360px");
    const [radius, setRadius] = useState(['27px', '27px', '27px', '27px'])



    const handleFilter = (event) => {

        setRadius(['25px', '25px', '0px', '0px'])
        const searchWord = event.target.value;
        setWordEntered(searchWord)
        const newFilter = data.filter((item) => {
            return item.Name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord == "") {
            setFilteredData([])
        }
        else {
            setFilteredData(newFilter)

        }
    };
    const clearInput = () => {
        setFilteredData([])
        setWordEntered("")
        getSearchResults([])
        setSearchBarHeight("360px")
        setRadius(['27px', '27px', '27px', '27px'])


    }
    const handleGameClick = async (name) => {

        setWordEntered(name)
        setFilteredData([])
        setSearchBarHeight("100px")
        setRadius(['27px', '27px', '27px', '27px'])

        const response = await axios.post(`http://intense-fjord-20781.herokuapp.com/recommend`, { name: name })
        getSearchResults(response.data)

    }


    return (
        <div className="search">
            <Fade in={true} mountOnEnter timeout={2500}>
                <div className="searchInputs" style={{ display: 'flex', marginTop: searchBarHeight }} >
                    <input type="text" style={{
                        borderTopLeftRadius: radius[0], borderBottomLeftRadius: radius[3],

                    }} placeholder={placeholder} value={wordEntered} onChange={handleFilter} />

                    <div className="searchIcon" style={{ borderTopRightRadius: radius[1], borderBottomRightRadius: radius[2] }}>
                        {wordEntered.length == 0 ?
                            <SearchIcon /> :
                            <CloseIcon id="clearBtn" onClick={clearInput} />}

                    </div>
                </div>
            </Fade >

            {
                filteredData.length != 0 && (
                    <div className="dataResult">
                        {filteredData.slice(0, 25).map((value, key) => {
                            return <a className="dataItem" onClick={() => { handleGameClick(value.Name) }}>
                                <p >{value.Name}</p>
                            </a>
                        })}
                    </div>
                )
            }
        </div >
    )
}

export default SearchBar