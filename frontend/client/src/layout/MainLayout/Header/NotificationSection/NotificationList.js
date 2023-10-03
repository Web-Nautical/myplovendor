/* eslint-disable */
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';
import moment from 'moment';

// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import User1 from 'assets/images/users/user-round.svg';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ApiService } from 'services/apiservices';
let apiServices = new ApiService();
// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = ({vendororder}) => {
    const theme = useTheme();

    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const chipErrorSX = {
        ...chipSX,
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        marginRight: '5px'
    };

    const chipWarningSX = {
        ...chipSX,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light
    };

    const chipSuccessSX = {
        ...chipSX,
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: 28
    };
    const [trancId , setTrancId] = useState("")
    const [idArray, setIdArray] = useState([]);

    useEffect(() => {
     console.log(vendororder)
}, []);




    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {vendororder.length > 0 ?
            vendororder.map((value)=>(
                
                <Link to ="/utils/sales">
            <ListItemWrapper>
           
                 
                 <>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar alt="John Doe" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary={value.username}/>
                    <ListItemSecondaryAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                {moment(value.created_at).fromNow()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2"><b>Transaction Id</b> : {value._id} </Typography>
                        <Typography variant="subtitle2"><b>Gig Name</b> : {value.gigname}</Typography>
                        <Typography variant="subtitle2"><b>Amount</b> : {value.amount}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {/* <Grid container>
                            <Grid item>
                               

                                <Chip label="Unread" sx={chipErrorSX} />
                            </Grid>
                            <Grid item>
                                <Chip label="New" sx={chipWarningSX} />
                            </Grid>
                        </Grid> */}
                    </Grid>
                </Grid></>
               
            </ListItemWrapper>
            </Link>
            )):<p style={{textAlign:"center"}}>No Notification Found</p>}
            <Divider />
          
        </List>
    );
};

export default NotificationList;
