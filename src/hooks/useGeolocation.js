import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  const onSuccess = (position) => {
    setPosition({
      lng: position.coords.longitude,
      lat: position.coords.latitude,
    });
  };

  const onError = (error) => {
    setError(error);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError(new Error('Geolocation is not supported'));
      return;
    }

    const watcher = geo.watchPosition(onSuccess, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return {
    position,
    error,
  };
};
