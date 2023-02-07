import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';
// import { Search as SearchIcon } from 'react-feather';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
const data = [
  {
    id: uuid(),
    ref: 'Chaunsa',
    amount: 30.5,
    customer: {
      name: 'lahore'
    },
    createdAt: 1555016400000,
    price: '20'
  },
  {
    id: uuid(),
    ref: 'Apple',
    amount: 25.1,
    customer: {
      name: 'islamabad'
    },
    createdAt: 1555016400000,
    price: '30'
  },
  {
    id: uuid(),
    ref: 'Pomegranate',
    amount: 10.99,
    customer: {
      name: 'rawalpindi'
    },
    createdAt: 1554930000000,
    price: '40'
  },
  {
    id: uuid(),
    ref: 'Lemon',
    amount: 96.43,
    customer: {
      name: 'sargodha'
    },
    createdAt: 1554757200000,
    price: '50'
  },
  {
    id: uuid(),
    ref: 'Grape',
    amount: 32.54,
    customer: {
      name: 'karachi'
    },
    createdAt: 1554670800000,
    price: '50'
  },
  {
    id: uuid(),
    ref: 'Apricot',
    amount: 16.76,
    customer: {
      name: 'sakhar'
    },
    createdAt: 1554670800000,
    price: '70'
  }
];
const useStyles = makeStyles((theme) => ({
  
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      
    },
  },
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders] = useState(data);


  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={1500}>
            <Typography style={{textAlign:'center',fontSize:30,fontWeight:'bolder'}}>
                Admin Portal
            </Typography>  
              <Typography>
              <Box display="flex" justifyContent="flex-end" style={{marginLeft:20}}>
              <Autocomplete
      id="combo-box-demo"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,margin:20 }}
      renderInput={(params) => <TextField {...params} label="Crops" variant="outlined" />}
    />
    <Autocomplete
      id="combo-box-demo"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,margin:20 }}
      renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
    />
    <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        style={{margin:20,marginTop:20}}
      />
    <TextField id="outlined-basic" label="Price" variant="outlined"  style={{ width: 300,margin:30 }}/>
    <Button
          color="primary"
          size="small"
          variant="text"
          style={{fontSize:20,backgroundColor:'#61A979',color:'white',height:45,marginTop:33,marginRight:60}}
        >
          Submit
        </Button>
              </Box>

              
              </Typography>
              <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Add Prices of Crops" />
      <Divider />
      <PerfectScrollbar >
        <Box minWidth={800} >
          <Table style={{marginLeft:20}}>
            <TableHead>
              <TableRow>
                <TableCell>
                  Crop
                </TableCell>
                <TableCell>
                  City
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {order.ref}
                  </TableCell>
                  <TableCell>
                    {order.customer.name}
                  </TableCell>
                  <TableCell>
                    {moment(order.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={order.price}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>

            </Box>
          </CardContent>
        </Card>
      </Box>
      <br></br>
      
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  
];
export default Toolbar;
