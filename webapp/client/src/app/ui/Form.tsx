'use client';
import React, { useState, FormEvent, useRef, useCallback } from 'react';
import axios from 'axios';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

const Form: React.FC = () => {
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState('');

  const pickUpRef = useRef<HTMLInputElement>(null);
  const dropOffRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [time, setTime] = useState('');

  const center = { lat: 40.71427, lng: -74.00597 };
  const apiKey = 'AIzaSyBAw4NhN1QsjPWlH1KNqJh2HeKwwM3Au0A';
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const calculateDistance = useCallback(async () => {
    if (pickUpRef.current?.value === '' || dropOffRef.current?.value === '') {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: pickUpRef.current?.value || '',
      destination: dropOffRef.current?.value || '',
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    const distance = results.routes[0]?.legs[0]?.distance;
    if (distance) {
      setDistance(distance.text);
    } else {
      console.error('Distance information not available.');
    }
  }, []);

  // function clearRoute() {
  //   setDirectionResponse(null);
  //   setDistance('');
  //   pickUpRef.current.value = '';
  //   dropOffRef.current.value = '';
  // }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    // Calculate distance using Google Maps API
    // console.log(pickupLocation, dropoffLocation, pickupDate, time, distance);

    // Your prediction logic (API call, etc.)

    setIsSubmitting(false);
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container mt-5'>
      <form onSubmit={handleSubmit} className='mx-auto max-w-md'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Pickup Location Input */}
          <div className='mb-4'>
            <label
              htmlFor='pickup_location'
              className='block text-gray-700 font-bold mb-2'
            >
              Pickup Location:
            </label>
            <Autocomplete>
              <input
                type='text'
                className='form-input w-full border border-gray-300 rounded-md'
                name='pickup_location'
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                required
                ref={pickUpRef}
              />
            </Autocomplete>
          </div>

          {/* Dropoff Location Input */}
          <div className='mb-4'>
            <label
              htmlFor='dropoff_location'
              className='block text-gray-700 font-bold mb-2'
            >
              Dropoff Location:
            </label>
            <Autocomplete>
              <input
                type='text'
                className='form-input w-full border border-gray-300 rounded-md'
                name='dropoff_location'
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                required
                ref={dropOffRef}
              />
            </Autocomplete>
          </div>
        </div>

        {/* Distance Button */}
        <div className='text-center'>
          <button
            type='submit'
            className='btn-primary btn-lg'
            onClick={calculateDistance}
          >
            Calculate Distance
          </button>
        </div>
        {/* Display Distance */}
        {distance !== null && (
          <div className='mt-4'>
            <p className='font-bold'>Calculated Distance: {distance}</p>
          </div>
        )}

        {/* Date Input */}
        <div className='mb-4'>
          <label
            htmlFor='pickup_date'
            className='block text-gray-700 font-bold mb-2'
          >
            Date:
          </label>
          <input
            type='date'
            className='form-input w-full border border-gray-300 rounded-md'
            name='pickup_date'
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
          />
        </div>

        {/* Time Input */}
        <div className='mb-4'>
          <label htmlFor='time' className='block text-gray-700 font-bold mb-2'>
            Time (in 24-hour format):
          </label>
          <input
            type='time'
            className='form-input w-full border border-gray-300 rounded-md'
            name='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        {/* Predict Button */}
        <div className='text-center'>
          <button
            type='submit'
            className='btn-primary btn-lg'
            disabled={isSubmitting}
          >
            <span className='font-semibold'>
              {isSubmitting ? 'Predicting...' : 'Predict'}
            </span>
          </button>
        </div>
      </form>
      <div className='flex items-center justify-center'>
        <GoogleMap
          center={center}
          zoom={11.5}
          mapContainerStyle={{ width: '30vw', height: '30vh' }}
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

export default Form;
