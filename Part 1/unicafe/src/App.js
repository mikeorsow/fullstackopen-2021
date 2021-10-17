import React, { useState } from 'react'

const Header = ({title}) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({choice, countChoice}) => {
  return (
    <>
      {choice}: {countChoice}
      <br />
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title='Please provide feedback' />
      <Button text='good' />
      <Button text='neutral' />
      <Button text='bad' />
      <Header title='Stats' />
      <Statistics choice='good' countChoice= '3' />
      <Statistics choice='neutral' countChoice= '5' />
      <Statistics choice='bad' countChoice= '99' />
    </div>
  )
}

export default App