import {FormEvent, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {nanoid} from 'nanoid';

//Components
import {Button} from '../components/Button';

//Assets
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

//Styles
import '../styles/auth.scss';

//Hooks
import { useAuth } from '../hooks/useAuth';
import { database, ref, set } from '../services/firebase';


export function NewRoom() {
    const {user} = useAuth();
    const [newRoom, setNewRoom] = useState('');
    const navigate = useNavigate();
    
    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();
        
        if(newRoom.trim() === '') {
            return;
        }
        const roomId = nanoid(8);

        await set(ref(database, 'rooms/'+ roomId), {
            title: newRoom,
            authorId: user?.id
        }).then(() =>{
            navigate(`/rooms/${roomId}`);
        }).catch((error) => {
            console.log(error);
        });

        

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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text" placeholder='Nome da sala'  onChange={event => setNewRoom(event.target.value)} value={newRoom}/>
                        <Button type='submit'>Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <a href="#">Clique aqui!</a></p>
                </div>
            </main>
        </div>
    )
}