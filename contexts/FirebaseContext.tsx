import { Cartao } from "@/types/cartao";
import { Endereco } from "@/types/endereco";
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
}

export interface IFirebaseProvider {
    children: React.ReactNode;
}


export const FirebaseContext = createContext({
    loading: true,
    currentUser: null,
    currentCard: null,
    currentEndereco: null,
} as IFirebaseContext);


export const FirebaseProvider: React.FC<IFirebaseProvider> = ({children}) => {
    const [ loading, setLoading ] = useState(true);
    const [ currentUser, setUser ] = useState<User | null>(null);

    const [ currentCard, setCard ] = useState<String | null>(null);
    const [ currentEndereco, setEndereco ] = useState<String | null>(null);

    const card = ()=>{
        if(auth().currentUser != null){
            firestore().collection('Users').where('email', '==', auth().currentUser?.email).get().then(querySnapshot => {
                querySnapshot.forEach(query => {
                    firestore().collection('Users').doc(query.id).collection('Cartoes').doc(query.data()['cartao']).get().then(item => {
                        let cartaoCadastro = item.data() 
                        if(cartaoCadastro){
                            setCard(cartaoCadastro['name'])
                            console.log(cartaoCadastro['name'])
                        }
                    })

                    
                    firestore().collection('Users').doc(query.id).collection('Enderecos').doc(query.data()['endereco']).get().then(item => {
                        let enderecoCadastro = item.data()
                        if(enderecoCadastro){
                            setEndereco(enderecoCadastro['rua'])
                            console.log(enderecoCadastro['rua'])
                        }
                    })
                })
            })
        }   
    }

    useEffect(() => {
        setCard(null)
        setEndereco(null)

        const subscriber = auth().onAuthStateChanged((user) => {
            if (auth().currentUser != null) {
                firestore().collection('Users').where('email', '==', auth().currentUser?.email).get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach(item=>{
                            setUser({
                                id: item.id,
                                cartao: item.data()['cartao'],
                                endereco: item.data()['endereco'],
                                email: item.data()['email'],
                                name: item.data()['name'],
                                tel: item.data()['tel'],
                                nascimento: item.data()['nascimento'],
                                tipo: item.data()['tipo'],
                            })
                        })
                        setLoading(false);
                    }).then(()=>{
                        card()
                    })
            }

            if (auth().currentUser == null) {
                setUser(null)
                setEndereco(null)
                setCard(null)
                setLoading(false);
            }
        });
        return subscriber;
    }, []);

    if (loading) return null


    return (
        <FirebaseContext.Provider value={{loading, currentUser, setUser, currentCard, setCard, currentEndereco, setEndereco}}>
            {children}
        </FirebaseContext.Provider>
    );
}