import { Button, Container } from "@material-ui/core";
import { Grid } from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

type proptypeList = {
    title:string;
}

export default function MasterHead (props:proptypeList):ReactElement {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    useEffect(()=>{
    },[]);
    return(
        <Container className=' h-100'>
            <Grid container  direction="row" justifyContent="space-between" alignItems="center" >
                <Grid><h5><span className='header2nd'>{props.title}</span></h5></Grid>
                <Grid >
                    <div style={{ display: 'flex' }}>
                        <Button size="small" variant="contained" className="bluebg">+ Create new</Button>
                        <Button aria-describedby={id} variant="text" onClick={handleClick}>
                            <MoreVertIcon sx={{ fontSize: 30 }} />
                        </Button>
                        <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left',  }} >
                            <Typography sx={{ p: 2 }}>
                                <div style={{padding:'6px',fontWeight:'bold',cursor:'pointer'}}>Upload</div>
                                <div style={{padding:'6px',fontWeight:'bold',cursor:'pointer'}}>Dowload</div>
                            </Typography>
                        </Popover>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}