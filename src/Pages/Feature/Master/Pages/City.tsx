import React, { useEffect, useState } from "react";
import CustomTable from "../../../../Components/Table";
import { CityRequestBody, CityReturnBody, countryRequestBody, stateRequestBody } from "../../../../Models/Masters.Body";
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
import { useLocation, useNavigate, } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import HeadCompo from "../../Head/Head";
import FeatureApi from "../MasterApi";
import '../../FeatureStyle.css';

export default function City() {

    let title: string = 'City Master';
    const [result, setResult] = React.useState([{}]);
    const [state, setstate] = React.useState([{}]);
    const [country, setcountry] = React.useState([{}]);
    let [dataget, setdataget] = useState(false);
    const [filteropen, setfilteropen] = useState(false);
    const head = ['S.No', 'City  Code', "City  Name", "Country  Code", "Status", "Action"]
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorMessage2, setErrorMessage2] = useState('');
    // createnewbtn
    const [isopen, setIsopen] = useState(false);
    const [submittext, setsubmittext] = useState({} as CityRequestBody)
    function creatnewbtn(val:number) {
        submittext.citycode = ''; submittext.cityname = ''; submittext.statename = 0;
        submittext.countrycode = 0; submittext.status = '';
       if(val==1){ setIsopen(!isopen);}
       else {setIsopen(false);getCity();}
    }
    function filterbtn() {  
        submittext.citycode = ''; submittext.cityname = ''; submittext.statename = 0;
        submittext.countrycode = 0; submittext.status = '';
        setfilteropen(!filteropen);
    }
    // createnewbtn
    const location = useLocation();
    
    useEffect(() => {
        getstate();
        getcountry();
        setdataget(true);
        getCity();
        location.state = {};
    }, []);
    
    useEffect(() => {
        if (location.state != null) { if (location.state.val > 0) {
                submittext.id = location.state.val;
                getCitySingle();
            }
        }
        console.log(location.state?.val)
    },[location.state?.val>0])

    async function getstate() {
        const requestBody: stateRequestBody = {
            country: 0,
            stateName: "",
            stateCode: "",
            status: "",
            id: 0
        }
        let a = FeatureApi.getState(requestBody);
        a.then((result) => { setstate(result); })
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
    function getCity() {
        const requestBody: CityRequestBody = {
            citycode: submittext.citycode,
            cityname: submittext.cityname,
            statename: submittext.statename,
            countrycode: submittext.countrycode,
            status: submittext.status,
            id: 0,
        };
        let a = FeatureApi.GetCity(requestBody);
        a.then((result) => { setdataget(true); setResult(result); const timer = setTimeout(() => { setdataget(false) }, 100); })
    }
    async function getCitySingle() {

        const requestBody: CityRequestBody = {
            id: submittext.id,
            citycode: "",
            cityname: "",
            statename: 0,
            countrycode: 0,
            status: ""
        };
        const response: CityReturnBody = await MasterService.getCity(requestBody);
        //  setIsopen(!isopen);
        setIsopen(true);
        if (response.data.length > 0) {
            submittext.citycode = response.data[0].s_citycode; submittext.cityname = response.data[0].s_cityname;
            submittext.countrycode = response.data[0].s_countrycode; submittext.status = response.data[0].s_status;
            submittext.statename = response.data[0].s_statename; submittext.id = response.data[0].s_id;
        }
        return
    }
    function clear() {
        submittext.citycode = ''; submittext.cityname = ''; submittext.statename = 0;
        submittext.countrycode = 0; submittext.status = '';
        if (filteropen) { setfilteropen(false) } else { setIsopen(false); }
        if (submittext.id > 0) { getCitySingle() } else { getCity(); }
        if (filteropen) { const timer = setTimeout(() => { setfilteropen(true) }, 300); }
        else { const timer = setTimeout(() => { setIsopen(true) }, 300); }
    }
    async function submitval() {
        let a = validationCheeck(0,'');
        if(a==true)  return;
        const requestBody: CityRequestBody = {
            citycode: submittext.citycode,
            cityname: submittext.cityname,
            statename: submittext.statename,
            countrycode: submittext.countrycode,
            status: submittext.status,
            id: submittext.id,
        };
        const response: CityReturnBody = await MasterService.createCity(requestBody);       
        if (response.status == "update") {
            setErrorMessage2('Successfully Updated'); setErrorMessage(true);
        }
        if (response.status == "true") {
            setErrorMessage2('Successfully Saved'); setErrorMessage(true);}
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
            if (regex.test(e.target.value)) { submittext.citycode = e.target.value;seterrormsg(0);}
            else { submittext.citycode = e.target.value;seterrormsg(1);a=true; }
        } 
        if(val === 2|| val===0){  
            if (regex.test(e.target.value)) { submittext.cityname = e.target.value;seterrormsg(0);}
            else { submittext.cityname = e.target.value;seterrormsg(2);a=true; }
        } 
        if(val === 0){  
            if (submittext.countrycode == 0) {seterrormsg(4);a=true; }
            if (submittext.statename == 0 ) {seterrormsg(3);a=true; }
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
        <>
           
            <Container style={{ padding: '0px 45px' }}>
            <HeadCompo></HeadCompo>


                <Container className=' h-100' >
                    <Grid container item={true} direction="row" justifyContent="space-between" alignItems="center" className="gridcontain">
                        <Grid><h5><span className='header2nd'>{title}</span></h5></Grid>
                        <Grid >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button onClick={()=>{creatnewbtn(1)}}
                                    variant="contained" className="bluebg creatbtn">+ Create new</Button>
                                <IconButton aria-label="MoreVertIcon" onClick={handleClick}>
                                    <MoreVertIcon sx={{ fontSize: 30 }} />
                                </IconButton>
                                <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} >
                                    <Typography sx={{ p: 1 }}>
                                        <div className="subhead" style={{ padding: '6px' }}>Upload</div>
                                        <div className="csvdownload">
                                            <CSVLink  filename={"City.csv"} data={result} headers={head}>
                                                <span className="subhead">Dowload</span>
                                            </CSVLink>
                                        </div>
                                    </Typography>
                                </Popover>
                            </div>
                        </Grid>
                    </Grid>
                    {isopen  &&
                        <Container >
                            <div className={filteropen == true ? '' : 'addcountry'}>
                                <Grid container item={true} style={{ paddingTop: '10px' }}>
                                    <Grid lg={3} item>
                                        <label className='th1'>City Code</label>
                                        <TextField className='td2'
                                            multiline
                                            size="small"
                                            id="citycode"
                                            variant="outlined"
                                            defaultValue={submittext.citycode}
                                            onChange={(e: any) => { submittext.citycode = e.target.value;}} />
                                        <br />
                                    </Grid>
                                    <Grid lg={3} item>
                                        <label className='th1'>City Name</label>
                                        <TextField className='td2' size="small" multiline id="cityname" variant="outlined"
                                            onChange={(e: any) => { submittext.cityname = e.target.value }} defaultValue={submittext.cityname} />
                                        <br />
                                    </Grid>
                                    <Grid lg={3} item>
                                        <label className='th1'>State Name</label>
                                        <Autocomplete id="combo-box-demo" options={state} size="small"
                                            getOptionLabel={(option: any) => option.s_stateName}
                                            defaultValue={state[submittext.statename - 1]}
                                            onChange={(e: any, value: any) => { if (value != null) { submittext.statename = value.s_id; } else { submittext.statename = 0; } }}
                                            renderInput={(params) => <TextField className='td2'  {...params} />}
                                        />
                                    </Grid>
                                    <Grid lg={3} item>
                                        <label className='th1'>Country Name</label>
                                        <Autocomplete id="Country-box-demo" options={country} size="small"
                                            getOptionLabel={(option: any) => option.s_countryname}
                                            defaultValue={country[submittext.countrycode - 1]}
                                            onChange={(e: any, value: any) => { if (value != null) { submittext.countrycode = value.s_id; } else { submittext.countrycode = 0; } }}
                                            renderInput={(params) => <TextField className='td2'  {...params} style={{ width: '90%' }} />}
                                        />
                                    </Grid>
                                    <Grid lg={3} item>
                                        <label className='th1 mt10'>Status</label>< br />
                                        <Select size="small" className='th1 td2' defaultValue={submittext.status}

                                            onChange={(e: any) => { submittext.status = e.target.value }}
                                        >
                                            <MenuItem className='th1' value={''}>Select</MenuItem>
                                            <MenuItem className='th1' value={'Active'}>Active</MenuItem>
                                            <MenuItem className='th1' value={'In-Active'}>In-Active</MenuItem>
                                            {/* {errormsg == 5 && <small className="text-danger">Please Select one</small>} */}
                                        </Select>
                                    </Grid>
                                    <Grid style={{ textAlign: 'end', padding: '0px 15px' }}>
                                        {/* {errormsg2 !== '' && <strong className="text-danger">{errormsg2}</strong>} */}
                                    </Grid>
                                    <Grid lg={12} className={filteropen == true ? '' : 'btnsec'}>
                                        <Grid container item={true} direction="row" justifyContent="end" alignItems="center" style={{ margin: '10px 10px' }}>
                                            <Button variant="text" onClick={clear} className="creatbtn mt2" style={{ marginRight: '20px' }}>clear</Button>
                                            <Button variant="contained" onClick={submitval} className="bluebg creatbtn mt2" style={{ marginRight: '20px' }}>Submit</Button>
                                                                                   </Grid>
                                    </Grid>
                                </Grid>
                            </div>

                        </Container>
                    }
                    <Container>
                        <Grid lg={12} >
                            <Grid container item={true} direction="row" justifyContent="end" alignItems="center" style={{ margin: '10px 10px' }}>
                                <Button size="small" className='filter-btn' variant="outlined" onClick={filterbtn} style={{ marginRight: '20px' }}>
                                    < FilterListRoundedIcon />
                                    <span>Filter</span>
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                     {filteropen &&
                        <Container >
                            <div >
                                <Grid container item={true} style={{ paddingTop: '10px' }}>
                                    <Grid lg={3} item>
                                        <label className='th1'>City Code</label>
                                        <TextField className='td2'
                                        error={errormsg == 1 }
                                            multiline
                                            size="small"
                                            id="citycode"
                                            variant="outlined"
                                            defaultValue={submittext.citycode}
                                            onChange={(e: any) => {validationCheeck(1,e)}} />
                                        <br />
                                        {errormsg == 1 && <small className="text-danger">allow only alphabets &<br /> maxLength 2 characters</small>}
                                    </Grid>
                                    <Grid lg={3} item>
                                        <label className='th1'>City Name</label>
                                        <TextField error={errormsg == 2} className='td2' size="small" multiline id="cityname" variant="outlined"
                                             onChange={(e: any) => {validationCheeck(2,e)}} defaultValue={submittext.cityname} />
                                        <br />
                                        {errormsg == 2 && <small className="text-danger">allow only alphabets</small>}
                                    </Grid>
                                    <Grid lg={3} item>
                                        <label className='th1'>State Name</label>
                                        <Autocomplete  id="combo-box-demo" options={state} size="small"
                                            getOptionLabel={(option: any) => option.s_stateName}
                                            defaultValue={state[submittext.statename - 1]}
                                            onChange={(e: any, value: any) => { if (value != null) { submittext.statename = value.s_id; } else { submittext.statename = 0; } }}
                                            renderInput={(params) => <TextField className='td2'  {...params} />}
                                        />
                                       {errormsg == 3 && <small className="text-danger">Please Select one</small>}
                                    </Grid>
                                    <Grid lg={3} item>
                                        <label className='th1'>Country Name</label>
                                        <Autocomplete  id="Country-box-demo" options={country} size="small"
                                            getOptionLabel={(option: any) => option.s_countryname}
                                            defaultValue={country[submittext.countrycode - 1]}
                                            onChange={(e: any, value: any) => { if (value != null) { submittext.countrycode = value.s_id; } else { submittext.countrycode = 0; } }}
                                            renderInput={(params) => <TextField className='td2'  {...params} style={{ width: '90%' }} />}
                                        />
                                       {errormsg == 4 && <small className="text-danger">Please Select one</small>}
                                    </Grid>
                                    <Grid lg={3} item>
                                        <label className='th1 mt10'>Status</label>< br />
                                        <Select error={errormsg == 5} size="small" className='th1 td2' defaultValue={submittext.status}

                                            onChange={(e: any) => { submittext.status = e.target.value }}
                                        >
                                            <MenuItem className='th1' value={''}>Select</MenuItem>
                                            <MenuItem className='th1' value={'Active'}>Active</MenuItem>
                                            <MenuItem className='th1' value={'In-Active'}>In-Active</MenuItem>
                                        </Select>
                                        {errormsg == 5 && <small className="text-danger">Please Select one</small>}
                                    </Grid>
                                    <Grid style={{ textAlign: 'end', padding: '0px 15px' }}>
                                        {/* {errormsg2 !== '' && <strong className="text-danger">{errormsg2}</strong>} */}
                                    </Grid>
                                    <Grid lg={12} className={filteropen == true ? '' : 'btnsec'}>
                                        <Grid container item={true} direction="row" justifyContent="end" alignItems="center" style={{ margin: '10px 10px' }}>
                                            <Button variant="text" onClick={clear} className="creatbtn mt2" style={{ marginRight: '20px' }}>clear</Button>
                                            
                                           
                                                <Button variant="outlined" onClick={getCity} className="bluebg creatbtn mt2" style={{ marginRight: '20px' }}>Search</Button>
                                        
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>

                        </Container>
                    }

                    {!dataget &&
                        <CustomTable head={head} title={title} columns={result} />
                    }
                </Container>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={errorMessage} autoHideDuration={3000} onClose={() => { setErrorMessage(false) }} >
                    <SnackbarContent style={{ backgroundColor: '#0d6efd', color: '#fff' }} message={errorMessage2} />
                </Snackbar>


            </Container>
        </>

    )
}

