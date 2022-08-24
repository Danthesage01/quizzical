import React from 'react'
import { useGlobalContext } from './hooks/useGlobalContext'
import Welcome from './pages/Welcome'
import Quiz from './pages/Quiz'
import { nanoid } from 'nanoid'
const App = () => {
  const { isWaiting, questions, clickAnswer, isAnswer, checkAnswers, restart, numberCorrect } = useGlobalContext()


  if (isWaiting) {
    return (
      <Welcome />
    )
  }
  if (!isWaiting && !isAnswer) {
    return (
      <main>
        <h1>Quiz</h1>
        <div className='break'></div>
        {questions.map(quest => {
          const { id: questID, question, answers } = quest
          return (
            <article key={nanoid()} className='quiz'>
              <h3 className='questions' dangerouslySetInnerHTML={{ __html: question }} />
              <p className='answers'> {answers.map(answer => {
                const answerID = answer.id;
                return <button
                  className='each-answer'
                  key={nanoid()}
                  style={{
                    backgroundColor: answer.isHeld ? '#4D5B9E' : null,
                    color: answer.isHeld ? '#fff' : null
                  }}
                  dangerouslySetInnerHTML={{ __html: answer.answer }}
                  onClick={() => clickAnswer(questID, answerID)}
                />
              })}
              </p>
            </article>
          )
        })}
        <div className='break'></div>
        <button 
        className='second-button'
        onClick={()=>checkAnswers()}
        >Check Answer</button>
      </main>
    )
  }
  if(!isWaiting && isAnswer){
  return (
    <main className=''>
      <h1>Quiz Results</h1>
      <div className='break'></div>
      {questions.map(quest => {
        const {id} = quest
        return <Quiz key={id} {...quest} />
      })}
      <div className='break'></div>
      <footer className='footer'>
        <p>Score:
        {Math.floor(numberCorrect < (questions.length) / 2) 
        ? <span className='fail'>{` (${numberCorrect}/${questions.length}) Not impressive! `}</span>
        : <span className='success'>{` (${numberCorrect}/${questions.length}) Impressive!`}</span> 
        }
        </p>
      <button
        className='second-button'
        onClick={restart}
        >Restart</button>
      </footer>
    </main>
  )
}
}

export default App
