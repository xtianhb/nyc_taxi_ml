'use client';
import React, { useState, FormEvent, useRef, useCallback } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { getPrediction } from '../../helpers/data';
import Map from './Map';
import Prediction from './Prediction';
import ErrorModal from './ErrorModal';
import { ApiResponse } from '@/helpers/definitions';
import Loading from '../loading';
const libraryPlace = ['places'];

const Form: React.FC = () => {
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<null | string>(null);
  const pickUpRef = useRef<HTMLInputElement>(null);
  const dropOffRef = useRef<HTMLInputElement>(null);
  const [apiResponse, setapiResponse] = useState<ApiResponse | null>(null);
  const [pickup_date, setPickup_date] = useState('');
  const [pickup_time, setPickup_time] = useState('');
  const center = { lat: 40.71427, lng: -74.00597 };
  const [error, setError] = useState({
    title: '',
    message: '',
  });
  const apiKey: any = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: libraryPlace as any,
  });
  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPickup_date(e.target.value);
    },
    []
  );
  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPickup_time(e.target.value);
    },
    []
  );
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const openErrorModal = () => {
    setErrorModalIsOpen(true);
  };
  const closeErrorModal = () => {
    setErrorModalIsOpen(false);
  };
  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setPickup_date('');
    setPickup_time('');
    pickUpRef.current!.value = '';
    dropOffRef.current!.value = '';
  }

  const calculateDistance = useCallback(async () => {
    if (pickUpRef.current?.value === '' || dropOffRef.current?.value === '') {
      return;
    }
    try {
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
        const mi = distance.text.split(' ');
        const distanceNumber = mi[0];
        const data = {
          trip_distance: distanceNumber,
          pickup_date,
          pickup_time,
        };
        try {
          const res = await getPrediction(data);
          console.log('api', res.data);
          console.log(res.status);
          setapiResponse(res.data);
        } catch (error: any) {
          console.error(error);
          setError((prevObject) => ({
            ...prevObject,
            title: error.status,
            message: error.message,
          }));
        }
      }
    } catch (error: any) {
      console.error('Error calculating distance:', error);
      setError((prevObject) => ({
        ...prevObject,
        title: '404',
        message: 'Distance information not available.',
      }));
      openErrorModal();
    }
  }, [pickUpRef, dropOffRef, pickup_date, pickup_time]);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    calculateDistance();
    clearRoute();
  };

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto mt-10 mb-10 px-4 lg:px-0'>
      <form
        onSubmit={handleSubmit}
        className='max-w-3/4 mx-auto flex flex-col lg:flex-row xl:w-3/4 2xl:w-4/5'
      >
        <div className='lg:w-1/2 lg:pr-4'>
          <div className='mb-4'>
            <label
              htmlFor='pickup_location'
              className='block text-gray-700 font-bold mb-2'
            >
              Pickup Location:
            </label>
            <Autocomplete
              options={{
                strictBounds: true,
                componentRestrictions: { country: 'us' },
                bounds: {
                  east: -73.70018,
                  north: 40.915568,
                  south: 40.496044,
                  west: -74.25573,
                },
              }}
            >
              <input
                type='text'
                className='form-input w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-yellow-500'
                ref={pickUpRef}
                required
              />
            </Autocomplete>
          </div>

          <div className='mb-4'>
            <label
              htmlFor='dropoff_location'
              className='block text-gray-700 font-bold mb-2'
            >
              Dropoff Location:
            </label>
            <Autocomplete
              options={{
                strictBounds: true,
                componentRestrictions: { country: 'us' },
                bounds: {
                  east: -73.70018,
                  north: 40.915568,
                  south: 40.496044,
                  west: -74.25573,
                },
              }}
            >
              <input
                type='text'
                className='form-input w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-yellow-500'
                ref={dropOffRef}
                required
              />
            </Autocomplete>

            {distance !== null && (
              <div className='mt-2 text-center'>
                <p className='font-bold'>Distance: {distance}</p>
              </div>
            )}
          </div>
          <div className='flex flex-col lg:flex-row mb-4 space-y-4 lg:space-y-0'>
            <div className='lg:w-1/2'>
              <label
                htmlFor='pickup_date'
                className='block text-gray-700 font-bold mb-2'
              >
                Date:
              </label>
              <input
                type='date'
                className='form-input w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-yellow-500'
                name='pickup_date'
                value={pickup_date}
                onChange={handleDateChange}
                required
              />
            </div>
            <div className='lg:w-1/2'>
              <label
                htmlFor='time'
                className='block text-gray-700 font-bold mb-2'
              >
                Time (24-hour):
              </label>
              <input
                type='time'
                className='form-input w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-yellow-500'
                name='time'
                value={pickup_time}
                onChange={handleTimeChange}
                required
              />
            </div>
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 focus:outline-none'
            >
              <span className='font-semibold'>Predict</span>
            </button>
          </div>
        </div>
        <div className='lg:w-full mt-4 lg:mt-0'>
          <Map center={center} directionsResponse={directionsResponse} />
        </div>
      </form>
      <div ref={paragraphRef}>
        {apiResponse && (
          <Prediction fare={apiResponse.fare} duration={apiResponse.duration} />
        )}
      </div>
      <ErrorModal
        isOpen={errorModalIsOpen}
        onClose={closeErrorModal}
        title={error.title}
        message={error.message}
      />
    </div>
  );
};

export default Form;
