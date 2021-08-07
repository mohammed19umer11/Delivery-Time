import React, { useEffect, useState } from 'react'

import {useDispatch, useSelector} from 'react-redux';

import { 
    Paper,
    List,
    ListItem,
    ListItemText,
    Collapse,
} from '@material-ui/core';

import {
    ExpandLess,
    ExpandMore,
} from '@material-ui/icons';

import { fetchSideMenu } from '../../redux/actions/sideMenuActions.js';

import useStyles from './styles.js';


const SideMenu = () => {
    const dispatch = useDispatch();
    const sideMenu = useSelector((state) => state.sideMenu);
    const [expand, setExpand] = useState(true);

    const handleClick = () => {
        setExpand(!expand);
    };

    useEffect(() => {
        dispatch(fetchSideMenu());
        // return () => {
        //     cleanup
        // }
    }, [dispatch]);


    return(
        <Paper>
            <List>
                <ListItem style={{display: 'flex', flexDirection: 'column'}} button onClick={handleClick}>
                    <ListItemText>Menu</ListItemText>
                    {expand ? <ExpandLess /> : <ExpandMore />}
                    <Collapse in={expand} timeout="auto" unmountOnExit>
                        <List>
                            <ListItem button>
                                <ListItemText>
                                    Sub Menu
                                </ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>
                                    Sub Menu
                                </ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>
                                    Sub Menu
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Collapse>
                </ListItem>
            </List>
        </Paper>
    );
};

export default SideMenu;
