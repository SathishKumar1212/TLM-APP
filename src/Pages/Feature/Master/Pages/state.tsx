import React, { useEffect, useState } from "react";
import CustomTable from "../../../../Components/Table";
import { countryRequestBody, stateRequestBody, stateReturnBody} from "../../../../Models/Masters.Body";
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

export default function State() {
    let title: string = 'State Master';
    const [result, setResult] = React.useState([{}]);
    const [country, setcountry] = React.useState([{}]);
    let [dataget, setdataget] = useState(false);
    const [filteropen, setfilteropen] = useState(false);
    const head = ['S.No',"Country ", "State  Name", 'State  Code', "Status", "Action"]
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorMessage2, setErrorMessage2] = useState('');

    // createnewbtn
    const [isopen, setIsopen] = useState(false);
    const [submittext, setsubmittext] = useState({} as stateRequestBody)
    function creatnewbtn(val:number) {
        submittext.country = 0; submittext.stateCode = ''; submittext.status = '';submittext.stateName='';
       if(val==1) setIsopen(!isopen);
       else{ setIsopen(false); getState();}
    }
    function filterbtn() {
        submittext.country = 0; submittext.stateCode = ''; submittext.status = '';submittext.stateName='';
        setfilteropen(!filteropen);
        setIsopen(false);
    }
    async function getcountry() {
        const requestBody: countryRequestBody = {
            ccode: "",
            cname: "",
            status: "",
            id: 0
        }
        let a = FeatureApi.getcountry(requestBody);
        a.then((result) => { setcountry(result); })
    }

    // createnewbtn
    async function getState() {
        const requestBody: stateRequestBody = {
            stateCode: submittext.stateCode,
            stateName: submittext.stateName,
            country: submittext.country,
            status: submittext.status,
            id: submittext.id
        }
        let a = FeatureApi.getState(requestBody);
        a.then((result:any) => {
            if(submittext.id>0){ 
                setIsopen(true);
                console.log(result)
                submittext.stateCode = result[0].s_stateCode;
                submittext.country = result[0].s_country;
                submittext.stateName=result[0].s_stateName;submittext.status=result[0].s_status;
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
        setsubmittext({country:0,stateCode:'',stateName:'',status: '',id:0});
        getState();getcountry()
        setdataget(true);
    }, []);

    useEffect(() => {
        if (location.state != null) { if (location.state.val > 0) {
                submittext.id = location.state.val;
                getState();
            }
        }
    },[location.state?.val>0])
    function clear() {
        setsubmittext({country:0,stateCode:'',stateName:'',status: '',id:0});
        if (filteropen) { setfilteropen(false) } else { setIsopen(false); }
        if (submittext.id > 0) { getState() } else { getState(); }
        if (filteropen) { const timer = setTimeout(() => { setfilteropen(true) }, 300); }
        else { const timer = setTimeout(() => { setIsopen(true) }, 300); }
    }
    let [errormsg2,seterrormsg2] = useState('');
    async function submitval() {
        let a = validationCheeck(0,'');
        if(a==true)  return;
        const requestBody: stateRequestBody = {
            stateCode: submittext.stateCode,
            stateName: submittext.stateName,
            country: submittext.country,
            status: submittext.status,
            id: submittext.id
        }
        const response: stateReturnBody = await MasterService.createState(requestBody);
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
        if(val === 1 || val===0){  
            if (regex.test(e.target.value)) { submittext.stateName = e.target.value;seterrormsg(0);}
            else { submittext.stateName = e.target.value;seterrormsg(1);a=true; }
        } 
        if(val === 2|| val===0){  
            if (regex.test(e.target.value)) { submittext.stateCode = e.target.value;seterrormsg(0);}
            else { submittext.stateCode = e.target.value;seterrormsg(2);a=true; }
        } 
        if(val === 0){  
            if (submittext.country == 0) {seterrormsg(3);a=true; }
            if (submittext.status =='') {seterrormsg(5);a=true; }
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
                                            <CSVLink style={{ padding: '6px' }} filename={"State.csv"} data={result} headers={head}>
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
                                    <label className='th1'>Country</label>
                                    <Autocomplete id="port-select-demo" defaultValue={submittext.country==0?null:country[submittext.country-1]} options={country} 
                                            getOptionLabel={(option:any) => option.s_countryname}
                                            onChange={(e:any,value:any)=>{if(value!=null){submittext.country=value.s_id;}else{submittext.country=0;}}}
                                            renderInput={(params) => (  <TextField {...params}  className='td2' inputProps={{...params.inputProps,}} />)} />
                                    {errormsg == 3 && <small className="text-danger">allow only alphabets &<br /> maxLength 2 characters</small>}
                                </Grid>
                                <Grid lg={3} item={true}>
                                    <label className='th1'>State Name</label>
                                    <TextField error={errormsg == 2} className='td2' size="small" multiline  variant="outlined"
                                        onChange={(e: any) => { validationCheeck(1, e) }} defaultValue={submittext.stateName} />
                                    <br />
                                    {errormsg == 1 && <small className="text-danger">allow only alphabets</small>}
                                </Grid>
                                <Grid lg={3} item={true}>
                                    <label className='th1'>State Code</label>
                                    <TextField error={errormsg == 2} className='td2' size="small" multiline  variant="outlined"
                                        onChange={(e: any) => { validationCheeck(2, e) }} defaultValue={submittext.stateCode} />
                                    <br />
                                    {errormsg == 2 && <small className="text-danger">allow only alphabets</small>}
                                </Grid>
                                <Grid lg={3} item={true}>
                                    <label className='th1 mt10'>Status</label>< br />
                                    <Select size="small" error={errormsg==3} className='th1 td2' defaultValue={submittext.status} onChange={(e: any) => { submittext.status = e.target.value }}>
                                        <MenuItem className='th1' value={''}>Select</MenuItem>
                                        <MenuItem className='th1' value={'Active'}>Active</MenuItem>
                                        <MenuItem className='th1' value={'In-Active'}>In-Active</MenuItem>
                                        {errormsg == 5 && <small className="text-danger">Please Select one</small>}
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
                                            <Button variant="outlined" onClick={getState} className="bluebg creatbtn mt2" style={{ marginRight: '20px' }}>Search</Button>
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