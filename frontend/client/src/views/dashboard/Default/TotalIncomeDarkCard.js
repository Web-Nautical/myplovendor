/* eslint-disable */
import PropTypes from 'prop-types';
import avtar from '../../../assets/images/Frame (2).png';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { textAlign } from '@mui/system';
import { Block } from '@mui/icons-material';

// assets

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    textAlign: ' center',
    color: 'black',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const TotalIncomeDarkCard = ({ isLoading ,vendorData, Baseurl}) => {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2 }}>
                        <div style={{ textAlign: 'end' }}>
                            <Link to="/editprofile">
                                <Button className="edit-btnnn">
                                    <EditIcon />
                                </Button>
                            </Link>
                        </div>
                        <List sx={{ py: 0 }} className="listblock">
                            <ListItem disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar style={{ textAlign: 'center' }}>
                                    {/* <img src={avtar} alt="avtar" /> */}
                                    <img
                                    src={vendorData.image? Baseurl+vendorData.image : avtar}
                                    height={150}
                                    width={150}
                                    style={{borderRadius: '50%'}}
                                    />  
                                    <ListItemText
                                        sx={{
                                            py: 0,
                                            mt: 0.45,
                                            mb: 0.45
                                        }}
                                        primary={
                                            <Typography variant="h4" sx={{ color: ' #114CC2' }}>
                                                {vendorData.vendorname}
                                            </Typography>
                                        }
                                        secondary={
                                            <p>
                                                <span>{vendorData.vendormobile}</span>
                                                <br />
                                                <span>{vendorData.vendorstate}</span>
                                                <br />
                                                <span>{vendorData.vendoremail}</span>
                                                {/* <br />
                                                <span>State Name</span>
                                                <br />
                                                <span> India</span> */}
                                            </p>
                                        }
                                    />
                                    <Box sx={{ width: '100%', background: '#CEDBF2', borderRadius: '20px', height: 300 }}>
                                        <Typography sx={{ textAlign: 'left', padding: '16px', fontSize: '14px', color: '#4E4E4E' }}>
                                            {vendorData.vendordescription}
                                        </Typography>
                                    </Box>
                                </ListItemAvatar>
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalIncomeDarkCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalIncomeDarkCard;
