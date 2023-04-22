import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import loginimg from '../../Assets/images/loginimg.png';
import './Login.css';
import { Checkbox, Container, CssBaseline, FormControlLabel, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { AuthRequestBody, AuthReturnBody, PortalUser } from '../../Models/login';
import AuthService from '../../Services/AuthService';
export default function Login() {

  const [email, setmail] = useState({ email: '', pass: '' });
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  async function handleclick() {

    const emailval = email.email.trim();
    const password = email.pass.trim();

    //Authenticate: Get 'portalUser' from API
    const requestBody: AuthRequestBody = { email: emailval, password: password };
    const response: AuthReturnBody = await AuthService.authenticate(requestBody);
  }
  return (
    <Container component="main" maxWidth="lg">
      {/* <Box> */}
      <Grid container >
        <CssBaseline />
        <Grid sm={7} lg={7}> <img src={loginimg} className='loginimg' /> </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ background: '#0d6efd', height: '657px' }}>
          <Box style={{ padding: '30px' }}>
            <Grid item xs={12}>  <h6 className='mainhead  '> Transporter </h6></Grid>
            <Grid item xs={12} className='newUser' ><small>Track The Container </small></Grid>
            <Grid item xs={12}>
              <h2 className='mainhead'>Admin Portal</h2>
            </Grid>
            <Grid>
              <label className='th2'> Username</label><br></br>
              <TextField onChange={(e: any) => { email.email = e.target.value }} size="small"
                style={{ width: '100%', backgroundColor: 'white', borderRadius: '5px' }}
              />
            </Grid>
            <Grid style={{ marginTop: '20px' }}>
              <label className='th2'>Password</label><br></br>
              <TextField onChange={(e: any) => { email.pass = e.target.value }}
                size="small" style={{ width: '100%', backgroundColor: 'white', borderRadius: '5px' }} />
            </Grid>
            <Grid>
              <FormControlLabel label="Remember me" id='rememberlogin'
                control={ <Checkbox onChange={handleChange} defaultChecked={checked} sx={{ color: 'white',  '&.Mui-checked': {color: 'white', }, }}/>  }
              />
            </Grid>
            <Grid style={{ textAlign: 'center' }}>
              <Button variant="outlined" onClick={handleclick} className='signupbtn'>sign in</Button>
            </Grid>
            <Grid className="mt-4" style={{ padding: '0px 55px', textAlign: 'center',marginTop:'10px'  }}>
              <span className='line-css'>Or</span>
            </Grid>
            <Grid className="mt-4" style={{ width: '100%', textAlign: 'center',marginTop:'20px'  }}>
              <span style={{ color: 'white'}}>Can't access your account ?</span>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* </Box> */}
    </Container>

  );

}