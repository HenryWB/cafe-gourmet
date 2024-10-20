import { Cafe } from "@/types/cafe"

export type Carrinho = {
  cafes: Cafe[],
  curentIndex: number,
}

export type CarrinhoAction = {
  type: 'INCREASE' | 'DECREASE' | 'REMOVE'
  index: number
  cafe: Cafe
}

export const carrinhoReducer = (state: Carrinho, action: CarrinhoAction) => {
  switch (action.type) {
    case 'INCREASE':
      if (state.cafes && state.cafes.length == 0) {
        const cafeAdd: Cafe = {
          id: action.cafe.id,
          titulo: action.cafe.titulo,
          desc: action.cafe.desc,
          preco: action.cafe.preco,
          img: action.cafe.img,
          quantidade: 1
        }
        state.cafes.push(cafeAdd)   
    
      } else {
    
        if (action.index != -1) {
          if (state.cafes && state.cafes[action.index].quantidade && action.cafe.quantidade && state.cafes[action.index].quantidade < action.cafe.quantidade) {
            state.cafes[action.index].quantidade += 1
          }
        }
    
        if (action.index == -1 && state.cafes && action.cafe.quantidade && action.cafe.quantidade > 0) {
          const cafeAdd: Cafe = {
            id: action.cafe.id,
            titulo: action.cafe.titulo,
            desc: action.cafe.desc,
            preco: action.cafe.preco,
            img: action.cafe.img,
            quantidade: 1
          }
          state.cafes?.push(cafeAdd)
        }
      }
      state.curentIndex = state.cafes.findIndex(i => i.id == action.cafe.id)
      break
    case 'DECREASE':
      console.log('Diminui')

      if (state.cafes && action.index != -1 && state.cafes[action.index].quantidade) {
        if (state.cafes[action.index].quantidade > 0) {
          state.cafes[action.index].quantidade -= 1
          state.curentIndex = state.cafes.findIndex(i => i.id == action.cafe.id)
        }

        if (state.cafes[action.index].quantidade <= 0) {
            state.cafes.splice(action.index, 1)
            state.curentIndex = -1
        }
      }

      break
    case 'REMOVE':
      if(action.index == -1) return {...state}
      state.cafes[action.index].quantidade = 0
      state.cafes.splice(action.index, 1)
      // state.curentIndex = -1

      console.log('Remove')
      console.log(state.cafes)
      break
  }

  return {...state}
}