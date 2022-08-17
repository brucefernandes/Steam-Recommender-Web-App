import React, { useState, useEffect } from 'react';
import axios from 'axios'

import SearchBar from './SearchBar';
import GameGrid from './GameGrid'
import { useForkRef } from '@mui/material';



function BaseComponent() {

    const [gameTitleQueryResults, setgameTitleQueryResults] = useState([])
    const [recommendedGames, setRecommendedGames] = useState([])

    useEffect(() => {

        let query = async () => {
            const response = await axios.get(`http://intense-fjord-20781.herokuapp.com/game_titles`)
            setgameTitleQueryResults(response.data)
        }

        query()


    }, [])

    const getSearchResults = (games) => {

        setRecommendedGames(games)
    }


    return (
        <div>
            <SearchBar placeholder="Enter a video game title..." data={gameTitleQueryResults} getSearchResults={getSearchResults} />
            <br></br>
            {recommendedGames.length != 0 && <GameGrid games={recommendedGames} />}
        </div>
    );
}

export default BaseComponent;