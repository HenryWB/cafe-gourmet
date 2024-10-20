import { Carrinho } from "@/reducers/carrinho"
import { Cartao } from "./cartao"
import { Endereco } from "./endereco"

export type Pedido = {
    carrinho: Carrinho,
    valorTotal: string,
    formaPagamento: string,
    cartao?: Cartao,
    endereco: Endereco,
    status: string
}