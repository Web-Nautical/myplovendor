/* eslint-disable */
import { Grid } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import logo from '../../assets/images/video.mp4';
import { ApiService } from 'services/apiservices';

let apiServices = new ApiService();

// material-ui

const Introduction = () => {
const didMountRef = useRef(true)
const [introductionData , setIntroductionData] = useState({})
const [baseUrl , setBaseUrl] = useState("")
    useEffect(() => {
        if (didMountRef.current) {
            apiServices.getVendorSiteDataGetRequest({}).then(res => {
                if (res.data.status == 'success') {
                    setIntroductionData(res.data.data); 
                    setBaseUrl(res.data.baseurl)
                }
            
            })
        }
        didMountRef.current = false;
    }, []);
  
    return (
        <>
        <div className="section-tittle">
            <typography variant="h1" className="tittle" sx={{ pt: 0 }}>
                <span class="shape"></span>Introduction
            </typography>
        </div>
        <MainCard className="padding-main">
            <Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
                            

                <Grid item lg={5} md={6} sm={7} xs={12} justifyContent={'center'} alignItems={'center'}>
                    <div className="outer-mebreships">
                        <div className="member-card">
                         
                            <p className="card-desc">
                               {introductionData.vendor_intro}
                            </p>
                            <video src={introductionData.video != null ?baseUrl+introductionData.video:""} alt="card-logo" controls height={200} width={200} />

                               
                        </div>

                    </div>
                </Grid>
            </Grid>
        </MainCard>
        </>
    );
};

export default Introduction;
