import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';
// import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={1400}>
              <Typography>
                Welcome to Bussiness Intellegence Dashboard for Agriculture!
                <br></br>
                The idea is to build a business intelligence dashboard that will help the users to provide following features:
               <br></br>1.To get insight data available on the public and governmental websites.
               <br></br>2. We will apply data modeling on the data we collected and to display useful information.
               <br></br>3. It will also provide historical data like yearly production, prices
                and area wise statistics of any selected grain.
                <br></br>4. It will also tell this information based on weather forecast,
                market condition and political and economic impact and also predict the expected area wise production and
                foreseen prices.
                <br></br>5. It will help the farmers to use these insights like how much irrigation is required for
                the crops which can help to save water resources and result in yield efficiency.       
                
                
                
              
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <br></br>
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button className={classes.importButton}>
          Developed By :
        </Button>
        
        <Button
          color="primary"
          variant="contained"
        >
          Muhammad Jafar | Muhammad Zaeem Naveed Sheikh | Zubair Abdullah
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
