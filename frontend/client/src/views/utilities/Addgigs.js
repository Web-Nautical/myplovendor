/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import icon from '../../assets/images/img-upload.png';
import loader1   from '../../assets/images/loader.jpg';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { Button, Grid, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { ApiService } from 'services/apiservices';
import { useNavigate, useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
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
const names = ['Oliver Hansen', 'Van Henry', 'April Tucker'];
function Addgigs() {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    const [addGigImage, setAddGigImage] = useState([])
    // ref
    const inputRef = React.useRef(null);
    const videoinputRef = React.useRef(null);
    const didMountRef = useRef(true);
    const [GigsVendorCatData, setGigsVendorCatData] = useState([]);
    const [GigsVendorSubCatData, setGigsVendorSubCatData] = useState([]);

    const [GigsData, SetGigsData] = useState({ title: '', category: '', subcategory: '', price: '', description: '', location: '' });
    const [pageChange, setPageChange] = useState(0)
    const [source, setSource] = React.useState();
    const [SourceFile, setSourceFile] = useState();
    const [stateData, setStatesData] = useState([])
    const [open, setOpen] = useState(false)
    const [loader , setLoader] = useState(false)
    const [isUploadDisabled, setIsUploadDisabled] = useState(false);
    const navigate = useNavigate();
    const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;
    const videoMimeType = /video\/(mp4)/i;

    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        setOpen(true);
    }
    useEffect(() => {
        if (didMountRef.current) {
            // setIsUploadDisabled(false);
            apiServices.gigsvendorcatdataRequest().then(res => {
                if (res.data.status == 'success') {
                    console.log(GigsData);
                    setGigsVendorCatData(res.data.data)
                } else if (res.data.message == 'Token Expired') {
                    alert(res.data.message);
                    localStorage.removeItem('AUTH_TOKEN');
                    window.location.href = constant.FRONT_URL;
                }
            })
            apiServices.checkuserbankexists().then(res => {
                if (res.data.status == "success") {
                    if (res.data.message == "NO BANK FOUND")
                        handleOpen()
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

        const key = e.target.name;
        const value = e.target.value;
        SetGigsData({ ...GigsData, [key]: value })
    }
    const submitgigsdata = function (e) {
        console.log(SourceFile);
        if (GigsData.title == "") {
            document.getElementById("title").style.border = "2px solid red"
            return false

        }
        else if (GigsData.category == "") {
            document.getElementById("category").style.border = "2px solid red"
            return false
        }
        else if (GigsData.subcategory == "") {
            document.getElementById("subcategory").style.border = "2px solid red"
            return false
        }
        else if (GigsData.price == "") {
            document.getElementById("price").style.border = "2px solid red"
            return false
        }
        else if (GigsData.location == "") {
            document.getElementById("location").style.border = "2px solid red"
            return false
        }
        else if (GigsData.description == "") {
            document.getElementById("description").style.border = "2px solid red"
            return false
        }
        else {

            setLoader(true)
            const formData = new FormData();
            for (let i = 0; i < addGigImage.length; i++) {
                formData.append("image[]", addGigImage[i]);
            }
            formData.append('title', GigsData.title);
            formData.append('category', GigsData.category);
            formData.append('subcategory', GigsData.subcategory);
            formData.append('price', GigsData.price);
            formData.append('description', GigsData.description);
            formData.append('location', GigsData.location);
            formData.append('video', SourceFile);
            apiServices.addgigsdataPostRequest(formData).then(res => {
                if (res.data.status == 'success') {
                    navigate('/gigs/viewgigs');
                    setGigsVendorSubCatData(res.data.data)
                    setLoader(false)
                } else if (res.data.message == 'Token Expired') {
                    alert(res.data.message);
                    localStorage.removeItem('AUTH_TOKEN');
                    window.location.href = '/';
                    setLoader(false)
                }

            })
        }

    }
    const getgigvendorsubcats = function (cat_id) {
        const datastring = {
            parentcat: cat_id
        }
        apiServices.getvendorsubcatdata(datastring).then(res => {
            if (res.data.status == 'success') {
                console.log(GigsData);
                setGigsVendorSubCatData(res.data.data)
            } else if (res.data.message == 'Token Expired') {
                alert(res.data.message);
                localStorage.removeItem('AUTH_TOKEN');
                window.location.href = '/';
            }
        })
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



    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // handleFiles(e.dataTransfer.files);
        }
    };



    const gigsvendorcatdata = () => {
        inputRef.current.click();
    };

    // triggers when file is selected with click

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    const handleImage = (e) => {

        //     const file = e.target.files[0];
        //      if (!file.type.match(imageMimeType)) {
        //   alert("Invalid Image Format, supported formats are png | jpg | jpeg | webp.");
        //   return;
        //      }

        // setAddGigImage((addGigImage) => [...addGigImage , e.target.files]);
        setAddGigImage((addGigImage) => [...addGigImage, ...e.target.files])
        console.log(e.target.files)

    }

    const handlevideofile = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
        setSourceFile(file);
        console.log(url)
    }

    const handleUpload = async e => {
        e.current.click();
        // setIsUploadDisabled(false);
    };

    const selectbankdetail = () => {

        setPageChange(pageChange + 1)
    }

    const banknotfound = () => {

        navigate("/utils/payments")
    }
    const handleDeleteImage = (indexToRemove) => {
        console.log(inputRef.current.value)
        if (inputRef.current) {
            inputRef.current.value = '';
            // setIsUploadDisabled(true);
        }
       const newImages = [...addGigImage];
        newImages.splice(indexToRemove, 1);
        setAddGigImage(newImages);
    };

    return (
        <>
        {loader == false ?
        <>
            <div className="section-tittle">
                <typography variant="h1" className="tittle" sx={{ pt: 0 }}>
                    <span class="shape"></span>Add Services
                </typography>
            </div>
            {pageChange == 0 ?
                <MainCard className="outer-divv">
                    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                        <Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
                            <Grid item md={8} justifyContent={'center'} alignItems={'center'}>
                                <Grid container justifyContent={'center'} marginBottom={'20px'}>
                                    <Grid item lg={8} sm={12} xs={12} className="fileuplod-input pr-lg-3 h-100">
                                        <input ref={inputRef} type="file" id="input-file-upload1" onChange={handleImage} multiple />
                                        <label id="label-file-upload" htmlFor="input-file-upload1" className={dragActive ? 'drag-active' : ''}>
                                            {addGigImage.length > 0 ?
                                                <div className="datafile">
                                                    <div className='uploadfiels'>
                                                        {addGigImage.map((value, index) => (
                                                            <div>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="16" onClick={() => handleDeleteImage(index)}><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" /></svg>
                                                                <img src={URL.createObjectURL(value)} alt="img" onClick={(e) => handleUpload(inputRef)}/>

                                                            </div>
                                                        ))}
                                                    </div>
                                                    <h4>Drag and drop, or browse</h4>
                                                    <p>Upload up to 10 photos of what you're selling.</p>
                                                </div>
                                                : <div className="datafile">
                                                    <img src={icon} alt="img" onClick={(e) => handleUpload(inputRef)} />
                                                    <h4>Drag and drop, or browse</h4>
                                                    <p>Upload up to 10 photos of what you're selling.</p>
                                                </div>}
                                        </label>
                                        {dragActive && (
                                            <div
                                                id="drag-file-element"
                                                onDragEnter={handleDrag}
                                                onDragLeave={handleDrag}
                                                onDragOver={handleDrag}
                                                onDrop={handleDrop}
                                            ></div>
                                        )}
                                    </Grid>

                                    <Grid item lg={4} sm={12} xs={12} className="fileuplod-input h-100 mt-3 mt-lg-0">
                                        <input ref={videoinputRef} type="file" id="input-file-upload" onChange={handlevideofile} accept=".mov,.mp4" />
                                        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? 'drag-active' : ''}>

                                            <div className="datafile">
                                                    {source != null ?
                                                <div className='uploadfielsvideo'>
                                                   
                                                        <video
                                                            width="100%"
                                                            height="92px"
                                                            controls
                                                            src={source}
                                                            onClick={(e) => handleUpload(videoinputRef)}
                                                        /></div>
                                                        :
                                                        <>
                                                            
                                                            <img src={icon} alt="img" onClick={(e) => handleUpload(videoinputRef)}
                                                            /></>}
                                            

                                                    <h4>Drag and drop, or browse</h4>
                                                    <p>Upload video of what you're selling.</p>
                                            </div>
                                        </label>
                                        {dragActive && (
                                            <div
                                                id="drag-file-element"
                                                onDragEnter={handleDrag}
                                                onDragLeave={handleDrag}
                                                onDragOver={handleDrag}
                                                onDrop={handleDrop}
                                            ></div>
                                        )}
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1.5} className="form-inpitcustom">
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <OutlinedInput placeholder="Title" onChange={handleInput} name="title" className="form-inpitcustomfiled" id="title" />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Select
                                                displayEmpty
                                                value={GigsData.category}
                                                // onChange={handleInput}
                                                name="category"
                                                onChange={(e) => {
                                                    handleInput(e);
                                                    getgigvendorsubcats(e.target.value);
                                                }}
                                                input={<OutlinedInput className="form-inpitcustomfiled" />}
                                            // renderValue={(selected) => {
                                            //     if (selected.length === 0) {
                                            //         return <em className="palceholdercss"> Choose Category</em>;
                                            //     }

                                            //     return selected.join(', ');
                                            // }}
                                            >
                                                <MenuItem disabled value="" className="palceholdercss">
                                                    Choose Category
                                                </MenuItem>
                                                {GigsVendorCatData.map((key, index) => (
                                                    <MenuItem key={index} value={key._id}>
                                                        {key.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Select
                                                id="subcategory"
                                                displayEmpty
                                                value={GigsData.subcategory}
                                                onChange={handleInput} name="subcategory"
                                                input={<OutlinedInput className="form-inpitcustomfiled" />}
                                            // renderValue={(selected) => {
                                            //     if (selected.length === 0) {
                                            //         return <em className="palceholdercss"> Choose Category</em>;
                                            //     }

                                            //     return selected.join(', ');
                                            // }}
                                            >
                                                <MenuItem disabled value="" className="palceholdercss">
                                                    Choose SubCategory
                                                </MenuItem>
                                                {GigsVendorSubCatData.map((value, index) => (
                                                    <MenuItem key={index} value={value._id}>
                                                        {value.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <OutlinedInput
                                                className="form-inpitcustomfiled"
                                                onChange={handleInput} name="price"
                                                type='number'
                                                placeholder="Price"
                                                endAdornment={<InputAdornment position="end">$</InputAdornment>}
                                                id="price"
                                            />
                                        </FormControl>
                                    </Grid>
                                    {/* <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <OutlinedInput
                                            className="form-inpitcustomfiled"
                                            onChange={handleInput} 
                                            name="location"
                                            placeholder="Location"
                                            id='location'
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <svg
                                                        width="18"
                                                        height="20"
                                                        viewBox="0 0 18 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M12.3389 13.2143C14.4671 9.87469 14.1996 10.2913 14.2609 10.2043C15.0358 9.11137 15.4453 7.82508 15.4453 6.48438C15.4453 2.92891 12.5601 0 9 0C5.45148 0 2.55469 2.92313 2.55469 6.48438C2.55469 7.82422 2.97281 9.14418 3.77305 10.2518L5.66102 13.2143C3.64246 13.5245 0.210938 14.4489 0.210938 16.4844C0.210938 17.2264 0.695234 18.2838 3.00242 19.1078C4.61344 19.6831 6.7434 20 9 20C13.2197 20 17.7891 18.8097 17.7891 16.4844C17.7891 14.4486 14.3616 13.5251 12.3389 13.2143ZM4.75191 9.60723C4.74547 9.59716 4.73874 9.58729 4.73172 9.57762C4.06582 8.66152 3.72656 7.57582 3.72656 6.48438C3.72656 3.55398 6.08617 1.17188 9 1.17188C11.9078 1.17188 14.2734 3.55504 14.2734 6.48438C14.2734 7.57758 13.9406 8.62645 13.3107 9.5184C13.2543 9.59285 13.5487 9.13535 9 16.273L4.75191 9.60723ZM9 18.8281C4.39086 18.8281 1.38281 17.4733 1.38281 16.4844C1.38281 15.8197 2.92844 14.7268 6.35344 14.3007L8.50586 17.6782C8.55879 17.7613 8.63181 17.8297 8.71817 17.8771C8.80454 17.9244 8.90145 17.9493 8.99996 17.9493C9.09847 17.9493 9.19538 17.9244 9.28175 17.8771C9.36811 17.8297 9.44113 17.7613 9.49406 17.6782L11.6464 14.3007C15.0715 14.7268 16.6172 15.8197 16.6172 16.4844C16.6172 17.4649 13.6362 18.8281 9 18.8281Z"
                                                            fill="#AEAEAE"
                                                        />
                                                        <path
                                                            d="M9 3.55469C7.38457 3.55469 6.07031 4.86895 6.07031 6.48438C6.07031 8.0998 7.38457 9.41406 9 9.41406C10.6154 9.41406 11.9297 8.0998 11.9297 6.48438C11.9297 4.86895 10.6154 3.55469 9 3.55469ZM9 8.24219C8.03074 8.24219 7.24219 7.45363 7.24219 6.48438C7.24219 5.51512 8.03074 4.72656 9 4.72656C9.96926 4.72656 10.7578 5.51512 10.7578 6.48438C10.7578 7.45363 9.96926 8.24219 9 8.24219Z"
                                                            fill="#AEAEAE"
                                                        />
                                                    </svg>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid> */}
                                    <Grid item sm={6} xs={12}>
                                        <FormControl fullWidth>
                                            <Select
                                                displayEmpty
                                                name="location"
                                                id="location"
                                                value={GigsData.location}
                                                onChange={handleInput}
                                                input={<OutlinedInput className="form-inpitcustomfiled" />}
                                            >
                                                <MenuItem disabled value="" className="palceholdercss" name="category">
                                                    Choose States
                                                </MenuItem>
                                                {stateData.map((value, index) => (
                                                    <MenuItem key={index} value={value.name} >
                                                        {value.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} xs={12}>
                                        <FormControl fullWidth>
                                            <OutlinedInput className="form-inpitcustomfiled" onChange={handleInput} name="description" placeholder="Description" multiline rows={4} id="description" />
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
                                    <Button className="addgigs" onClick={submitgigsdata}>Save</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </MainCard> : ""}
                </>
          :
          <span class="loader"></span>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modaldelete"
            >
                <Box sx={style} className="modaldelete-inner">
                    <Typography className="modal-modal-title" id="modal-modal-title" variant="h3" component="h2" textAlign={'center'}>
                        Please Add payment method first.
                    </Typography>
                    <div style={{ textAlign: 'end' }} className="sav_chang">
                        <Button onClick={banknotfound} className="gigsEdit btn-1">
                            Ok
                        </Button>

                    </div>
                </Box>
            </Modal>

        </>
    );
}
export default Addgigs;
