import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer id="sticky-footer" className="py-4 mt-3">
    <div className="text-center">
      <div className="social-icons">
        <a href="https://www.instagram.com/your_instagram_account" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" className={`mr-3 mx-2 ${styles.icon}`} />
        </a>
        <a href="https://www.facebook.com/your_facebook_page" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} size="2x" className={`mr-3 mx-2 ${styles.icon}`} />
        </a>
        <a href="https://twitter.com/your_twitter_account" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} size="2x" className={`mx-2 ${styles.icon}`} />
        </a>
      </div>
      <p className="mt-4">Copyright &copy; Flora Market {new Date().getFullYear()}</p>
    </div>
  </footer>
    )
}

export default Footer;