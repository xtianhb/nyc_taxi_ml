import React from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

interface MapProps {
  center: { lat: number; lng: number };
  directionsResponse: google.maps.DirectionsResult | null;
}

const Map: React.FC<MapProps> = ({ center, directionsResponse }) => {
  console.log('render:', center, directionsResponse);

  return (
    <div className='lg:w-1/2'>
      {/* GoogleMap */}
      {/* Display Distance */}

      <div className='flex items-center justify-center mt-4'>
        <GoogleMap
          center={center}
          zoom={11.5}
          mapContainerStyle={{ width: '100%', height: '300px' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={center} />
          {/* Display markers or directions */}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default React.memo(Map, (prevProps, nextProps) => {
  // Only re-render if directionsResponse changes
  return prevProps.directionsResponse === nextProps.directionsResponse;
});
