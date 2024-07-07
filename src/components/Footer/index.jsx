import {Typography, Link} from '@mui/material';

const linkDefaultStyle = {
    color: "#1976d2",
    fontWeight: "bold",
  };

export default function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ m:'20px', textAlign: 'center', fontSize: '1rem'}}>
        {'Copyright © '}
        {new Date().getFullYear()}{' '}
        <Link color="inherit" href="https://github.com/jonas-holanda" target="_blank" sx={linkDefaultStyle}>
          Jonas Holanda
        </Link>{'. '}
        All Rights Reserved
        {'.'}
      </Typography>
    );
  }