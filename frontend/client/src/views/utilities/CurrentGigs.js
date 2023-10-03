/* eslint-disable */

import { Button, Card, Grid, Stack } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { ApiService } from 'services/apiservices';
import { useNavigate } from 'react-router';
import moment from "moment";
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
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const MaterialIcons = () => {
    const [open, setOpen] = React.useState(false);
    const [GigsData, setGigsData] = useState([]);
    const [objectID, setSetobjectID] = useState('');
    const didMountRef = useRef(true);
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (didMountRef.current) {
            getgigsdata();
        }
        didMountRef.current = false;
    }, []);
    const getgigsdata = (e) => {
        apiServices.gigsdataRequest({}).then(res => {
            if (res.data.status == 'success') {
                console.log(GigsData);
                setGigsData(res.data.data)
            }else if(res.data.message == 'Token Expired'){
                alert(res.data.message);
                localStorage.removeItem('AUTH_TOKEN');
                window.location.href = constant.FRONT_URL;
            }
            })
    }
    const deletegigdata = (e) => {
        const datastring = {
            gigId:objectID
        };
        apiServices.deletegigdata(datastring).then(res => {
            if (res.data.status == 'success') {
                handleClose();
                getgigsdata();
                }else if(res.data.message == 'Token Expired'){
                alert(res.data.message);
                localStorage.removeItem('AUTH_TOKEN');
                window.location.href = '/';
            }
        })
    }
    return (
        <>
            <div className="section-tittle">
                <typography variant="h1" className="tittle" sx={{ pt: 0 }}>
                    <span class="shape"></span>Current Services
                </typography>
            </div>
            <Grid>
            {
                GigsData && GigsData.length > 0 ?
                GigsData.map((key) =>
                <Card className="card-currentgig">
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography className="current-gigstiltw">{key.title}</Typography>
                        </Grid>
                        <Grid item xs={2} textAlign={'right'}>
                            <DeleteOutlineOutlined
                                style={{
                                    backgroundColor: '#F44336',
                                    borderRadius: '50%',
                                    fontSize: '30px',
                                    color: 'white',
                                    padding: '4px'
                                }}
                                onClick={(e)=>{handleOpen(e);setSetobjectID(key._id)}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 1, md: 4 }} className="outer-current">
                                <Item className="listing-current">
                                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.3389 13.2143C14.4671 9.87469 14.1996 10.2913 14.2609 10.2043C15.0358 9.11137 15.4453 7.82508 15.4453 6.48438C15.4453 2.92891 12.5601 0 9 0C5.45148 0 2.55469 2.92313 2.55469 6.48438C2.55469 7.82422 2.97281 9.14418 3.77305 10.2518L5.66102 13.2143C3.64246 13.5245 0.210938 14.4489 0.210938 16.4844C0.210938 17.2264 0.695234 18.2838 3.00242 19.1078C4.61344 19.6831 6.7434 20 9 20C13.2197 20 17.7891 18.8097 17.7891 16.4844C17.7891 14.4486 14.3616 13.5251 12.3389 13.2143ZM4.75191 9.60723C4.74547 9.59716 4.73874 9.58729 4.73172 9.57762C4.06582 8.66152 3.72656 7.57582 3.72656 6.48438C3.72656 3.55398 6.08617 1.17188 9 1.17188C11.9078 1.17188 14.2734 3.55504 14.2734 6.48438C14.2734 7.57758 13.9406 8.62645 13.3107 9.5184C13.2543 9.59285 13.5487 9.13535 9 16.273L4.75191 9.60723ZM9 18.8281C4.39086 18.8281 1.38281 17.4733 1.38281 16.4844C1.38281 15.8197 2.92844 14.7268 6.35344 14.3007L8.50586 17.6782C8.55879 17.7613 8.63181 17.8297 8.71817 17.8771C8.80454 17.9244 8.90145 17.9493 8.99996 17.9493C9.09847 17.9493 9.19538 17.9244 9.28175 17.8771C9.36811 17.8297 9.44113 17.7613 9.49406 17.6782L11.6464 14.3007C15.0715 14.7268 16.6172 15.8197 16.6172 16.4844C16.6172 17.4649 13.6362 18.8281 9 18.8281Z"
                                            fill="#AEAEAE"
                                        />
                                        <path
                                            d="M9 3.55469C7.38457 3.55469 6.07031 4.86895 6.07031 6.48438C6.07031 8.0998 7.38457 9.41406 9 9.41406C10.6154 9.41406 11.9297 8.0998 11.9297 6.48438C11.9297 4.86895 10.6154 3.55469 9 3.55469ZM9 8.24219C8.03074 8.24219 7.24219 7.45363 7.24219 6.48438C7.24219 5.51512 8.03074 4.72656 9 4.72656C9.96926 4.72656 10.7578 5.51512 10.7578 6.48438C10.7578 7.45363 9.96926 8.24219 9 8.24219Z"
                                            fill="#AEAEAE"
                                        />
                                    </svg>
                                    {key.location}
                                </Item>
                                <Item className="listing-current">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.0781 8.98438C15.5096 8.98438 15.8594 8.6346 15.8594 8.20312C15.8594 7.77165 15.5096 7.42188 15.0781 7.42188C14.6467 7.42188 14.2969 7.77165 14.2969 8.20312C14.2969 8.6346 14.6467 8.98438 15.0781 8.98438Z"
                                            fill="#A6A6A6"
                                        />
                                        <path
                                            d="M16.875 1.5625H15.8594V0.78125C15.8594 0.349766 15.5096 0 15.0781 0C14.6466 0 14.2969 0.349766 14.2969 0.78125V1.5625H10.7422V0.78125C10.7422 0.349766 10.3924 0 9.96094 0C9.52945 0 9.17969 0.349766 9.17969 0.78125V1.5625H5.66406V0.78125C5.66406 0.349766 5.3143 0 4.88281 0C4.45133 0 4.10156 0.349766 4.10156 0.78125V1.5625H3.125C1.40188 1.5625 0 2.96438 0 4.6875V16.875C0 18.5981 1.40188 20 3.125 20H9.10156C9.53305 20 9.88281 19.6502 9.88281 19.2188C9.88281 18.7873 9.53305 18.4375 9.10156 18.4375H3.125C2.26344 18.4375 1.5625 17.7366 1.5625 16.875V4.6875C1.5625 3.82594 2.26344 3.125 3.125 3.125H4.10156V3.90625C4.10156 4.33773 4.45133 4.6875 4.88281 4.6875C5.3143 4.6875 5.66406 4.33773 5.66406 3.90625V3.125H9.17969V3.90625C9.17969 4.33773 9.52945 4.6875 9.96094 4.6875C10.3924 4.6875 10.7422 4.33773 10.7422 3.90625V3.125H14.2969V3.90625C14.2969 4.33773 14.6466 4.6875 15.0781 4.6875C15.5096 4.6875 15.8594 4.33773 15.8594 3.90625V3.125H16.875C17.7366 3.125 18.4375 3.82594 18.4375 4.6875V9.14062C18.4375 9.57211 18.7873 9.92188 19.2188 9.92188C19.6502 9.92188 20 9.57211 20 9.14062V4.6875C20 2.96438 18.5981 1.5625 16.875 1.5625Z"
                                            fill="#A6A6A6"
                                        />
                                        <path
                                            d="M15.2734 10.5469C12.6672 10.5469 10.5469 12.6672 10.5469 15.2734C10.5469 17.8797 12.6672 20 15.2734 20C17.8797 20 20 17.8797 20 15.2734C20 12.6672 17.8797 10.5469 15.2734 10.5469ZM15.2734 18.4375C13.5288 18.4375 12.1094 17.0181 12.1094 15.2734C12.1094 13.5287 13.5288 12.1094 15.2734 12.1094C17.0181 12.1094 18.4375 13.5287 18.4375 15.2734C18.4375 17.0181 17.0181 18.4375 15.2734 18.4375Z"
                                            fill="#A6A6A6"
                                        />
                                        <path
                                            d="M16.4062 14.4922H16.0547V13.6719C16.0547 13.2404 15.7049 12.8906 15.2734 12.8906C14.842 12.8906 14.4922 13.2404 14.4922 13.6719V15.2734C14.4922 15.7049 14.842 16.0547 15.2734 16.0547H16.4062C16.8377 16.0547 17.1875 15.7049 17.1875 15.2734C17.1875 14.842 16.8377 14.4922 16.4062 14.4922Z"
                                            fill="#A6A6A6"
                                        />
                                        <path
                                            d="M11.6797 8.98438C12.1112 8.98438 12.4609 8.6346 12.4609 8.20312C12.4609 7.77165 12.1112 7.42188 11.6797 7.42188C11.2482 7.42188 10.8984 7.77165 10.8984 8.20312C10.8984 8.6346 11.2482 8.98438 11.6797 8.98438Z"
                                            fill="#A6A6A6"
                                        />
                                        <path
                                            d="M8.28125 12.3828C8.71272 12.3828 9.0625 12.033 9.0625 11.6016C9.0625 11.1701 8.71272 10.8203 8.28125 10.8203C7.84978 10.8203 7.5 11.1701 7.5 11.6016C7.5 12.033 7.84978 12.3828 8.28125 12.3828Z"
                                            fill="#A6A6A6"
                                        />
                                        <path
                                            d="M4.88281 8.98438C5.31428 8.98438 5.66406 8.6346 5.66406 8.20312C5.66406 7.77165 5.31428 7.42188 4.88281 7.42188C4.45134 7.42188 4.10156 7.77165 4.10156 8.20312C4.10156 8.6346 4.45134 8.98438 4.88281 8.98438Z"
                                            fill="#A6A6A6"
                                        />
                                        <path
                                            d="M4.88281 12.3828C5.31428 12.3828 5.66406 12.033 5.66406 11.6016C5.66406 11.1701 5.31428 10.8203 4.88281 10.8203C4.45134 10.8203 4.10156 11.1701 4.10156 11.6016C4.10156 12.033 4.45134 12.3828 4.88281 12.3828Z"
                                            fill="#A6A6A6"
                                        />
                                        <path
                                            d="M4.88281 15.7812C5.31428 15.7812 5.66406 15.4315 5.66406 15C5.66406 14.5685 5.31428 14.2188 4.88281 14.2188C4.45134 14.2188 4.10156 14.5685 4.10156 15C4.10156 15.4315 4.45134 15.7812 4.88281 15.7812Z"
                                            fill="#A6A6A6"
                                        />
                                        <path
                                            d="M8.28125 15.7812C8.71272 15.7812 9.0625 15.4315 9.0625 15C9.0625 14.5685 8.71272 14.2188 8.28125 14.2188C7.84978 14.2188 7.5 14.5685 7.5 15C7.5 15.4315 7.84978 15.7812 8.28125 15.7812Z"
                                            fill="#A6A6A6"
                                        />
                                        <path
                                            d="M8.28125 8.98438C8.71272 8.98438 9.0625 8.6346 9.0625 8.20312C9.0625 7.77165 8.71272 7.42188 8.28125 7.42188C7.84978 7.42188 7.5 7.77165 7.5 8.20312C7.5 8.6346 7.84978 8.98438 8.28125 8.98438Z"
                                            fill="#A6A6A6"
                                        />
                                    </svg>
                                    {moment(key.created_at).format('DD-MMM-YYYY')}
                                </Item>
                                <Item className="listing-current">
                                <svg xmlns="http://www.w3.org/2000/svg" height="0.875em" viewBox="0 0 288 512"><path d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z" fill="#697586"/></svg>     
                                                       
                                    {key.price}
                                </Item>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container alignItems={'end'}>
                        <Grid item md={9} xs={12}>
                            <p>
                               {key.description}
                            </p>
                        </Grid>
                        <Grid item md={3} xs={12} className="text-end-right">
                            <div>
                                <Link to={'/gigs/editgigs/'+key._id} className="edit-currnt-gigs">
                                    Edit
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                </Card>)
                      : ''}
            </Grid>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modaldelete"
            >
                <Box sx={style} className="modaldelete-inner">
                    <Typography className="modal-modal-title" id="modal-modal-title" variant="h3" component="h2" textAlign={'center'}>
                        Are you sure you want to delete this?
                    </Typography>
                    <div style={{ textAlign: 'end' }} className="sav_chang">
                        <Button onClick={deletegigdata} className="gigsEdit btn-1">
                            Ok
                        </Button>
                        <Button onClick={handleClose} className="gigsEdit btn-2">
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default MaterialIcons;
