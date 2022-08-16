import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, stepClasses } from '@mui/material';
import Grow from '@mui/material/Grow';
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Popover from '@mui/material/Popover';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';




const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.3),
}));

const GameCard = ({ gameInfo }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;




    return (
        <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>

            <Card sx={{ maxWidth: 345, backgroundColor: "#02172E" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="flex"
                        image={`https://cdn.akamai.steamstatic.com/steam/apps/${gameInfo.imageId}/header.jpg`}
                        alt={gameInfo.imageId}
                        onClick={handleClick}
                    />

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "bottom"
                        }}

                    >
                        <CardContent sx={{ width: 345, backgroundColor: '#e0e8ed' }}>

                            <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
                                {gameInfo.Developer}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {gameInfo.Name}
                            </Typography>
                            <CardMedia
                                component="img"
                                height="flex"
                                image={`https://cdn.akamai.steamstatic.com/steam/apps/${gameInfo.imageId}/header.jpg`}
                                alt={gameInfo.imageId}
                            />
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Release Date: {gameInfo.ReleaseDate}
                            </Typography>
                            <Typography
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    p: 0.5,
                                    m: 0,
                                }}
                                component="ul"
                            >
                                {
                                    gameInfo.Tags.slice(0, 9).map((data) => {
                                        return (
                                            <ListItem key={data.key}>
                                                <Chip
                                                    color="primary"
                                                    label={data}

                                                />
                                            </ListItem>
                                        );
                                    })
                                }
                            </Typography>

                            <Typography variant="body2">
                                {gameInfo.Description}

                            </Typography>

                        </CardContent>
                    </Popover>
                </CardActionArea>
            </Card>


        </Grow>

    );
}

export default GameCard;