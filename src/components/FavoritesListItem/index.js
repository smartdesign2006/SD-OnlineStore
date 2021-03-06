import React, { useState } from 'react'
import styles from './index.module.css'
import FavoritesIcon from '../FavoritesIcon'

import { Link } from 'react-router-dom'
import AddToCartButton from '../AddToCartButton'
import ProductSizes from '../ProductSizes'

const FavoritesListItem = ({
    productId,
    brand,
    description,
    price,
    discountPrice,
    image,
    sizes
}) => {
    const [selectedSize, setSelectedSize] = useState(null)

    return (
        <div className={styles.container}>
            <div className={styles['img-container']}>
                <Link to={`/product/details/${productId}`}>
                    <img className={styles.image} src={image} alt='Product' />
                </Link>
            </div>
            <div className={styles['info-container']}>
                <div className={styles['info-container-overview']}>
                    <div>
                        <h3 className={styles.brand}>{brand}</h3>
                        <p className={styles.info}>{description}</p>
                        <div className={styles['size-container']}>
                            <ProductSizes sizes={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                        </div>
                    </div>
                </div>
                <div className={styles.column}>
                    {/* <div className={styles['btn-container']}> */}
                        <FavoritesIcon productId={productId} />
                    {/* </div> */}
                    { discountPrice
                        ?
                        <div className={styles.price}>
                            <div className={styles['price-original']}>
                                {price.toFixed(2)}$
                            </div>
                            {discountPrice.toFixed(2)}$
                        </div>
                        :
                        <div className={styles.price}>
                            {price.toFixed(2)}$
                        </div>
                    }

                    <AddToCartButton 
                        productId={productId} 
                        selectedSize={selectedSize}
                    /> 
                </div>
            </div>
        </div>
    )
}

export default FavoritesListItem