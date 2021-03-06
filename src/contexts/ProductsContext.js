import React from 'react'

const ProductsContext = React.createContext({
    productProps: null,
    productPage: null,
    totalCount: 0,
    filters: null,
    filtersDispatch: () => {},
    handleProductDelete: () => {},
    updateFilters: () => {},
    updateProductsPage: () => {}
})

export default ProductsContext