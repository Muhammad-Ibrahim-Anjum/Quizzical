import React from "react"
import Quizz from "./components/Quizz"
import {decode} from 'html-entities';
import {nanoid} from "nanoid"
import { AnswerContextProvider, useAnswerContext } from "./components/AnswerContext";

function shuffleArray(array) {
    for (let i = array.length - 1 ; i > 0 ; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

export default function Quizzical(){

    const [ data, setData ] = React.useState([])
    const [ start, setStart ] = React.useState(false)
    const { setShowAnswer } = useAnswerContext();

    const fetchUserData = async () => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
          .then(response => {
            return response.json()
          })
          .then(data => {
            setData(data.results)
            console.log(data.results)
          })
      }

    function startQuiz(){
        fetchUserData()
        setTimeout(()=> {
            setStart(!start)
        }, 2000)
        
    }

    const quizData = data.map( singleQuiz => {
        let all_answers = singleQuiz.incorrect_answers.map( answer =>{
            return {
                answer_text : decode(answer),
                id : nanoid(),
                isCorrect: false,
                isHeld : false
            }
        })
        const correct_answer =  {
            answer_text : decode(singleQuiz.correct_answer),
            id : nanoid(),
            isCorrect: true,
            isHeld : false
        }
        all_answers.push(correct_answer)
    
        //  Randomize Answers object
        shuffleArray(all_answers);
        
        return [singleQuiz.question, all_answers]
    })

    return(
        <div className="main-content">
            <div className="upper-img" ></div>
            {
                start ? <div className="mcq-content"> 
                    <AnswerContextProvider>
                        {quizData.map(([question, options])=>{
                            return <Quizz 
                            key = {question.id}
                            options = {options}
                            question = {question}
                            />
                        })}
                        <button className="check-btn" onClick={() => setShowAnswer(true)} >Check Answers</button>
                    </AnswerContextProvider>
                </div>
                : 
                <div className="content">
                    <h1>Quizzical App</h1>
                    <h2>Some Description if needed</h2>
                    <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
                </div>
            }
            <div className="lower-img"></div>
        </div>
    )
}