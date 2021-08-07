import React from 'react';

import theme from './theme';
import { 
    ThemeProvider, 
    Container,
    Grid,
} from '@material-ui/core';

import { SideMenu, EditScreen } from './Components';

const App = () => {
    return(
        <ThemeProvider theme={ theme }>
            <Container maxWidth='lg'>
                <Grid container direction='row' >
                    <Grid item xs={12} sm={12} md={3} lg={4}>
                        <SideMenu />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={8}>
                        <EditScreen />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default App;