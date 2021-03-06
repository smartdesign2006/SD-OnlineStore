import React, { useContext, useMemo, useReducer } from 'react'
import styles from './index.module.css'
import ErrorContext from '../../contexts/ErrorContext'
import ProductsContext from '../../contexts/ProductsContext'

import AdminCategories from '../AdminCategories'
import AdminSizes from '../AdminSizes'
import GenderInput from '../InputFields/GenderInput'

import { updateProduct } from '../../services/adminProduct'
import NumberInput from '../InputFields/NumberInput'
import WindowContainer from '../WindowContainer'
import PageSecondaryTitle from '../PageSecondaryTitle'
import TextInput from '../InputFields/TextInput'
import QuantityInput from '../InputFields/QuantityInput'
import DescriptionInput from '../InputFields/DescriptionInput'
import ModifyProductSection from '../ModifyProductSection'
import DateInput from '../InputFields/DateInput'
import SubmitButton from '../SubmitButton'

const ModifyProductWindow = ({
    brand,
    price,
    discount,
    description,
    gender,
    sizes,
    categories,
    hideWindow,
    productId
}) => {
    const { updateProductsPage, updateFilters } = useContext(ProductsContext)
    const { addMessage } = useContext(ErrorContext)

    const initialProduct = useMemo(() => {
        return {
            brand: brand,
            price: price,
            discount: {
                percent: discount ? discount.percent : null,
                endDate: discount ? discount.endDate : null
            },
            description: description,
            gender: gender
        }
    }, [brand, discount, description, gender, price])

    const [state, stateDispatch] = useReducer(productReducer, initialProduct)

    const parsedSizes = useMemo(() => {
        return sizes.reduce((acc, size) => ({ ...acc, [size.sizeName]: size.count }), {})
    }, [sizes])

    const isSubmitDisabled = useMemo(() => {
        const stateEntries = Object.entries(state) 

        return stateEntries.every(([propKey, propValue]) => {
            if (typeof(propValue) === 'object') {
                const propEntries = Object.entries(propValue)

                return propEntries.every(([propEntryKey, propEntryValue]) => {
                    return initialProduct[propKey][propEntryKey] === propEntryValue
                })
            }

            return initialProduct[propKey] === propValue
        })
    }, [state, initialProduct])

    function productReducer(state, action) {
        const { value, type } = action

        switch (type) {
            case 'brand':
                return { ...state, brand: value }
            case 'price':
                return { ...state, price: value }
            case 'discountPercent':
                return { ...state, discount: { ...state.discount, percent: value } }
            case 'discountEndDate':
                return { ...state, discount: { ...state.discount, endDate: value } }
            case 'description':
                return { ...state, description: value }
            case 'gender':
                return { ...state, gender: value }
            default:
                return state
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if ((state.discount.percent && !state.discount.endDate) ||
            (!state.discount.percent && state.discount.endDate)) {
            addMessage(
                'Discount Input Error',
                'Product discount must have both a percentage and an end date.'
            )
            return
        }

        const updateResult = await updateProduct(productId, state)
        if (updateResult.error) {
            addMessage(
                'Product Update Error',
                'An error occurred when trying to update product details.'
            )
            return
        }

        updateFilters()
        updateProductsPage()
    }

    return (
        <WindowContainer hideWindow={hideWindow}>
            <div className={styles.container}>
                <PageSecondaryTitle title='Main:' />
                <div className={styles.form}>
                    <TextInput
                        placeholder='Brand'
                        value={state.brand}
                        onChange={e => stateDispatch({ type: 'brand', value: e.target.value })}
                        maxLength='30'
                    />
                    <NumberInput
                        value={state.price}
                        placeholder='Price'
                        min='0'
                        onChange={e => stateDispatch({ type: 'price', value: Number(e.target.value) || 0 })}
                        unitsPlaceholder='$'
                    />
                    <ModifyProductSection title='Discount:'>
                        <QuantityInput
                            label='Discount in %'
                            value={state.discount.percent}
                            setNewValue={newValue => stateDispatch({ type: 'discountPercent', value: Number(newValue) })}
                            style={{ marginBottom: '0.5rem' }}
                        />
                        <div>End date of discount:</div>
                        <DateInput 
                            value={state.discount.endDate}
                            onChange={e => stateDispatch({ type: 'discountEndDate', value: e.target.value })}
                        />
                    </ModifyProductSection>
                    <DescriptionInput
                        value={state.description}
                        onChange={e => stateDispatch({ type: 'description', value: e.target.value })}
                    />
                    <GenderInput
                        currentGender={state.gender}
                        onChange={value => stateDispatch({ type: 'gender', value })}
                    />
                    <SubmitButton 
                        text='SAVE MAIN' 
                        onClick={handleSubmit} 
                        disabled={isSubmitDisabled}
                    />
                </div>

                <PageSecondaryTitle title='Sizes:' />
                <AdminSizes sizes={parsedSizes} productId={productId} />

                <PageSecondaryTitle title='Categories:' />
                <AdminCategories initialCategories={categories} productId={productId} />
            </div>
        </WindowContainer>
    )
}

export default ModifyProductWindow