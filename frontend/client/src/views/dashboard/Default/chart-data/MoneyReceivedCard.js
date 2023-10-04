/* eslint-disable */
import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from '../../../../assets/images/dollar-wallet.svg';

import ArrowUpwardIcon from '../../../../assets/images/arrow-svg.svg';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const percentage = '10000$';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: '#1965FE',
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 419,
        height: 419,
        background: '#114CC2',
        borderRadius: '50%',
        top: -106,
        right: -120,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 419,
        height: 419,
        background: '#1758DC',
        borderRadius: '50%',
        top: -170,
        right: -60,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const MoneyReceivedCard = ({ isLoading , paymentdata}) => {
    const gotopayments=()=>{
        window.location.href = "utils/payments"
    }
    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <>
                    <div className="section-tittle">
                        <h2 className="tittle">
                            <span class="shape"></span>Gigs Payment Received
                        </h2>
                    </div>
                    <CardWrapper border={false} content={false} style={{ height: '220px', borderRadius: '20px' }}>
                        <Box sx={{ pt: 2.25, pl: 2.25, pr: 3, pb: 2.25, position: 'relative', zIndex: 1 }}>
                            <Grid container direction="column">
                                <Grid container justifyContent="space-between" onClick={gotopayments}>
                                    <Grid item>
                                        <Grid item>
                                            <Grid container justifyContent="space-between">
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
                                                    <Typography sx={{ fontSize: '1.325rem', fontWeight: 400, mr: 1, mt: 1, mb: 0.75 }}>
                                                        Payment
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <img src={ArrowUpwardIcon} alt="arrow" width="25px" style={{ marginTop: '12px' }} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <div label="Stroke width" className="progres-outer">
                                            <CircularProgressbar value={percentage} strokeWidth={5} color="secondary" />
                                            <div className="progress-data">
                                                <Typography sx={{ fontSize: '2rem', fontWeight: 600 }}>{paymentdata}$</Typography>
                                                <Typography sx={{ fontSize: '1rem', fontWeight: 400 }}>Payments Received</Typography>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardWrapper>
                </>
            )}
        </>
    );
};

MoneyReceivedCard.propTypes = {
    isLoading: PropTypes.bool
};

export default MoneyReceivedCard;
