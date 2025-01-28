import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import antenasJSON from "./antenas.json";
import markerGreen from "../../assets/marker_green.png";
import markerBlue from "../../assets/marker_blue.png";

const uyCoords = [-32.52, -55.76];
const getRuta = ([lat, long]) => {
  const ruta = `https://www.google.com/maps/dir//${lat},${long}/@${lat},${long},8.0z`;
  return ruta;
};

const getRutaMultiple = (rutas) => {
  console.log(rutas);
  let coordenadas = '';
  Object.keys(rutas).forEach((key) => {
    const [lat, long] = rutas[key].coordenadas;
    coordenadas = coordenadas + `${lat},${long}/`
  });

  Object.keys(rutas).forEach((key, idx) => {
    const [lat, long] = rutas[key].coordenadas;
    if (idx === 0)  {
      coordenadas = coordenadas + `@${lat},${long},8.0z`
    } else {
      return
    }
  });

  const rutaMultiple = `https://www.google.com/maps/dir//${coordenadas}`;
  return rutaMultiple;
}

const greeIcon = new Icon({
  iconUrl: markerGreen,
  iconSize: [24, 40],
  iconAnchor: [12, 40],
  popupAnchor: [0, -40],
});

const blueIcon = new Icon({
  iconUrl: markerBlue,
  iconSize: [24, 40],
  iconAnchor: [12, 40],
  popupAnchor: [0, -40],
});

export default function Map() {
  const [antenasData, setAntenasData] = useState(antenasJSON);
  const [creacionRuta, setCreacionRuta] = useState(null);

  const crearRuta = (antena) => {
    setCreacionRuta({ ...creacionRuta, [antena.id]: antena });
  };
  const deseleccionar = (antena) => {
    console.log("====================================");
    console.log("TO DO");
    console.log("====================================");
  };

  return (
    <MapContainer center={uyCoords} zoom={7} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {antenasData.map((antena, idx) => {
        const isChecked = creacionRuta?.[antena.id] ? true : false;
        return (
          <Marker
            key={idx}
            position={antena.coordenadas}
            icon={isChecked ? greeIcon : blueIcon}
          >
            <Popup onClick={() => crearRuta(antena)} className="custom-popup">
              <div>
                <h2>{antena.titulo}</h2>
                <p>{antena.descripcion}</p>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <img style={{ height: "100px" }} src={antena.imagenes[0]} />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <div style={{ display: "grid", marginRight: '20px'}}>
                    <a
                      href={getRuta(antena.coordenadas)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ruta
                    </a>
                    {creacionRuta && (
                      <a
                        href={getRutaMultiple(creacionRuta)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ruta Multiple
                      </a>
                    )}
                  </div>
                  {!isChecked ? (
                    <button onClick={() => crearRuta(antena)}>
                      {!creacionRuta ? "Crear ruta" : "añadir a la ruta"}
                    </button>
                  ) : (
                    <div style={{ display: "block" }}>
                      <p style={{ margin: "0px" }}>añadido a la ruta</p>
                      <button onClick={() => deseleccionar(antena)}>
                        Deseleccionar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
