import React from 'react';
import { PredictionProps } from '@/helpers/definitions';

const Prediction: React.FC<PredictionProps> = ({ fare, duration }) => {
  return (
    <div className='mx-auto mt-5 text-center'>
      <h2 className='mb-4 text-2xl font-semibold text-yellow-500'>
        Prediction Result
      </h2>
      <div className='flex justify-around'>
        <div className='mb-3'>
          <h3 className='block text-sm font-bold text-gray-700'>Fare:</h3>
          <p className='text-lg font-medium'>$us {fare}</p>
        </div>

        <div className='mb-3'>
          <h3 className='block text-sm font-bold text-gray-700'>Duration:</h3>
          <p className='text-lg font-medium'>{duration} minutes</p>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
