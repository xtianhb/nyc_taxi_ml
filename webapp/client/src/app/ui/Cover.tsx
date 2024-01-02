import Image from 'next/image';

const Cover = () => {
  return (
    <div className='hero-cover relative bg-cover bg-center min-h-[60vh]'>
      <div className='color-overlay absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center text-center'>
        <h1 className='text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'>
          NYC Taxi Fare and Trip Duration Prediction
        </h1>
      </div>
    </div>
  );
};

export default Cover;
