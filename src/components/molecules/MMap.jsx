import { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function MMap({ position, onSetPosition }) {
  const mapContainer = useRef(null);
  let map = useRef(null);
  let market = useRef(null);

  // Generar instancia del mapa y marcador
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: position,
      zoom: 10,
    });

    market.current = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat(position)
      .addTo(map.current);
  }, []);

  // Actualizar posición del marcador
  useEffect(() => {
    function onDragEnd() {
      const lngLat = market.current.getLngLat();
      onSetPosition(lngLat);
    }

    market.current.on('dragend', onDragEnd);
    market.current.setLngLat(position);
    map.current.flyTo({
      center: position,
    });
  }, [position]);

  return (
    <div ref={mapContainer} className="h-full ">
      <div className="absolute z-10 mx-2 my-7 p-2 rounded bottom-4 left-0  text-white bg-primary">
        <div>Longitude: {position.lng}</div>
        <div>Latitude: {position.lat}</div>
      </div>
    </div>
  );
}

export default MMap;
