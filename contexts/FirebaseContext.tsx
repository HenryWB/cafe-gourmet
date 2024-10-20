import { CartaoAction, cartaoReducer, CartaoState } from "@/reducers/cartao";
import { Cartao } from "@/types/cartao";
import { User } from "@/types/user";
import app from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { createContext, useEffect, useReducer, useState } from "react";

export interface IFirebaseContext {
    loading: boolean,
    currentUser: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    currentCard: String | null,
    setCard: React.Dispatch<React.SetStateAction<String | null>>
    currentEndereco: String | null,
    setEndereco: React.Dispatch<React.SetStateAction<String | null>>
    cartao: CartaoState,
    dispatchCartao: React.Dispatch<CartaoAction>
}

export interface IFirebaseProvider {
    children: React.ReactNode;
}


export const FirebaseContext = createContext({
    loading: true,
    currentUser: null,
    currentCard: null,
    currentEndereco: null
} as IFirebaseContext);

const initialStateCartao: CartaoState = {
    cartoes: [],
    currentCartao: null,                       
    curentIndex: '',
    name: '',
}


export const FirebaseProvider: React.FC<IFirebaseProvider> = ({children}) => {
    const [ loading, setLoading ] = useState(true);
    const [ currentUser, setUser ] = useState<User | null>(null);
    const [ currentCard, setCard ] = useState<String | null>(null);
    const [ currentEndereco, setEndereco ] = useState<String | null>(null);

    const [ cartao, dispatchCartao ] = useReducer(cartaoReducer, initialStateCartao)


    const card = ()=>{
        if(auth().currentUser != null){
            firestore().collection('Users').where('email', '==', auth().currentUser?.email).get().then(querySnapshot => {
                querySnapshot.forEach(query => {
                    firestore().collection('Users').doc(query.id).collection('Cartoes').doc(query.data()['cartao']).get().then(item => {
                        let cartaoCadastro = item.data() 
                        if(cartaoCadastro){
                            setCard(cartaoCadastro['name'])
                        }
                    })

                    
                    firestore().collection('Users').doc(query.id).collection('Enderecos').doc(query.data()['endereco']).get().then(item => {
                        let enderecoCadastro = item.data()
                        if(enderecoCadastro){
                            setEndereco(enderecoCadastro['rua'])
                        }
                    })
                })
            })
        }   
    }


    useEffect(() => {
        let newUser: User

        const subscriber = auth().onAuthStateChanged((user) => {
            setLoading(false);
            if(auth().currentUser != null){
                firestore().collection('Users').where('email', '==', auth().currentUser?.email).get().then((querySnapshot) => {
                    querySnapshot.forEach(documentSnapshot => {
                        newUser = {
                            id: documentSnapshot.id,
                            email: documentSnapshot.data()['email'],
                            name: documentSnapshot.data()['name'],
                            tel: documentSnapshot.data()['tel'],
                            nascimento: documentSnapshot.data()['nascimento'],
                            tipo: documentSnapshot.data()['tipo'],
                            cartao: documentSnapshot.data()['cartao']
                        }
                        setUser(auth().currentUser)
                    })

                    dispatchCartao({
                        type: 'LISTAR',
                        user: newUser,
                    })
                    
                }).then(() => {
                    if (newUser.cartao) {
                        dispatchCartao({
                            type: 'SELECIONAR',
                            index: newUser.cartao,
                            user: newUser,
                        })
                    }
                })
            }
        });

        setTimeout(()=>{
            console.log('Ultimo a Executar: ')
            console.log(cartao)
        },8000)

        card()

        return subscriber;
    }, []);

    if(loading) return null


    return (
        <FirebaseContext.Provider value={{ loading, currentUser, setUser, currentCard, setCard, currentEndereco, setEndereco, cartao, dispatchCartao  }}>
            {children}
        </FirebaseContext.Provider>
    );
}