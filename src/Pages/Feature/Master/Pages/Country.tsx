import React, { useEffect, useState } from "react";
import CustomTable from "../../../../Components/Table";
import { CityRequestBody, CityReturnBody, countryRequestBody, countryReturnBody, stateRequestBody } from "../../../../Models/Masters.Body";
import MasterService from "../../../../Services/MasterService";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Container, IconButton } from "@mui/material";
import { Grid } from "@mui/material";
import { Button, Snackbar, SnackbarContent } from "@material-ui/core";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import '../../FeatureStyle.css';
import { useLocation, } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import FeatureApi from "../MasterApi";
import { subscribe } from "diagnostics_channel";
import HeadCompo from "../../Head/Head";

export default function Country() {
    let title: string = 'Country Master';
    const [result, setResult] = React.useState([{}]);
    const [state, setstate] = React.useState([{}]);
    const [country, setcountry] = React.useState([{}]);
    let [dataget, setdataget] = useState(false);
    const [filteropen, setfilteropen] = useState(false);
    const head = ['S.No', 'Country  Code', "Country  Name", "Status", "Action"]
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorMessage2, setErrorMessage2] = useState('');

    // createnewbtn
    const [isopen, setIsopen] = useState(false);
    const [submittext, setsubmittext] = useState({} as countryRequestBody)
    function creatnewbtn(val:number) {
        submittext.ccode = ''; submittext.cname = ''; submittext.status = '';
       if(val==1) setIsopen(!isopen);
       else{ setIsopen(false); getcountry();}
    }
    function filterbtn() {
        submittext.ccode = ''; submittext.cname = ''; submittext.status = '';
        setfilteropen(!filteropen);
        setIsopen(false);
    }
    // createnewbtn
    async function getcountry() {
        const requestBody: countryRequestBody = {
            ccode: submittext.ccode,
            cname: submittext.cname,
            status: submittext.status,
            id: submittext.id
        }
        let a = FeatureApi.getcountry(requestBody);
        a.then((result:any) => {
            if(submittext.id>0){ 
                setIsopen(true);
                console.log(result)
                submittext.ccode = result[0].s_countrycode;
                submittext.cname=result[0].s_countryname;submittext.status=result[0].s_status;
                location.state.val=0;
            }
            else {
                setdataget(true);setResult(result); const datage = setTimeout(() => { setdataget(false) }, 100);
                 const isopenit = setTimeout(() => { setIsopen(false) }, 100); 
                }
        })

    }
    const location = useLocation();

    useEffect(() => {
        setsubmittext({ccode:'',cname:'',status: '',id:0});
        getcountry();
        setdataget(true);
    }, []);

    useEffect(() => {
        if (location.state != null) { if (location.state.val > 0) {
                submittext.id = location.state.val;
                getcountry();
            }
        }
    },[location.state?.val>0])
    function clear() {
        submittext.ccode = ''; submittext.cname = ''; submittext.status = '';
        if (filteropen) { setfilteropen(false) } else { setIsopen(false); }
        if (submittext.id > 0) { getcountry() } else { getcountry(); }
        if (filteropen) { const timer = setTimeout(() => { setfilteropen(true) }, 300); }
        else { const timer = setTimeout(() => { setIsopen(true) }, 300); }
    }
    let [errormsg2,seterrormsg2] = useState('');
    async function submitval() {
        let a = validationCheeck(0,'');
        if(a==true)  return;
        const requestBody: countryRequestBody = {
            ccode: submittext.ccode,
            cname: submittext.cname,
            status: submittext.status,
            id: submittext.id,
        };
        const response: CityReturnBody = await MasterService.createCountry(requestBody);
        if (response.status == "update") {
            creatnewbtn(2);
            setErrorMessage2('Successfully Updated'); setErrorMessage(true);
        }
        if (response.status == "true") {            
            creatnewbtn(2);
            setErrorMessage2('Successfully Saved'); setErrorMessage(true);
        }
        if(response.error == true){
            setErrorMessage2(response.msg); setErrorMessage(true);
            // errormsg2 = response.msg;
        }
        location.state={};
    }

    const regex = /^[A-Za-z]+$/;    const [errormsg, seterrormsg] = useState(0); 

    function validationCheeck(val: number,e: any ) {
        let a = false;
        if(val === 1 || val === 0){  
            if (e.target.value.length == 2 && regex.test(e.target.value)) { submittext.ccode = e.target.value;seterrormsg(0);}
            else { submittext.ccode = e.target.value;seterrormsg(1);a=true; }
        } 
        if(val === 2|| val === 0){  
            if (regex.test(e.target.value)) { submittext.cname = e.target.value;seterrormsg(0);}
            else { submittext.cname = e.target.value;seterrormsg(2);a=true; }
        } 
        if(val === 3|| val === 0){  
            if (e.target.value=='') {seterrormsg(3);a=true; }
        } 
        return  a;
    }

    // popover
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    

    // popover

    return (
        <Container style={{ padding: '0px 45px' }}>
             <HeadCompo></HeadCompo>
            <>
                <Container className=' h-100' >
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" className="gridcontain">
                        <Grid><h5><span className='header2nd'>{title}</span></h5></Grid>
                        <Grid  item={true}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button onClick={()=>{creatnewbtn(1)}}
                                    variant="contained" className="bluebg creatbtn">+ Create new</Button>
                                <IconButton aria-label="MoreVertIcon" onClick={handleClick}>
                                    <MoreVertIcon sx={{ fontSize: 30 }} />
                                </IconButton>
                                {/* <Button size="small" sx={{width:1}} variant="text" onClick={handleClick}>
                                
                            </Button> */}
                                <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} >
                                    <Typography sx={{ p: 1 }}>
                                        <div style={{ padding: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Upload</div>
                                        <div className="csvdownload">
                                            <CSVLink style={{ padding: '6px' }} filename={"City.csv"} data={result} headers={head}>
                                                Dowload
                                            </CSVLink>
                                        </div>
                                    </Typography>
                                </Popover>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
                {((isopen==true && filteropen==false) || (isopen==false && filteropen==true)) &&
                    <Container >
                        <div className={filteropen == true ? '' : 'addcountry'}>
                            <Grid container item={true} xs={12} spacing={3} style={{ paddingTop: '10px' }}>
                                <Grid lg={3} item={true}>
                                    <label className='th1'>Country Code</label>
                                    <TextField className='td2'
                                        error={errormsg==1}
                                        multiline
                                        size="small"
                                        id="citycode"
                                        variant="outlined"
                                        defaultValue={submittext.ccode}
                                        onChange={(e: any) => {validationCheeck(1,e);submittext.ccode = e.target.value;}} />
                                    <br />
                                    {errormsg == 1 && <small className="text-danger">allow only alphabets &<br /> maxLength 2 characters</small>}
                                </Grid>
                                <Grid lg={3} item={true}>
                                    <label className='th1'>Country Name</label>
                                    <TextField className='td2'
                                     error={errormsg==2}
                                        multiline
                                        size="small"
                                        id="citycode"
                                        variant="outlined"
                                        defaultValue={submittext.cname}
                                        onChange={(e: any) => { validationCheeck(2,e);}} />
                                    <br />
                                    {errormsg == 2 && <small className="text-danger">allow only alphabets</small>}
                                </Grid>
                                <Grid lg={3} item={true}>
                                    <label className='th1 mt10'>Status</label>< br />
                                    <Select size="small" error={errormsg==3} className='th1 td2' defaultValue={submittext.status} onChange={(e: any) => { submittext.status = e.target.value }}>
                                        <MenuItem className='th1' value={''}>Select</MenuItem>
                                        <MenuItem className='th1' value={'Active'}>Active</MenuItem>
                                        <MenuItem className='th1' value={'In-Active'}>In-Active</MenuItem>
                                        {errormsg == 3 && <small className="text-danger">Please Select one</small>}
                                    </Select>
                                </Grid>
                                {errormsg2 != '' &&
                                    <Grid item={true} style={{ textAlign: 'end', padding: '0px 15px' }}>
                                        <strong className="text-danger">{errormsg2}</strong>
                                    </Grid>
                                }
                                <Grid item={true} lg={12} className={filteropen == true ? '' : 'btnsec'} style={{padding:'0px'}}>
                                    <Grid container direction="row" justifyContent="end" alignItems="center" style={{ margin: '10px 10px' }}>
                                        <Button variant="text" onClick={clear} className="creatbtn mt2" style={{ marginRight: '20px' }}>clear</Button>
                                        {!filteropen &&
                                            <Button variant="contained" onClick={submitval} className="bluebg creatbtn mt2" style={{ marginRight: '20px' }}>Submit</Button>
                                        }
                                        {filteropen &&
                                            <Button variant="outlined" onClick={getcountry} className="bluebg creatbtn mt2" style={{ marginRight: '20px' }}>Search</Button>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                }
                <Container>
                    <Grid lg={12} item={true}>
                        <Grid container item={true} direction="row" justifyContent="end" alignItems="center" style={{ margin: '10px 10px' }}>
                            <Button size="small" className='filter-btn' variant="outlined" onClick={filterbtn} style={{ marginRight: '20px' }}>
                                < FilterListRoundedIcon />
                                <span>Filter</span>
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
                {!dataget &&
                    <CustomTable head={head} title={title} columns={result} />
                }
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={errorMessage} autoHideDuration={6000} onClose={() => { setErrorMessage(false) }} >
                    <SnackbarContent style={{ backgroundColor: '#0d6efd', color: '#fff' }} message={errorMessage2} />
                </Snackbar>

            </>
        </Container>

    )
}