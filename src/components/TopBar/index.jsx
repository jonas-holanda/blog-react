import { AppBar, Button, Container, Toolbar, Typography, useTheme } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const linkDefaultStyle = {
  fontSize: 16,
  fontWeight: 400,
  textDecoration: "none",
  color: "#FFFFFF",
};

const linkActiveStyle = {
  fontSize: 16,
  fontWeight: 600,
  textDecoration: "underline",
  color: "#FFFFFF",
};

const getLinkStyle = (isActive) => {
  if (isActive) {
    return linkActiveStyle;
  }
  return linkDefaultStyle;
};

export default function TopBar({onToogleMode}) {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");
  const theme = useTheme();
  return (
    <AppBar component="nav">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Button
            sx={{ color: "#fff", marginRight: "auto" }}
            onClick={goToHome}
          >
            <Typography variant="h6" component="div">
              BLOG
            </Typography>
          </Button>
          <NavLink
            to={"/contato"}
            style={({ isActive }) => getLinkStyle(isActive)}
          >
            Contato
          </NavLink>

          <Button color="secondary" sx={{ ml: 4 }} onClick={onToogleMode} variant="contained" endIcon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}>
            mudar tema
          </Button>
         
        </Toolbar>
      </Container>
    </AppBar>
  );
}
