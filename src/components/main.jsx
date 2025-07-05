import React from 'react';

const Home = () => {
  return (
    <>
      <div className='hero border-1 pb-3'>
        <div className='card bg-white text-white border-0 mx-3'>
          <div
            style={{
              height: '500px',
              width: '100%',
              backgroundColor: '#ffffff',
            }}>
            <div
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%',
              }}>
              <img
                className='card-img img-fluid'
                src='./assets/main.png.jpg'
                alt='Card'
                style={{ height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
