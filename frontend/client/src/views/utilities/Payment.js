/* eslint-disable */
import Table from '@mui/material/Table';
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, useMediaQuery, TableContainer } from '@mui/material';
import LockIcon from '@material-ui/icons/Lock';
import DeleteIcon from '@material-ui/icons/Delete';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState,useEffect,useRef} from 'react';
import { ApiService } from 'services/apiservices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loader from "../../assets/images/bankloader.gif";
import constant from 'services/constant';

let apiServices = new ApiService();


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const names = ['Oliver Hansen', 'Van Henry', 'April Tucker'];

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other} className="heading-modal">
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

// payout = () => {
//     const { payoutIsOpen } = this.state;
//     this.setState({
//         payoutIsOpen: !payoutIsOpen,
//         documentImage: '',
//         documentAdditionalImage: ''
//     });
// };

const rows = [
    createData('Gigs Name', 'March 3, 2023', 'Anshul', '$1000', 123456),
    createData('Gigs Name', 'March 3, 2023', 'Anshul', '$1000', 123456),
    createData('Gigs Name', 'March 3, 2023', 'Anshul', '$1000', 123456)
];

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};
const Payments = () => {
    const [personName, setPersonName] = React.useState([]);
    const [vendorbankData , setVendotbankData] = useState([])
    const [loading , setLoading] = useState(false)
const didMountRef = useRef(true)
    useEffect(() => {
        if (didMountRef.current) {
            getvendorbankdata();
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
    const [saveAllPaymentdDetailData , setSaveAllPaymentDetailData] = useState({country:"",email:"",firstname:"",lastname:"",dateofbirth:"",companyname:"",address:"",address1:"",city:"",state:"",country:"",postalcode:"",accountholdername:"",accountnumber:"",routingnumber:"" })
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [businessType , setBusinessType] = useState('company')
    const [pageChange , setPageChange] = useState(0)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpened = () => {
        setOpen(true);
    };
    const getvendorbankdata = () => {
    apiServices.getvendorbankdataRequest({}).then(res => {
        if(res.data.status == 'success'){
            setVendotbankData(res.data.data)
        }
        else if(res.data.message == 'Token Expired'){
            alert(res.data.message);
            localStorage.removeItem('AUTH_TOKEN');
            window.location.href = constant.FRONT_URL;
        }
        
        })
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpened1 = () => {
        apiServices.checkvendoraccountstripe().then(res=>{
            if(res.data.status=="success" && res.data.message == 'ACCOUNT EXISTS'){
                setOpen1(true);
                setPageChange(1);
                setOpen(false);
            }
            else if(res.data.status=="success" && res.data.message == 'ACCOUNT NOT EXISTS'){
                setOpen1(true);
                setPageChange(0);
                setOpen(false);  
            }
            })
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleInput = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setSaveAllPaymentDetailData({ ...saveAllPaymentdDetailData, [key]: value })
        console.log(value)
    }

    const paymentdetailsdata=()=>{
        if(businessType == 'individual'){
            if(saveAllPaymentdDetailData.firstname == ""){
        document.getElementById("firstname").style.border = "3px solid red"
        return false
            }
            if(saveAllPaymentdDetailData.lastname == ""){
        document.getElementById("lastname").style.border = "3px solid red"
        return false
            }
            if(saveAllPaymentdDetailData.dateofbirth == ""){
        document.getElementById("dateofbirth").style.border = "3px solid red"
        return false
            }
        }else{
            if(saveAllPaymentdDetailData.companyname == ""){
                document.getElementById("companyname").style.border = "3px solid red"
                return false
            }
        }

        if(saveAllPaymentdDetailData.address == ""){
            document.getElementById("address").style.border = "3px solid red"
            return false
            }
            if(saveAllPaymentdDetailData.city == ""){
            document.getElementById("city").style.border = "3px solid red"
            return false
            }
            if(saveAllPaymentdDetailData.state == ""){
            document.getElementById("state").style.border = "3px solid red"
            return false
            }
            if(saveAllPaymentdDetailData.postalcode == ""){
            document.getElementById("postalcode").style.border = "3px solid red"
            return false
            }
            setLoading(true)
     
     const dataString ={  
        "email" : saveAllPaymentdDetailData.email,
        "vendorbusinesstype" : businessType , 
        "vendorcompanyname" : saveAllPaymentdDetailData.companyname , 
        "vendorfirstname" : saveAllPaymentdDetailData.firstname , 
        "vendorlastname" : saveAllPaymentdDetailData.lastname , 
        "vendordob": saveAllPaymentdDetailData.dateofbirth,
        "addressline1": saveAllPaymentdDetailData.address,
        "addressline2": saveAllPaymentdDetailData.address1,
        "addresscity": saveAllPaymentdDetailData.city,
        "addressstate": saveAllPaymentdDetailData.state , 
        "addresspostalcode":saveAllPaymentdDetailData.postalcode
    }
    apiServices.addvendorstripedata(dataString).then(res=>{
if(res.data.status=="success"){
    setPageChange(pageChange+1)
    setLoading(false)
}
else if(res.data.status=="error"){
    setLoading(false)
    toast(res.data.message , {
        position: toast.POSITION.TOP_CENTER
    });   
}
})
}
const savebankdetail=()=>{
if(saveAllPaymentdDetailData.accountholdername == ""){
    document.getElementById("accountholdername").style.border= "3px solid red"
    return false
}
if(saveAllPaymentdDetailData.accountnumber == ""){
    document.getElementById("accountnumber").style.border="3px solid red"
    return false
}
if(saveAllPaymentdDetailData.routingnumber == ""){
    document.getElementById("routingnumber").style.border="3px solid red"
}
    const dataString ={
    "accountholdername" : saveAllPaymentdDetailData.accountholdername,
    "accountnumber" : saveAllPaymentdDetailData.accountnumber ,
    "accountroutingnumber" : saveAllPaymentdDetailData.routingnumber
    }
    setLoading(true)

    apiServices.addvendorstripebankdata(dataString).then(res=>{
        if(res.data.status=="success"){
            getvendorbankdata();
            setLoading(false)
            setOpen1(false);
            toast('Payment Details Added Successfully' , {
                position: toast.POSITION.TOP_CENTER
            }); 
        }
        else if(res.data.status=="error"){
            setLoading(false)
            toast(res.data.message , {
                position: toast.POSITION.TOP_CENTER
            });   
        }
        }) 
}

const deletevendorstripebankdata=(bankAccountId)=>{
    const dataString ={
        "bankAccountId" : bankAccountId,
        }
        
    apiServices.deletevendorstripebankdata(dataString).then(res=>{
        if(res.data.status=="success"){
            getvendorbankdata();
            toast('Payment Details Deleted Successfully' , {
                position: toast.POSITION.TOP_CENTER
            }); 
        }
        else if(res.data.status=="error"){
            toast(res.data.message , {
                position: toast.POSITION.TOP_CENTER
            });   
        }
        }) 

}
const setPrimaryAccount=(id)=>{
    const dataString ={
        "bankAccountId": id
    }
    apiServices.setprimaryaccount(dataString).then(res=>{
        if(res.data.status == "success"){
            getvendorbankdata()
        }

    })
}
    return (
        <>
         <ToastContainer />
            <Grid container justifyContent={'space-between'} alignItems={'center'}>
                <div className="section-tittle">
                    <typography variant="h1" className="tittle" sx={{ pt: 0 }}>
                        <span class="shape"></span>Payments
                    </typography>
                </div>
                {/* <button className="paymentMethord" onClick={handleClickOpened}>
                    Payment method
                </button> */}
            </Grid>
            {/* <Box className="boxtbale mt-0">
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Gigs title</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Buyer Name</TableCell>
                                <TableCell align="center">Payment Received</TableCell>
                                <TableCell align="center">Transaction ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.calories}</TableCell>
                                    <TableCell align="center">{row.fat}</TableCell>
                                    <TableCell align="center">{row.carbs}</TableCell>
                                    <TableCell align="center">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box> */}
            <MainCard>
                <Grid container>
                    <div className="nn_edit_sellpromain">
                        <div className="cls_product-list">
                            <div class="nn_edit_proname">Add Payment Method</div>
                            <div className="product-list nn_edit_sellpro">
                                <div className="cls_card-body">
                                    <p>
                                        When you receive a payment for a reservation, we call that payment to you a “payout”. Our secure
                                        payment system supports several payout methods, which can be setup and edited here. Your available
                                        payout options and currencies differ by country.
                                    </p>
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr className="text-truncate">
                                                    <th>Account Holder Name</th>
                                                    <th>Account Number</th>
                                                    <th>Routing Number</th>
                                                    <th>&nbsp;</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {vendorbankData.map((value)=>(
                                                <tr>
                                                    <td>
                                                        {value.accountholdername}
                                                       
                                                    </td>
                                                    <td>{value.accountnumber}</td>
                                                    <td>{value.accountroutingnumber}</td>
                                                    <td className="cls_payout_options">
                                                    {value.primaryaccount == true ?  
                                                        <button>
                                                            <LockIcon style={{ color: '#f53956' }} />
                                                        </button>:""}
                                                        <button onClick={(e) => deletevendorstripebankdata(value.stripebankaccountid)}>
                                                            <DeleteIcon style={{ color: '#000' }} />
                                                        </button>
                                                    </td>
                                                    <td>
                                                   {value.primaryaccount == false?
                                                   <button className="cls_addpayout" onClick={()=>setPrimaryAccount(value._id)}>
                                                   Set Primary 
                                               </button>:''}     
                                                    
                                                    </td>
                                                </tr>))}
                                                
                                            </tbody>
                                        </table>
                                        <div style={{ width: '100%' }}>
                                            <button onClick={handleClickOpened1} className="cls_addpayout">
                                                Add Payment Method 
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </MainCard>
            <BootstrapDialog
                className="modaouter"
                fullScreen={fullScreen}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Payout Method
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <form>
                        <Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
                            <Grid item md={12} justifyContent={'center'} alignItems={'center'}>
                                <Grid container spacing={1.5} className="form-inpitcustom">
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Select
                                                displayEmpty
                                                value={personName}
                                                onChange={handleChange}
                                                input={<OutlinedInput className="form-inpitcustomfiled" />}
                                                renderValue={(selected) => {
                                                    if (selected.length === 0) {
                                                        return <em className="palceholdercss"> Choose Country</em>;
                                                    }
                                                    return selected.join(', ');
                                                }}
                                            >
                                                <MenuItem disabled value="" className="palceholdercss">
                                                    Choose Country
                                                </MenuItem>
                                                {names.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <OutlinedInput placeholder="Address" className="form-inpitcustomfiled" />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <OutlinedInput placeholder="Address" className="form-inpitcustomfiled" />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Select
                                                displayEmpty
                                                value={personName}
                                                onChange={handleChange}
                                                input={<OutlinedInput className="form-inpitcustomfiled" />}
                                                renderValue={(selected) => {
                                                    if (selected.length === 0) {
                                                        return <em className="palceholdercss"> Choose Category</em>;
                                                    }

                                                    return selected.join(', ');
                                                }}
                                            >
                                                <MenuItem disabled value="" className="palceholdercss">
                                                    Choose Category
                                                </MenuItem>
                                                {names.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <OutlinedInput className="form-inpitcustomfiled" placeholder="State / Province" />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <OutlinedInput className="form-inpitcustomfiled" placeholder="Location" />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <OutlinedInput className="form-inpitcustomfiled" placeholder="Phone Number" />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <OutlinedInput className="form-inpitcustomfiled" placeholder="--/--/--" />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    xs={12}
                                    sm={6}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    textAlign={'center'}
                                    margin={'20px auto 0px'}
                                >
                                    <Button className="addgigs">Add</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </BootstrapDialog>
            <BootstrapDialog
                className="modaouter-2"
                fullScreen={fullScreen}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Payout Method
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div>
                        <p className="mt-0">
                            Payouts for sells are released once the product(s) is delivered. The buyer has 2 days (48 hours) to inspect it
                            before the sale is final. If there are no issues and the product(s) is as expected, payment will be deposited
                            into your account within 5 business days. Your bank may require additional processing time. We can send money to
                            you via one of the following methods, which do you prefer?
                        </p>
                        <p>We can send money to people with these payout methods. Which do you prefer</p>
                    </div>
                    <div className="table-responsive">
                        <table id="payout_method_descriptions" className="table table-striped">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Payout Method</th>
                                    <th>Processing time</th>
                                    <th>Additional fees</th>
                                    <th>Currency</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="radio" value="Stripe" name="payout_method" />
                                    </td>
                                    <td className="type">Stripe</td>
                                    <td>5-7 business days</td>
                                    <td>None</td>
                                    <td>USD</td>
                                    <td>Business day processing only; weekends and banking holidays may cause delays</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Grid
                        container
                        xs={12}
                        sm={6}
                        alignItems={'center'}
                        justifyContent={'center'}
                        textAlign={'center'}
                        margin={'20px auto 0px'}
                    >
                        <Button className="addgigs" onClick={handleClickOpened1}>Next</Button>
                    </Grid>
                </DialogContent>
            </BootstrapDialog>
            <BootstrapDialog
                fullScreen={fullScreen}
                onClose={handleClose1}
                aria-labelledby="customized-dialog-title"
                open={open1}
            >
                {pageChange == 0 ?<>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose1}>
                    Payment Details
                </BootstrapDialogTitle>
                <DialogContent dividers>
            <MainCard className="outer-divv">
                <form id="form-file-upload"  onSubmit={(e) => e.preventDefault()}>
                    <Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
             {loading == false ?       
                        <Grid item md={8} justifyContent={'center'} alignItems={'center'}>
                            <Grid container spacing={1}>
                                
                                    <Grid item sm={12} xs={12}>
                                    <FormControl fullWidth>
                                        <Select
                                            displayEmpty
                                            value={businessType}
                                            onChange={handleInput}
                                            input={<OutlinedInput className="form-inpitcustomfiled" />}
                                        >
                                            <MenuItem disabled value="" className="palceholdercss" >
                                                Business Type
                                            </MenuItem>
                                                <MenuItem value="company" onClick={(e) => setBusinessType('company')}>
                                                   Company
                                                </MenuItem>
                                                <MenuItem value="individual"  onClick={(e) => setBusinessType('individual')}>
                                                    Individual
                                                </MenuItem>
                                        </Select>                                        
                                    </FormControl>
                                </Grid>
                              {businessType == 'individual' ?  
                              <>
                                <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="First Name"  className="form-inpitcustomfiled" name="firstname" id='firstname' onChange={handleInput}/>
                                    </FormControl>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="Last Name"  className="form-inpitcustomfiled" name="lastname" id='lastname' onChange={handleInput}/>
                                    </FormControl>
                                    </Grid>
                                    <Grid item sm={12} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="Date of Birth" type='date' className="form-inpitcustomfiled" name="dateofbirth" id='dateofbirth' onChange={handleInput}/>
                                    </FormControl>
                                    </Grid>
                                    </>:""}
                                    {businessType == 'company' ? <>
                                    <Grid item sm={12} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="Company Name"  className="form-inpitcustomfiled" name="companyname" id='companyname' onChange={handleInput}/>
                                    </FormControl>
                                    </Grid>
                                  </>:""}
                                  <Grid item sm={12} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="Address Line1"  className="form-inpitcustomfiled" name="address" id='address' onChange={handleInput}/>
                                    </FormControl>
                                    </Grid>
                                    <Grid item sm={12} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="Address Line2"  className="form-inpitcustomfiled" name="address1" id='address1' onChange={handleInput}/>
                                    </FormControl>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="City"  className="form-inpitcustomfiled" name="city" id='city' onChange={handleInput}/>
                                    </FormControl>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="State"  className="form-inpitcustomfiled" name="state" id='state' onChange={handleInput}/>
                                    </FormControl>
                                    </Grid>
                                   
                                    <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="Postal Code"  className="form-inpitcustomfiled" name="postalcode" id='postalcode' onChange={handleInput}/>
                                    </FormControl>
                                </Grid>
                               
                            </Grid>
                            <Grid
                                container
                                xs={12}
                                sm={6}
                                alignItems={'center'}
                                justifyContent={'center'}
                                textAlign={'center'}
                                margin={'20px auto 0px'}
                             
                            >
                                <Button className="addgigs"    onClick={paymentdetailsdata} >Save</Button>
                                 
                            </Grid>
                        </Grid>
                          :<img src={loader} alt="img" width="90%"/>}
                       
                    </Grid>
                </form>
               

            </MainCard>
                        </DialogContent></>:""}
        {pageChange == 1 ? <>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose1}>
                    Enter Bank Details
                </BootstrapDialogTitle>
                <DialogContent dividers>
            <MainCard className="outer-divv">
                <form id="form-file-upload"  onSubmit={(e) => e.preventDefault()}>
                    <Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
                                {loading == false ?
                        <Grid item md={8} justifyContent={'center'} alignItems={'center'}>
                            <Grid container spacing={1}>
                                <Grid item sm={12} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="Acount Holder Name"  className="form-inpitcustomfiled" name="accountholdername" id='accountholdername' onChange={handleInput}/>
                                    </FormControl>
                                    </Grid>  
                                    <Grid item sm={12} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="Account Number"  className="form-inpitcustomfiled" name="accountnumber" id='accountnumber' onChange={handleInput}/>
                                    </FormControl>
                                    </Grid>   
                                    <Grid item sm={12} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="Routing Number"  className="form-inpitcustomfiled" name="routingnumber" id='routingnumber' onChange={handleInput}/>
                                    </FormControl>
                                    </Grid>   
                             </Grid>
                            <Grid
                                container
                                xs={12}
                                sm={6}
                                alignItems={'center'}
                                justifyContent={'center'}
                                textAlign={'center'}
                                margin={'20px auto 0px'}
                            >
                                <Button className="addgigs" onClick={savebankdetail}>Save</Button>
                            </Grid>
                        </Grid>  :<img src={loader} alt="img" width="90%"/>}
                    </Grid>
                </form>
            </MainCard>
                    
                </DialogContent>
                </>
            :""}
            </BootstrapDialog>
        </>
    );
};

export default Payments;


