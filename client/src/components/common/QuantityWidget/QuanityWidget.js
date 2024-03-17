import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './QuantityWidget.module.scss';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const QuantityWidget = ({ onCountChange, initialValue }) =>{

    const [productCount, setProductCount] = useState(initialValue || 1);

    useEffect(() => {
      setProductCount(initialValue || 1);
  }, [initialValue]);

    const handleProductCount = () => {
      onCountChange(productCount);
  }

    const increaseProductCount = () => {
        setProductCount(productCount + 1);
        onCountChange(productCount + 1);
      };
    
      const decreaseProductCount = () => {
        if (productCount > 1) {
          setProductCount(productCount - 1);
          onCountChange(productCount - 1);
        }
      };

    return (
        <section className="d-flex align-items-center">
            <Button variant="success m-1" className={`shadow-none ${styles.btn}`} onClick={decreaseProductCount}>
                <FontAwesomeIcon icon={faMinus} />
            </Button>
            <input className={styles.amount} type="text" value={productCount} onChange={handleProductCount}></input>
            <Button variant="success m-1" className={`shadow-none ${styles.btn}`} onClick={increaseProductCount}>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
        </section>
    )
}

QuantityWidget.propTypes = {
  onCountChange: PropTypes.func.isRequired,
  initialValue: PropTypes.number,
};

export default QuantityWidget;