import React from "react";

export default function QuizOption(props){
    const styles = {
        backgroundColor : props.backgroundColor
    }
    return(
        <button key={props.id} className="option-btn"  style={styles}  onClick={() =>props.holdAnswer(props.id)}>{props.answer_text}</button>
    )
}