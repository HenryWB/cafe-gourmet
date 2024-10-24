import { User } from "@/types/user";
import app from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { Cafe } from "@/types/cafe";
import { Carrinho, CarrinhoAction, carrinhoReducer } from "@/reducers/carrinho";
import { Pedido } from "@/types/pedido";

export interface IProductsContext {
    carrinho: Carrinho,
    products: Cafe[] | null,
    pedido: Pedido | null,
    setProducts: React.Dispatch<React.SetStateAction<Cafe[] | null>>,
    dispatchCarrinho: React.Dispatch<CarrinhoAction>,
    setPedido: React.Dispatch<React.SetStateAction<Pedido | null>>,
}

export interface IProductsProvider {
    children: React.ReactNode;
}


export const ProductsContext = createContext({
    products: null,
    pedido: null,
} as IProductsContext);

const initialState: Carrinho = {
    cafes: [],
    curentIndex: -1
}

export const ProductsProvider: React.FC<IProductsProvider> = ({children}) => {
    const [carrinho, dispatchCarrinho] = useReducer(carrinhoReducer, initialState)
    const [pedido, setPedido] = useState<Pedido | null>(null)
    const [products, setProducts] = React.useState<Cafe[] | null>(null)
    
    useEffect(() => {
        firestore().collection('Cafes').get().then((query) => {
            let data: Cafe[] = []
            query.forEach(item => {
                const cafe = item.data()
                const novoProduto: Cafe = {
                    id: item.id,
                    titulo: cafe['titulo'],
                    desc: cafe['desc'],
                    preco: cafe['preco'],
                    gramas: cafe['gramas'],
                    img: cafe['img'],
                    quantidade: cafe['quantidade'],
                }
                data.push(novoProduto)
            })
            setProducts(data)
        })
        //console.log(carrinho.cafes)
    }, []);



    return (
        <ProductsContext.Provider value={{ carrinho, dispatchCarrinho, products, setProducts, pedido, setPedido}}>
            {children}
        </ProductsContext.Provider>
    );
}