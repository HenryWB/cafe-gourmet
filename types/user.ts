import { Cartao } from "./cartao"
import { Endereco } from "./endereco"

export type User = {
    'id'?: string | null,
    'name'?: string | null,
    'email'?: string | null,
    'nascimento'?: string | null,
    'tel'?: string | null,
    'tipo'?: string | null,
    'cartao'?: string | null,
    'endereco'?: string | null,
}