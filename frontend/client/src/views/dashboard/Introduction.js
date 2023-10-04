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
            <Grid container  >
                            

                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className="outer-mebreships">
                        <div className='text-center'>
                         <h3 className='mt-0 mb-3'>Introduction Content or Video</h3>
                            <p className="mt-0 mb-4">{introductionData.vendor_intro}
                            </p>
                            <video src={introductionData.video != null ?baseUrl+introductionData.video:""} alt="card-logo" controls width={300} />

                               
                        </div>

                    </div>
                </Grid>
            </Grid>
        </MainCard>
        </>
    );
};

export default Introduction;
