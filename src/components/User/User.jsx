import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckBox } from '@mui/icons-material';
import { Box, Button, FormControl, FormControlLabel, Grid2, Input, InputLabel, MenuItem, Select, TextField, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik } from 'formik';
import { userRegisterValidations } from '../../lib/validations/user-register-validations';
import EditIcon from '@mui/icons-material/Edit';

const User = () => {
    const [users, setUsers] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [user, setUser] = useState({
        id: -1,
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        dob: '1996-11-17',
        department: '',
        joinedDate: '2020-01-10',
        resignedDate: null,
        username: '',
        password: '',
        confirmPassword: '',
        address: '',
    });


    useEffect(() => {
        getUsers();
    }, [isUpdated]);


    const getUsers = () => {
        axios.get('http://localhost:3001/api/GetUsers')
            .then((response) => {
                if (response.data.response != null)  {
                    console.log(response.data.response);
                    setUsers(response.data.response);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };


    const userRegister_submit = (values, { setSubmitting }) => {
        setTimeout(() => {
        // alert(JSON.stringify(values, null, 2));
        if (user.id > -1) updateUser();
        else saveUser();
        setSubmitting(false);
        }, 400);
    };
    const saveUser = () => {
        let payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dob: user.dob,
            department: user.department,
            joinedDate: user.joinedDate,
            resignedDate: user.resignedDate,
            username: user.username,
            password: user.password,
            confirmPassword: user.confirmPassword,
            address: user.address,
        };
        axios.post('http://localhost:3001/api/SaveUser', payload)
            .then(() => {
                alert('Successfully Added');
                clearUser();
                getUsers();
            })
            .catch(error => {
                alert(error);
            });
    };
    
    const editUser_click = (userObj) => {
        setUser(userObj);
    };
    const updateUser = () => {
        let payload = {
            id: user.id,
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dob: user.dob,
            department: user.department,
            joinedDate: user.joinedDate,
            resignedDate: user.resignedDate,
            username: user.username,
            password: user.password,
            confirmPassword: user.confirmPassword,
            address: user.address,
        };
        axios.post('http://localhost:3001/api/UpdateUser', payload)
            .then(() => {
                alert('Successfully Updated');
                clearUser();
                getUsers();
            })
            .catch(error => {
                alert(error);
            });
    };

    const deleteUser_click = () => {
        if (user._id == null || user._id == '') { alert('Please select an User' + JSON.stringify(user, null, 2)); return; }
        // if (confirm('Are you sure about this deletion ?')) deleteUser();
        deleteUser();
    };
    const deleteUser = () => {
        axios.delete('http://localhost:3001/api/DeleteUser' + user._id)
            .then(() => {
                alert('Successfully Deleted');
                clearUser();
                getUsers();
            })
            .catch(error => {
                alert(error);
            });
    };

    const clearUser = () => {
        setUser({
            id: 0,
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
            dob: '1996-11-17',
            department: '',
            joinedDate: '2020-01-10',
            resignedDate: null,
            username: '',
            password: '',
            confirmPassword: '',
            address: '',
        });
    };

    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2 size={2.5}>
                    <Typography sx={{ mt: 1, mb: 1, ml: 1 }} variant="h6" component="div">Users</Typography>
                    <hr/>
                    <List>
                        {
                            users.map(user => (
                                <ListItem 
                                    key={user._id}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="actions" onClick={() => editUser_click(user)}>
                                            <EditIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={user.firstName + ' ' + user.lastName + user.id}
                                        secondary={user.username}
                                    />
                                </ListItem>
                            ))
                        }
                    </List>
                </Grid2>
                <Grid2 size={0.5}></Grid2>
                <Grid2 size={8}>
                    <Typography sx={{ mt: 1, mb: 1, ml: 1 }} variant="h6" component="div">User Registration</Typography>
                    <hr/>
                    <Formik
                        initialValues={{ firstName: '', lastName: '', email: '', department: '', password: '', confirmPassword: '', address: '' }}
                        validate={userRegisterValidations}
                        onSubmit={userRegister_submit}
                        >
                        {({
                            values,
                            errors,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    sx={{ 
                                        mt: 2
                                    }}
                                    >
                                        <Grid2 
                                            sx={{ 
                                                display: 'flex !important', 
                                            }}
                                        >
                                            <Grid2 
                                                sx={{ m: 1, width: '40ch' }}>
                                                <TextField
                                                    label="First Name"
                                                    size="small"
                                                    sx={{ width: '40ch' }}
                                                    name="firstName"
                                                    value={user.firstName}
                                                    onChange={(e) => { setUser({ ...user, firstName: e.target.value }); values.firstName = user.firstName; } }
                                                />
                                                <div className='validation-msg'>{errors.firstName && errors.firstName}</div>
                                            </Grid2>
                                            <Grid2 
                                                sx={{ m: 1, width: '40ch' }}>
                                                <TextField
                                                    label="Last Name"
                                                    size="small"
                                                    sx={{ width: '40ch' }}
                                                    name="lastName"
                                                    value={user.lastName}
                                                    onChange={(e) => { setUser({ ...user, lastName: e.target.value }); values.lastName = user.lastName; }}
                                                />
                                                <div className='validation-msg'>{errors.lastName && errors.lastName}</div>
                                            </Grid2>
                                            <Grid2 
                                                sx={{ m: 1, width: '60ch' }}>
                                                <TextField
                                                    label="Email"
                                                    sx={{ width: '60ch' }}
                                                    name="email"
                                                    size="small"
                                                    value={user.email}
                                                    onChange={(e) => { setUser({ ...user, email: e.target.value }); values.email = user.email; }}
                                                />
                                                <div className='validation-msg'>{errors.email && errors.email}</div>
                                            </Grid2>
                                        </Grid2>
                                        <Grid2 
                                            sx={{ 
                                                display: 'flex', 
                                            }}
                                        >
                                            <Grid2 
                                                sx={{ m: 1, width: '30ch' }}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker 
                                                        label="Date of Birth"
                                                        sx={{ width: '30ch' }}
                                                        slotProps={{ textField: { size: 'small' } }}
                                                    />
                                                </LocalizationProvider>
                                                {/* <div className='validation-msg'>{errors.email && errors.email}</div> */}
                                            </Grid2>
                                            <Grid2 
                                                sx={{ m: 1, width: '46ch' }}>
                                                <FormControl>
                                                    <InputLabel id="dtpDepartment">Department</InputLabel>
                                                    <Select
                                                        label="Department"
                                                        labelId="dtpDepartment"
                                                        sx={{ width: '46ch' }}
                                                        name="department"
                                                        size="small"
                                                        value={user.department}
                                                        onChange={(e) => { setUser({ ...user, department: e.target.value }); values.department = user.department; }}
                                                    >
                                                        <MenuItem value={0}>Finance</MenuItem>
                                                        <MenuItem value={1}>HR</MenuItem>
                                                        <MenuItem value={2}>Production</MenuItem>
                                                        <MenuItem value={3}>IT</MenuItem>
                                                        <MenuItem value={4}>Marketing</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <div className='validation-msg'>{errors.department && errors.department}</div>
                                            </Grid2>
                                            <Grid2 
                                                sx={{ m: 1, marginLeft: 3, width: '30ch' }}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker 
                                                        label="Joined Date"
                                                        sx={{ width: '30ch' }}
                                                        slotProps={{ textField: { size: 'small' } }}
                                                    />
                                                </LocalizationProvider>
                                                {/* <div className='validation-msg'>{errors.email && errors.email}</div> */}
                                            </Grid2>
                                            <Grid2 
                                                sx={{ m: 1, width: '30ch' }}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker 
                                                        label="Resigned Date"
                                                        sx={{ width: '30ch' }}
                                                        slotProps={{ textField: { size: 'small' } }}
                                                    />
                                                </LocalizationProvider>
                                                {/* <div className='validation-msg'>{errors.email && errors.email}</div> */}
                                            </Grid2>
                                        </Grid2>
                                        <Grid2 
                                            sx={{ 
                                                display: 'flex', 
                                            }}
                                        >
                                            <Grid2 
                                                sx={{ m: 1, width: '40ch' }}>
                                                <TextField
                                                    label="Username"
                                                    sx={{ width: '40ch' }}
                                                    size="small"
                                                    name="username"
                                                    value={user.username}
                                                    onChange={(e) => { setUser({ ...user, username: e.target.value }); values.username = user.username; }}
                                                />
                                                <div className='validation-msg'>{errors.username && errors.username}</div>
                                            </Grid2>
                                            <Grid2 
                                                sx={{ m: 1, width: '50ch' }}>
                                                <TextField
                                                    label="Password"
                                                    type="password"
                                                    sx={{ width: '50ch' }}
                                                    size="small"
                                                    name="password"
                                                    value={user.password}
                                                    onChange={(e) => { setUser({ ...user, password: e.target.value }); values.password = user.password; }}
                                                />
                                                <div className='validation-msg'>{errors.password && errors.password}</div>
                                            </Grid2>
                                            <Grid2 
                                                sx={{ m: 1, width: '50ch' }}>
                                                <TextField
                                                    label="Confirm Password"
                                                    type="password"
                                                    sx={{ width: '50ch' }}
                                                    size="small"
                                                    name="confirmPassword"
                                                    value={user.confirmPassword}
                                                    onChange={(e) => { setUser({ ...user, confirmPassword: e.target.value }); values.confirmPassword = user.confirmPassword; }}
                                                />
                                                <div className='validation-msg'>{errors.confirmPassword && errors.confirmPassword}</div>
                                            </Grid2>
                                        </Grid2>
                                        <Grid2 
                                            sx={{ 
                                                display: 'flex', 
                                            }}
                                        >
                                            <Grid2 
                                                sx={{ m: 1, width: '130ch' }}>
                                                <TextField
                                                    label="Address"
                                                    multiline
                                                    rows={2}
                                                    sx={{ width: '130ch' }}
                                                    size="small"
                                                    name="address"
                                                    value={user.address}
                                                    onChange={(e) => { setUser({ ...user, address: e.target.value }); values.address = user.address; }}
                                                />
                                                <div className='validation-msg'>{errors.address && errors.address}</div>
                                            </Grid2>
                                            <Grid2 
                                                sx={{ m: 1, marginLeft: 2 }}>
                                                <FormControlLabel control={<CheckBox defaultChecked size="small"/>} label="Active" />
                                            </Grid2>
                                        </Grid2>
                                        <Button type="button" variant="outlined" size="small" sx={{ m: 1, width: '20ch' }} onClick={() => deleteUser_click()}>Delete</Button>
                                        <Button type="submit" variant="outlined" size="small" sx={{ m: 1, width: '20ch' }} disabled={isSubmitting}>Register</Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Grid2>
            </Grid2>
        </>
    );
};

export default User;