import React from 'react'
import { useGlobalContext } from '../hooks/useGlobalContext'
const Quiz = ({ answers, question }) => {
  const { isAnswer } = useGlobalContext()

  const allAnswerButtons = answers.map((ansAll) => {
    const { id, answer, isHeld, isCorrect } = ansAll
    let styles = {
      backgroundColor: isHeld ? "#4D5B9E" : null,
      color: isHeld ? "#fff" : null,
      opacity: "50%",
    }
    if (isAnswer) {
      if (isHeld && isCorrect) {
        styles = {
          backgroundColor: "#94D7A2", color: "#4D5B9E"
        }
      }
     else if (isHeld && isCorrect === false) {
        styles = {
          backgroundColor: "#F8BCBC", color: "#4D5B9E"
        }
      }
     else if (isCorrect) {
        styles = {
          backgroundColor: "#94D7A2", color: "#4D5B9E"
        }
      }
    }

    return (
      <button
        className='answer-page'
        style={styles}
        key={id}
        dangerouslySetInnerHTML={{ __html: answer }} />
    )
  })

  return (
    <article className='quiz'>
      <h3 className='questions' dangerouslySetInnerHTML={{ __html: question }} />
      <p className='answers'>
        {allAnswerButtons}
      </p>
    </article>
  )
}

export default Quiz