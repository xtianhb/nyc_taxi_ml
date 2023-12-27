import React, { memo } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

interface MapProps {
  center: { lat: number; lng: number };
  directionsResponse: google.maps.DirectionsResult | null;
}

const Map: React.FC<MapProps> = ({ center, directionsResponse }) => {
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
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry',
              },
              {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: [
                  {
                    visibility: 'on',
                  },
                  {
                    color: '#EA9820',
                  },
                ],
              },
              {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    saturation: 36,
                  },
                  {
                    color: '#FFFFFF',
                  },
                  {
                    lightness: 10,
                  },
                ],
              },
              {
                featureType: 'all',
                elementType: 'labels.icon',
              },
              {
                featureType: 'administrative',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#FFFFFF',
                  },
                ],
              },
              {
                featureType: 'administrative.country',
                elementType: 'geometry.stroke',
                stylers: [
                  {
                    color: '#FFFFFF',
                  },
                ],
              },
              {
                featureType: 'administrative.province',
                elementType: 'geometry.stroke',
                stylers: [
                  {
                    color: '#FFFFFF',
                  },
                ],
              },
              {
                featureType: 'administrative.locality',
                elementType: 'geometry.stroke',
                stylers: [
                  {
                    color: '#FFFFFF',
                  },
                ],
              },
              {
                featureType: 'administrative.neighborhood',
                elementType: 'geometry.stroke',
                stylers: [
                  {
                    color: '#FFFFFF',
                  },
                ],
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [
                  {
                    color: '#FFFFFF',
                  },
                ],
              },
              {
                featureType: 'administrative',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#FFFFFF',
                  },
                ],
              },
              {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [
                  {
                    color: 'black',
                  },
                ],
              },
              // Add more styles as needed
            ],
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

export default memo(Map);
