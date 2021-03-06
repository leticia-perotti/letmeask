import {useHistory, useParams} from "react-router-dom"
import logoImage from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from "../components/Question";
import { RoomCode } from '../components/RoomCode';
import { useRoom } from "../hooks/useRoom";
import deleteImg from "../assets/images/delete.svg"
import checkImage from "../assets/images/check.svg"
import answerdImg from "../assets/images/answer.svg"

import '../styles/room.scss';
import { database } from "../services/firebase";

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const history = useHistory();
   
    const { title, questions } = useRoom(roomId);

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })
        history.push('/')


    }

    async function handleDeleteQuestion(questionId : string){
        if(window.confirm("Tem certeza que deseja deletar a pergunta?")){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove
        }
    }

    async function handleCheckQuestionAsAnswer(questionId : string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered : true
        })
    }

   async function handleHighlightQuestion(questionId : string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted : true
        })
   }
 
    return (
        <div id='page-room'>
            <header>
                <div className="content">
                    <img src={logoImage} alt='letmeask' />
                    <div>
                    <RoomCode code={roomId} />
                    <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>

                <div className='questions-list'>
                    {questions.map(question => {
                        return(
                            <Question
                            key = {question.id}
                            content = {question.content}
                            author = {question.author}
                            isAnswered = {question.isAnswered}
                            isHighlighted = {question.isHighlighted}

                            >
                                {!question.isAnswered && (
                                    <>
                                    <button
                                    type="button"
                                    onClick={() => handleCheckQuestionAsAnswer(question.id)}
                                    >
                                        <img src={checkImage} alt="Marcar pergunta como respondida" />
                                    </button>
    
                                    <button
                                    type="button"
                                    onClick={() => handleHighlightQuestion(question.id)}
                                    >
                                        <img src={answerdImg} alt="Dar destaque ?? pergunta" />
                                    </button>
                                    </>
                                )}

                                <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
              
            </main>
        </div>
    );
}

