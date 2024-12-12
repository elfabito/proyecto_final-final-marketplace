import Dato from "./Database/Data.js";
import Breadcrumb from "./Breadcrumbs.js";
import { useEffect, useState } from "react";
import IconDetalle from "./IconDetalle.js";
import MapView from "./MapView.js";
import "./Styles/DestalleDePropiedad.css";
import DPropiedad from "./Descripcion.js";
import Propiedades from "./Propiedades.js";
import React from "react";
import "./Styles/imagen.css";

import data from "../feature_propertyDetails/Database/DataPropiedades.js";
import PropertyDetails from "./Database/DataTablaDePropiedades.js";

function DetallePropiedad(props) {
  const [casa, setCasa] = useState([]);
  const hilos = [
    "MarcketPlace inmobiliario",
    "Alquiler",
    "Maldonado",
    "Punta Del Este",
    "Arquiler de monoambiente",
  ];
  useEffect(() => {
    setCasa(Dato[0]);
  }, []);
  return (
    <div className="DetallePropiedad">
      <header className="main">
        <Breadcrumb Seguimiento={hilos} />

        <div className="DetallePropiedadImagen">
          
        </div>
        <div className="carta">
          <div className="subCarta">
            <div className="encabezado">
              <h1 className="ttitle">{casa.title}</h1>
              <IconDetalle
                className="icono"
                bano={casa.banos}
                dormitorio={casa.dormitorio}
                m2Terreno={casa.m2Terreno}
              />
            </div>
            <div>
              <p className="Moneda">
                <strong>
                  {casa.tipoMoneda}
                  {casa.precio}
                </strong>
              </p>
              <p className="precio">Precio de {casa.tipoVenta}</p>
            </div>
          </div>
          <MapView />
        </div>
        <div>
          <Propiedades datosDeTabla={PropertyDetails} />
        </div>
        <div className="dPropiedad">
          <DPropiedad texto={data} />
        </div>
      </header>
    </div>
  );
}
export default DetallePropiedad;
