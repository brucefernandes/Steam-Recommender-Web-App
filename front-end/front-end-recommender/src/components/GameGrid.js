import React, { useState } from 'react';
import GameCard from './GameCard'
import { Grid } from '@mui/material'


const GameGrid = ({ games }) => {



    return (
        <div className="gameGrid">
            <Grid container columns={4} spacing={3}
                justifyContent="center"
                alignItems="center"
            >
                {games.slice(0, 14).map(g => {
                    return (<Grid item xs={6} sm={3} md={1}>
                        <GameCard gameInfo={g} />

                    </Grid>)
                })}
            </Grid>
        </div>

    )
}

export default GameGrid;