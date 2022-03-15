import logoImage from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../styles/room.scss'

export function Room() {
    return (
        <div id='page-romm'>
            <header>
                <div className='content'>
                    <img src={logoImage} alt='letmeask' />
                    <div>codigo</div>
                </div>
            </header>
            <main>
                <div className='room-title'>
                    <h1>Sala</h1>
                    <span>num perguntas</span>
                </div>

                <form>
                    <textarea
                    placeholder="O que deseja perguntar?" />

                    <div className='form-footer'>
                        <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>

                </form>

            </main>
        </div>
    )
}