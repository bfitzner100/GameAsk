import { createContext, ReactNode, useState, useEffect } from "react";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";

//Types
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}
type User = {
  id: string,
  name: string,
  avatar: string
}
type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

  //States
  const [user, setUser] = useState<User>();

  /* Monitora as alterações no estado da autenticação. Sua função é não deixar que seja perdida as informações de autenticação do usuário ao 
  transitar pelas páginas e no reload das páginas. */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const {displayName, photoURL, uid} = user;

        if(!displayName || !photoURL) {
          throw new Error('A conta google não possui nome de exibição e photo do usuário.')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  //Função que realiza o login google e insere as informação do usuário no estado da aplicação.

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    
    if (result.user) {
      const {displayName, photoURL, uid} = result.user;

      if(!displayName || !photoURL) {
        throw new Error('A conta google não possui nome de exibição e photo do usuário.')
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return(
    <AuthContext.Provider value={{ user, signInWithGoogle }} >
      {props.children}
    </AuthContext.Provider>
  )
}