import React, { useEffect, useState } from 'react'
import { Footer, Navbar } from "../components"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase-config"

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products")
      const productSnapshot = await getDocs(productsCollection)
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setProducts(productList)
      setFilteredProducts(productList)
    }

    fetchProducts()
  }, [])

  const handleSearch = (query) => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProducts(filtered)
  }

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="container my-3 py-3">
        <h1 className="text-center">Products</h1>
        <hr />
        <div className="row">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100">
                <img className="card-img-top p-3" src={product.image} alt="Card" height={200} width={200} style={{ objectFit: "scale-down" }} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description.substring(0, 70)}...</p>
                  <p className="lead">$ {product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Products
