import { useNavigate } from 'react-router-dom';

//Assets
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

//Components
import {Button} from '../components/Button';

//Styles
import '../styles/auth.scss';
import { useContext } from 'react';
import { AuthContext } from '../App';

export function Home() {
    let navigate = useNavigate();
    const {user, signInWithGoogle} = useContext(AuthContext);

    async function handleCreateRoom() {
        if(!user){
            await signInWithGoogle();
        }
        navigate("/rooms/new", {replace: true})
    }
    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Illustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button className='create-room' onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="ícone do google" />
                        Crie sua sala usando o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input type="text" placeholder='Digite o nome da sala' />
                        <Button type='submit'>Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}