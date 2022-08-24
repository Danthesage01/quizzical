import React from 'react'
import { useGlobalContext } from '../hooks/useGlobalContext'
const Welcome = () => {
  const {setIsWaiting} = useGlobalContext()
  return (
    <div className='quizz-home'>
      <h1>Quizzical</h1>
      <p>Test your knowledge</p>
      <button onClick={()=>setIsWaiting(false)} className='first-button'>Start Quiz</button>
    </div>
  )
}

export default Welcome
