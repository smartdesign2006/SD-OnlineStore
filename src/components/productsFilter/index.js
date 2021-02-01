import React, { useContext, useState } from 'react'

import styles from './index.module.css'
import ProductsCheckboxFilter from '../productsCheckboxFilter'
import ProductsRangeFilter from '../productsRangeFilter'
import ProductContext from '../../ProductsContext'
import ProductsRatingFilters from '../productsRatingFilters'

const ProductsFilter = () => {
    const { productProps, productPage, totalCount } = useContext(ProductContext)
    const [isActive, setIsActive] = useState(false)
    
    if (!productProps || !productPage) {
        return (
            <></>
        )
    }

    const pageLength = productPage.length

    return (
        <>
            <div className={styles.container}>
                <div className={ isActive ? `${styles['menu-toggle']} ${styles['is-active']}` : styles['menu-toggle'] } onClick={() => setIsActive(!isActive)}>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                </div>
                <div className={ isActive ? ` ${styles['media-aside']} ${styles.active}` : styles['media-aside']}>
                    <div className={styles.title}>
                        <p className={styles['center-text']}>
                            Showing {pageLength} of {totalCount} results
                        </p>
                        <p className={styles['center-text']}>Filter results:</p>
                    </div>
                    <ProductsCheckboxFilter
                            title='Categories'
                            propName='categories'
                            values={productProps.categories} />
                    <ProductsCheckboxFilter
                            title='Brands'
                            propName='brand'
                            values={productProps.brand} />
                    <ProductsCheckboxFilter
                            title='Sizes'
                            propName='sizes'
                            values={productProps.sizes} />
                    <ProductsRangeFilter
                            title='Price'
                            propName='price'
                            min={productProps.minPrice}
                            max={productProps.maxPrice} />
                    <ProductsRatingFilters propName='rating' />
                </div>
            </div>
        </>
    )
}

export default ProductsFilter