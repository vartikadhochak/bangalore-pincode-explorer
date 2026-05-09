import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapView = ({ area }) => {

  // Default Bangalore coordinates
  const position = [12.9716, 77.5946];

  return (
    <div className="mt-10 rounded-3xl overflow-hidden shadow-2xl border border-white/20">

      <MapContainer
        center={position}
        zoom={11}
        scrollWheelZoom={true}
        className="h-[400px] w-full"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            {area || 'Bangalore'}
          </Popup>
        </Marker>

      </MapContainer>

    </div>
  );
};

export default MapView;