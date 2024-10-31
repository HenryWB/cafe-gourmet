import { ProductsContext } from '@/contexts/productsContext'
import { useContext } from 'react'

export const getAllProducts = () => {
    const productsContext = useContext(ProductsContext)
    return productsContext.products
}

export const getProductById = (id: string) => {
    const productsContext = useContext(ProductsContext)
    return productsContext.products?.find(item => item.id === id)
}