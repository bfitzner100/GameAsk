import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

//Assets
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

//Components
import {Button} from '../components/Button';

//Styles
import '../styles/auth.scss';

//Hooks
import { useAuth } from '../hooks/useAuth';
import { database, ref, set } from '../services/firebase';
import { child, get } from 'firebase/database';

export function Home() {
    let navigate = useNavigate();
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if(!user){
            await signInWithGoogle();
        }
        navigate("/rooms/new", {replace: true})
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();
        if(roomCode.trim() === ''){
            return
        }

        const roomRef = ref(database);
        get(child(roomRef, `rooms/${roomCode}`))
            .then((roomData) => {
                if (!roomData.exists()) {
                    alert('Não há sala com esse nome');
                    return
                }
                navigate(`/rooms/${roomData.key}`);
            }).catch((error) => {
                console.error(error);
            }
        ); 
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
                    <form onSubmit={handleJoinRoom}>
                        <input type="text" 
                            placeholder='Digite o nome da sala' 
                            onChange={event => setRoomCode(event.target.value)} 
                            value={roomCode} 
                        />
                        <Button type='submit'>Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}