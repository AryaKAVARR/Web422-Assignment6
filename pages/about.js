import Navbar from '../components/nav';
import styles from '../styles/About.module.css';

function About() {
    return (
        <div className={`container mx-auto px-4 py-8 ${styles.aboutContainer}`}>
            <Navbar />
            <h1 className={`text-3xl mb-6 ${styles.aboutTitle}`}>Discover Our Story</h1>
            <p className={`text-lg mb-4 ${styles.aboutText}`}>
                Welcome to The Fake Store, your ultimate destination for an exceptional online shopping experience. We take pride in being more than just an ecommerce platform. We are your gateway to an inspiring and diverse world of products.
            </p>
            <h2 className={`text-2xl mb-4 ${styles.aboutSubtitle}`}>Our Commitment</h2>
            <p className={`text-lg ${styles.aboutText}`}>
                Our mission is to provide you with handpicked products that reflect our commitment to quality, reliability, and customer satisfaction. We believe in bringing the world to your doorstep, one product at a time.
            </p>
        </div>
    );
}

export default About;
