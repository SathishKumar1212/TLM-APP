import React, { Component, useState } from 'react';
import './Head.css';
import { Container } from '@mui/material';
import { Grid } from "@mui/material";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Button } from '@material-ui/core';


function HeadCompo() {
    const [open, setopen] = useState(false);
    function openMenu() {
        if (!open) {
            setopen(true)
        } else { setopen(false) }
    }
    return (
        <div>
            <section>
                <Container>
                    <Grid container className='head' direction="row" justifyContent="space-between" alignItems="center">
                        <Grid className='coltxt' style={{ fontSize: '20px' }}> Transporter</Grid>
                        <Grid className='dflexcenter'>
                            <NotificationsActiveRoundedIcon sx={{ marginRight: '10px' }} />
                            <span className='subhead' onClick={openMenu}>Admin</span>
                            <KeyboardArrowDownRoundedIcon sx={{ fontSize: '25px', color: 'black' }} onClick={openMenu} />
                        </Grid>
                    </Grid>
                    {open &&
                        <section  className='dropdownshow '>
                            <Grid container className='dropchild' direction="row" justifyContent="space-evenly" alignItems="center">
                                <Grid lg={12} className='bottomLine ' style={{ textAlign: 'end',padding:'7px' }}>
                                    <Button variant='text'>
                                        <AccountCircleRoundedIcon className='coltxt' sx={{marginRight:'5px'}}/>
                                        <span className='subhead'>profile</span>
                                    </Button>
                                    <span className='line'></span>
                                    <Button variant='text'>
                                        <LogoutRoundedIcon className='coltxt ' sx={{marginRight:'5px'}} />
                                        <span className='subhead'> Logout</span>
                                    </Button>
                                </Grid>
                                <Grid container sx={{paddingLeft:'30px',paddingTop:'20px'}} direction="row" justifyContent="space-evenly" alignItems="start">
                                    <Grid lg={2} sm={12} >
                                        <Grid className='subhead' sx={{marginBottom:'10px'}}>Administrator</Grid>
                                        <Grid className='alltext' sx={{lineHeight:'27px'}}>
                                            <div onClick={() => { window.location.href = '/customer' }}    > <small>User profile creation</small></div>
                                            <div onClick={() => { window.location.href = '/customer' }}    ><small>Role Management</small></div>
                                            <div onClick={() => { window.location.href = '/customer' }}    > <small>Application Configuration</small></div>
                                            <div onClick={() => { window.location.href = '/customer' }}    > <small>control parameter</small></div>
                                            <div onClick={() => { window.location.href = '/customer' }}    > <small>Notification Master</small></div>
                                            <div onClick={() => { window.location.href = '/customer' }}    > <small>General Master</small></div>
                                        </Grid>
                                    </Grid>                            
                                    <Grid lg={2} sm={12} >
                                        <Grid className='subhead' sx={{marginBottom:'10px'}}>Common Master</Grid>
                                        <Grid className='alltext' sx={{lineHeight:'27px'}}>
                                            <div  ><small>Customer Master</small> </div>
                                            <div><small>Port Master </small></div>
                                            <div onClick={() => { window.location.href = '/' }}><small>City Master </small></div>
                                            <div><small>Depot Master </small></div>
                                            <div onClick={() => { window.location.href = '/master/country' }}><small>Country Master </small></div>
                                            <div><small>Terminal Master </small></div>
                                            <div><small>Commodity Master</small></div>
                                            <div><small>Currency Master</small></div>
                                            <div><small>State Master</small></div>
                                            <div><small>Cargo Package Master</small></div>
                                            <div><small>Vessel Master</small></div>
                    
                                        </Grid>
                                    </Grid>
                                    <Grid lg={2} sm={12} >
                                        <Grid className='subhead' sx={{marginBottom:'10px'}}>NVOCC </Grid>
                                        <Grid className='alltext' sx={{ lineHeight: '27px' }}>
                                            <div><small>Agency Setup</small></div>
                                            <div><small>MRG Rate</small></div>
                                            <div><small>Slot</small></div>
                                            <div><small>Container Rental Contract</small></div>
                                            <div><small>Commision Contract</small></div>
                                            <div><small>IHC Haulage Tariff</small></div>
                                        </Grid>
                                    </Grid>
                                    <Grid lg={2} sm={12} >
                                        <Grid className='subhead' sx={{marginBottom:'10px'}}>Export</Grid>
                                        <Grid className='alltext' sx={{ lineHeight: '27px' }}>
                                            <div><small>Rate Filing</small></div>
                                            <div><small>Bookings/BL of landing </small></div>
                                            <div><small>On-Board Confirmation</small></div>
                                            <div><small>BL Expectation</small></div>
                                            <div><small>Export Billing</small></div>
                                            <div><small>Receipt</small></div>
                                            <div><small>Space Management- Operation</small></div>
                                            <div onClick={() => { window.location.href = '/export/portTraffic' }}><small>Port Tariff Master</small></div>
                                        </Grid>
                                    </Grid>
                                    <Grid lg={2} sm={12} >
                                        <Grid className='subhead' sx={{marginBottom:'10px'}}> Import</Grid>
                                        <Grid className='alltext' sx={{lineHeight:'27px'}}>
                                            <div><small>Import Management</small></div>
                                            <div><small>Import Billing </small></div>
                                            <div><small>Recipt</small></div>
                                        </Grid>
                                    </Grid>
                                </Grid>    
                                <Grid container sx={{paddingLeft:'30px',paddingTop:'20px'}} direction="row" justifyContent="space-evenly" alignItems="start">
                                    <Grid lg={2} sm={12} >
                                        <Grid className='subhead' sx={{marginBottom:'10px'}}> Operation</Grid>
                                        <Grid className='alltext' sx={{ lineHeight: '27px' }}>
                                            <div><small>Vessel Master</small></div>
                                            <div onClick={() => { window.location.href = '/operation/voyage' }}><small>Voyage Master</small></div>
                                            <div><small>Voyage Locking</small></div>
                                            <div><small>Voyage Opening </small></div>
                                            <div><small>T/S Voyage Allocation</small></div>
                                            <div><small>Service Setup</small></div>
                                            <div><small>Manifest Generation</small></div>
                                        </Grid>
                                    </Grid>
                                    <Grid lg={2} sm={12} >
                                        <Grid className='subhead' sx={{marginBottom:'10px'}}> Inventory</Grid>
                                        <Grid className='alltext' sx={{lineHeight:'27px'}}>
                                        <div><small>User profile creation</small></div>
                                            <div><small>Role Management</small></div>
                                            <div><small>Application Configuration</small></div>
                                            <div><small>control parameter</small></div>
                                            <div><small>Notification Master</small></div>
                                            <div><small>General Master</small></div>
                                        </Grid>
                                    </Grid>
                                    <Grid lg={2} sm={12} >
                                        <Grid className='subhead' sx={{marginBottom:'10px'}}> MNR</Grid>
                                        <Grid className='alltext' sx={{lineHeight:'27px'}}>
                                        <div><small>User profile creation</small></div>
                                            <div><small>Role Management</small></div>
                                            <div><small>Application Configuration</small></div>
                                            <div><small>control parameter</small></div>
                                            <div><small>Notification Master</small></div>
                                            <div><small>General Master</small></div>
                                        </Grid>
                                    </Grid>
                                    <Grid lg={2} sm={12} >
                                        <Grid className='subhead' sx={{marginBottom:'10px'}}> Finance Management</Grid>
                                        <Grid className='alltext' sx={{ lineHeight: '27px' }}>
                                            <div><small>User profile creation</small></div>
                                            <div><small>Role Management</small></div>
                                            <div><small>Application Configuration</small></div>
                                            <div><small>control parameter</small></div>
                                            <div><small>Notification Master</small></div>
                                            <div><small>General Master</small></div>
                                        </Grid>
                                    </Grid>
                                    <Grid lg={2} sm={12} >
                                        <Grid className='subhead' sx={{ marginBottom: '10px' }}> Report</Grid>
                                        <Grid className='alltext' sx={{ lineHeight: '27px' }}>
                                            <div><small>User profile creation</small></div>
                                            <div><small>Role Management</small></div>
                                            <div><small>Application Configuration</small></div>
                                            <div><small>control parameter</small></div>
                                            <div><small>Notification Master</small></div>
                                            <div><small>General Master</small></div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </section>
                    }
                </Container>
               
            </section>

        </div>
    )
}
export default HeadCompo;

