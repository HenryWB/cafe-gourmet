import { Cartao } from "./cartao"
import { Endereco } from "./endereco"
import { Cafe } from "./cafe"

export type Pedido = {
    id?: string,
    carrinho: Cafe[],
    valorTotal: string,
    formaPagamento: string,
    cartao?: Cartao | null,
    endereco?: Endereco | null,
    status: string,
    observacoes?: Array<string>
}