import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Marker Icon
const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
});

// Recenter when center changes
const RecenterMap = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center && !isNaN(center[0]) && !isNaN(center[1])) {
            map.setView(center, map.getZoom());
        }
    }, [center]);
    return null;
};

// Marker handler
const LocationMarker = ({ markerPos, setMarkerPos, onChange }) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            const rounded = [+lat.toFixed(7), +lng.toFixed(7)];
            setMarkerPos(rounded);
            onChange(rounded);
        },
    });

    return <Marker position={markerPos} icon={markerIcon} />;
};

const MapPicker = ({ onChange, center }) => {
    const [markerPos, setMarkerPos] = useState(center);
    const justClickedMap = useRef(false);

    // Perbarui marker ketika `center` berubah (misal karena input manual)
    useEffect(() => {
        if (!justClickedMap.current) {
            setMarkerPos(center);
        } else {
            justClickedMap.current = false;
        }
    }, [center]);

    const handleMapChange = (pos) => {
        justClickedMap.current = true;
        onChange(pos);
    };

    return (
        <MapContainer center={markerPos} zoom={15} scrollWheelZoom={true} style={{ height: "250px", width: "100%", borderRadius: "8px" }}>
            <RecenterMap center={markerPos} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker markerPos={markerPos} setMarkerPos={setMarkerPos} onChange={handleMapChange} />
        </MapContainer>
    );
};

export default MapPicker;
