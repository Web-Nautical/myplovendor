/* eslint-disable */
import React, {useState , useEffect , useRef}from 'react';
import icon from '../../assets/images/Frame (2).png';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import { Button, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { ApiService } from 'services/apiservices';
import { useNavigate } from 'react-router';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import constant from 'services/constant';

let apiServices = new ApiService();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));
function EditProfile() {
    const navigate = useNavigate();
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    const [VenderData , setVenderData] = useState({vendorname:"" , vendormobile:"", vendoraddress:"" , vendoremail:"" , vendorstate:"", vendorcountry:"" , vendordescription:"",image:""})
    const [vendorName , setvendorName] = useState("") 
    const [vendorUrl , setvendorUrl] = useState("") 
    const [statesData , setStatesData] = useState([])
    const didMountRef = useRef(true)
    const [previewImage, setPreviewImage] = useState(null);
    const [open, setOpen] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        if (didMountRef.current) {
            apiServices.vendordataPostRequest({}).then(res => {
                if (res.data.status == 'success') {
                    setvendorUrl(res.data.baseurl)
                    console.log(res.data.vendorData.companyname)
                    setvendorName(res.data.vendorData.vendorname)
                    setVenderData({vendorname:res.data.vendorData.vendorname , vendormobile:res.data.vendorData.vendormobile, vendoraddress:res.data.vendorData.vendoraddress , vendoremail:res.data.vendorData.vendoremail , vendorstate:res.data.vendorData.vendorstate, vendorcountry:res.data.vendorData.vendorcountry , vendordescription:res.data.vendorData.vendordescription, image: res.data.vendorData.image})
                }else if(res.data.message == 'Token Expired'){
                    alert(res.data.message);
                    localStorage.removeItem('AUTH_TOKEN');
                    window.location.href = constant.FRONT_URL;
                }
                })
                apiServices.getstatesdataGetRequest().then(res => {
                    if (res.data.status == 'success') {
                        setStatesData(res.data.data)
                    }
                    })

        }
        didMountRef.current = false;
    }, []);

    const handleInput = (e) => {
        console.log('sdsdf');
        const key = e.target.name;
        const value = e.target.value;
        setVenderData({ ...VenderData, [key]: value })
    }

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const submitalldata=()=>{
       console.log(previewImage)
        if(VenderData.vendorname == ""){
            document.getElementById("vendorname").style.border = "2px solid red"
            return false
        }
            if(VenderData.vendormobile == ""){
                document.getElementById("vendormobile").style.border = "2px solid red"
                return false
            }
                if(VenderData.vendoraddress == ""){
                    document.getElementById("vendoraddress").style.border = "2px solid red"
                    return false
                }
                if(VenderData.vendoremail == ""){
                    document.getElementById("vendoremail").style.border = "2px solid red"
                    return false
                }
                const formData = new FormData();
                formData.append('vendorname', VenderData.vendorname);
                formData.append('vendoraddress',  VenderData.vendoraddress);
                formData.append('vendormobile', VenderData.vendormobile);
                formData.append('vendordescription', VenderData.vendordescription);
                formData.append('vendorstate', VenderData.vendorstate);
                formData.append('vendorcountry', VenderData.vendorcountry);
                formData.append('vendorimage', previewImage);
            apiServices.updatevendordata(formData).then(res=>{
                if(res.data.status== "success"){
                    handleOpen()
                    
                }
                else if(res.data.message == 'Token Expired'){
                    alert(res.data.message);
                    localStorage.removeItem('AUTH_TOKEN');
                    window.location.href = constant.FRONT_URL;
                }

            })
          
    }

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // handleFiles(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // handleFiles(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };
    const handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        setPreviewImage(imageFile);
        // No need to display the image here; it will be automatically updated in your render method
      };
    return (
        <>
            <div className="section-tittle">
                <typography variant="h1" className="tittle" sx={{ pt: 0 }}>
                    <span class="shape"></span>Edit Profile
                </typography>
            </div>

            <MainCard className="outer-divv">
                <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                    <Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
                        <Grid item md={8} justifyContent={'center'} alignItems={'center'}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} textAlign={'center'}>
                                    <div className="data">
                                    {previewImage != null?
                                    <img
                                    src={URL.createObjectURL(previewImage)}
                                    alt="Preview"
                                    onClick={() => inputRef.current.click()} // Trigger file input click when the image is clicked
                                    height={150}
                                    width={150}
                                    style={{borderRadius: "50%", objectFit: "cover"}}
                                    />:  
                                    <img
                                    src={VenderData.image?vendorUrl + VenderData.image : icon}
                                    onClick={() => inputRef.current.click()} // Trigger file input click when the image is clicked
                                    height={150}
                                    width={150}
                                    style={{borderRadius: '50%', objectFit: "cover"}}
                                    />   
                                    }  
                                                                     
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        ref={inputRef} // Add this ref
                                        style={{ display: 'none' }}
                                        />

                                        <h4 style={{ color: '#114CC2' }} className="mt-3 mb-4">
                                            {vendorName}
                                        </h4>
                                    </div>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput  onChange={handleInput} className="form-inpitcustomfiled" value={VenderData.vendorname} name="vendorname" id="vendorname"/>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="789107345" className="form-inpitcustomfiled" value={VenderData.vendormobile} type="number" name="vendormobile"id='vendormobile' onChange={handleInput} />
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="Location" className="form-inpitcustomfiled" value={VenderData.vendoraddress}  name="vendoraddress"  id="vendoraddress" onChange={handleInput}/>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput disabled placeholder="Email" v className="form-inpitcustomfiled" value={VenderData.vendoremail}  name="vendoremail" onChange={handleInput} id="vendoremail"/>
                                    </FormControl>
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                <FormControl fullWidth>
                                        <Select 
                                            displayEmpty
                                            name="vendorstate"
                                            id="vendorstate"
                                        
                                            value={VenderData.vendorstate}
                                            onChange={handleInput} 
                                            input={<OutlinedInput className="form-inpitcustomfiled" />}
                                        >
                                            <MenuItem disabled value="" className="palceholdercss" name="category">
                                                Choose States
                                            </MenuItem>
                                            {statesData.map((value , index) => (
                                                <MenuItem key={index} value={value.name}>
                                                    {value.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput placeholder="Country" className="form-inpitcustomfiled" name='vendorcountry' value={VenderData.vendorcountry} onChange={handleInput}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput multiline rows={4} className="form-inpitcustomfiled" placeholder="Description"  value={VenderData.vendordescription} name='vendordescription' onChange={handleInput}/>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button className="editprofile mt-sm-3 mt-3" onClick={submitalldata}>Save</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </MainCard>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modaldelete"
            >
                <Box sx={style} className="modaldelete-inner">
                    <Typography className="modal-modal-title" id="modal-modal-title" variant="h3" component="h2" textAlign={'center'}>
                        Profile updated successfully
                    </Typography>
                    <div style={{ textAlign: 'end' }} className="sav_chang">
                        <a href="/dashboard"  className="gigsEdit btn-1">
                            Ok
                        </a>
                        
                    </div>
                </Box>
            </Modal>
        </>
    );
}
export default EditProfile;
