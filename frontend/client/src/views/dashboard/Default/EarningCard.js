/* eslint-disable */
import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from '../../../assets/images/img-gigs.svg';

import ArrowUpwardIcon from '../../../assets/images/arrow-svg.svg';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: '#1965FE',
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: '#114CC2',
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: '#1758DC',
        borderRadius: '50%',
        top: -106,
        right: -40,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading,gigsdata}) => {
   const gotogigs=()=>{
        window.location.href = "gigs/viewgigs"
    }
    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false} style={{ height: '200px', width: '100%', borderRadius: '20px' }}>
                    <Box sx={{ p: 2.25 }}>
                       
                        <Grid container direction="column" >
                            <Grid item>
                                <Grid container justifyContent="space-between"  onClick= {gotogigs} >
                                    <Grid item>
                                        <div style={{ marginTop: '15px' }}>
                                            <img src={EarningIcon} alt="Notification" />
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item container justifyContent={'space-between'}>
                                <Grid item alignItems="center" className="dflex-css">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '1.325rem', fontWeight: 400, mr: 1, mt: 1, mb: 0.75 }}>Services</Typography>
                                    </Grid>
                                    <Grid item>
                                        <img src={ArrowUpwardIcon} alt="arrow" width="25px" style={{ marginTop: '12px' }} />
                                    </Grid>
                                </Grid>
                                <Grid item textAlign={'center'}>
                                    <Typography sx={{ fontSize: '1.65rem', fontWeight: 500, mt: 1 }}>{gigsdata}</Typography>
                                    <Typography sx={{ fontSize: '1rem', fontWeight: 400, mb: 0.75 }}>Total Services</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                      
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EarningCard;
