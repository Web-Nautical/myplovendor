/* eslint-disable */
import React,{useState , useEffect , useRef} from 'react';
import { Button, Card, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import logo from '../../assets/images/Frame (4).png';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from "./PaymentForm"
import moment from 'moment';
import constant from 'services/constant';
import { ApiService } from 'services/apiservices';
let apiServices = new ApiService();
const names1 = ['1', '2', '3'];
const names2 = ['2013', '2014', '2015'];
const stripePromise  = loadStripe('pk_test_txDJRlXoAFelCWzOrBdENCRS');
const Membership = () => {
    const [handleopen, sethandleopen] = useState(false);
    const [vendorData , setVendorData] = useState({})    
    const [personName, setPersonName] = React.useState([]);
    const [loader , setLoader] = useState(false)
    const [baseUrl , setBaseUrl] = useState("")
    const didMountRef = useRef(true);
    const handleshow = () => {
        sethandleopen(true);
    };
    useEffect(() => {
        if (didMountRef.current) {
            apiServices.vendordataPostRequest({}).then(res => {
                if (res.data.status == 'success') {
                    setVendorData(res.data.vendorData); 
                    setBaseUrl(res.data.baseurl)
                }
                else if(res.data.message == 'Token Expired'){
                    alert(res.data.message);
                    localStorage.removeItem('AUTH_TOKEN');
                    window.location.href = constant.FRONT_URL;
                }
            })
        }
        didMountRef.current = false;
    }, []);
    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };
   const handleLoader = (value)=>{
        setLoader(value)
    }
    return (
        <>
         
        {loader == false ?
        <>
            <div className="section-tittle">
                <typography variant="h1" className="tittle" sx={{ pt: 0 }}>
                    <span class="shape"></span>Membership
                </typography>
            </div>
            <MainCard className="padding-main">
                <Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
                    <Grid item lg={5} md={6} sm={7} xs={12} justifyContent={'center'} alignItems={'center'}>
                        <div className="outer-mebreships">
                            <div className="member-card">
                                <img src={vendorData.image !== null ?baseUrl+vendorData.image :logo} alt="card-logo" />

                                <p className="card-desc">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                    industry's standard dummy text ever since the 1500s,
                                </p>
                                <h4 className="amount-text">
                                    $0.99 <span className="amount">/month</span>
                                </h4>
                                <p className="plac-deactive">Plan expired on {moment(vendorData.membershipenddate).format('YYYY-MMM-DD')}</p>
                                <Elements stripe={stripePromise}>
                                <PaymentForm setLoader={handleLoader}/>
                               </Elements>
                                {/* <button className="member-btn" onClick={handleshow}>
                                    Purchase Plan
                                </button> */}                               
                            </div>
                            {handleopen && (
                                <Grid container spacing={1.5} className="form-inpitcustom">
                                    <Grid item xs={12}>
                                        <FormControl fullWidth sx={{ mt: 2 }}>
                                            <OutlinedInput placeholder="Card Number" className="form-inpitcustomfiled" />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1.5}>
                                            <Grid item xs={12} sm={4}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        displayEmpty
                                                        value={personName}
                                                        onChange={handleChange}
                                                        input={<OutlinedInput className="form-inpitcustomfiled" />}
                                                        renderValue={(selected) => {
                                                            if (selected.length === 0) {
                                                                return <em className="palceholdercss">MM</em>;
                                                            }
                                                            return selected.join(', ');
                                                        }}
                                                    >
                                                        <MenuItem disabled value="" className="palceholdercss">
                                                            MM
                                                        </MenuItem>
                                                        {names1.map((name) => (
                                                            <MenuItem key={name} value={name}>
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        displayEmpty
                                                        value={personName}
                                                        onChange={handleChange}
                                                        input={<OutlinedInput className="form-inpitcustomfiled" />}
                                                        renderValue={(selected) => {
                                                            if (selected.length === 0) {
                                                                return <em className="palceholdercss">Year</em>;
                                                            }

                                                            return selected.join(', ');
                                                        }}
                                                    >
                                                        <MenuItem disabled value="" className="palceholdercss">
                                                            Year
                                                        </MenuItem>
                                                        {names2.map((name) => (
                                                            <MenuItem key={name} value={name}>
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FormControl fullWidth>
                                                    <OutlinedInput placeholder="CVV" className="form-inpitcustomfiled" />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container alignItems={'center'} justifyContent={'center'}>
                                        <Grid item lg={6} md={7} sm={7} sx={12}>
                                            <Button className="cls_addpayout w-100">Purchase</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </MainCard>
            </>
            :
          <span class="loader"></span>}
        </>
    );
};

export default Membership;
