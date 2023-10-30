import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import datos from "./Data/Results";
import RenderResults from "./RenderResults";
import {
  Box,
  Stack,
  Divider,
  Button,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import { FilterAlt } from "@mui/icons-material";
import "./SearchResult.css";
import { storeContext } from "../../Store/StoreProvider";
import { useParams } from "react-router-dom";
import Filters from "../Filters";
const SearchResult = () => {
  const [localidad, setLocalidad] = useState("");
  const [numOfResults, setNumOfResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [thisPage, setThisPage] = useState(1);
  //const [filteredResults, setFilteredResults] = useState([]);
  const [store, dispatch] = useContext(storeContext);
  const [raiz, setRaiz] = useState("");
  const { paramTipo } = useParams();
  const { paramLocalidad } = useParams();
  const filtroTipo = paramTipo ? paramTipo : "";
  const filtroLocalidad = paramLocalidad ? paramLocalidad : "";

  useEffect(() => {
    setResults(store.propiedades);
    setLocalidad(filtroLocalidad);
    setRaiz(filtroTipo);
    console.log(raiz);
  }, [filtroTipo, filtroLocalidad, store]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const filterResults = (results) => {
    return results.filter((result) => {
      return (
        result.tipoVenta.toLowerCase().includes(raiz.toLowerCase()) &&
        (result.ubicacion[1].toLowerCase().includes(localidad.toLowerCase()) ||
          result.ubicacion[0].toLowerCase().includes(localidad.toLowerCase()))
      );
    });
  };

  useEffect(() => {
    if (filterResults(results).length > 0) {
      setNumOfResults(filterResults(results).length);
    } else {
      setNumOfResults(0);
    }
  }, [filterResults]);
  return (
    <div className="SearchResult">
      <Container maxWidth="md">
        <Box boxShadow={2}>
          <div className="info">
            <Filters />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="stretch"
            >
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={1}
              >
                <Typography
                  component={"h1"}
                  variant="body1"
                  color="text.primary"
                >
                  Venta de casas y apartamentos en {localidad}.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Estás en: {raiz}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Mostrando {numOfResults} resultados.
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Button variant="outlined" size="small" startIcon={<MapIcon />}>
                  Ver mapa
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<FilterAlt />}
                >
                  Popularidad
                </Button>
              </Stack>
            </Grid>
          </div>
        </Box>
      </Container>
      <Container className="resultados" maxWidth="lg">
        <Box
          boxShadow={2}
          padding={2}
          sx={{
            width: "70%",
            height: "fit-content",
            margin: "auto",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <main className="results">
            {loading && <p>Cargando...</p>}
            {!loading && (
              <div>
                <RenderResults
                  localidad={localidad}
                  results={filterResults(results)}
                />
              </div>
            )}{" "}
          </main>
        </Box>
        <Pagination
          sx={{
            padding: "15px",
            justifyContent: "center",
            display: "flex",
          }}
          onChange={(_, page) => setThisPage(page)}
          page={thisPage}
          color="primary"
        />
      </Container>
    </div>
  );
};

export default SearchResult;
