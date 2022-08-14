import React, { useState } from 'react';
import GameCard from './GameCard'
import { Grid } from '@mui/material'
import Grow from '@mui/material/Grow';


const GameGrid = ({ games }) => {



    return (
        <div className="game_grid">
            <Grid container columns={4} spacing={3} sx={{
                maxWidth: 'flex'
            }}>
                {
                    games.slice(0, 14).map(g => {
                        return (<Grid item xs={6} sm={3} md={1}>
                            <GameCard gameInfo={g} />
                        </Grid>)
                    })
                }
            </Grid>
        </div >

    )
}

export default GameGrid;