import {data} from '@/data/index'

export const getAllProducts = () => {
    return data.products
}

export const getProductById = (id: Number) => {
    return data.products.find(item => item.id === id)
}