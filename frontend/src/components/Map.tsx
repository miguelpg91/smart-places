import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

///Leaflet permite crear e interactuar con mapas.

type Place = {
    id: number
    title: string
    description: string
    province: string
    city: string
    type: string
    image_url?: string
    pricePerNight: number
    quiet: boolean
    hasWater: boolean
    nearLake: boolean
    latitude: number
    longitude: number
    tags: string[]
}

type Props = {
    places: Place[]
}


export default function Map({ places }: Props) {
    return (
        <div className="mapContainer">
            <MapContainer
                center={[40.4168, -3.7038]}
                zoom={6}
                style={{ height: "500px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"        ////el mapa ????? 
                />

                {places.map(place => (
                    <Marker
                        key={place.id}
                        position={[place.latitude, place.longitude]}
                    >
                        <Popup>
                            <h3>{place.title}</h3>

                            <p className="info"><strong>City: </strong>{place.city}</p>

                            <p className="info"><strong>Province: </strong>{place.province}</p>

                            <p className="info"><strong>Type: </strong>{place.type}</p>
                        </Popup>



                    </Marker>
                ))}

            </MapContainer>
        </div>
    );
}


///<Marker position={[40.4168, -3.7038]} />   Madrid


///PopUp => marcadores clickables