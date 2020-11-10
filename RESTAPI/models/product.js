const mongoose = require('mongoose')

const SIZE_MIN_LENGTH = 1
const SIZE_MAX_LENGTH = 3
const BRAND_MAX_LENGTH = 30
const DESCRIPTION_MAX_LENGTH = 1000

const productSchema = new mongoose.Schema({
    sizes: [{
        sizeName: {
            type: String,
            required: true,
            match: [/^[A-Z0-9]{1,3}$/, `Size can only contain capital letters and digits and must be between ${SIZE_MIN_LENGTH} and ${SIZE_MAX_LENGTH} symbols`],
        },
        count: {
            type: Number,
            required: true,
            min: [0, 'Negative product count is not allowed.']
        }
    }],
    price: {
        type: Number,
        required: true,
        min: [0, 'Negative price is not allowed.']
    },
    discount: {
        percent: {
            validate:{
                validator: preValidateDiscountPercent,
                message: (props) => props.message
                },
            type: Number,
            min: [0, 'Negative discount is not allowed.'],
            max: [1, 'Cannot have more than 100% discount']
        },
        endDate: {
            validate:{
                validator: preValidateDiscountEndDate,
                message: (props) => props.message
                },
            type: Date,
        }
    },
    brand: {
        type: String,
        required: true,
        maxlength: [BRAND_MAX_LENGTH, `Please rename your brand. Maximum ${BRAND_MAX_LENGTH} symbols allowed.`]
    },
    description: {
        type: String,
        required: true,
        max: [DESCRIPTION_MAX_LENGTH, `Description cannot be longer than ${DESCRIPTION_MAX_LENGTH} symbols.`]
    },
    images: [{
        type: String,
        required: true,
        match: [/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/, 'Invalid image URL']
    }],
    gender: {
        type: String,
        enum: ['M', 'F']
    },
    categories: [{
        type: String,
        enum: ['Shoes', 'Bags', 'T-shirts', 'Bathing suits', 'Dresses']
    }]
})

function preValidateDiscountPercent(percent) {

    if (isNaN(Number(percent)) || percent > 100) {
        return {'message':'Discount percentage must be a number between 0 and 100.'}
    }

    percent /= 100
}

function preValidateDiscountEndDate(endDate) {

    if (endDate < new Date()) {
        return {'message':'Cannot have a discount expiration date in the past.'}
    }

}


productSchema.virtual('discountPrice').get(function () {
    return this.price * (1 - this.discount.percent)
})

productSchema.virtual('discounted').get(function () {
    return this.discount == true
})

module.exports = mongoose.model('Product', productSchema)