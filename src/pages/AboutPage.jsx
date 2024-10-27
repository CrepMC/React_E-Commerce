import React from 'react'
import { Footer, Navbar } from "../components";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3 d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
        In the heart of our establishment lies a profound commitment to quality and excellence. We believe that every product we offer is not merely an item for sale, but a carefully curated experience that embodies our values and dedication to our customers. Our journey began with a simple vision: to create a space where individuals can find not just products, but stories that resonate with their own lives. 

        Each piece in our collection is a testament to craftsmanship, reflecting the artistry and passion of those who create them. From the softest fabrics that caress the skin to the intricate designs that tell tales of tradition and innovation, we strive to bring you items that inspire and uplift. 

        As you explore our offerings, we invite you to immerse yourself in the narratives woven into each product. Whether it’s the elegance of our clothing, the sparkle of our jewelry, or the cutting-edge technology of our electronics, we hope you find a connection that transcends the ordinary. 

        Our mission extends beyond commerce; it is about building a community where every customer feels valued and appreciated. We are here to serve you, to listen to your needs, and to ensure that your experience with us is nothing short of exceptional. Join us on this journey, and let us be a part of your story.
        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row d-flex justify-content-center">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="./assets/example_shoe.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Wommen Shoes</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage