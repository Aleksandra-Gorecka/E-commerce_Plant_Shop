import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './QuantityWidget.module.scss';
import { useState } from "react";

const QuantityWidget = ({ onCountChange }) =>{

    const [productCount, setProductCount] = useState(1);

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
            <Button variant="success m-1" className={styles.btn} onClick={decreaseProductCount}>
                <FontAwesomeIcon icon={faMinus} />
            </Button>
            <input className={styles.amount} type="text" value={productCount} onChange={handleProductCount}></input>
            <Button variant="success m-1" className={styles.btn} onClick={increaseProductCount}>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
        </section>
    )
}

export default QuantityWidget;