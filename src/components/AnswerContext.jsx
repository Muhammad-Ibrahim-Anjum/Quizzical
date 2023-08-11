import React, { useState , useContext } from "react";
 
const AnswerContext = React.createContext({ showAnswer : false, setShowAnswer : () => {}});
export const AnswerContextProvider = ({ children }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [ isAllChecked , setAllChewcked ] = useState(false)
 
    return (
        <AnswerContext.Provider value={{ showAnswer, setShowAnswer }}>
            {children}
        </AnswerContext.Provider>
    );
};

export const useAnswerContext = () => useContext(AnswerContext);