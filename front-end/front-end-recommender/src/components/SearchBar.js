import React, { useState, useEffect } from 'react'
import '../styles/SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import Fade from '@mui/material/Fade';

function SearchBar({ placeholder, data, getSearchResults }) {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    // const [recommendedGames, setRecommendedGames] = useState([]);


    const handleFilter = (event) => {
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

    }
    const handleGameClick = async (name) => {

        setWordEntered(name)
        setFilteredData([])

        const response = await axios.post(`http://localhost:8080/recommend`, { name: name })
        getSearchResults(response.data)

    }


    return (
        <div className="search">
            <Fade in={true} mountOnEnter timeout={2500}>
                <div className="searchInputs" >
                    <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter} />
                    <div className="searchIcon">
                        {wordEntered.length == 0 ?
                            <SearchIcon /> :
                            <CloseIcon id="clearBtn" onClick={clearInput} />}

                    </div>
                </div>
            </Fade>

            {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 25).map((value, key) => {
                        return <a className="dataItem" onClick={() => { handleGameClick(value.Name) }}>
                            <p >{value.Name}</p>
                        </a>
                    })}
                </div>
            )}
        </div >
    )
}

export default SearchBar