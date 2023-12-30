'use client';
import React, {
  useState,
  FormEvent,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import Loading from '../loading';
import Map from './Map';
import { getPrediction } from '../../helpers/data';
import Prediction from './Prediction';
const libraryPlace = ['places'];

interface ApiResponse {
  fare: number;
  duration: number;
}

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
  }, [pickUpRef, dropOffRef]);

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    pickUpRef.current!.value = '';
    dropOffRef.current!.value = '';
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var mi: any = distance?.split(' ');
    var distanceNumber = mi[0];
    const data = { trip_distance: distanceNumber, pickup_date, pickup_time };
    console.log('Datos: ', data);
    try {
      const res: any = await getPrediction(data);
      console.log('response nextjs: ', res);
      setapiResponse(res.data);
      console.log(apiResponse);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto mt-5 p-4 lg:max-w-4xl'>
      {/* Pickup and Dropoff Location Inputs */}
      <div className='flex flex-col lg:flex-row lg:space-x-4'>
        <div className='mb-4 lg:w-1/2 lg:flex lg:flex-col'>
          <div className='mb-4'>
            <label
              htmlFor='pickup_location'
              className='block text-gray-700 font-bold mb-2'
            >
              Pickup Location:...
            </label>
            <Autocomplete>
              <input
                type='text'
                className='form-input w-full border border-gray-300 rounded-md'
                ref={pickUpRef}
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
            <Autocomplete>
              <input
                type='text'
                className='form-input w-full border border-gray-300 rounded-md'
                ref={dropOffRef}
              />
            </Autocomplete>

            {/* Distance Button */}
            <div className='text-center mt-4'>
              <button
                type='button'
                className='btn-primary btn-lg font-semibold text-white'
                onClick={() => {
                  calculateDistance();
                  clearRoute();
                }}
              >
                Calculate Distance
              </button>
            </div>
            {distance !== null && (
              <div className='mt-4 text-center'>
                <p className='font-bold'>Distance: {distance}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Map */}
        <Map center={center} directionsResponse={directionsResponse} />
      </div>
      <form onSubmit={handleSubmit} className='mx-auto max-w-md mt-10'>
        {/* Date Input */}
        <div className='flex space-x-4'>
          <div className='mb-4 flex-1'>
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
              value={pickup_date}
              onChange={handleDateChange}
              required
            />
          </div>

          {/* Time Input */}
          <div className='mb-4 flex-1'>
            <label
              htmlFor='time'
              className='block text-gray-700 font-bold mb-2'
            >
              Time (24-hour):
            </label>
            <input
              type='time'
              className='form-input w-full border border-gray-300 rounded-md'
              name='time'
              value={pickup_time}
              onChange={handleTimeChange}
              required
            />
          </div>
        </div>

        {/* Predict Button */}
        <div className='text-center'>
          <button type='submit' className='btn-primary btn-lg'>
            <span className='font-semibold'>Predict</span>
          </button>
        </div>
      </form>
      {apiResponse && (
        <Prediction fare={apiResponse.fare} duration={apiResponse.duration} />
      )}
    </div>
  );
};

export default Form;
