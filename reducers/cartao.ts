import { FirebaseContext } from "@/contexts/FirebaseContext"
import { Cartao } from "@/types/cartao"
import { useContext } from "react"
import firestore from "@react-native-firebase/firestore"
import { User } from "@/types/user"


export type CartaoState = {
    cartoes: Cartao[]
    currentCartao: Cartao | null
    curentIndex: string
    name: string
}

export type CartaoAction = {
    type: 'CADASTRAR' | 'SELECIONAR' | 'LISTAR'
    index?: string,
    cartao?: Cartao,
    user: User | null,
}

export const cartaoReducer = (state: CartaoState, action: CartaoAction) => {


    switch (action.type){
        case 'CADASTRAR':
        // let CartaoAction = action.cartao

        // if(action.user != null && action.user.id && CartaoAction){
        //             firestore().collection('Users').doc(action.user.id).collection('Cartoes').where('numero', '==', CartaoAction.numero).get().then(
        //                 (snapShot) => {
        //                     if(snapShot.empty && action.user.id){
        //                         firestore().collection('Users').doc(action.user.id).collection('Cartoes').add({
        //                             name: CartaoAction.name,
        //                             CPF: CartaoAction.CPF,
        //                             numero: CartaoAction.numero,
        //                             validade: CartaoAction.validade,
        //                             CVV: CartaoAction.name
        //                         }).then((element) => {
        //                             alert('Cartão cadastrado.')
        //                             state.curentIndex = element.id
        //                             if(action.user.id) firestore().collection('Users').doc(action.user.id).update({
        //                                 cartao: element.id
        //                             })
        //                         })
        //                     } else {
        //                         return alert('Cartão já existe.')
        //                     }
        //                 }
        //             )   
        //         }
            break
        case 'SELECIONAR':
            // if(action.user){
            //     let user: User = action.user
            //     console.log('1 ' + user.id)
        
            //     firestore().collection('Users').doc(user.id).update({
            //         cartao: action.index
            //     }).then(()=>{
            //         let cartaoSelecionado = state.cartoes?.find(t => t.id === action.index)
            //         if(cartaoSelecionado){
            //             state.curentIndex = cartaoSelecionado.id
            //             state.currentCartao = cartaoSelecionado
            //             state.name = cartaoSelecionado['name']
            //         }
            //         console.log(cartaoSelecionado)
            //         // alert('Cartão selecionado.')
            //     }).then(()=>{
            //         console.log('Depois Entrou aqui')
            //     })
            // }
            console.log(action.index)
            let cartao = state.cartoes.find(t => t.id === action.index)
            if(cartao){
                console.log(cartao)
                state.name = cartao?.name,
                state.curentIndex = cartao?.id
            }            
            break
        case 'LISTAR':
            state.cartoes = []
            if(action.user && action.user.id){
                firestore().collection('Users').doc(action.user.id).get().then((item)=>{
                    let idCartao = item.data()
                    if(idCartao != undefined) {
                        state.curentIndex = idCartao['cartao']
                    }
                })
    
                firestore().collection('Users').doc(action.user.id).collection('Cartoes').get().then(
                    (snapShot) => {
                        snapShot.forEach(query => {
                            let validade = new Date(query.data()['validade'])
                            state.cartoes.push(
                                {
                                    id: query.id,
                                    name: query.data()['name'],
                                    numero: query.data()['numero'],
                                    CPF: query.data()['CPF'],
                                    CVV: query.data()['CVV'],
                                    validade: validade.toLocaleString('pt-BR').substring(3, 10),
                                }
                            )
                        })
                    }
                )   
            }
            break
    }
    return {...state}
}