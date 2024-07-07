import { useState } from "react";

import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";

import Loading from "../../components/Loading";

const inputStyle = {
  width: "100%",
};

const defaultFormData = {
  name: "",
  email: "",
  message: "",
  isHuman: false,
};

export default function Contact() {
  const [formData, setFormData] = useState(defaultFormData);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const showSuccessMessage = () => {
    setErrorMessage(false);
    setOpenSnackBar(true);
  };

  const showErrorMessage = () => {
    setErrorMessage(true);
    setOpenSnackBar(true);
  };

  const sendData = async () => {
    if (isFormValid()) {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://fast-react-api.onrender.com/contact",
          {
            method: "post",
            headers: [
              ["Accept", "application/json"],
              ["Content-Type", "application/json"],
            ],
            body: JSON.stringify(formData),
          }
        );
  
        setIsLoading(false);
  
        if (response.ok) {
          showSuccessMessage();
          setFormData(defaultFormData);
        } else {
          showErrorMessage();
        }
      } catch (error) {
        setIsLoading(false);
        showErrorMessage();
      }
    } else {
      return;
    }
    
  };

  const isFormValid = () =>
    !!(formData.name && formData.name.length > 7 && formData.email && formData.message && formData.message.length > 7 && formData.isHuman);

  const getAlert = () => {

    return (
      <div>
        {
          errorMessage
          ? <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
              Erro ao enviar mensagem
            </Alert>
          : <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
              Mensagem enviada com sucesso
            </Alert>
        }
      </div>
    );
  };

  return (
    <>
      <Snackbar
       anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {getAlert()}
      </Snackbar>
      { isLoading && <Loading />}
      <Grid container spacing={2} rowGap={2} direction={"column"} sx={{mt: '40px'}}>
      
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={formData.name}
            label="Nome"
            helperText="Obs: O nome precisa ter no mínimo 8 caracteres."
            variant="standard"
            sx={inputStyle}
            name="name"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={formData.email}
            label="E-mail"
            variant="standard"
            sx={inputStyle}
            name="email"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={formData.message}
            label="Mensagem"
            helperText="Obs: A mensagem precisa ter no mínimo 8 caracteres."
            variant="standard"
            multiline
            minRows={3}
            sx={inputStyle}
            name="message"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            name="isHuman"
            onChange={handleChange}
            label="Sou humano"
            control={<Checkbox checked={formData.isHuman} />}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" disabled={isLoading || !isFormValid()} onClick={sendData}>Enviar</Button>
        </Grid>
      </Grid>
    </>
  );
}
