import React, { useState, useEffect } from 'react';
import axios from 'axios'

import SearchBar from './SearchBar';



function BaseComponent(props) {

    const [gameTitleQueryResults, setgameTitleQueryResults] = useState([])

    useEffect(() => {

        let query = async () => {
            const response = await axios.get(`http://localhost:8080/game_titles`)
            setgameTitleQueryResults(response.data)
        }

        query()


    }, [])


    return (
        <div>
            <SearchBar placeholder="Enter a videogame title..." data={gameTitleQueryResults} />
        </div>
    );
}

export default BaseComponent;