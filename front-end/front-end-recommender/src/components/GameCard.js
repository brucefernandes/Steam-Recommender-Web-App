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


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    margin: 0,
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



const GameCard = ({ gameInfo }) => {
    // const [expanded, setExpanded] = React.useState(false);

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };
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
            <Card sx={{ maxWidth: 328 }}>
                <CardActionArea>

                    <CardMedia
                        component="img"
                        height='flex'
                        image={`https://cdn.akamai.steamstatic.com/steam/apps/${gameInfo.imageId}/header.jpg`}
                        alt={gameInfo.Name}
                        onClick={handleClick}
                    />
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'bottm',
                        }}
                    >
                        <CardContent sx={{ maxWidth: 345 }} >
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                aside for 10 minutes.
                            </Typography>


                        </CardContent>

                    </Popover>




                </CardActionArea>

            </Card>

        </Grow>

    );
}

export default GameCard;