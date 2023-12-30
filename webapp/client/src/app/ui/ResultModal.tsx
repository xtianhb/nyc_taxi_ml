import React from 'react';
import Modal from 'react-modal';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  fare: number;
  duration: number;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  fare,
  duration,
}) => {
  if (!isOpen) return null;

  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') onClose();
  };
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
      id='wrapper'
      onClick={handleClose}
    >
      <div className='w-full sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] flex flex-col p-4 rounded-md'>
        <button onClick={onClose} className='text-white text-xl self-end'>
          X
        </button>
        <div className='bg-white p-4 rounded-md'>
          <h2 className='text-2xl font-bold mb-4 text-yellow-500'>
            Trip Result
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
      </div>
    </div>
  );
};

export default ResultModal;
