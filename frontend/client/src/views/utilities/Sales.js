/* eslint-disable */
import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, Menu, Tab, MenuItem, Typography, TableContainer } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DeleteOutline, Edit, MoreVertOutlined } from '@mui/icons-material';
import { useEffect } from 'react';
import { useRef } from 'react';
import { ApiService } from 'services/apiservices';
  import moment from 'moment';
import constant from 'services/constant';

let apiServices = new ApiService();

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function Orders() {
const didMountRef = useRef(true)
const [vendorOrder , setVendorOrder] = useState([])
    useEffect(() => {
        if (didMountRef.current) {
    
          apiServices.getvendororderdataRequest().then(res => {
            if(res.data.status == "success"){
                setVendorOrder(res.data.data)
            }
              else if(res.data.message == 'Token Expired'){
                    alert(res.data.message);
                    localStorage.removeItem('AUTH_TOKEN');
                    window.location.href = constant.FRONT_URL;
                }
          
          })
        }
        didMountRef.current = false;
      });
    const rows = [
        createData('Gigs Name', 'Anshul', 'March 3, 2023', '9:00PM', '$1000'),
        createData('Gigs Name', 'Anshul', 'March 3, 2023', '9:00PM', '$1000'),
        createData('Gigs Name', 'Anshul', 'March 3, 2023', '9:00PM', '$1000')
    ];
    const [anchorEl, setAnchorEl] = useState(null);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <div className="section-tittle">
                <typography variant="h1" className="tittle" sx={{ pt: 0 }}>
                    <span class="shape"></span>Sales
                </typography>
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    {/* <Box className="tabbing-head">
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Active" className="tabbings-class" value="1" />
                            <Tab label="Completed" className="tabbings-class" value="2" />
                        </TabList>
                    </Box> */}
                    <Box className="boxtbale">
                        <TabPanel value="1" sx={{ p: 0 }}>
                            <TableContainer>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Services title</TableCell>
                                            <TableCell align="center">Buyer Name</TableCell>
                                            <TableCell align="center">Date</TableCell>
                                            <TableCell align="center">Time</TableCell>
                                            <TableCell align="center">Payment Received</TableCell>
                                            <TableCell align="center">Status</TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {vendorOrder.map((row) => (
                                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell component="th" scope="row">
                                                    {row.gigname}
                                                </TableCell>
                                                <TableCell align="center">{row.username}</TableCell>
                                                <TableCell align="center">{moment(row.reqdate).format('DD-MMM-YYYY')}</TableCell>
                                                <TableCell align="center">{row.reqtime}</TableCell>
                                                <TableCell align="center">${row.amount}</TableCell>
                                                {row.status==1 ? <TableCell align="center">Success</TableCell>:""}
                                                {row.status==0 ? <TableCell align="center">Pending</TableCell>:""}
                                                {row.status==2 ? <TableCell align="center">Failed</TableCell>:""}
                                                {/* <TableCell align="right">
                                                    <Grid item>
                                                        <Typography onClick={handleClick}>
                                                            <MoreVertOutlined
                                                                fontSize="inherit"
                                                                sx={{ color: '#1667FE', fontSize: '18px' }}
                                                            />
                                                        </Typography>
                                                        <Menu
                                                            id="menu-earning-card"
                                                            anchorEl={anchorEl}
                                                            keepMounted
                                                            open={Boolean(anchorEl)}
                                                            onClose={handleClose}
                                                            variant="selectedMenu"
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right'
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right'
                                                            }}
                                                        >
                                                            <MenuItem onClick={handleClose}>
                                                                <Edit sx={{ mr: 1.75 }} /> Edit
                                                            </MenuItem>
                                                            <MenuItem onClick={handleClose}>
                                                                <DeleteOutline sx={{ mr: 1.75 }} /> Delete
                                                            </MenuItem>
                                                        </Menu>
                                                    </Grid>
                                                </TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel value="2" sx={{ p: 0 }}>
                            <TableContainer>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Gigs title</TableCell>
                                            <TableCell align="center">Buyer Name</TableCell>
                                            <TableCell align="center">Date</TableCell>
                                            <TableCell align="center">Time</TableCell>
                                            <TableCell align="center">Payment Received</TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">{row.calories}</TableCell>
                                                <TableCell align="center">{row.fat}</TableCell>
                                                <TableCell align="center">{row.carbs}</TableCell>
                                                <TableCell align="center">{row.protein}</TableCell>
                                                <TableCell align="right">
                                                    <Grid item>
                                                        <Typography onClick={handleClick}>
                                                            <MoreVertOutlined
                                                                fontSize="inherit"
                                                                sx={{ color: '#1667FE', fontSize: '18px' }}
                                                            />
                                                        </Typography>
                                                        <Menu
                                                            id="menu-earning-card"
                                                            anchorEl={anchorEl}
                                                            keepMounted
                                                            open={Boolean(anchorEl)}
                                                            onClose={handleClose}
                                                            variant="selectedMenu"
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right'
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right'
                                                            }}
                                                        >
                                                            <MenuItem onClick={handleClose}>
                                                                <Edit sx={{ mr: 1.75 }} /> Edit
                                                            </MenuItem>
                                                            <MenuItem onClick={handleClose}>
                                                                <DeleteOutline sx={{ mr: 1.75 }} /> Delete
                                                            </MenuItem>
                                                        </Menu>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                    </Box>
                </TabContext>
            </Box>
        </>
    );
}
