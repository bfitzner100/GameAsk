import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./services/firebase";
import {createContext, useState, useEffect} from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

//pages
import {Home} from './pages/Home';
import {NewRoom} from './pages/NewRoom';

//models
import {User} from './models/User';
import {AuthContextType} from './models/AuthContextType';


export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>();

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
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{user, signInWithGoogle}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
