import React from "react"
import QuizOption from "./quizOption";
import {decode} from 'html-entities';
import { useAnswerContext } from "./AnswerContext";

export default function Quizz(props){
    const [ allAnswers, setAllAnswers ] = React.useState(props.options)
    const { showAnswer } = useAnswerContext();

    function holdAnswer(id){
        setAllAnswers(allAnswers => allAnswers.map( answer => {
                return ({
                    ...answer ,
                    isHeld : answer.id === id ? !answer.isHeld : false
                })
            })
        )
    }
    const choicesElement = allAnswers.map( answer => {
        const isTrue = answer.isHeld && showAnswer && answer.isCorrect
        const isFalse = answer.isHeld && showAnswer && !answer.isCorrect

        const background = () => {
            // debugger
            console.log(answer)
            if (answer.isHeld){
                if (!showAnswer) return "#D6DBF5"
                if (showAnswer){
                    if (answer.isCorrect) return "green"
                    else return "red"
                }
            }
            return "yellow"
        }

        return (
            <QuizOption 
                key = {answer.id}
                id = {answer.id}
                answer_text={answer.answer_text}
                holdAnswer={holdAnswer}
                backgroundColor = {background()}
            />
        )
    })


    return (
        <>
            <div className="mcq">
                <h2>{decode(props.question)}</h2>
                <div className="options">
                    {choicesElement}
                </div>
            </div>
            <hr className="break-line"/>
        </>
    )
}