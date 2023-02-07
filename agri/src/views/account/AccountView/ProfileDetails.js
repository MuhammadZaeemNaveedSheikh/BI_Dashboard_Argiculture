import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

// const states = [
//   {
//     value: 'Islamabad',
//     label: 'Islamabad'
//   },
//   {
//     value: 'Punjab',
//     label: 'Punjab'
//   },
//   {
//     value: 'Sindh',
//     label: 'Sindh'
//   },
//   {
//     value: 'Khyber Pakhtumkhua',
//     label: 'KPK Pakhtumkhua'
//   },
//   {
//     value: 'Sindh',
//     label: 'Sindh'
//   }
// ];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const[user,setUser] = useState({

  })



  const [values, setValues] = useState({
    firstName: JSON.parse(localStorage.getItem("userinfo")).displayName,
    lastName: 'Naveed',
    email: 'zaeemnaveeed5@gmail.com',
    phone: '+923321965860',
    state: 'Islamabad',
    country: 'Paksitan'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };




  useEffect(()=>{
    setUser({
      avatar: JSON.parse(localStorage.getItem("userinfo")).picture,
      country: 'Pakistan',
      jobTitle: JSON.parse(localStorage.getItem("userinfo")).email,
      name: JSON.parse(localStorage.getItem("userinfo")).displayName,
      timezone: 'GMT+5'
    })
  },[]);

  
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField  
                // contentEditable = {true}
                fullWidth
                label="User Name"
                name="firstName"
                required
                value={values.firstName}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid> */}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                required
                disabled
                value={user.jobTitle}
                variant="outlined"
              />
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid> */}
            <Grid
              item
              md={6}
              xs={12}
            >
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {/* <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField> */}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
