import React from 'react';

interface PredictionProps {
  fare: number;
  duration: number;
}

const Prediction: React.FC<PredictionProps> = ({ fare, duration }) => {
  return (
    <div className='container mx-auto mt-5 result-container'>
      <h2 className='mb-4 text-2xl font-semibold text-yellow-500'>
        Prediction Result
      </h2>

      <div className='mb-3'>
        <label
          htmlFor='fare'
          className='block text-sm font-medium text-gray-700'
        >
          Predicted Fare:
        </label>
        <p className='text-lg font-bold'>{fare}</p>
      </div>

      <div className='mb-3'>
        <label
          htmlFor='duration'
          className='block text-sm font-medium text-gray-700'
        >
          Predicted Duration:
        </label>
        <p className='text-lg font-bold'>{duration}</p>
      </div>
    </div>
  );
};

export default Prediction;
