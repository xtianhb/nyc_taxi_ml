import React from 'react';
import { ErrorModalProps } from '@/helpers/definitions';

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
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
      <div className='bg-white p-4 rounded-md sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl'>
        <button onClick={onClose} className='text-white text-xl place-self-end'>
          X
        </button>
        <div className='bg-white p-4 rounded-md'>
          <h2 className='text-2xl font-bold mb-4'>{title}</h2>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
