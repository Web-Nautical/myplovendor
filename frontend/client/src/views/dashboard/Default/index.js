/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import { gridSpacing } from 'store/constant';
import MoneyReceivedCard from './chart-data/MoneyReceivedCard';
import { ApiService } from 'services/apiservices';
import { useNavigate } from 'react-router';
import constant from 'services/constant';
// ==============================|| DEFAULT DASHBOARD ||============================== //
let apiServices = new ApiService();
const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [VenderData, setVenderData] = useState({});
    const [gigsCount , setgigsCount] = useState("")
    const [messagesCount , setMessagesCount] = useState("")
    const [paymentreceived , setPaymentReceived] = useState("")
    const [totalPaymentAmount , setTotalPaymentAmount] = useState("")
    const [Baseurl , setBaseurl] = useState("")
    const didMountRef = useRef(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (didMountRef.current) {
         
        apiServices.vendordataPostRequest({}).then(res => {
            if (res.data.status == 'success') {
                setLoading(false);
                setVenderData(res.data.vendorData)
                setBaseurl(res.data.baseurl)
            }else if(res.data.message == 'Token Expired'){
                setLoading(false);
                alert(res.data.message);
                localStorage.removeItem('AUTH_TOKEN');
                window.location.href = constant.FRONT_URL;
            }
            })
        apiServices.vendordashboarddata({}).then(res => {
            if (res.data.status == 'success') {
                setgigsCount(res.data.gigsCount)
                setMessagesCount(res.data.messagescount)
                setPaymentReceived(res.data.paymentreceived)
              
            }else if(res.data.message == 'Token Expired'){
                setLoading(false);
                alert(res.data.message);
                localStorage.removeItem('AUTH_TOKEN');
                window.location.href = constant.FRONT_URL;
            }
            })

            apiServices.totalpaymentreceiveddataRequest().then(res=>{
                if(res.data.status == "success"){
                    setTotalPaymentAmount(res.data.totalamount)
                }

            })
        }
        setLoading(false);
        didMountRef.current = false;
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={8} md={8}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <EarningCard isLoading={isLoading} gigsdata={gigsCount} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} messagedata={messagesCount}/>
                    </Grid>
                    <Grid item pt={0} lg={12} md={12} sm={12} xs={12}>
                        <MoneyReceivedCard isLoading={isLoading} paymentdata = {totalPaymentAmount}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={12}>
                        <TotalIncomeDarkCard isLoading={isLoading} vendorData={VenderData} Baseurl={Baseurl}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
