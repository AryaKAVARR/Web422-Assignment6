import React, { useEffect, useState } from 'react';
import Navbar from '../components/nav';
import styles from '../styles/Product.module.css';
import Link from 'next/link';
import ProductDetails from '../components/ProductDetails';
import { addToShoppingCart } from '@/lib/userData';
import { shoppingListAtom } from '@/store';
import { useAtom } from 'jotai';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [shoppingList, setShoppingList] = useAtom(shoppingListAtom);

  async function addProductToCart(id) {
    const productToAdd = await addToShoppingCart(id);
    setShoppingList((prevShoppingList) => {
      if (prevShoppingList) {
        return [...prevShoppingList, productToAdd];
      } else {
        return [productToAdd];
      }
    });
  }
 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toUpperCase().includes(searchTerm.toUpperCase())
  );

  return (
    <div className={styles.productsContainer}>
      <Navbar />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Products
        </a>
        <div className="collapse navbar-collapse">
          <form
            className="form-inline my-2 my-lg-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              onChange={handleSearchChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="container mt-5">
        <table className={`table ${styles.productsTable}`}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>
                  <img
                    src={product.image}
                    alt="Product"
                    width="50"
                    height="50"
                  />
                </td>
                <td>{product.category}</td>
                <td>
                  {product.rating.rate} ({product.rating.count} reviews)
                </td>
                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      addProductToCart(product.id);
                      setSelectedProductId(product.id);
                    }}
                  >
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Product Details Modal */}
      {selectedProductId !== null && (
        <div className="modal fade show" tabIndex="-1">
          <div className="modal-dialog">
            <div className={`modal-content ${styles.productModal}`}>
              <div className="modal-header">
                <h5 className={`modal-title ${styles.modalTitle}`}>
                  {filteredProducts.find((product) => product.id === selectedProductId)?.title}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setSelectedProductId(null)} 
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className={`modal-body ${styles.modalBody}`}>
                <ProductDetails
                  id={selectedProductId}
                  shoppingList={shoppingList}
                  onClose={() => setSelectedProductId(null)} 

                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal backdrop */}
      {selectedProductId !== null && (
        <div className={`modal-backdrop fade ${styles.modalBackdrop}`} />
      )}
    </div>
  );
}