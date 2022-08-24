import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
const AppContext = React.createContext()

// const URL = `https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple`
const URL = `https://opentdb.com/api.php?amount=10&category=22&type=multiple`
const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(true)
  const [questions, setQuestions] = useState([])
  const [isAnswer, setIsAnswer] = useState(false)
  let [numberCorrect, setNumberCorrect] = useState(0)

  const fetchQuiz = async () => {
    setIsWaiting(true)
    try {
      const response = await fetch(URL)
      const data = await response.json()
      if (data) {
        const results = data.results.map((questions) => {
          const incorrect = questions.incorrect_answers.map(answer => {
            return {
              id: nanoid(), answer, isHeld: false, isCorrect: false
            }
          })
          const correct = { id: nanoid(), answer: questions.correct_answer, isHeld: false, isCorrect: true }

          const answers = [...incorrect]
          const random = Math.floor(Math.random() * 4)
          answers.splice(random, 0, correct)

          return { ...questions, answers, id: nanoid() }
        })
        setQuestions(results)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchQuiz()
  }, [])

  const clickAnswer = (questID, answerID) => {
    setQuestions(prevQuest => {
      return prevQuest.map(quest => {
        if (questID !== quest.id) {
          return quest
        }
        else {
          const newAnswers = quest.answers.map(answer => {
            return answer.id === answerID ?
              { ...answer, isHeld: !answer.isHeld }
              : { ...answer, isHeld: false }
          })
          return { ...quest, answers: newAnswers }
        }
      })
    })
  }

  const checkAnswers = () =>{
    setIsAnswer(true)
   questions.map((question)=>{
    return question.answers.forEach((answer)=>{
          return answer.isHeld && answer.isCorrect ? numberCorrect++ : numberCorrect
      })
    })
    setNumberCorrect(numberCorrect)
  }

  const restart = () =>{
      setIsAnswer(false)
      fetchQuiz()
      setIsWaiting(true)
      setNumberCorrect(0)
  }
  return (
    <AppContext.Provider value={{
      isWaiting,
      questions,
      setIsWaiting,
      clickAnswer,
      isAnswer,
      setIsAnswer,
      checkAnswers,
      restart,
      numberCorrect
    }}>
      {children}
    </AppContext.Provider>)
}

export { AppContext, AppProvider }