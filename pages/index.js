import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/nav';
import ProductDetails from '../components/ProductDetails'; 
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

export default function Home({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    console.log('Product selected:', product.id);
    setSelectedProduct(product.id);
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <Navbar />
          <div className={`${styles.flex} ${styles.itemsCenter} ${styles.justifyCenter} ${styles.mb6} ${styles.textCenter} ${styles.hAuto}`}>
            <Image src="/image.jpg" alt="Organization Logo" width={200} height={200} />
            <h1 className={styles.mt4}>Discover the Amazing World of Fake Store</h1>
            <p className={styles.mt2}>Our mission is to introduce you to the extraordinary realm of e-commerce!</p>

            <h2 className={styles.mt4}>Best Picks of the Day</h2>
            <div className={styles.grid}>
              {products?.map((product) => (
                <div key={product.id} className={styles.border}>
                  <Image src={product.image} alt={product.title} width={200} height={200} />
                  <p>{product.title}</p>
                  <p>Unbeatable Price: ${product.price}</p>
                  <p>Discover a world of possibilities with this fantastic product.</p>
                  <button onClick={() => handleProductSelect(product)}>View Details</button>
                  <a
                    href="https://vercel.com/aryakavarr/my-portfolio/7RPQGW8brCjgPrxaPewGKFWW7xhJ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Visit Vercel</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {selectedProduct && <ProductDetails id={selectedProduct} />}
        </div>
      </main>
    </>
  );
}


export async function getStaticProps() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: [],
      },
    };
  }
}

