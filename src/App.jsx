import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useState, useEffect } from "react";

import Posts from "./pages/Posts";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact"

import Layout from "./components/Layout";



/**
 * Criar uma rota para o endereço "/contato" que renderizará o componente Contact
 *
 * A rota deve ser adicionada logo após a rota que renderiza o componente Post
 */

function App() {

  const [mode, setMode] = useState("light");

  useEffect(()=> {
    if (localStorage.getItem("mode") === "light") {
      setMode("light");
    } else if(localStorage.getItem("mode") === "dark"){
      setMode("dark");
    }
  }, [])

  const handleToggleMode = () => {
    if (mode === "light") {
      localStorage.setItem("mode", "dark");
      setMode("dark");
    } else if(mode === "dark") {
      localStorage.setItem("mode", "light");
      setMode("light");
    }
  }

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout onToogle={handleToggleMode} />}>
              <Route path="/" element={<Posts />} />
              <Route path="/:id/:slug" element={<Post />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
