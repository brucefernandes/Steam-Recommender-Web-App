import React, { useState, useEffect } from 'react'
import '../styles/SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'

function SearchBar({ placeholder, data }) {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [recommendedGames, setRecommendedGames] = useState([]);


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
        setRecommendedGames([])

    }
    const handleGameClick = async (name) => {

        setWordEntered(name)
        setFilteredData([])

        const response = await axios.post(`http://localhost:8080/recommend`, { name: name })
        setRecommendedGames(response.data)

    }


    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter} />
                <div className="searchIcon">
                    {wordEntered.length == 0 ?
                        <SearchIcon /> :
                        <CloseIcon id="clearBtn" onClick={clearInput} />}

                </div>
            </div>
            {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return <a className="dataItem" onClick={() => { handleGameClick(value.Name) }}>
                            <p >{value.Name}</p>
                        </a>
                    })}
                </div>
            )}

            {recommendedGames.length != 0 ? (
                <div className="">
                    {recommendedGames.map((value, key) => {
                        return <p >{value.Name}</p>

                    })}
                </div>
            ) :
                <div>Empty</div>}


        </div >
    )
}

export default SearchBar