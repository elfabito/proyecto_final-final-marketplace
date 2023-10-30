import * as React from 'react'
import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import TextField from '@mui/material/TextField'
import CustomSelectCheckmarks from './CustomSelectCheckmarks'
import Carrousel from './Carrousel'
import Button from '@mui/material/Button'
import './MainPage.css'
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchResult from "./Results/SearchResult";

function MainPage() {
  const [seleccion, setSeleccion] = React.useState("venta");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const options_default = [
    "Casa",
    "Apartamento",
    "Terreno",
    "Local Comercial",
    "Oficina",
    "Chacra o Campo",
    "Garage o Cochera",
  ];

  const handleChange = (event, newSeleccion) => {
    setSeleccion(newSeleccion);
  };
  const handleTextFieldChange = (event) => {
    const newText = event.target.value;
    setSearchText(newText);
  };

  return (
    <div className="App">
      <div className="SearchBackground">
        <div className="Search">
          <Box>
            <form>
              <ToggleButtonGroup
                color="primary"
                value={seleccion}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                id="opciones"
              >
                <ToggleButton value="venta">Venta</ToggleButton>
                <ToggleButton value="alquiler">Alquiler</ToggleButton>
                <ToggleButton value="alquilertemporal">
                  Alquiler Temporal
                </ToggleButton>
              </ToggleButtonGroup>

              <div className="contenedorBusqueda">
                <CustomSelectCheckmarks options={options_default} />
                <TextField
                  id="search"
                  label="Localidad"
                  variant="outlined"
                  value={searchText}
                  onChange={handleTextFieldChange}
                />
                <Link to={`/resultados`}>
                  {" "}
                  <Button variant="contained">Buscar</Button>
                </Link>
              </div>
            </form>
          </Box>
        </div>
      </div>
      <div className="carrousel-container">
        {!searched ? <Carrousel /> : <SearchResult />}
      </div>
    </div>
  );
}

export default MainPage
