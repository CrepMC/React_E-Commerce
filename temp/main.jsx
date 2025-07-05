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
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  objectFit: 'contain',
                }}></div>
              <img
                className='card-img img-fluid'
                src='./assets/main.png.jpg'
                alt='Card'
                style={{ height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
          <div className='card-img-overlay d-flex align-items-center'>
            <div className='container'>
              <h5 className='card-title fs-1 text fw-lighter'>
                Welcome to our website
              </h5>
              <p className='card-text fs-5 d-none d-lg-block '>
                <span>
                  In the vast tapestry of existence, where dreams intertwine
                  with reality, we invite you to embark on a journey of
                  discovery. Here, amidst the whispers of the cosmos, lies a
                  sanctuary of inspiration, beckoning you to explore the
                  boundless horizons of imagination. Let your heart dance to the
                  rhythm of creativity, as we weave together stories that
                  transcend time and space, illuminating the path to your
                  aspirations.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
