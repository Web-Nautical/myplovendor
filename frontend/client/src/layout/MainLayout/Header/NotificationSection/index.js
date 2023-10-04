/* eslint-disable */
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    ButtonBase,
    CardActions,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';
import { ApiService } from 'services/apiservices';

// assets
import { IconBell } from '@tabler/icons';
let apiServices = new ApiService();
// notification status options
const status = [
    {
        value: 'all',
        label: 'All Notification'
    },
    {
        value: 'new',
        label: 'New'
    },
    {
        value: 'unread',
        label: 'Unread'
    },
    {
        value: 'other',
        label: 'Other'
    }
];

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [notificationData , setNotificationData] = useState([])
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleClose = (event) => {
        // if (anchorRef.current && anchorRef.current.contains(event.target)) {
        //     return;
        // }
        setOpen(false);
    };
    

    const prevOpen = useRef(open);
    useEffect(() => {
            // anchorRef.current.focus();
            NotificationListData() 
    }, []);

    const handleChange = (event) => {
        if (event?.target.value) setValue(event?.target.value);
    };
    const handleOpen=()=>{
        setOpen(true)
        const dataString={
        
        }
        apiServices.orderstatus(dataString).then(res=>{
            if(res.data.status == "success"){
                // NotificationListData() 
            }
        })
    }
 const NotificationListData=()=>{
    const dataString={
    }
    apiServices.getnotificationdataGetRequest(dataString).then(res=>{
        if(res.data.status == "success"){
            setNotificationData(res.data.data) 
        }
    })
 }
    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleOpen}>
                    <IconBell stroke={1.6} size="1.8rem" style={{ color: 'white' }} />
                    {notificationData.length > 0 ?
                    <span className="MuiBadge-badge-177 MuiBadge-colorPrimary-177" style={{top: "-11px",right:"-11px", width:"22px",height: "22px", display: "flex",zIndex:"1",position: "absolute",
    flexWrap: "wrap",
    fontSize: "0.75rem",
    alignItems: "center",
    fontFamily: "Roboto Helvetica Arial sans-serif",
    alignContent: "center",
    borderRadius: "50%",
    flexDirection: "row",
    justifyContent: "center",backgroundColor:"#e71de1"}}>{notificationData.length}</span>:""}
                </ButtonBase>
                 
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
                style={{top:"70px" , right:"15px" , left: "auto" , width: "320px"
            }}
            >
                {({ TransitionProps }) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps} >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]} >
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                                                <Grid item>
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography variant="subtitle1">All Notification</Typography>
                                                        {notificationData.length > 0 ?
                                                        <Chip
                                                            size="small"
                                                            label={notificationData.length}
                                                            sx={{
                                                                color: theme.palette.background.default,
                                                                bgcolor: theme.palette.warning.dark
                                                            }}
                                                        />:""}
                                                    </Stack>
                                                </Grid>
                                                {/* <Grid item>
                                                    <Typography component={Link} to="#" variant="subtitle2" color="primary">
                                                        Mark as all read
                                                    </Typography>
                                                </Grid> */}
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <PerfectScrollbar
                                                style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}
                                            >
                                                {/* <Grid container direction="column" spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Box sx={{ px: 2, pt: 0.25 }}>
                                                            <TextField
                                                                id="outlined-select-currency-native"
                                                                select
                                                                fullWidth
                                                                value={value}
                                                                onChange={handleChange}
                                                                SelectProps={{
                                                                    native: true
                                                                }}
                                                            >
                                                                {status.map((option) => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </TextField>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} p={0}>
                                                        <Divider sx={{ my: 0 }} />
                                                    </Grid>
                                                </Grid> */}
                                                <NotificationList vendororder={notificationData}/>
                                            </PerfectScrollbar>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    {/* <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                        <Button size="small" disableElevation>
                                            View All
                                        </Button>
                                    </CardActions> */}
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default NotificationSection;
