/* eslint-disable */

import React, { useEffect, useState, useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, Grid } from '@mui/material';
import LoginCard from 'ui-component/cards/LoginCard';
import { ApiService } from 'services/apiservices';
import { useNavigate, useParams } from 'react-router';
import constant from 'services/constant';

let apiServices = new ApiService();

function Login() {
    const didMountRef = useRef(true);
    const[VendorEmail, SetVendorEmail] = useState('');
    const[VendorPassword, SetVendorPassword] = useState('');
    const {id} = useParams()

    const navigate = useNavigate();

    useEffect(() => {
        
        if (didMountRef.current) {
            console.log(id)
            if(localStorage.getItem('AUTH_TOKEN') != null){
                navigate('/dashboard')
            }
            if(id && id !== undefined){
                localStorage.setItem('AUTH_TOKEN', id);
                navigate('/dashboard')
            }
           
        }
        didMountRef.current = false;
      });

    // handle drag events
    const loginprocess = function (e) {
        if (VendorEmail == '' || VendorPassword == '') {
            alert("Pleast Enter Email Or Password");
            return false;
        }
        const dataString = {
            "vendoremail": VendorEmail,
            "vendorpassword": VendorPassword
        }
        apiServices.vendorloginPostRequest(dataString).then(res => {
            console.log(res);
            if (res.data.status == 'success') {
                localStorage.setItem('AUTH_TOKEN', res.data.Authtoken);
                navigate('/dashboard')
            }else{
                alert(res.data.message)
            }
            })
            .catch(error => {
            })
    }
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    return (
        <>
            {/* <div className="section-tittle">
                <typography variant="h1" className="tittle" sx={{ pt: 0 }}>
                    <span class="shape"></span>Login
                </typography>
            </div>

            <LoginCard className="outer-divv">
                    <Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
                        <Grid item md={4} justifyContent={'center'} alignItems={'center'}>
                            <Grid container spacing={1}>
                                <Grid item sm={12} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="Email" onChange={(e)=>SetVendorEmail(e.target.value)} className="form-inpitcustomfiled" />
                                    </FormControl>
                                </Grid>
                                <Grid item sm={12} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="Password" type="password" onChange={(e)=>SetVendorPassword(e.target.value)} className="form-inpitcustomfiled" />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button className="editprofile mt-sm-3 mt-3" onClick={loginprocess}>Login</Button>
                            </Grid>
                        </Grid>
                    </Grid>
            </LoginCard> */}
        </>
    );
}
export default Login;
