import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Button
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AdminView = () => {
  const classes = useStyles();
  const [name] = useState(data);
  if(localStorage.getItem("token")==undefined){
    window.location.href = 'http://localhost:3000/registerlogin';
    return(
      <div style={{textAlign:"center"}}>
        <h1 >404</h1>
        <h2>You are not logged in.</h2>
        <h2>Redirecting to login/signup page.</h2>
      </div>
    )
  }
  return (
    <Page
      className={classes.root}
      title="About Us"
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        style={{marginLeft:20}}
      ><div style={{margin:10}}>
        
        <Button
          color="primary"
          variant="contained"
          >
          Choose a File
        </Button>
        </div>
        <div style={{margin:10}}>
        <Button
          color="primary"
          variant="contained"
          style={{marginRight:28}}
        >
          Atuo Fetch
        </Button>
        </div>
      </Box>
      
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results name={name} />
        </Box>
      </Container>
    </Page>
  );
};

export default AdminView;
